import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'
import { USER_DETAILS_RESET } from '../constants/userConstants'
import Meta from '../components/Meta'
import { CART_REMOVE_ITEM } from '../constants/cartConstants'

const PlaceOrderScreen = ({ history }) => {
  // Assign useDispatch hook to dispatch actions
  const dispatch = useDispatch()

  // Go to cart in the state and pull out information from cart
  const cart = useSelector((state) => state.cart)
  if (!cart.shippingAddress.address) {
    history.push('/shipping')
  }

  // Go to orderCreate in the state and pull out information
  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, success, error } = orderCreate

  // Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }
  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  )
  cart.taxPrice = addDecimals(Number((0.0625 * cart.itemsPrice).toFixed(2)))
  cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.taxPrice)).toFixed(2)

  // useEffect hook to do something after render
  useEffect(() => {
    if (success) {
      history.push(`/payment/${order._id}`)
      dispatch({ type: USER_DETAILS_RESET })
      dispatch({ type: ORDER_CREATE_RESET })
    }
  }, [history, success, dispatch])

  // Function to place order on submit
  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
        billingDetails: {
          name: '',
          email: '',
          address: {
            city: '',
            line1: '',
            state: '',
            postal_code: '',
          },
        },
      })
    )
  }

  return (
    <div style={{ width: '90%', margin: 'auto', textAlign: 'center' }}>
      <Meta title='Place Order' />
      <CheckoutSteps step1 step2 step3 />
      <div style={{ textAlign: 'center' }}>
        <h1>Review</h1>
      </div>
      <Row>
        <Col sm={12} md={12} lg={12} xl={7}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Items</h2>
                {cart.cartItems.length === 0 ? (
                  <Message>Your cart is empty</Message>
                ) : (
                  <ListGroup variant='flush'>
                    <ListGroup.Item></ListGroup.Item>
                    {cart.cartItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={2}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>

                          <Col md={5} style={{ marginTop: '3rem' }}>
                            <Link
                              to={`/product/${item.product}`}
                              style={{ fontSize: '130%' }}
                            >
                              {item.name}
                            </Link>
                            <p> Emblem: {item.DDColor}</p>
                          </Col>
                          <Col md={5}>
                            <p style={{ marginTop: '3rem', fontSize: '130%' }}>
                              {item.qty} x ${item.price} = $
                              {item.qty * item.price}{' '}
                            </p>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}

                    <ListGroup.Item>{''}</ListGroup.Item>
                  </ListGroup>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>

        <Col
          sm={12}
          md={12}
          lg={8}
          xl={4}
          style={{ textAlign: 'center', margin: 'auto' }}
        >
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Shipping</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Address</Col>
                  <Col>{cart.shippingAddress.address}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>City</Col>
                  <Col>{cart.shippingAddress.city}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Postal Code</Col>
                  <Col>{cart.shippingAddress.postalCode}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Country</Col>
                  <Col>{cart.shippingAddress.country}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>

          <Card style={{ marginTop: '3rem' }}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant='danger'>{error}</Message>}
              </ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={cart.cartItems === 0}
                onClick={placeOrderHandler}
              >
                Proceed With Order
              </Button>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default PlaceOrderScreen
