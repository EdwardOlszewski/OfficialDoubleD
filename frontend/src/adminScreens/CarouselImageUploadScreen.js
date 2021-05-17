import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { uploadImage, createCarouselImage } from '../actions/imageActions'
import {
  CREATE_CAROUSEL_RESET,
  LIST_CAROUSEL_RESET,
  UPLOAD_IMAGE_RESET,
} from '../constants/imageConstants'
import Meta from '../components/Meta'
import Message from '../components/Message'
import Loader from '../components/Loader'

const CarouselImageUploadScreen = ({ history }) => {
  // Assign useDispatch hook to dispatch actions
  const dispatch = useDispatch()

  // Declare new state variables
  const [fileName, setFileName] = useState('Choose an image to upload...')

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  // Go to the state and pull out information from eventDetails
  const carouselImageCreate = useSelector((state) => state.carouselImageCreate)
  const { loading, success, error, url } = carouselImageCreate

  // Go to the state and pull out information from imageUpload
  const imageUpload = useSelector((state) => state.imageUpload)
  const {
    loading: loadingImg,
    error: errorImg,
    success: successImg,
    imageURL,
  } = imageUpload

  const uploadImageHandler = async ({ target: { files } }) => {
    setFileName(files[0].name)
    dispatch(uploadImage(files[0]))
  }

  // Submit Handler to create image
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createCarouselImage({ imageURL }))
  }

  // useEffect hook to do something after render
  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login')
    } else if (success) {
      dispatch({ type: UPLOAD_IMAGE_RESET })
      dispatch({ type: LIST_CAROUSEL_RESET })
      dispatch({ type: CREATE_CAROUSEL_RESET })
      history.push('/admin/carousel')
    }
  }, [history, userInfo, success, loading])

  return (
    <FormContainer>
      <Meta title='Upload Image' />
      <h1>Upload Carousel Image</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group controlId='image'>
          <Form.Label>Image</Form.Label>
          <Form.File
            id='image'
            label={fileName}
            custom
            onChange={uploadImageHandler}
          ></Form.File>
          {loadingImg && <Loader />}
          {errorImg && <Message variant='danger'>{errorImg}</Message>}
        </Form.Group>
        {error && <Message variant='danger'>{error}</Message>}
        <Button type='submit' variant='primary'>
          Upload
        </Button>
      </Form>
    </FormContainer>
  )
}

export default CarouselImageUploadScreen
