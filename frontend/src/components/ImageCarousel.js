import React from 'react'
import { Carousel, Image } from 'react-bootstrap'

const ImageCarousel = ({ images }) => {
  return (
    <Carousel pause='hover' className='carousel'>
      {images.map((image) => (
        <Carousel.Item key={image._id}>
          <Image src={image.imageURL} alt={image.imageURL} fluid />
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ImageCarousel
