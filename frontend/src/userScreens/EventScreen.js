import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Card } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import GoogleMap from '../components/GoogleMap'
import DateFormat from '../components/DateFormat'
import { listEventDetails } from '../actions/eventActions'
import Meta from '../components/Meta'

const EventScreen = ({ history, match }) => {
  // Assign useDispatch hook to dispatch actions
  const dispatch = useDispatch()

  // Go to the state and pull out information from eventDetails
  const eventDetails = useSelector((state) => state.eventDetails)
  const { loading, error, event } = eventDetails

  // useEffect hook to do something after render
  useEffect(() => {
    if (!event._id || event._id !== match.params.id) {
      dispatch(listEventDetails(match.params.id))
    }
  }, [dispatch, match, event._id])

  return (
    <div className='content'>
      <Meta title={event.venue} />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            <Col xs={12} lg={6} style={{ marginTop: '3rem' }}>
              <GoogleMap address={event.address} />
            </Col>

            <Col
              xs={12}
              lg={6}
              style={{ marginTop: '3rem', textAlign: 'left' }}
            >
              <Card className='product'>
                <Card.Body>
                  <ListGroup>
                    <ListGroup.Item>
                      <h1>{event.venue}</h1>
                    </ListGroup.Item>
                    <ListGroup.Item style={{ fontSize: '120%' }}>
                      <p className='eventTitle'>Address:</p>
                      {event.address}
                    </ListGroup.Item>
                    <ListGroup.Item style={{ fontSize: '120%' }}>
                      <p className='eventTitle'>Time:</p>
                      {event.time}
                    </ListGroup.Item>
                    <ListGroup.Item style={{ fontSize: '120%' }}>
                      <p className='eventTitle'>Date:</p>
                      {DateFormat(event.date)}
                    </ListGroup.Item>
                    <ListGroup.Item style={{ fontSize: '120%' }}>
                      <p className='eventTitle'>Price:</p>$
                      {(Math.round(event.price * 100) / 100).toFixed(2)}
                    </ListGroup.Item>
                    <ListGroup.Item style={{ fontSize: '120%' }}>
                      <p className='eventTitle'>Tickets:</p>
                      <a href={event.url}> {event.url}</a>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </div>
  )
}

export default EventScreen
