import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id

  const qty = location.search
    ? Number(location.search.slice(1).split('&')[0].split('=')[1])
    : 1
  const DDColor = location.search
    ? String(location.search.slice(1).split('&')[1].split('=')[1])
    : 'black'
  //const qty = location.search ? Number(location.search.split('=')[1]) : 1
  //const DDColor = location.search ? String(location.search.split('')[1]) : 1

  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty, DDColor))
    }
  }, [dispatch, productId, qty, DDColor])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
  }

  return (
    <div className='cart-screen'>
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <Message>
          Your cart is empty <Link to='/gear'>Go Back</Link>
        </Message>
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
                        </Col>

                        <Col md={2} style={{ marginTop: '2.5rem' }}>
                          <div className='space'></div>
                          <p style={{ fontSize: '120%', color: 'black' }}>
                            ${item.price}
                          </p>
                        </Col>

                        <Col sm={1} lg={3} style={{ marginTop: '2rem' }}>
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
