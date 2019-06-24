import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getTripsThunk, getGpxThunk, getLocationAction} from '../store/gpx'
import {getImagesThunk} from '../store/image'

//show trips by unique id
//link will get images and gpx string, redirect to elevation chart.

class SelectTrip extends Component {
  componentDidMount() {
    this.props.getTrips()
  }
  // componentDidUpdate(prevProps) {
  //   if (prevProps.trips !== this.props.trips) {
  //     this.props.getTrips()
  //   }
  // }
  loadGpxString(id, location) {
    this.props.getGpx(id)
    this.props.getImages()
    this.props.getLocation(location)
  }

  render() {
    return this.props.loading ? (
      <div>Loading...</div>
    ) : (
      <div>
        <h1>Select a Trip </h1>
        <ul>
          {this.props.trips.map(trip => (
            <li>
              <Link
                to="/chart"
                key={trip.id}
                onClick={() => this.loadGpxString(trip.uniqueId, trip.location)}
              >
                {trip.location}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

const mapState = state => {
  return {
    trips: state.gpx.trips
  }
}

const mapDispatch = dispatch => ({
  getTrips: () => dispatch(getTripsThunk()),
  getGpx: id => dispatch(getGpxThunk(id)),
  getImages: () => dispatch(getImagesThunk()),
  getLocation: location => dispatch(getLocationAction(location))
})

export default connect(mapState, mapDispatch)(SelectTrip)
