import React, { useState } from 'react'
import { Form, Card, Row, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Catagories = ({ history }) => {
  const [keyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/gear')
    }
  }

  return (
    <Form onSubmit={submitHandler} inline>
      <Card border='light'>
        <Card.Body>
          <Row>
            <Card.Text>
              <LinkContainer
                to='/gear'
                activeClassName='activeButtons'
                style={{ marginRight: '1rem' }}
              >
                <Nav.Link className='category-buttons'>All</Nav.Link>
              </LinkContainer>
            </Card.Text>

            <Card.Text>
              <LinkContainer
                to='/search/shirt'
                activeClassName='activeButtons'
                style={{ marginRight: '1rem' }}
              >
                <Nav.Link className='category-buttons'>Shirts</Nav.Link>
              </LinkContainer>
            </Card.Text>

            <Card.Text>
              <LinkContainer
                to='/search/hoodie'
                activeClassName='activeButtons'
                style={{ marginRight: '1rem' }}
              >
                <Nav.Link className='category-buttons'>Hoodies</Nav.Link>
              </LinkContainer>
            </Card.Text>

            <Card.Text>
              <LinkContainer
                to='/search/hat'
                activeClassName='activeButtons'
                style={{ marginRight: '1rem' }}
              >
                <Nav.Link className='category-buttons'>Hats</Nav.Link>
              </LinkContainer>
            </Card.Text>
          </Row>
        </Card.Body>
      </Card>
    </Form>
  )
}

export default Catagories

/*
<Card.Text>
                <Button
                  className='catagories-button'
                  type='submit'
                  name='all'
                  value=''
                  onClick={(e) => setKeyword(e.target.value)}
                >
                  All
                </Button>
              </Card.Text>
              */
