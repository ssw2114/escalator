/* eslint-disable camelcase */
import Router from 'express'
let router = Router()
import {Request, Response, NextFunction} from 'express'
import cloudinary from 'cloudinary'
import formData from 'express-form-data'
import cors from 'cors'
import Image from '../db/models/image'
import Gpx from '../db/models/gpx'
import EXIFParser from 'exif-parser'
import fs from 'fs'
import '../../secrets'

interface sendImages extends Request {
  files: object
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
})

router.use(formData.parse())

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const images = await Image.findAll()
    res.json(images)

    //SSW: consider limiting by timeframe of trip
  } catch (error) {
    next(error)
  }
})
router.post(
  '/:offset',
  (req: sendImages, res: Response, next: NextFunction) => {
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
  }
)

router.post(
  '/upload',
  async (req: Request, res: Response, next: NextFunction) => {
    const {string, id, seq} = req.body
    let gpxEntry = await Gpx.create({
      gpxString: string,
      uniqueId: id,
      sequence: seq
    })
    res.send(gpxEntry)
  }
)

export default router
