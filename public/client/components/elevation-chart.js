var __extends =
  (this && this.__extends) ||
  (function() {
    var extendStatics = function(d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({__proto__: []} instanceof Array &&
          function(d, b) {
            d.__proto__ = b
          }) ||
        function(d, b) {
          for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]
        }
      return extendStatics(d, b)
    }
    return function(d, b) {
      extendStatics(d, b)
      function __() {
        this.constructor = d
      }
      d.prototype =
        b === null ? Object.create(b) : ((__.prototype = b.prototype), new __())
    }
  })()
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getGpxThunk, clearGpx} from '../store/gpx'
import {getImagesThunk} from '../store/image'
import drawGraph from './elevation-chart-helper'
var ElevationChart = /** @class */ (function(_super) {
  __extends(ElevationChart, _super)
  function ElevationChart() {
    return (_super !== null && _super.apply(this, arguments)) || this
  }
  ElevationChart.prototype.componentDidMount = function() {
    var params = new URLSearchParams(document.location.search)
    var id = params.get('id')
    this.props.getGpx(id)
    this.props.getImages()
  }
  ElevationChart.prototype.componentDidUpdate = function() {
    if (this.props.gpxString) {
      drawGraph(this.props.gpxString, this.props.images)
    }
  }
  ElevationChart.prototype.componentWillUnmount = function() {
    this.props.clearGpx()
  }
  ElevationChart.prototype.render = function() {
    return React.createElement(
      'div',
      null,
      React.createElement('h1', null, this.props.location),
      React.createElement('div', {className: 'chart'})
    )
  }
  return ElevationChart
})(Component)
var mapState = function(state) {
  return {
    gpxString: state.gpx.gpx,
    gpxLoading: state.gpx.loading,
    images: state.image.images,
    imagesLoading: state.image.loading,
    location: state.gpx.location
  }
}
var mapDispatch = function(dispatch) {
  return {
    getGpx: function(id) {
      return dispatch(getGpxThunk(id))
    },
    getImages: function() {
      return dispatch(getImagesThunk())
    },
    clearGpx: function() {
      return dispatch(clearGpx())
    }
  }
}
export default connect(mapState, mapDispatch)(ElevationChart)
//# sourceMappingURL=elevation-chart.js.map
