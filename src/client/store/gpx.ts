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
const CLEAR_GPX = 'CLEAR_GPX'

//types

interface Trip {
  location: String
  id: Number
  uniqueId: Number
}
interface TripState {
  gpx: String
  trips: Trip[]
  loading: Boolean
  gpxLoaded: Boolean
}
interface GetGpxAction {
  type: typeof GET_GPX
  payload: String
}
interface GetTripsAction {
  type: typeof GET_TRIPS
  payload: Trip[]
}
interface GpxLoadedAction {
  type: typeof GPX_LOADED
}

interface ClearGpxAction {
  type: typeof CLEAR_GPX
}

type GpxActionTypes =
  | GetGpxAction
  | GetTripsAction
  | GpxLoadedAction
  | ClearGpxAction

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

export const clearGpx = () => ({
  type: CLEAR_GPX
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

export const loadGpxThunk = (
  string: String,
  id: Number,
  seq: Number
) => async dispatch => {
  try {
    //if seq is one, get location
    //regex search for lat and lon
    let location = ''
    if (seq === 1) {
      // eslint-disable-next-line no-unused-vars
      const [_, lat, lon] = string.match(
        /trkpt lat="([-.\d]+)" lon="([-.\d]+)"/
      )
      const reverseGeo = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      )

      let data = reverseGeo.data.address
      location = `${data.village}, ${data.county}, ${data.state}, ${
        data.country
      }`
    }

    const res = await axios.post('api/gpx', {string, id, seq, location})
    if (res.status === 200) {
      dispatch(loadedGpx())
    }
  } catch (err) {
    console.error('loadGPXThunk error:', err)
  }
}

export const getGpxThunk = (id: Number) => async dispatch => {
  try {
    const {data} = await axios.get(`api/gpx/${id}`)
    dispatch(gotGpx(data))
  } catch (err) {
    console.error('getGpxThunk error:', err)
  }
}

export default function(
  state = initialState,
  action: GpxActionTypes
): TripState {
  switch (action.type) {
    case GET_GPX:
      return {...state, loading: false, gpx: action.payload}
    case CLEAR_GPX:
      return {...state, loading: true, gpx: ''}
    case GPX_LOADED:
      return {...state, gpxLoaded: true, loading: false}
    case GET_TRIPS:
      return {...state, trips: action.payload, loading: false}
    default:
      return state
  }
}
