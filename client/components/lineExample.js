// import * as d3 from 'd3'

// drawGraph() {
//     const data = [{x: 5, y: 356}, {x: 7, y: 400}, {x: 9, y: 200}]
//     const margin = {top: 40, right: 40, bottom: 40, left: 40}
//     const width = 960 - margin.left - margin.right
//     const height = 500 - margin.top - margin.bottom

//     const x = d3.scaleLinear().range([0, width])

//     const y = d3.scaleLinear().range([height, 0])

//     const line = d3
//       .line()
//       .x(function(d) {
//         return x(d.x)
//       })
//       .y(function(d) {
//         return y(d.y)
//       })

//     let svg = d3
//       .select('body')
//       .append('svg')
//       .datum(data)
//       .attr('width', width + margin.left + margin.right)
//       .attr('height', height + margin.top + margin.bottom)
//       .append('g')
//       .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

//     svg
//       .append('g')
//       .attr('class', 'axis axis--x')
//       .attr('transform', 'translate(0,' + height + ')')
//       .call(d3.axisBottom(x))

//     svg
//       .append('g')
//       .attr('class', 'axis axis--y')
//       .call(d3.axisLeft(y))

//     svg
//       .append('path')
//       .attr('class', 'line')
//       .attr('d', line)

//     svg
//       .selectAll('.dot')
//       .enter()
//       .append('circle')
//       .attr('class', 'dot')
//       .attr('cx', line.x())
//       .attr('cy', line.y())
//       .attr('r', 3.5)
//   }
