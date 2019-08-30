import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_IMAGES = 'GET_IMAGES'


//types

export interface Image {
  time: string
  imageUrl: string
  orientation: number
}

interface ImageState {
  images: Image[]
  loading: Boolean
}

interface GetImagesAction {
  type: typeof GET_IMAGES
  payload: Image[]
}
type ImageActionTypes = GetImagesAction
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
const gotImages = (payload: Image[]) => ({type: GET_IMAGES, payload})

/**
 * THUNK CREATORS
 */
export const loadImagesThunk = (
  formData: Object,
  offset: String
) => async () => {
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
export default function imageReducer(
  state = initialState,
  action: ImageActionTypes
): ImageState {
  switch (action.type) {
    case GET_IMAGES:
      return {...state, images: action.payload, loading: false}
    default:
      return state
  }
}
