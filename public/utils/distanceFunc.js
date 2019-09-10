var gpxParse = require('gpx-parse')
var util = require('util')
var parseGpxP = util.promisify(gpxParse.parseGpx)
//feet to meters helper
var getMeters = function(feet) {
  return feet * 0.3048
}
var toRadians = function(angle) {
  return angle * (Math.PI / 180)
}
var toCart = function(lat, long, alt) {
  var elevation = getMeters(alt) + 6370000
  var x = elevation * Math.cos(toRadians(lat)) * Math.sin(toRadians(long))
  var y = elevation * Math.sin(toRadians(lat))
  var z = elevation * Math.cos(toRadians(lat)) * Math.cos(toRadians(long))
  return [x, y, z]
}
//calculates distance between two polar verticies
var getDistance = function(polar1, polar2) {
  var _a = toCart.apply(void 0, polar1),
    x1 = _a[0],
    y1 = _a[1],
    z1 = _a[2]
  var _b = toCart.apply(void 0, polar2),
    x2 = _b[0],
    y2 = _b[1],
    z2 = _b[2]
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
var findTrackpoint = function(image, points, start, end) {
  if (start === void 0) {
    start = 0
  }
  if (end === void 0) {
    end = points.length - 1
  }
  var imgTime = new Date(image.time)
  var mid = start + Math.floor((end - start) / 2)
  var imageTooEarly = imgTime < new Date(points[0].time)
  var imageTooLate = new Date(points[points.length - 1].time) < imgTime
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
var getD3InputArray = function(gpxString, imageArray) {
  return parseGpxP(gpxString)
    .then(function(data) {
      var inputArray = []
      var accumDistance = 0
      var prevPoint = []
      data.tracks.forEach(function(track, trackIdx) {
        track.segments.forEach(function(segment, segmentIdx) {
          return segment.forEach(function(subsegment, subsegmentIdx) {
            //get start point
            if (trackIdx === 0 && segmentIdx === 0 && subsegmentIdx === 0) {
              prevPoint = [subsegment.lat, subsegment.lon, subsegment.elevation]
              var trackPoint = {
                elevation: getMeters(subsegment.elevation),
                distance: 0,
                time: subsegment.time
              }
              inputArray.push(trackPoint)
            } else {
              //calculate distance from start
              accumDistance += getDistance(prevPoint, [
                subsegment.lat,
                subsegment.lon,
                subsegment.elevation
              ])
              var trackPoint = {
                elevation: getMeters(subsegment.elevation),
                distance: accumDistance / 1000,
                time: subsegment.time
              }
              prevPoint = [subsegment.lat, subsegment.lon, subsegment.elevation]
              inputArray.push(trackPoint)
            }
          })
        })
      })
      //add imageUrl to relevant trackpoint
      var spreadScale = Math.floor(inputArray.length / 100)
      imageArray.forEach(function(image) {
        var pointIdx = findTrackpoint(image, inputArray)
        if (pointIdx < 0) {
          return
        }
        inputArray[pointIdx].imageUrl = image.imageUrl
        inputArray[pointIdx].startImageCluster = true
        inputArray[pointIdx].orientation = image.orientation
        for (
          var i = pointIdx + 1;
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
    .catch(function(error) {
      console.log('There was an error in getD3InputArray: ', error)
    })
}
module.exports = {
  findTrackpoint: findTrackpoint,
  getD3InputArray: getD3InputArray
}
//# sourceMappingURL=distanceFunc.js.map
