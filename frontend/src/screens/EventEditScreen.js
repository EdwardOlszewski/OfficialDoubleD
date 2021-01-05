import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listEventDetails, updateEvent } from '../actions/eventActions'
import { EVENT_UPDATE_RESET } from '../constants/eventConstants'

const EventEditScreen = ({ match, history }) => {
  const eventId = match.params.id

  const [venue, setVenue] = useState('')
  const [address, setAddress] = useState('')
  const [time, setTime] = useState('')
  const [date, setDate] = useState('')
  const [price, setPrice] = useState(0)
  const [isPublished, setIsPublished] = useState(false)

  const dispatch = useDispatch()

  const eventDetails = useSelector((state) => state.eventDetails)
  const { loading, error, event } = eventDetails

  const eventUpdate = useSelector((state) => state.eventUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = eventUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: EVENT_UPDATE_RESET })
      history.push('/admin/eventlist')
    } else {
      if (!event.venue || event._id !== eventId) {
        dispatch(listEventDetails(eventId))
      } else {
        setVenue(event.venue)
        setAddress(event.address)
        setTime(event.time)
        setDate(event.date)
        setPrice(event.price)
        setIsPublished(event.isPublished)
      }
    }
  }, [dispatch, history, eventId, event, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateEvent({
        _id: eventId,
        venue,
        address,
        time,
        date,
        price,
        isPublished,
      })
    )
  }

  return (
    <>
      <Link to='/admin/eventlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Event</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='venue'>
              <Form.Label>Venue</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Venue'
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='address'>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Address'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='time'>
              <Form.Label>Time</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Time'
                value={time}
                onChange={(e) => setTime(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='date'>
              <Form.Label>Date</Form.Label>
              <Form.Control
                type='date'
                placeholder='Enter Date'
                value={date}
                onChange={(e) => setDate(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter Price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='ispublished'>
              <Form.Check
                type='checkbox'
                label='publish'
                checked={isPublished}
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
    </>
  )
}

export default EventEditScreen
