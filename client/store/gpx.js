import axios from 'axios'

let initialState = {
  gpx: '',
  trips: [],
  loading: true,
  gpxLoaded: false
}

//actions

const GET_GPX = 'GET_GPX'
const GET_TRIPS = 'GET_TRIPS'
const GPX_LOADED = 'GPX_LOADED'

//action creators

const gotGpx = payload => ({
  type: GET_GPX,
  payload
})

const gotTrips = payload => ({
  type: GET_TRIPS,
  payload
})

const loadedGpx = () => ({
  type: GPX_LOADED
})

//thunks

export const getTripsThunk = () => async dispatch => {
  try {
    const {data} = await axios.get('api/gpx')
    dispatch(gotTrips(data))
  } catch (err) {
    console.error('loadGPXThunk error:', err)
  }
}

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
    const {data} = await axios.get(`api/gpx/${id}`)
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
      return {...state, gpxLoaded: true, loading: false}
    case GET_TRIPS:
      return {...state, trips: action.payload, loading: false}
    default:
      return state
  }
}
