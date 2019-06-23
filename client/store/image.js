import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_IMAGES = 'GET_IMAGES'

/**
 * INITIAL STATE
 */
const initialState = {
  images: []
}

/**
 * ACTION CREATORS
 */
const gotImages = payload => ({type: GET_IMAGES, payload})

/**
 * THUNK CREATORS
 */
export const loadImagesThunk = formData => async dispatch => {
  try {
    console.log('LOAD IMAGES THUNK DISPATCHED.  formData:', formData)
    console.dir('formdata:', formData)
    const res = await axios.post('api/images/upload', formData)
    dispatch(gotImages(res.data))
  } catch (err) {
    console.error(err)
  }
}


/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_IMAGES:
      return {images: action.payload}
    default:
      return state
  }
}
