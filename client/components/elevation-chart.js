import React, {Component} from 'react'
import {connect} from 'react-redux'
const sampleData = require('../../data/sampleData')
const {getD3InputArray} = require('../../utils/distanceFunc')
// const createDataArray = require('../../data/gpx-parser')

import * as d3 from 'd3'

class ElevationChart extends Component {
  componentDidMount() {
    this.drawGraph()
  }

  async drawGraph() {
    const data = await getD3InputArray(sampleData)
    console.log('DATA', data)
    const margin = {top: 40, right: 40, bottom: 40, left: 40}
    const width = 960 - margin.left - margin.right
    const height = 500 - margin.top - margin.bottom

    const x = d3
      .scaleLinear()
      .range([0, width])
      .domain([0, 30])

    const y = d3
      .scaleLinear()
      .range([height, 0])
      .domain([0, 200])

    const line = d3
      .line()
      .x(function(d) {
        return x(d.distance)
      })
      .y(function(d) {
        return y(d.elevation)
      })

    let svg = d3
      .select('#chart')
      .append('svg')
      .datum(data)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

    svg
      .append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x))

    svg
      .append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(y))

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
  }

  render() {
    return <div className="chart" />
  }
}

export default ElevationChart
