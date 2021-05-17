import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Row, Col, Image, Card } from 'react-bootstrap'
import {
  listCarouselImages,
  deleteCarouselImage,
} from '../actions/imageActions'
import {
  DELETE_CAROUSEL_RESET,
  LIST_CAROUSEL_RESET,
} from '../constants/imageConstants'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'

const CarouselListScreen = ({ history, match }) => {
  // Assign useDispatch hook to dispatch actions
  const dispatch = useDispatch()

  // Get page number from the URL
  const pageNumber = match.params.pageNumber || 1

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const carouselImageList = useSelector((state) => state.carouselImageList)
  const { success, loading, error, images } = carouselImageList

  const carouselImageDelete = useSelector((state) => state.carouselImageDelete)
  const { success: deleteSuccess, loading: deleteLoading } = carouselImageDelete

  // Delete Handler
  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      dispatch(deleteCarouselImage(id))
    }
  }

  // Create Image Handler
  const createImageHandler = () => {
    history.push('/admin/carousel/upload')
  }

  // useEffect hook to do something after render
  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login')
    } else if (!images) {
      dispatch(listCarouselImages())
    } else if (deleteSuccess) {
      dispatch({ type: DELETE_CAROUSEL_RESET })
      dispatch({ type: LIST_CAROUSEL_RESET })
    }
  }, [history, userInfo, deleteSuccess, images])

  return (
    <div className='content'>
      <Meta title='Carousel Img List' />
      <Row className='align-items-center'>
        <Col>
          <h1>Images</h1>
        </Col>
      </Row>
      {!success ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {images.map((image) => (
              <Col xs={12} md={2}>
                <Card className='product'>
                  <Card.Body>
                    <Image src={image.imageURL} alt={image.imageURL} fluid />
                  </Card.Body>
                  <Card.Footer>
                    <Button
                      className='btn-sm'
                      variant='danger'
                      onClick={() => deleteHandler(image._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>

          <Col className='text-right'>
            <Button className='my-3' onClick={createImageHandler}>
              <i className='fas fa-plus'></i> Upload Image
            </Button>
          </Col>
        </>
      )}
    </div>
  )
}

export default CarouselListScreen

/*


<td>
                    <Button
                      className='btn-sm'
                      variant='danger'
                      onClick={() => deleteHandler()}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>

                  */
