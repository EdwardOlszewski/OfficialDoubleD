import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Card } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import GoogleMap from '../components/GoogleMap'
import DateFormat from '../components/DateFormat'
import { listEventDetails } from '../actions/eventActions'

const EventScreen = ({ history, match }) => {
  const dispatch = useDispatch()

  const eventDetails = useSelector((state) => state.eventDetails)
  const { loading, error, event } = eventDetails

  useEffect(() => {
    if (!event._id || event._id !== match.params.id) {
      dispatch(listEventDetails(match.params.id))
    }
  }, [dispatch, match, event._id])

  var address = event.address

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
            <Col md={6} style={{ marginTop: '3rem' }}>
              <GoogleMap address={address} />
            </Col>

            <Col md={5} style={{ marginTop: '5rem', textAlign: 'left' }}>
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

/*
 <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h1>{event.venue}</h1>
                </ListGroup.Item>
                <ListGroup.Item style={{ fontSize: '120%' }}>
                  <p className='eventTitle'>Address:</p>
                  {event.address}
                </ListGroup.Item>
                <ListGroup.Item style={{ fontSize: '120%' }}>
                  {event.time}
                </ListGroup.Item>
                <ListGroup.Item style={{ fontSize: '120%' }}>
                  {event.date}
                </ListGroup.Item>
              </ListGroup>

*/
