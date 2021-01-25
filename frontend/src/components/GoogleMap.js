import React from 'react'

const GoogleMap = ({ address }) => {
  const eventAddress =
    'https://www.google.com/maps/embed/v1/place?key=' +
    process.env.API_KEY +
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
