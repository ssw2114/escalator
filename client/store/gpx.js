import axios from 'axios'

let initialState = {
  gpx: '',
  loading: true,
  gpxLoaded: false
}

//actions

const GET_GPX = 'GET_GPX'
const GPX_LOADED = 'GPX_LOADED'

//action creators

const gotGpx = payload => ({
  action: GET_GPX,
  payload
})

const loadedGpx = () => ({
  action: GPX_LOADED
})

//thunks

export const loadGpxThunk = (string, id, seq) => async dispatch => {
  try {
    const res = await axios.post('api/gpx', {string, id, seq})
    if (res.status === 200) {
      dispatch(loadedGpx())
    }
  } catch (err) {
    console.error('loadGPXThunk error:', err)
  }
}

export const getGpxThunk = id => async dispatch => {
  try {
    const {data} = await axios.get(`api/gpx/:${id}`)
    dispatch(gotGpx(data))
  } catch (err) {
    console.error('getGpxThunk error:', err)
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_GPX:
      return {...state, loading: false, gpx: action.payload}
    case GPX_LOADED:
      return {...state, gpxLoaded: true}
    default:
      return state
  }
}
