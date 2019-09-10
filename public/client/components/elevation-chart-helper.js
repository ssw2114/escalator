import * as d3 from 'd3'
var getD3InputArray = require('../../utils/distanceFunc').getD3InputArray
var drawGraph = function(gpxString, images) {
  getD3InputArray(gpxString, images)
    .then(function(data) {
      d3.select('.chart > *').remove()
      var margin = {top: 200, right: 60, bottom: 100, left: 60}
      var width = 960 - margin.left - margin.right
      var height = 700 - margin.top - margin.bottom
      //calculate domain ranges
      var distanceMax = data[data.length - 1].distance
      var _a = data.reduce(
          function(accum, curr) {
            if (curr.elevation < accum[0]) {
              accum[0] = curr.elevation
            }
            if (curr.elevation > accum[1]) {
              accum[1] = curr.elevation
            }
            return accum
          },
          [10000, 0]
        ),
        elevationMin = _a[0],
        elevationMax = _a[1]
      var distanceTopRange = distanceMax + 1
      var elevationTopRange = elevationMax + (50 - elevationMax % 50)
      var bisectDistance = d3.bisector(function(d) {
        return d.distance
      }).left
      var x = d3
        .scaleLinear()
        .range([0, width])
        .domain([0, distanceTopRange])
      var y = d3
        .scaleLinear()
        .range([height, 0])
        .domain([elevationMin > 50 ? elevationMin - 50 : 0, elevationTopRange])
      var line = d3
        .line()
        .curve(d3.curveMonotoneX)
        .x(function(d) {
          return x(d.distance)
        })
        .y(function(d) {
          return y(d.elevation)
        })
      var svg = d3
        .select('.chart')
        .append('svg')
        .datum(data)
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
      var lineSvg = svg.append('g')
      var focus = svg.append('g').style('display', 'none')
      svg
        .append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(x))
      svg
        .append('text')
        .attr(
          'transform',
          'translate(' + width / 2 + ' ,' + (height + 40) + ')'
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
      // svg
      //   .selectAll('.dot')
      //   .enter()
      //   .append('circle')
      //   .attr('class', 'dot')
      //   .attr('cx', line.x())
      //   .attr('cy', line.y())
      //   .attr('r', 3.5)
      //create empty circles to display photo locations
      data.forEach(function(point) {
        if (point.startImageCluster) {
          lineSvg
            .append('text')
            .style('fill', 'red') // fill the text with the colour black
            .attr(
              'transform',
              'translate(' + x(point.distance) + ',' + y(point.elevation) + ')'
            ) // set y position of bottom of text
            .attr('dy', '.35em')
            .attr('font-weight', 'bold')
            .attr('text-anchor', 'middle') // set anchor y justification
            .text('X')
        }
      })
      //create filled circle for mouseover
      focus
        .append('circle')
        .attr('class', 'y')
        .style('fill', 'none')
        .style('stroke', 'red')
        .attr('r', 4)
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
        focus.select('.x').remove()
        var x0 = x.invert(d3.mouse(this)[0])
        var i = bisectDistance(data, x0, 1)
        var d0 = data[i - 1]
        var d1 = data[i]
        var d = x0 - d0.distance > d1.distance - x0 ? d1 : d0
        if (d.imageUrl) {
          focus
            .append('image')
            .attr('class', 'pic')
            .attr('xlink:href', d.imageUrl)
            .attr('height', '300px')
            .attr('width', '300px')
          var pic = d3.select('.pic').node()
          var picWidth = pic.getBoundingClientRect().width
          var picHeight = pic.getBoundingClientRect().height
          if (d.orientation === 6) {
            focus
              .select('image')
              .attr(
                'transform',
                'translate(' +
                  -0.1 * picWidth +
                  ',' +
                  -1 * picHeight +
                  ') translate(' +
                  x(d.distance) +
                  ',' +
                  y(d.elevation) +
                  ') rotate(90 ' +
                  picWidth / 2 +
                  ' ' +
                  picHeight / 2 +
                  ')'
              )
            // .attr('transform', 'translate(300, ' + y(d.elevation) + ')  ')
          } else if (d.orientation === 8) {
            focus
              .select('image')
              .attr(
                'transform',
                'translate(' +
                  -0.1 * picWidth +
                  ',' +
                  -1 * picHeight +
                  ') translate(' +
                  x(d.distance) +
                  ',' +
                  y(d.elevation) +
                  ') rotate(270 ' +
                  picWidth / 2 +
                  ' ' +
                  picHeight / 2 +
                  ')'
              )
          } else if (d.orientation === 3) {
            focus
              .select('image')
              .attr(
                'transform',
                'translate(0,' +
                  -1 * picHeight +
                  ') translate(' +
                  x(d.distance) +
                  ',' +
                  y(d.elevation) +
                  ') rotate(180 ' +
                  picWidth / 2 +
                  ' ' +
                  picHeight / 2 +
                  ')'
              )
          } else {
            focus
              .select('image')
              .attr(
                'transform',
                'translate(0,' +
                  -0.9 * picHeight +
                  ') translate(' +
                  x(d.distance) +
                  ', ' +
                  y(d.elevation) +
                  ')'
              )
          }
          // append the x line
          focus
            .append('line')
            .attr('class', 'x')
            .style('stroke', 'black')
            .style('stroke-dasharray', '3,3')
            .style('opacity', 1)
            .attr('y1', 0)
            .attr('y2', height)
            .attr(
              'transform',
              'translate(' + x(d.distance) + ',' + y(d.elevation) + ')'
            )
            .attr('y2', height - y(d.elevation))
        }
        focus
          .select('circle.y')
          .attr(
            'transform',
            'translate(' + x(d.distance) + ',' + y(d.elevation) + ')'
          )
      }
    })
    .catch(function(error) {
      console.log(error)
    })
}
export default drawGraph
//# sourceMappingURL=elevation-chart-helper.js.map
