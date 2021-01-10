import React, { useEffect } from 'react'
import { Form, Button, ListGroup } from 'react-bootstrap'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useSelector, useDispatch } from 'react-redux'
import { payOrder, cardCharge } from '../actions/orderActions'
import { ORDER_CHARGE_RESET } from '../constants/orderConstants'
import Loader from '../components/Loader'

const PaymentForm = () => {
  const stripe = useStripe()
  const elements = useElements()
  const dispatch = useDispatch()

  const orderCharge = useSelector((state) => state.orderCharge)
  const { loading, success } = orderCharge

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: orderPayLoading } = orderPay

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order } = orderDetails

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    })

    if (!error) {
      const { id } = paymentMethod
      var amount = parseInt(order.totalPrice * 100)
      dispatch(cardCharge(id, amount, order._id))
    }
  }

  useEffect(() => {
    if (success) {
      dispatch({ type: ORDER_CHARGE_RESET })
      dispatch(payOrder(order._id))
    }
  }, [dispatch, success, order._id])

  return (
    <Form id='payment-form' onSubmit={handleSubmit}>
      {loading || orderPayLoading ? (
        <Loader />
      ) : (
        <div>
          <ListGroup.Item>
            <CardElement />
          </ListGroup.Item>
          <ListGroup.Item>
            <Button type='button' className='btn-block' onClick={handleSubmit}>
              Pay
            </Button>
          </ListGroup.Item>
        </div>
      )}
    </Form>
  )
}

export default PaymentForm
