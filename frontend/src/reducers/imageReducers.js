import {
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_FAIL,
  UPLOAD_IMAGE_RESET,
  CREATE_CAROUSEL_REQUEST,
  CREATE_CAROUSEL_SUCCESS,
  CREATE_CAROUSEL_FAIL,
  CREATE_CAROUSEL_RESET,
  LIST_CAROUSEL_REQUEST,
  LIST_CAROUSEL_SUCCESS,
  LIST_CAROUSEL_FAIL,
  DELETE_CAROUSEL_REQUEST,
  DELETE_CAROUSEL_SUCCESS,
  DELETE_CAROUSEL_RESET,
  DELETE_CAROUSEL_FAIL,
  LIST_CAROUSEL_RESET,
} from '../constants/imageConstants'

export const uploadImageReducer = (state = { imageURL: [] }, action) => {
  switch (action.type) {
    case UPLOAD_IMAGE_REQUEST:
      return { loading: true, success: false }
    case UPLOAD_IMAGE_SUCCESS:
      return { loading: false, success: true, imageURL: action.payload }
    case UPLOAD_IMAGE_FAIL:
      return { loading: false, error: action.payload }
    case UPLOAD_IMAGE_RESET:
      return {}
    default:
      return state
  }
}

export const createCarouselImageReducer = (state = { url: [] }, action) => {
  switch (action.type) {
    case CREATE_CAROUSEL_REQUEST:
      return { loading: true, success: false }
    case CREATE_CAROUSEL_SUCCESS:
      return { loading: false, success: true, url: action.payload }
    case CREATE_CAROUSEL_FAIL:
      return { loading: false, error: action.payload }
    case CREATE_CAROUSEL_RESET:
      return {}
    default:
      return state
  }
}

export const listCarouselImageReducer = (state = {}, action) => {
  switch (action.type) {
    case LIST_CAROUSEL_REQUEST:
      return { loading: true, success: false }
    case LIST_CAROUSEL_SUCCESS:
      return { images: action.payload.images, success: true, loading: false }
    case LIST_CAROUSEL_FAIL:
      return { loading: false, error: action.payload }
    case LIST_CAROUSEL_RESET:
      return {}
    default:
      return state
  }
}

export const deleteCarouselImageReducer = (state = { image: [] }, action) => {
  switch (action.type) {
    case DELETE_CAROUSEL_REQUEST:
      return { loading: true, success: false }
    case DELETE_CAROUSEL_SUCCESS:
      return { success: true, loading: false, image: action.payload }
    case DELETE_CAROUSEL_FAIL:
      return { loading: false, error: action.payload }
    case DELETE_CAROUSEL_RESET:
      return {}
    default:
      return state
  }
}
