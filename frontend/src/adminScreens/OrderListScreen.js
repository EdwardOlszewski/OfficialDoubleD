import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listOrders } from '../actions/orderActions'
import DateFormat from '../components/DateFormat'
import { ORDER_LIST_RESET } from '../constants/orderConstants'
import Meta from '../components/Meta'

const OrderListScreen = ({ history }) => {
  // Assign useDispatch hook to dispatch actions
  const dispatch = useDispatch()

  // Go to orderList in the state and pull out information
  const orderList = useSelector((state) => state.orderList)
  const { loading, error, orders } = orderList

  // Go to orderDeliver in the state and pull out information
  const orderDeliver = useSelector((state) => state.orderDeliver)
  const { success: orderDeliverSuccess } = orderDeliver

  // Go to userLogin in the state and pull out userInfo
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  // useEffect do something after render
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders())
    } else {
      history.push('/login')
    }
    if (orderDeliverSuccess) {
      dispatch({ type: ORDER_LIST_RESET })
    }
  }, [dispatch, history, userInfo, orderDeliverSuccess])

  return (
    <div className='content'>
      <Meta title='Order List' />
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{DateFormat(order.createdAt)}</td>
                <td>${order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant='light' className='btn-sm'>
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  )
}

export default OrderListScreen
