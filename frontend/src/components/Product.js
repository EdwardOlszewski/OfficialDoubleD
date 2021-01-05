import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'

const Product = ({ product }) => {
  if (product.isPublished) {
    return (
      <div>
        <Card className='product'>
          <Link to={`/product/${product._id}`}>
            <Card.Img src={product.image} variant='top' />
          </Link>
          <Card.Body>
            <Link to={`/product/${product._id}`}>
              <Card.Title style={{ fontSize: '100%' }} as='div'>
                {product.name}
              </Card.Title>
            </Link>
            <Card.Text as='div'>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </Card.Text>
            <Card.Text style={{ paddingTop: '1rem' }}>
              ${(Math.round(product.price * 100) / 100).toFixed(2)}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    )
  } else {
    return null
  }
}

export default Product
