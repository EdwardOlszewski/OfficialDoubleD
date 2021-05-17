import React, { useEffect } from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import Events from '../components/Events'
import ImageCarousel from '../components/ImageCarousel'
import { listEvents } from '../actions/eventActions'
import { listCarouselImages } from '../actions/imageActions'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import Message from '../components/Message'

const HomeScreen = () => {
  // Assign useDispatch hook to dispatch actions
  const dispatch = useDispatch()

  // Go to the eventList in the state and pull out information
  const eventList = useSelector((state) => state.eventList)
  const { events, loading, success, error } = eventList

  const carouselImageList = useSelector((state) => state.carouselImageList)
  const { loading: imgLoading, success: imgSuccess, images } = carouselImageList

  // useEffect hook to do something after render
  useEffect(() => {
    if (!images) {
      dispatch(listCarouselImages())
    } else if (!events) {
      dispatch(listEvents())
    }
  }, [dispatch, events, images])

  return (
    <div>
      <Meta title='Double D Home' />
      {!imgSuccess ? <Loader /> : <ImageCarousel images={images} />}
      <Container>
        <h1
          style={{ marginTop: '2rem', textAlign: 'center', fontSize: '250%' }}
        >
          Double D Events
        </h1>

        {!success ? (
          <Loader />
        ) : error ? (
          <Message>{error}</Message>
        ) : events.length < 0 ? (
          <Container>
            <Message>There are currently no events, check back later!</Message>
          </Container>
        ) : (
          <Row style={{ marginTop: '1rem' }}>
            {events.map((event) => (
              <Col
                className='rowss'
                key={event._id}
                sm={12}
                md={6}
                lg={4}
                xl={4}
              >
                <Events event={event} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  )
}

export default HomeScreen
