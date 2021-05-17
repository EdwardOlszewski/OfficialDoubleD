import axios from 'axios'
import {
  EMAIL_SEND_FAIL,
  EMAIL_SEND_REQUEST,
  EMAIL_SEND_SUCCESS,
} from '../constants/emailConstants'

export const sendRegisterEmail =
  (userName, userEmail) => async (dispatch, getState) => {
    try {
      dispatch({
        type: EMAIL_SEND_REQUEST,
      })

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.post(
        `/api/email/register`,
        { userName, userEmail },
        config
      )

      dispatch({
        type: EMAIL_SEND_SUCCESS,
        payload: data,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      dispatch({
        type: EMAIL_SEND_FAIL,
        payload: message,
      })
    }
  }

export const sendReceiptEmail =
  (userName, userEmail, order) => async (dispatch, getState) => {
    try {
      dispatch({
        type: EMAIL_SEND_REQUEST,
      })

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.post(
        `/api/email/receipt`,
        { userName, userEmail, order },
        config
      )

      dispatch({
        type: EMAIL_SEND_SUCCESS,
        payload: data,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      dispatch({
        type: EMAIL_SEND_FAIL,
        payload: message,
      })
    }
  }
