import axios from 'axios'
import {
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_FAIL,
  CREATE_CAROUSEL_REQUEST,
  CREATE_CAROUSEL_SUCCESS,
  CREATE_CAROUSEL_FAIL,
  LIST_CAROUSEL_REQUEST,
  LIST_CAROUSEL_SUCCESS,
  LIST_CAROUSEL_FAIL,
  DELETE_CAROUSEL_REQUEST,
  DELETE_CAROUSEL_SUCCESS,
  DELETE_CAROUSEL_FAIL,
} from '../constants/imageConstants'
import { logout } from './userActions'

export const uploadImage = (file) => async (dispatch, getState) => {
  const formData = new FormData()
  formData.append('image', file)
  try {
    dispatch({
      type: UPLOAD_IMAGE_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }

    const { data } = await axios.post('/api/upload', formData, config)

    dispatch({
      type: UPLOAD_IMAGE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: UPLOAD_IMAGE_FAIL,
      payload: message,
    })
  }
}

export const createCarouselImage = (imageURL) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_CAROUSEL_REQUEST,
    })

    const { data } = await axios.post(`/api/carousel`, imageURL)

    dispatch({
      type: CREATE_CAROUSEL_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: CREATE_CAROUSEL_FAIL,
      payload: message,
    })
  }
}

export const listCarouselImages = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: LIST_CAROUSEL_REQUEST,
    })
    const { data } = await axios.get('/api/carousel')

    dispatch({
      type: LIST_CAROUSEL_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: LIST_CAROUSEL_FAIL,
      payload: message,
    })
  }
}

export const deleteCarouselImage = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_CAROUSEL_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/carousel/${id}`, config)

    dispatch({
      type: DELETE_CAROUSEL_SUCCESS,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: DELETE_CAROUSEL_FAIL,
      payload: message,
    })
  }
}
