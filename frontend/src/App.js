import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './userScreens/HomeScreen'
import ProductScreen from './userScreens/ProductScreen'
import CartScreen from './userScreens/CartScreen'
import LoginScreen from './userScreens/LoginScreen'
import RegisterScreen from './userScreens/RegisterScreen'
import ProfileScreen from './userScreens/ProfileScreen'
import ShippingScreen from './userScreens/ShippingScreen'
import PlaceOrderScreen from './userScreens/PlaceOrderScreen'
import PaymentScreen from './userScreens/PaymentScreen'
import OrderScreen from './userScreens/OrderScreen'
import UserListScreen from './adminScreens/UserListScreen'
import UserEditScreen from './adminScreens/UserEditScreen'
import ProductListScreen from './adminScreens/ProductListScreen'
import ProductEditScreen from './adminScreens/ProductEditScreen'
import OrderListScreen from './adminScreens/OrderListScreen'
import EventListScreen from './adminScreens/EventListScreen'
import EventEditScreen from './adminScreens/EventEditScreen'
import EventScreen from './userScreens/EventScreen'
import GearScreen from './userScreens/GearScreen'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <div className='mainContainer'>
          <Route path='/gear' component={GearScreen} exact />
          <Route path='/order/:id' component={OrderScreen} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/payment/:id' component={PaymentScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />

          <Route
            path='/admin/productlist'
            component={ProductListScreen}
            exact
          />
          <Route
            path='/admin/productlist/:pageNumber'
            component={ProductListScreen}
            exact
          />
          <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
          <Route path='/admin/orderlist' component={OrderListScreen} />
          <Route path='/search/:keyword' component={GearScreen} exact />
          <Route path='/page/:pageNumber' component={GearScreen} exact />
          <Route
            path='/search/:keyword/page/:pageNumber'
            component={GearScreen}
            exact
          />

          <Route path='/admin/eventlist' component={EventListScreen} exact />
          <Route
            path='/admin/eventlist/:pageNumber'
            component={EventListScreen}
            exact
          />
          <Route path='/admin/events/:id/edit' component={EventEditScreen} />
          <Route path='/events/:id' component={EventScreen} />
          <Route path='/' component={HomeScreen} exact />
        </div>
      </main>
      <Footer />
    </Router>
  )
}

export default App
