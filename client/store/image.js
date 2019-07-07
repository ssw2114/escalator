import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_IMAGES = 'GET_IMAGES'

/**
 * INITIAL STATE
 */
const initialState = {
  images: [],
  loading: true
}

/**
 * ACTION CREATORS
 */
const gotImages = payload => ({type: GET_IMAGES, payload})

/**
 * THUNK CREATORS
 */
export const loadImagesThunk = (formData, offset) => async () => {
  try {
    await axios.post(`api/images/${offset}`, formData)
  } catch (err) {
    console.error(err)
  }
}

export const getImagesThunk = () => async dispatch => {
  try {
    const {data} = await axios.get('api/images')
    dispatch(gotImages(data))
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
      return {...state, images: action.payload, loading: false}
    default:
      return state
  }
}
