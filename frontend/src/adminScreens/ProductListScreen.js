import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import {
  listProducts,
  deleteProduct,
  createProduct,
} from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'
import Meta from '../components/Meta'

const ProductListScreen = ({ history, match }) => {
  // Assign useDispatch hook to dispatch actions
  const dispatch = useDispatch()

  // Get page number from URL
  const pageNumber = match.params.pageNumber || 1

  // Go to the productList in the state and pull out information
  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  // Go to the productDelete in the state and pull out information
  const productDelete = useSelector((state) => state.productDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete

  // Go to the productCreate in the state and pull out information
  const productCreate = useSelector((state) => state.productCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate

  // Go to the userLogin in the state and pull out information
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  // useEffect hook to do something after render
  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })

    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login')
    }

    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`)
    } else {
      dispatch(listProducts('', pageNumber))
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber,
  ])

  // Function to be called on delete submit
  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteProduct(id))
    }
  }

  // Function to be called on create submit
  const createProductHandler = () => {
    dispatch(createProduct())
  }

  return (
    <div className='content'>
      <Meta title='Product List' />
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>IMAGE</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>PUBLISHED</th>
                <th>OPTIONS</th>
                <></>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>
                    <Image
                      style={{ width: '30px' }}
                      src={product.image}
                      alt={product.name}
                      fluid
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>${(Math.round(product.price * 100) / 100).toFixed(2)}</td>
                  <td>
                    {product.isPublished ? (
                      <i
                        className='fas fa-check'
                        style={{ color: 'green' }}
                      ></i>
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button className='btn-sm mr-2' variant='light'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      className='btn-sm'
                      variant='danger'
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Col className='text-right'>
            <Button className='my-3' onClick={createProductHandler}>
              <i className='fas fa-plus'></i> Create Product
            </Button>
          </Col>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </div>
  )
}

export default ProductListScreen
