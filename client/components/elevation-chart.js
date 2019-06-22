import React, {Component} from 'react'
import {connect} from 'react-redux'
const sampleData = require('../../data/sampleData3')
const {getD3InputArray} = require('../../utils/distanceFunc')
// const createDataArray = require('../../data/gpx-parser')

import * as d3 from 'd3'

class ElevationChart extends Component {
  componentDidMount() {
    this.drawGraph()
  }
  componentDidUpdate() {
    this.drawGraph()
  }

  drawGraph() {
    // const data = [{x: 1, y: 10, z: 0}, {x: 7, y: 20, z: 0}, {x: 10, y: 30}]
    getD3InputArray(sampleData)
      .then(data => {
        console.log(data)
        const margin = {top: 40, right: 40, bottom: 40, left: 40}
        const width = 960 - margin.left - margin.right
        const height = 500 - margin.top - margin.bottom

        //calculate domain ranges
        const distanceMax = data[data.length - 1].distance
        const [elevationMin, elevationMax] = data.reduce(
          (accum, curr) => {
            if (curr.elevation < accum[0]) {
              accum[0] = curr.elevation
            }
            if (curr.elevation > accum[1]) {
              accum[1] = curr.elevation
            }
            return accum
          },
          [0, 0]
        )
        const distanceTopRange = distanceMax + distanceMax % 5
        const elevationTopRange = elevationMax + elevationMax % 50

        const x = d3
          .scaleLinear()
          .range([0, width])
          .domain([0, distanceTopRange])

        const y = d3
          .scaleLinear()
          .range([height, 0])
          .domain([elevationMin, elevationTopRange])

        const line = d3
          .line()
          .curve(d3.curveMonotoneX)
          .x(function(d) {
            return x(d.distance)
          })
          .y(function(d) {
            return y(d.elevation)
          })

        let svg = d3
          .select('body')
          .append('svg')
          .datum(data)
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
          .append('g')
          .attr(
            'transform',
            'translate(' + margin.left + ',' + margin.top + ')'
          )

        svg
          .append('g')
          .attr('class', 'axis axis--x')
          .attr('transform', 'translate(0,' + height + ')')
          .call(d3.axisBottom(x))

        svg
          .append('text')
          .attr(
            'transform',
            'translate(' + width / 2 + ' ,' + (height + margin.bottom) + ')'
          )
          .style('text-anchor', 'middle')
          .text('Distance (km)')

        svg
          .append('g')
          .attr('class', 'axis axis--y')
          .call(d3.axisLeft(y))

        svg
          .append('text')
          .attr('transform', 'rotate(-90)')
          .attr('y', 0 - margin.left)
          .attr('x', 0 - height / 2)
          .attr('dy', '1em')
          .style('text-anchor', 'middle')
          .text('Elevation (m)')

        svg
          .append('path')
          .attr('class', 'line')
          .attr('d', line)

        svg
          .selectAll('.dot')
          .enter()
          .append('circle')
          .attr('class', 'dot')
          .attr('cx', line.x())
          .attr('cy', line.y())
          .attr('r', 3.5)
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    return <div className="chart" />
  }
}

export default ElevationChart
