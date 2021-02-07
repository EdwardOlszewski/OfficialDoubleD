import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useSelector, useDispatch } from 'react-redux'
import { cardCharge } from '../actions/orderActions'

const PaymentForm = ({ updateBillingInfo, billingDetails, history }) => {
  const stripe = useStripe()
  const elements = useElements()
  const dispatch = useDispatch()

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order } = orderDetails

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: billingDetails,
    })

    if (!error) {
      const { id } = paymentMethod
      var amount = parseInt(order.totalPrice * 100)
      dispatch(cardCharge(id, amount, order._id))
    }
  }

  return (
    <Form id='payment-form' onSubmit={handleSubmit}>
      <Form.Label>Card Number</Form.Label>
      <div
        id='card-element'
        className='form-control'
        style={{ paddingTop: '1rem' }}
      >
        <CardElement />
      </div>
      <Button
        style={{ marginTop: '2rem' }}
        type='submit'
        onClick={() => updateBillingInfo()}
      >
        Submit Payment
      </Button>
    </Form>
  )
}

export default PaymentForm
