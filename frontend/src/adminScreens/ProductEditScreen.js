import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import Meta from '../components/Meta'

const ProductEditScreen = ({ match, history }) => {
  // Assign useDispatch hook to dispatch actions
  const dispatch = useDispatch()

  // get productId from the URL
  const productId = match.params.id

  // Declare new state variables using useState hook
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [displayImage, setDisplayImage] = useState('')
  const [published, setIsPublished] = useState(false)
  const [countInStock, setCountInStock] = useState(0)
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)

  // go to productDetails in the state and pull out information
  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  // go to productDetails in the state and pull out information
  const productUpdate = useSelector((state) => state.productUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate

  // useEffect hook to do something after render
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      history.push('/admin/productlist')
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId))
      } else {
        setName(product.name)
        setPrice(product.price)
        setImage(product.image)
        setDisplayImage(product.displayImage)
        setCountInStock(product.countInStock)
        setCategory(product.category)
        setDescription(product.description)
        setIsPublished(product.isPublished)
      }
    }
  }, [dispatch, history, productId, product, successUpdate])

  // function to upload image on submit
  const uploadFileHandler = async ({ target: { id, files } }) => {
    const file = files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
      const { data } = await axios.post('/api/upload', formData, config)

      if (id === 'display') {
        setImage(data)
      }
      if (id === 'page') {
        setDisplayImage(data)
      }
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  // function to be called on submit
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        displayImage,
        category,
        description,
        countInStock,
        published,
      })
    )
  }

  return (
    <div className='content'>
      <Meta title={'Edit ' + name} />
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Select Category</Form.Label>
              <Form.Control
                as='select'
                placeholder='Select Category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>All</option>
                <option>Shirt</option>
                <option>Hoodie</option>
                <option>Hat</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.File
                id='display'
                label='Choose Display Image'
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId='displayImage'>
              <Form.Label>Display Image</Form.Label>
              <Form.File
                id='page'
                label='Choose Page Image'
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId='ispublished'>
              <Form.Check
                type='checkbox'
                label='Publish'
                checked={published}
                onChange={(e) => setIsPublished(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <div className='space'></div>
            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  )
}

export default ProductEditScreen
