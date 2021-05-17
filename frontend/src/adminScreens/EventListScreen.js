import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import { listEvents, deleteEvent, createEvent } from '../actions/eventActions'
import { EVENT_CREATE_RESET } from '../constants/eventConstants'
import DateFormat from '../components/DateFormat'
import Meta from '../components/Meta'

const EventListScreen = ({ history, match }) => {
  // Assign useDispatch hook to dispatch actions
  const dispatch = useDispatch()

  // Get page number from the URL
  const pageNumber = match.params.pageNumber || 1

  // Declare new state variables using useState hook
  const eventList = useSelector((state) => state.eventList)
  const { loading, success, error, events, page, pages } = eventList

  // Declare new state variables using useState hook
  const eventDelete = useSelector((state) => state.eventDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = eventDelete

  // Declare new state variables using useState hook
  const eventCreate = useSelector((state) => state.eventCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    event: createdEvent,
  } = eventCreate

  // Declare new state variables using useState hook
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  // useEffect hook to do something after render
  useEffect(() => {
    dispatch({ type: EVENT_CREATE_RESET })

    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login')
    }

    if (successCreate) {
      history.push(`/admin/events/${createdEvent._id}/edit`)
    } else {
      dispatch(listEvents())
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdEvent,
    pageNumber,
  ])

  // Function to be called on delete submit
  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteEvent(id))
    }
  }

  // Function to be called on create submit
  const createEventHandler = () => {
    dispatch(createEvent())
  }

  return (
    <div className='content'>
      <Meta title='Events List' />
      <Row className='align-items-center'>
        <Col>
          <h1>Events</h1>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {!success ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>VENUE</th>
                <th>ADDRESS</th>
                <th>TIME</th>
                <th>DATE</th>
                <th>PUBLISHED</th>
                <th>OPTIONS</th>
                <></>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event._id}>
                  <td>{event.venue}</td>
                  <td>{event.address}</td>
                  <td>{event.time}</td>
                  <td>{DateFormat(event.date)}</td>
                  <td>
                    {event.isPublished ? (
                      <i
                        className='fas fa-check'
                        style={{ color: 'green' }}
                      ></i>
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/admin/events/${event._id}/edit`}>
                      <Button className='btn-sm mr-2' variant='light'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      className='btn-sm'
                      variant='danger'
                      onClick={() => deleteHandler(event._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Col className='text-right'>
            <Button className='my-3' onClick={createEventHandler}>
              <i className='fas fa-plus'></i> Create Event
            </Button>
          </Col>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </div>
  )
}

export default EventListScreen
