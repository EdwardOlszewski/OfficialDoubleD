import React, { useEffect } from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import Events from '../components/Events'
import ImageCarousel from '../components/ImageCarousel'
import { listEvents } from '../actions/eventActions'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Meta from '../components/Meta'

const HomeScreen = () => {
  // Assign useDispatch hook to dispatch actions
  const dispatch = useDispatch()

  // Go to the eventList in the state and pull out information
  const eventList = useSelector((state) => state.eventList)
  const { events, loading } = eventList

  // useEffect hook to do something after render
  useEffect(() => {
    dispatch(listEvents())
  }, [dispatch])

  return (
    <div>
      <Meta title='Double D Home' />
      <ImageCarousel />
      <Container>
        <h1
          style={{ marginTop: '2rem', textAlign: 'center', fontSize: '250%' }}
        >
          Double D Events
        </h1>

        {loading ? (
          <Loader />
        ) : events.length > 0 ? (
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
        ) : (
          <h1> no events</h1>
        )}
      </Container>
    </div>
  )
}

export default HomeScreen