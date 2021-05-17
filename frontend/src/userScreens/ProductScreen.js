import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  listProductDetails,
  createProductReview,
} from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
import Meta from '../components/Meta'

const ProductScreen = ({ history, match }) => {
  // Assign useDispatch hook to dispatch actions
  const dispatch = useDispatch()

  // Declare new state variables and functions
  const [qty, setQty] = useState(0)
  const [DDColor, setDDColor] = useState('')
  const [size, setSize] = useState('')
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  // Go to productDetails in the state and pull out information
  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  // Go to userLogin in the state and pull out information
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  // Go to productReviewCreate and pull out information
  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview,
  } = productReviewCreate

  // useEffect hook called after render
  useEffect(() => {
    if (successProductReview) {
      setRating(0)
      setComment('')
    }
    if (!product._id || product._id !== match.params.id) {
      dispatch(listProductDetails(match.params.id))
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
  }, [dispatch, match, successProductReview, product._id])

  // Function to be called on add to cart submit
  const addToCartHandler = () => {
    setDDColor(DDColor)
    history.push(
      `/cart/${match.params.id}?qty=${qty}&DDColor=${DDColor}&size=${size}`
    )
  }

  // Function to be called after create review submit
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    )
  }

  return (
    <div className='content'>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Meta title={product.name} />
          <Row>
            <Col
              sm={12}
              md={12}
              lg={12}
              xl={8}
              className='product-image'
              style={{ marginTop: '5rem' }}
            >
              <Image src={product.displayImage} alt={product.name} fluid />
            </Col>

            <Col
              md={12}
              lg={9}
              xl={4}
              style={{ margin: 'auto', textAlign: 'center' }}
            >
              <ListGroup variant='flush' style={{ marginTop: '1rem' }}>
                <ListGroup.Item>
                  <h1>{product.name}</h1>
                </ListGroup.Item>
                <ListGroup.Item
                  style={{ paddingTop: '1rem', paddingBottom: '1rem' }}
                >
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>

                <Card style={{ marginTop: '2rem' }}>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <Row>
                        <Col>Price:</Col>
                        <Col>
                          <strong>
                            $
                            {(Math.round(product.price * 100) / 100).toFixed(2)}
                          </strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Row>
                        <Col>Status:</Col>
                        <Col>
                          {product.countInStock > 0
                            ? 'In Stock'
                            : 'Out Of Stock'}
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Row>
                        <Col style={{ marginTop: '8px' }}>Size: </Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                          >
                            <option>Pick Size</option>
                            <option>Small</option>
                            <option>Medium</option>
                            <option>Large</option>
                            <option>XLarge</option>
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    {!size ||
                      (product.countInStock > 0 && (
                        <ListGroup.Item>
                          <Row>
                            <Col style={{ marginTop: '8px' }}>Qty:</Col>
                            <Col>
                              <Form.Control
                                as='select'
                                value={qty}
                                onChange={(e) => setQty(e.target.value)}
                              >
                                {[...Array(product.countInStock).keys()].map(
                                  (x) => (
                                    <option key={x + 1} value={x + 1}>
                                      {x + 1}
                                    </option>
                                  )
                                )}
                              </Form.Control>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}

                    {qty ? (
                      <ListGroup.Item>
                        <Row>
                          <Col style={{ marginTop: '8px' }}>Emblem: </Col>
                          <Col>
                            <Form.Control
                              as='select'
                              value={DDColor}
                              onChange={(e) => setDDColor(e.target.value)}
                            >
                              <option>Black</option>
                              <option>White</option>
                              <option>Red</option>
                              <option>Yellow</option>
                              <option>Aqua</option>
                              <option>Lavender</option>
                              <option>Hot Pink</option>
                              <option>Neon Green</option>
                            </Form.Control>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ) : null}

                    {size && qty && DDColor ? (
                      <ListGroup.Item>
                        <Button
                          onClick={addToCartHandler}
                          className='btn-block'
                          type='button'
                          disabled={product.countInStock === 0}
                        >
                          Add To Cart
                        </Button>
                      </ListGroup.Item>
                    ) : null}
                  </ListGroup>
                </Card>
              </ListGroup>
            </Col>
          </Row>

          <Row>
            <Col md={1}></Col>
            <Col sm={12} md={12} lg={12} xl={7} style={{ marginTop: '3rem' }}>
              <h2>Reviews</h2>

              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item style={{ marginTop: '2rem' }}>
                  <h2>Write a Customer Review</h2>
                  {successProductReview && (
                    <Message variant='success'>
                      Review submitted successfully
                    </Message>
                  )}
                  {loadingProductReview && <Loader />}
                  {errorProductReview && (
                    <Message variant='danger'>{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        style={{ width: '100%' }}
                        disabled={loadingProductReview}
                        type='submit'
                        variant='primary'
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>sign in</Link> to write a review{' '}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </div>
  )
}

export default ProductScreen
