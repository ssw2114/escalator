import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getGpxThunk} from '../store/gpx'
const sampleData = require('../../data/sampleData3')
const {getD3InputArray} = require('../../utils/distanceFunc')
// const createDataArray = require('../../data/gpx-parser')
const gpxParse = require('gpx-parse')
const util = require('util')
const parseGpxP = util.promisify(gpxParse.parseGpx)

import * as d3 from 'd3'

class ElevationChart extends Component {
  componentDidMount() {
    this.drawGraph()
  }
  componentDidUpdate() {
    this.drawGraph()
  }
  //props will be GPX file and images (array of objects with imageURL and timestamp)
  drawGraph() {
    ////////TESTING*********************
    let image = {
      imageUrl:
        'https://www.city.sendai.jp/zoo/saishin/documents/images/ressaapanda_konatsu_nikoniko700px.jpg'
    }
    gpxParse.parseGpx(sampleData, (error, data) => {
      image.time = data.tracks[0].segments[0][200].time
      // console.log(data.tracks[0].segments[0][1])
      // console.log(data.tracks[0].segments[0][0].lat)
      // console.log(data.tracks[0].length())
      // console.log(data.routes.points)
    })

    console.log('IMAGE OBJ:', image)

    getD3InputArray(sampleData, [image])
      .then(data => {
        console.log(data)
        // data = [
        //   {elevation: 1, distance: 10, z: 0},
        //   {
        //     elevation: 7,
        //     distance: 20,
        //     z: 0,
        //     imageUrl:
        //       'https://www.city.sendai.jp/zoo/saishin/documents/images/ressaapanda_konatsu_nikoniko700px.jpg'
        //   },
        //   {elevation: 10, distance: 30}
        // ]
        // const image =
        //   'https://www.city.sendai.jp/zoo/saishin/documents/images/ressaapanda_konatsu_nikoniko700px.jpg'

        ////////END TESTING****************************************
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
        const distanceTopRange = distanceMax + 1
        const elevationTopRange = elevationMax + elevationMax % 50

        const bisectDistance = d3.bisector(function(d) {
          return d.distance
        }).left

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
        const lineSvg = svg.append('g')
        const focus = svg.append('g').style('display', 'none')
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

        lineSvg
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

        //create circle for mouseover
        focus
          .append('circle')
          .attr('class', 'y')
          .style('fill', 'none')
          .style('stroke', 'blue')
          .attr('r', 4)
        // focus.append('image')

        //create capture area for mouseover

        svg
          .append('rect')
          .attr('width', width)
          .attr('height', height)
          .style('fill', 'none')
          .style('pointer-events', 'all')
          .on('mouseover', function() {
            focus.style('display', null)
          })
          .on('mouseout', function() {
            focus.style('display', 'none')
          })
          .on('mousemove', mousemove)

        function mousemove() {
          focus.select('image').remove()
          let x0 = x.invert(d3.mouse(this)[0])
          let i = bisectDistance(data, x0, 1)
          let d0 = data[i - 1]
          let d1 = data[i]
          let d = x0 - d0.distance > d1.distance - x0 ? d1 : d0
          if (d.imageUrl) {
            focus
              .append('image')
              .attr('xlink:href', d.imageUrl)
              .attr('width', '200')
              .attr('height', '200')
              .attr(
                'transform',
                'translate(' + x(d.distance) + ',' + y(d.elevation) + ')'
              )
            console.log('d.imageUrl', d)
          }
          focus
            .select('circle.y')
            .attr(
              'transform',
              'translate(' + x(d.distance) + ',' + y(d.elevation) + ')'
            )
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    return <div className="chart" />
  }
}

const mapState = state => {
  return {
    gpxString: state.gpx.gpx,
    loading: state.gpx.loading
  }
}

export default connect(mapState)(ElevationChart)
