const {findTrackpoint, getD3InputArray} = require('../utils/distanceFunc')
const sampleData = require('./sampleData')

let createDataArray = async gpxString => {
  let result = await getD3InputArray(gpxString)
  return result
}

sampleDataArray = createDataArray(sampleData)

module.exports = createDataArray
gpxParse.parseGpx(sampleData, (error, data) => {
  console.log(data.tracks[0].segments[0][1])
  // console.log(data.tracks[0].segments[0][0].lat)
  // console.log(data.tracks[0].length())
  // console.log(data.routes.points)
})
