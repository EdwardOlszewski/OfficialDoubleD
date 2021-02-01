import React from 'react'
import dotenv from 'dotenv'

dotenv.config()

const GoogleMap = ({ address }) => {
  const eventAddress =
    'https://www.google.com/maps/embed/v1/place?key=' +
    'AIzaSyDGXDZGm5ReipAelpD795gNptYZUVkGSw8' +
    '&q=' +
    address

  return (
    <div>
      <iframe
        className='embedMap'
        title={address}
        src={eventAddress}
        allowFullScreen
      ></iframe>
    </div>
  )
}
export default GoogleMap
