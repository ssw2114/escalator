import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getGpxThunk} from '../store/gpx'
import drawGraph from './elevation-chart-helper'

// const createDataArray = require('../../data/gpx-parser')

import * as d3 from 'd3'

class ElevationChart extends Component {
  componentDidMount() {
    if (this.props.gpxString.length > 1 && this.props.images.length > 0) {
      drawGraph(this.props)
    }
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.gpxString.length < this.props.gpxString.length ||
      prevProps.images.length < this.props.images.length
    ) {
      drawGraph(this.props)
    }
  }

  render() {
    return <div className="chart" />
  }
}

const mapState = state => {
  return {
    gpxString: state.gpx.gpx,
    gpxLoading: state.gpx.loading,
    images: state.image.images,
    imagesLoading: state.image.loading
  }
}

export default connect(mapState)(ElevationChart)
