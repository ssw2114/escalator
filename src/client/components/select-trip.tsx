import React, {Component} from 'react'
import {Dispatch} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getTripsThunk, getGpxThunk} from '../store/gpx'
import {getImagesThunk} from '../store/image'
import {AppState} from '../store'

class SelectTrip extends Component<any> {
  componentDidMount() {
    this.props.getTrips()
    this.props.getImages()
  }

  render() {
    return this.props.loading ? (
      <div>Loading...</div>
    ) : (
      <div className="triplist">
        <h1>Select a Trip </h1>

        {this.props.trips.map(trip => (
          <div key={trip.uniqueId}>
            <Link to={`/chart?id=${trip.uniqueId}`}>{trip.location}</Link>
          </div>
        ))}
      </div>
    )
  }
}

const mapState = (state: AppState) => {
  return {
    trips: state.gpx.trips
  }
}

const mapDispatch = (dispatch: Dispatch<any>) => ({
  getTrips: () => dispatch(getTripsThunk()),
  getGpx: id => dispatch(getGpxThunk(id)),
  getImages: () => dispatch(getImagesThunk())
})

export default connect(mapState, mapDispatch)(SelectTrip)
