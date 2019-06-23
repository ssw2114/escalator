const router = require('express').Router()
const cloudinary = require('cloudinary')
const formData = require('express-form-data')
const cors = require('cors')
const Image = require('../db/models/image')
const Gpx = require('../db/models/gpx')
const EXIFParser = require('exif-parser')
const fs = require('fs')

// const getEXIFData = image => {
//   return new Promise(fulfill => {
//     EXIF.getData(image, function() {
//       fulfill(this)
//     })
//   })
// }

// const multer = require('multer')
// const storage = multer.memoryStorage()
// const multerUploads = multer({storage}).single('image')
require('../../secrets')

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_KEY,
//   api_secret: process.env.CLOUDNARY_SECRET
// })

cloudinary.config({
  cloud_name: 'di6e6irfj',
  api_key: '723314166911458',
  api_secret: '8-yXh5UHr7jf1Xqu01urqE4KhmU'
})

router.use(
  cors({
    origin: 'http://localhost:3000/image'
  })
)

router.use(formData.parse())

router.post('/upload', (req, res, next) => {
  // console.log('REQ FILES', JSON.stringify(req.files))
  const values = Object.values(req.files)

  let promises = values.map(image => {
    // console.log(image.exifdata.DateTimeOriginal)
    let buffer = fs.readFileSync(image.path)
    // console.log('IMAGE:', image)
    let parser = EXIFParser.create(buffer)
    let result = parser.parse()
    console.log('RESULT', result)
    let time = result.tags.DateTimeOriginal
    console.log('TIME1', time)
    time = new Date(time * 1000)
    console.log('TIME2', time)
    // console.log('EXIF', result)
    return cloudinary.uploader.upload(image.path).then(cloudRes => {
      // console.log('cloudRes', cloudRes)
      return Image.create({
        imageUrl: cloudRes.url,
        time: time.toUTCString()
      }).then(
        // dbResult => console.log('DB RESULT', dbResult),
        err => console.log(err)
      )
    })
  })
  // .then(uploadResults => {
  //   Image.create()
  //   //update with imageUrl
  // })
  // .catch(error => console.log(error))
  // })
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
