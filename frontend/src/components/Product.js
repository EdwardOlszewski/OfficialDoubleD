import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'

const Product = ({ product }) => {
  return (
    <>
      {product.isPublished ? (
        <Card className='product'>
          <Link to={`/product/${product._id}`}>
            <Card.Img src={product.image} variant='top' />
          </Link>
          <Card.Body>
            <Link to={`/product/${product._id}`}>
              <Card.Title className='productTitle' as='div'>
                <strong>{product.name}</strong>
              </Card.Title>
            </Link>
            <Card.Text as='div'>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </Card.Text>
            <Card.Text className='productPrice'>${product.price}</Card.Text>
          </Card.Body>
        </Card>
      ) : null}
    </>
  )
}

export default Product
