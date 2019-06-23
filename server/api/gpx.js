const router = require('express').Router()
const Gpx = require('../db/models/gpx')

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    let gpxBatches = await Gpx.findAll({
      where: {
        uniqueId: id
      },
      order: [['sequence', 'ASC']]
    })
    let gpxString = gpxBatches.reduce((accum, entry) => {
      accum = accum + entry.gpxString
      return accum
    }, '')

    res.json(gpxString)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {string, id, seq} = req.body
    let gpxEntry = await Gpx.create({
      gpxString: string,
      uniqueId: id,
      sequence: seq
    })
    if (gpxEntry) {
      res.json(gpxEntry)
    } else {
      next()
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
