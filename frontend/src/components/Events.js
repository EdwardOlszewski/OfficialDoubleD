import React from 'react'
import { Link } from 'react-router-dom'
import DateFormat from './DateFormat'
import { Card, ListGroup, Button } from 'react-bootstrap'

const Events = ({ event }) => {
  if (event.isPublished) {
    return (
      <div style={{ textAlign: 'center' }}>
        <Card className='product'>
          <Card.Header
            style={{
              fontSize: '130%',
              backgroundColor: 'rgb(0, 209, 28)',
              textAlign: 'center',
              color: 'black',
            }}
          >
            {DateFormat(event.date)}
          </Card.Header>

          <Link to={`/events/${event._id}`}>
            <Card.Img
              src={event.imageUrl}
              variant='top'
              style={{ padding: '1rem' }}
            />
          </Link>
          <ListGroup variant='flush' style={{ fontSize: '115%' }}>
            <ListGroup.Item>{event.venue}</ListGroup.Item>
            <ListGroup.Item>{event.address}</ListGroup.Item>
            <ListGroup.Item>
              ${(Math.round(event.price * 100) / 100).toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Link to={`/events/${event._id}`}>
                <Button variant='primary' className='btn-block'>
                  View
                </Button>
              </Link>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </div>
    )
  } else {
    return null
  }
}

export default Events

/*




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



      */
