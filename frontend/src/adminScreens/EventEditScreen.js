import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listEventDetails, updateEvent } from '../actions/eventActions'
import { EVENT_UPDATE_RESET } from '../constants/eventConstants'
import Meta from '../components/Meta'

const EventEditScreen = ({ match, history }) => {
  // Assign useDispatch hook to dispatch actions
  const dispatch = useDispatch()

  // Get eventId from the URL
  const eventId = match.params.id

  // Declare new state variables using useState hook
  const [venue, setVenue] = useState('')
  const [address, setAddress] = useState('')
  const [time, setTime] = useState('')
  const [date, setDate] = useState('')
  const [price, setPrice] = useState(0)
  const [isPublished, setIsPublished] = useState(false)

  // Go to the state and pull out information from eventDetails
  const eventDetails = useSelector((state) => state.eventDetails)
  const { loading, error, event } = eventDetails

  // Go to the state and pull out information from eventUpdate
  const eventUpdate = useSelector((state) => state.eventUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = eventUpdate

  // useEffect hook to do something after render
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

  // Function  to run on submit
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
    <FormContainer>
      <Meta title={'Edit ' + venue} />
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
  )
}

export default EventEditScreen
