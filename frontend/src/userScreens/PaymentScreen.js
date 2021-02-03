import React, { useState, useEffect } from 'react'
import { Form, Button, Card, ListGroup, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import Meta from '../components/Meta'
import { updateBilling } from '../actions/orderActions'
import { Elements } from '@stripe/react-stripe-js'
import PaymentForm from '../components/PaymentForm'
import { stripePromise } from '../constants/stripeConstants'
import { getOrderDetails } from '../actions/orderActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

const PaymentScreen = ({ match, history }) => {
  // Assign useDispatch hook to dispatch actions
  const dispatch = useDispatch()

  // get the orderID from th URL
  const orderId = match.params.id

  // Go to the state and pull out information from userLogin
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  // Go to the orderDetails in the state and pull out information
  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  // Declare new state variables and functions
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [city, setCity] = useState('')
  const [street, setStreet] = useState('')
  const [state, setState] = useState('')
  const [postalCode, setPostalCode] = useState('')

  const billingDetails = {
    name: firstName + ' ' + lastName,
    email: userInfo.email,
    city: city,
    street: street,
    state: state,
    postal_code: postalCode,
  }

  // Function to place order on submit
  const updateBillingInfo = (e) => {
    e.preventDefault()
    dispatch(updateBilling(orderId, billingDetails))
    history.push(`/order/${orderId}`)
  }

  // useEffect hook to do something after render
  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
    if (!order) {
      dispatch(getOrderDetails(orderId))
    }
  }, [dispatch, orderId, order, history, userInfo])

  return (
    <FormContainer>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Meta title='Shipping' />
          <CheckoutSteps step1 step2 step3 step4 />
          <div style={{ textAlign: 'center' }}>
            <h1>Payment</h1>
          </div>

          <Form onSubmit={updateBillingInfo}>
            <Row>
              <Form.Group controlId='first name' as={Col} sm={6}>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='First Name'
                  value={firstName}
                  required
                  onChange={(e) => setFirstName(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='last name' as={Col} sm={6}>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Last Name'
                  value={lastName}
                  required
                  onChange={(e) => setLastName(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Row>

            <Row>
              <Form.Group controlId='city' as={Col} sm={6}>
                <Form.Label>City</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='City'
                  value={city}
                  required
                  onChange={(e) => setCity(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='street' as={Col} sm={6}>
                <Form.Label>Street</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='street'
                  value={street}
                  required
                  onChange={(e) => setStreet(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Row>

            <Row>
              <Form.Group controlId='state' as={Col} sm={6}>
                <Form.Label>State</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='state'
                  value={state}
                  required
                  onChange={(e) => setState(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='zip code' as={Col} sm={6}>
                <Form.Label>Zip Code</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='zip'
                  value={postalCode}
                  required
                  onChange={(e) => setPostalCode(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Row>

            <Card style={{ marginTop: '2rem' }}>
              <ListGroup variant='flush' style={{ textAlign: 'center' }}>
                <ListGroup.Item>
                  <Elements stripe={stripePromise}>
                    <PaymentForm />
                  </Elements>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Form>
        </>
      )}
    </FormContainer>
  )
}

export default PaymentScreen
