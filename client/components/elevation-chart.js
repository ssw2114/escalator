import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getGpxThunk, clearGpx} from '../store/gpx'
import {getImagesThunk} from '../store/image'
import drawGraph from './elevation-chart-helper'

// const createDataArray = require('../../data/gpx-parser')

class ElevationChart extends Component {
  componentDidMount() {
    let params = new URLSearchParams(document.location.search)
    let id = params.get('id')
    this.props.getGpx(id)
    this.props.getImages()
  }
  componentDidUpdate(prevProps) {
    if (this.props.gpxString) drawGraph(this.props.gpxString, this.props.images)
  }
  componentWillUnmount() {
    this.props.clearGpx()
  }

  render() {
    return (
      <div>
        <h1>{this.props.location}</h1>
        <div className="chart" />
      </div>
    )
  }
}

const mapState = state => {
  return {
    gpxString: state.gpx.gpx,
    gpxLoading: state.gpx.loading,
    images: state.image.images,
    imagesLoading: state.image.loading,
    location: state.gpx.location
  }
}

const mapDispatch = dispatch => {
  return {
    getGpx: id => dispatch(getGpxThunk(id)),
    getImages: () => dispatch(getImagesThunk()),
    clearGpx: () => dispatch(clearGpx())
  }
}

export default connect(mapState, mapDispatch)(ElevationChart)
