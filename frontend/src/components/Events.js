import React from 'react'
import { Link } from 'react-router-dom'
import DateFormat from './DateFormat'

const Events = ({ event }) => {
  if (event.isPublished) {
    return (
      <tr className='event-table-body'>
        <td>
          <Link to={`/events/${event._id}`}>{event.venue}</Link>
        </td>
        <td className='events-address-mobile'>
          <Link to={`/events/${event._id}`}>{event.address}</Link>
        </td>

        <td>
          <Link to={`/events/${event._id}`}>{DateFormat(event.date)}</Link>
        </td>
        <td>
          <Link to={`/events/${event._id}`}>
            ${(Math.round(event.price * 100) / 100).toFixed(2)}
          </Link>
        </td>
      </tr>
    )
  } else {
    return null
  }
}

export default Events
