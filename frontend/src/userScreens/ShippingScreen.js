import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'
import Meta from '../components/Meta'

const ShippingScreen = ({ history }) => {
  // Assign useDispatch hook to dispatch actions
  const dispatch = useDispatch()

  // go to cart in the state and pull out shippingAddress
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  // Declare new state variables and functions
  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)

  // Function called on submit
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    history.push('/placeorder')
  }

  return (
    <FormContainer>
      <Meta title='Shipping' />
      <CheckoutSteps step1 step2 />
      <div style={{ textAlign: 'center' }}>
        <h1>Shipping</h1>
      </div>

      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter address'
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='city'>
          <Form.Label>City and State</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter city'
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='postalCode'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter postal code'
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter country'
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen
