const router = require('express').Router()
const cloudinary = require('cloudinary')
const formData = require('express-form-data')
const cors = require('cors')
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
// router.post('/upload', multerUploads, (req, res, next) => {
//   console.log('body', req.body)
// })
router.use(formData.parse())
router.post('/upload', (req, res, next) => {
  // console.log(req.files)
  const values = Object.values(req.files)
  let promises = values.map(image => {
    // console.log(image)
    return cloudinary.uploader.upload(image.path)
  })
  Promise.all(promises)
    .then(results => {
      console.log(results)
      res.json(results)
    })
    .catch(err => res.status(400).json(err))
})

module.exports = router
