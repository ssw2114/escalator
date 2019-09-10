import Router from 'express'
let router = Router()
import {Request, Response, NextFunction} from 'express'
import '../../secrets'
import Images from './images'
import Gpx from './gpx'

export class ErrorWithStatus extends Error {
  status: number | null
  constructor(message: string) {
    super(message)
    this.status = null
  }
}

export default router

router.use('/images', Images)
router.use('/gpx', Gpx)

router.use((req: Request, res: Response, next: NextFunction) => {
  const error: ErrorWithStatus = new ErrorWithStatus('Not Found')
  error.status = 404
  next(error)
})
