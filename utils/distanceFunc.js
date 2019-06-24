const gpxParse = require('gpx-parse')
const util = require('util')
const parseGpxP = util.promisify(gpxParse.parseGpx)

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

// const findTrackpoint = (image, points) => {
//   let mid = Math.floor(points.length / 2)
//   let imgTime = new Date(image.time)
//   if (mid === 0) {
//     return 0
//   }
//   if (imgTime.getTime() === new Date(points[mid].time).getTime()) {
//     return mid
//   }
//   if (imgTime < new Date(points[mid].time)) {
//     return findTrackpoint(image, points.slice(0, mid))
//   }
//   return findTrackpoint(image, points.slice(mid + 1, points.length))
// }

let counter = 0

const findTrackpoint = (image, points, start = 0, end = points.length - 1) => {
  // console.log('start: ', start, 'end: ', end)
  let imgTime = new Date(image.time)
  let mid = start + Math.floor((end - start) / 2)
  const imageTooEarly = imgTime < new Date(points[0].time)
  const imageTooLate = new Date(points[points.length - 1].time) < imgTime
  if (imageTooEarly || imageTooLate) {
    return -1
  }
  if (start === mid || end === mid) {
    return start
  }
  if (imgTime.getTime() === new Date(points[mid].time).getTime()) {
    return mid
  }

  if (imgTime < new Date(points[mid].time)) {
    return findTrackpoint(image, points, start, mid - 1)
  } else {
    return findTrackpoint(image, points, mid + 1, end)
  }
}

const getD3InputArray = (gpxString, imageArray) => {
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

      const spreadScale = Math.floor(inputArray.length / 100)
      console.log(
        `spreadScale: ${spreadScale}, arraylength: ${inputArray.length}`
      )

      imageArray.forEach(image => {
        let pointIdx = findTrackpoint(image, inputArray)
        if (pointIdx < 0) {
          return
        }

        inputArray[pointIdx].imageUrl = image.imageUrl
        inputArray[pointIdx].orientation = image.orientation
        for (
          let i = pointIdx + 1;
          i < Math.min(pointIdx + spreadScale, inputArray.length);
          i++
        ) {
          if (!inputArray[i].imageUrl) {
            inputArray[i].imageUrl = image.imageUrl
            inputArray[i].orientation = image.orientation
          }
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
