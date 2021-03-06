import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, NavDropdown, Image } from 'react-bootstrap'
import { logout } from '../actions/userActions'
import DDLogo from './DD.png'
import emailIcon from '../icons/email.png'
import facebookIcon from '../icons/facebook.png'
import instaIcon from '../icons/instagram.png'
import snapIcon from '../icons/snapchat.png'

const Header = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <Navbar bg='primary' variant='dark' expand='lg'>
      <LinkContainer to='/' exact>
        <Navbar.Brand className='ml-5'>
          <Image src={DDLogo}></Image>
        </Navbar.Brand>
      </LinkContainer>

      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='mr-auto'>
          <LinkContainer to='/' exact>
            <Nav.Link>
              <i className='fas fa-home'></i>
              Home
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to='/gear'>
            <Nav.Link>
              <i className='fas fa-tshirt'></i> Gear
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to='/cart'>
            <Nav.Link>
              <i className='fas fa-shopping-cart'> </i> Cart
            </Nav.Link>
          </LinkContainer>
          {userInfo ? (
            <NavDropdown title={userInfo.name} id='username'>
              <LinkContainer to='/profile'>
                <NavDropdown.Item>Profile</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Item onClick={logoutHandler}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <LinkContainer to='/login'>
              <Nav.Link>
                <i className='fas fa-user'></i> Sign In
              </Nav.Link>
            </LinkContainer>
          )}
          {userInfo && userInfo.isAdmin && (
            <NavDropdown title='Admin' id='adminmenu'>
              <LinkContainer to='/admin/userlist'>
                <NavDropdown.Item>Users</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/admin/productlist'>
                <NavDropdown.Item>Products</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/admin/orderlist'>
                <NavDropdown.Item>Orders</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/admin/eventlist'>
                <NavDropdown.Item>Events</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/admin/carousel'>
                <NavDropdown.Item>Carousel Images</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          )}
        </Nav>
        <div className='nav-icons'>
          <a
            href='https://www.instagram.com/doubledofficial__/'
            className='icon'
          >
            <Image src={instaIcon}></Image>
          </a>
          <a
            href='https://www.facebook.com/Double-D-110789907445940/?__nodl&ref=www.facebook.com'
            className='icon'
          >
            <Image src={facebookIcon}></Image>
          </a>
          <a href='snapchat://add/DOUBLEDOFFICIAL__' className='icon'>
            <Image src={snapIcon}></Image>
          </a>
          <a href='mailto:doubledoff28@gmail.com' className='icon'>
            <Image src={emailIcon}></Image>
          </a>
        </div>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header
