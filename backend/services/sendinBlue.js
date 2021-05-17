import SibApiV3Sdk from 'sib-api-v3-sdk'
import asyncHandler from 'express-async-handler'
import dotenv from 'dotenv'
import DateFormat from './DateFormat.js'

dotenv.config()

// Auth and setup
let defaultClient = SibApiV3Sdk.ApiClient.instance
let apiKey = defaultClient.authentications['api-key']
apiKey.apiKey = process.env.SENDIN_API_KEY

const sendRegisterEmail = asyncHandler(async (req, res) => {
  const { userName, userEmail } = req.body

  let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi()
  let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail()

  sendSmtpEmail.subject = 'New Account'
  sendSmtpEmail.templateId = 1
  sendSmtpEmail.sender = {
    name: 'DoubleDShop.com',
    email: 'doubledoff28@gmail.com',
  }
  sendSmtpEmail.to = [{ email: userEmail, name: userName }]
  sendSmtpEmail.replyTo = {
    email: 'doubledoff28@gmail.com',
    name: 'DoubleDShop.com',
  }
  sendSmtpEmail.headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
  sendSmtpEmail.params = { name: userName, subject: 'New Account' }

  apiInstance.sendTransacEmail(sendSmtpEmail).then(
    function (data) {
      console.log(
        'API called successfully. Returned data: ' + JSON.stringify(data)
      )
    },
    function (error) {
      console.error(error)
    }
  )
})

const sendReceiptEmail = asyncHandler(async (req, res) => {
  const { userName, userEmail, order } = req.body
  const orderItems = order.orderItems
  const orderDate = DateFormat(order.createdAt)

  let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi()
  let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail()

  sendSmtpEmail.subject = 'Order Summary'
  sendSmtpEmail.templateId = 2
  sendSmtpEmail.sender = {
    name: 'NeonMegShop',
    email: 'support@neonmegsshop.com',
  }
  sendSmtpEmail.to = [{ email: userEmail, name: userName }]
  sendSmtpEmail.replyTo = {
    email: 'support@neonmegsshop.com',
    name: 'NeonMegShop',
  }
  sendSmtpEmail.headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
  sendSmtpEmail.params = {
    name: userName,
    subject: 'Order Summary',
    orderNumber: order._id,
    date: orderDate,
    itemTotalPrice: (Math.round(order.itemsPrice * 100) / 100).toFixed(2),
    orderTaxPrice: (Math.round(order.taxPrice * 100) / 100).toFixed(2),
    orderTotal: (Math.round(order.totalPrice * 100) / 100).toFixed(2),
    streetAddress: order.shippingAddress.address,
    cityAddress:
      order.shippingAddress.city +
      ' ' +
      order.shippingAddress.state +
      ', ' +
      order.shippingAddress.postalCode,
    orderLink: `https://www.neonmegsshop.com/order/${order._id}`,
    products: orderItems,
  }

  apiInstance.sendTransacEmail(sendSmtpEmail).then(
    function (data) {
      console.log(
        `email sent to ${userEmail}. Returned data: ` + JSON.stringify(data)
      )
    },
    function (error) {
      console.error(error)
    }
  )
})

export { sendRegisterEmail, sendReceiptEmail }
