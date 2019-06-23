import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getTripsThunk, getGpxThunk} from '../store/gpx'
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
  loadGpxString(id) {
    this.props.getGpx(id)
    this.props.getImages()
  }

  render() {
    return this.props.loading ? (
      <div>Loading...</div>
    ) : (
      <div>
        <h1>Select a Trip: </h1>
        {this.props.trips.map(tripId => (
          <div>
            <Link
              to="/chart"
              key={tripId}
              onClick={() => this.loadGpxString(tripId)}
            >
              {tripId}
            </Link>
          </div>
        ))}
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
  getImages: () => dispatch(getImagesThunk())
})

export default connect(mapState, mapDispatch)(SelectTrip)
