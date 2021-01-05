import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'

import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { CardElement, CardElementContainer } from '@stripe/react-stripe-js'

/*const stripePromise = loadStripe(
  'pk_test_51I5HSaAJpz0S6tif8dV08x5vMTIb9nbpwd00MWoDWbUKLZqa9Hw2WwF8tvPnO2feMD6Nyhx6Pdbiyzbntlwkcpmp00A2tLOffo'
)
const stripePromise = loadStripe(process.env.PUBLISHABLE_KEY)
*/

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  if (!shippingAddress.address) {
    history.push('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeorder')
  }

  return (
    <FormContainer onSubmit={submitHandler}>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form.Group>
        <Form.Label as='legend'>Select Method</Form.Label>
        <Col>
          <Form.Check
            type='radio'
            label='Credit Card'
            id='Stripe'
            name='paymentMethod'
            value='Stripe'
            checked
            onChange={(e) => setPaymentMethod(e.target.value)}
          ></Form.Check>
        </Col>
      </Form.Group>

      <Button type='submit' variant='primary'>
        Continue
      </Button>
    </FormContainer>
  )
}

export default PaymentScreen

/*
 </FormContainer>
    <FormContainer onSubmit={submitHandler}>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form.Group>
        <Col>
          <Elements stripe={stripePromise}>
            <CardElement />
          </Elements>
        </Col>
      </Form.Group>

      <Button type='submit' variant='primary'>
        Continue
      </Button>
    </FormContainer>
*/
