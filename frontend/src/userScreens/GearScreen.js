import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Card } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import Meta from '../components/Meta'
import Catagories from '../components/CategoryComponent'
import { listProducts } from '../actions/productActions'

const HomeScreen = ({ match }) => {
  // Assign useDispatch hook to dispatch actions
  const dispatch = useDispatch()

  // Get the keyword from the URL for searching
  const keyword = match.params.keyword

  // Get page number from the URL
  const pageNumber = match.params.pageNumber || 1

  // Go to the state and pull out information from productList
  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  // useEffect hook to do something after render
  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <div className='gear'>
      <Meta title='Double D Shop' />
      <h1 className='gear-heading'>Double D Shop</h1>
      <Row>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <div className='gear-content'>
            <Card className='categories-card'>
              <Route
                render={({ history }) => <Catagories history={history} />}
              />
            </Card>

            <Row style={{ marginTop: '1rem' }}>
              {products.map((product) => (
                <Col
                  className='rowss'
                  key={product._id}
                  sm={12}
                  md={6}
                  lg={4}
                  xl={3}
                >
                  <Product product={product} />
                </Col>
              ))}
            </Row>
            <Paginate
              pages={pages}
              page={page}
              keyword={keyword ? keyword : ''}
            />
          </div>
        )}
      </Row>
    </div>
  )
}

export default HomeScreen
