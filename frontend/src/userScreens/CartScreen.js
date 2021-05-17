import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
  Container,
} from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'
import Meta from '../components/Meta'

const CartScreen = ({ match, location, history }) => {
  // Assign useDispatch hook to dispatch actions
  const dispatch = useDispatch()

  // Get product ID from the URL
  const productId = match.params.id

  // Get the qty of each item from the URL
  const qty = location.search
    ? Number(location.search.slice(1).split('&')[0].split('=')[1])
    : 1
  // Get the emblem color from the URL
  const DDColor = location.search
    ? String(location.search.slice(1).split('&')[1].split('=')[1])
    : 'black'
  // Get the size from the URL
  const size = location.search
    ? String(location.search.slice(1).split('&')[2].split('=')[1])
    : 'small'

  // Go to the cart in the state and select the cartItems
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  // useEffect hook to do something
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty, DDColor, size))
    }
  }, [dispatch, productId, qty, DDColor, size])

  // Function to remove item from cart
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  // Function to checkout
  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
  }

  return (
    <div className='cart-screen'>
      <Meta title='Double D Shopping Cart' />
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <Container>
          <Message>
            Your cart is empty <Link to='/gear'>Go Back</Link>
          </Message>
        </Container>
      ) : (
        <Row>
          <Col className='shopping-cart'>
            <Card>
              <Col xl={12}>
                <ListGroup variant='flush'>
                  {cartItems.map((item) => (
                    <ListGroup.Item key={item.product}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col md={4} style={{ marginTop: '2rem' }}>
                          <div className='space'></div>
                          <Link
                            style={{ fontSize: '1.3rem' }}
                            to={`/product/${item.product}`}
                          >
                            {item.name}
                          </Link>
                          <p> Emblem: {item.DDColor}</p>
                          <p style={{ marginTop: '-20px' }}>
                            {' '}
                            Size: {item.size}
                          </p>
                        </Col>

                        <Col xs={4} md={2} style={{ marginTop: '2.5rem' }}>
                          <div className='space'></div>
                          <p style={{ fontSize: '120%', color: 'black' }}>
                            ${item.price}
                          </p>
                        </Col>

                        <Col xs={4} md={2} lg={3} style={{ marginTop: '2rem' }}>
                          <div className='trash-button'>
                            <Form.Control
                              as='select'
                              value={item.qty}
                              onChange={(e) =>
                                dispatch(
                                  addToCart(
                                    item.product,
                                    Number(e.target.value),
                                    item.DDColor
                                  )
                                )
                              }
                            >
                              {[...Array(item.countInStock).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ))}
                            </Form.Control>
                          </div>
                        </Col>

                        <Col xs={4} md={1} style={{ marginTop: '2rem' }}>
                          <div className='trash-button'>
                            <Button
                              type='button'
                              variant='light'
                              onClick={() =>
                                removeFromCartHandler(item.product)
                              }
                            >
                              <i className='fas fa-trash'></i>
                            </Button>
                          </div>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Col>
            </Card>
          </Col>

          <Col sm={12} md={12} lg={12} xl={4} className='checkout'>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>
                    Subtotal (
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
                  </h2>
                  <p style={{ fontSize: '150%', color: 'black' }}>
                    $
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                  </p>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    type='button'
                    className='btn-block'
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                  >
                    Proceed To Checkout
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  )
}

export default CartScreen
