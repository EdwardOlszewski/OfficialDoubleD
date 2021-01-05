import React from 'react'

const GoogleMap = ({ address }) => {
  //var API_KEY = process.env.API_KEY

  var eventAddress =
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
        allowfullscreen
      ></iframe>
    </div>
  )
}
export default GoogleMap
