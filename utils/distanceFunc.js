const gpxParse = require('gpx-parse')
const util = require('util')
const parseGpxP = util.promisify(gpxParse.parseGpx)
const sampleData = require('../data/sampleData3')

//take GPX string and return d3 input of line graphed over distance(km) by elevation(meters)

// let image = {
//   imageUrl:
//     'https://www.city.sendai.jp/zoo/saishin/documents/images/ressaapanda_konatsu_nikoniko700px.jpg'
// }
// gpxParse.parseGpx(sampleData, (error, data) => {
//   image.time = data.tracks[0].segments[0][1].time
//   // console.log(data.tracks[0].segments[0][1])
//   // console.log(data.tracks[0].segments[0][0].lat)
//   // console.log(data.tracks[0].length())
//   // console.log(data.routes.points)
// })

// console.log('IMAGE OBJ:', image)

//feet to meters helper

const getMeters = feet => {
  return feet * 0.3048
}

const toRadians = angle => {
  return angle * (Math.PI / 180)
}
const toCart = (lat, long, alt) => {
  let elevation = getMeters(alt) + 6370000
  let x = elevation * Math.cos(toRadians(lat)) * Math.sin(toRadians(long))
  let y = elevation * Math.sin(toRadians(lat))
  let z = elevation * Math.cos(toRadians(lat)) * Math.cos(toRadians(long))
  return [x, y, z]
}

//calculates distance between two polar verticies

const getDistance = (polar1, polar2) => {
  let [x1, y1, z1] = toCart(...polar1)
  let [x2, y2, z2] = toCart(...polar2)
  return Math.hypot(x1 - x2, y1 - y2, z1 - z2)
}

console.log(
  getDistance([47.11876, -70.89040833, 387.0], [47.11177, -70.91567667, 503])
)

const findTrackpoint = (date, points) => {
  let mid = Math.floor(points.length / 2)
  if (mid === 0) {
    return points[0]
  }
  if (date.getTime() === points[mid].time.getTime()) {
    return points[mid]
  }
  if (date < points[mid].time) {
    return findTrackpoint(date, points.slice(0, mid))
  }
  return findTrackpoint(date, points.slice(mid + 1, points.length))
}

// const findTrackpointByIndex = (
//   date,
//   points,
//   start = 0,
//   end = points.length - 1
// ) => {
//   let mid = Math.floor((end + 1 - start) / 2)
//   if (start === end) {
//     return points[start]
//   }
//   if (date.getTime() === points[mid].time.getTime()) {
//     return points[mid]
//   }
//   if (date < points[mid].time) {
//     return findTrackpoint(date, points, 0, mid - 1)
//   } else {
//     return findTrackpoint(date, points, mid + 1, points.length - 1)
//   }
// }

const getD3InputArray = (gpxString, imageArray = []) => {
  return parseGpxP(gpxString)
    .then(data => {
      let inputArray = []
      let accumDistance = 0
      let prevPoint = []
      data.tracks.forEach((track, trackIdx) => {
        track.segments.forEach((segment, segmentIdx) =>
          segment.forEach((subsegment, subsegmentIdx) => {
            //get start point
            if (trackIdx === 0 && segmentIdx === 0 && subsegmentIdx === 0) {
              prevPoint = [subsegment.lat, subsegment.lon, subsegment.elevation]
              let trackPoint = {
                elevation: getMeters(subsegment.elevation),
                distance: 0,
                time: subsegment.time
              }
              inputArray.push(trackPoint)
            } else {
              //calculate distance from start
              // console.log(`lat: ${subsegment.lat}, long: ${subsegment.lon}`)
              accumDistance += getDistance(prevPoint, [
                subsegment.lat,
                subsegment.lon,
                subsegment.elevation
              ])
              let trackPoint = {
                elevation: getMeters(subsegment.elevation),
                distance: accumDistance / 1000,
                time: subsegment.time
              }
              prevPoint = [subsegment.lat, subsegment.lon, subsegment.elevation]
              inputArray.push(trackPoint)
            }
          })
        )
      })
      //add imageUrl to relevant trackpoint

      imageArray.forEach(image => {
        let pointWithImage = findTrackpoint(image.time, inputArray)
        pointWithImage.imageUrl = image.imageUrl
        console.log(pointWithImage)
        console.log('INDEX OF POINT', inputArray.indexOf(pointWithImage))
        let indexOfPoint = inputArray.indexOf(pointWithImage)
        for (let i = indexOfPoint + 1; i < indexOfPoint + 51; i++) {
          inputArray[i].imageUrl = image.imageUrl
        }
      })
      return inputArray
    })
    .catch(error => {
      console.log('There was an error in getD3InputArray: ', error)
    })
}

module.exports = {
  findTrackpoint,
  getD3InputArray
}
