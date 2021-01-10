import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap'
import Events from '../components/Events'
import ImageCarousel from '../components/ImageCarousel'
import { listEvents } from '../actions/eventActions'
import { useDispatch, useSelector } from 'react-redux'

const HomeScreen = () => {
  const dispatch = useDispatch()

  const eventList = useSelector((state) => state.eventList)
  const { events } = eventList

  useEffect(() => {
    dispatch(listEvents())
  }, [dispatch])

  return (
    <div>
      <ImageCarousel />
      <div className='event-content'>
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr className='event-table-title'>
              <th>VENUE</th>
              <th className='events-address-mobile'>ADDRESS</th>
              <th>DATE</th>
              <th>PRICE</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <Events event={event} key={event._id} />
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default HomeScreen
