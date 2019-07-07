/* eslint-disable camelcase */
const router = require('express').Router()
const cloudinary = require('cloudinary')
const formData = require('express-form-data')
const cors = require('cors')
const Image = require('../db/models/image')
const Gpx = require('../db/models/gpx')
const EXIFParser = require('exif-parser')
const fs = require('fs')
require('../../secrets')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
})

// router.use(
//   cors({
//     origin: 'http://localhost:3000/image'
//   })
// )

router.use(formData.parse())

router.get('/', async (req, res, next) => {
  try {
    const images = await Image.findAll()
    res.json(images)

    //SSW: consider limiting by timeframe of trip
  } catch (error) {
    next(error)
  }
})
router.post('/:offset', (req, res, next) => {
  const values = Object.values(req.files)

  let promises = values.map(image => {
    let buffer = fs.readFileSync(image.path)

    let parser = EXIFParser.create(buffer)
    let result = parser.parse()

    let orientation = result.tags.Orientation

    let time = result.tags.DateTimeOriginal

    //specify given timezone
    const withTimeZone = time.toString() + req.params.offset.toString()
    time = new Date(withTimeZone)

    return cloudinary.uploader.upload(image.path).then(cloudRes => {
      return Image.create({
        imageUrl: cloudRes.url,
        time: time.toUTCString(),
        orientation: orientation
      }).then(err => console.log(err))
    })
  })
  Promise.all(promises)
    .then(results => {
      console.log(results)
      res.json(results)
    })
    .catch(err => res.status(400).json(err))
})

router.post('/upload', async (req, res, next) => {
  const {string, id, seq} = req.body
  let gpxEntry = await Gpx.create({
    gpxString: string,
    uniqueId: id,
    sequence: seq
  })
  res.send(gpxEntry)
})

module.exports = router
