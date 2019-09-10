import path from 'path'
import express from 'express'
import morgan from 'morgan'
import compression from 'compression'
import session from 'express-session'
import connectStore from 'connect-session-sequelize'
const SequelizeStore = connectStore(session.Store)
import db from './db'
const sessionStore = new SequelizeStore({db})
const PORT = process.env.PORT || 8080
const app = express()
import formData from 'express-form-data'
import {ErrorWithStatus} from './api'
import {Request, Response, NextFunction} from 'express'
export default app

// if (process.env.NODE_ENV === 'test') {
//   after('close the session store', () => sessionStore.stopExpiringSessions())
// }

app.use(formData.parse())

const createApp = () => {
  // logging middleware
  app.use(morgan('dev'))

  // body parsing middleware
  app.use(express.json())
  app.use(express.urlencoded({extended: true}))

  // compression middleware
  app.use(compression())

  // auth and api routes

  app.use('/api', require('./api'))

  // static file-serving middleware
  app.use(express.static(path.join(__dirname, '..', 'public')))

  // any remaining requests with an extension (.js, .css, etc.) send 404
  app.use((req: Request, res: Response, next: NextFunction) => {
    if (path.extname(req.path).length) {
      const err = new ErrorWithStatus('Not found')
      err.status = 404
      next(err)
    } else {
      next()
    }
  })

  // sends index.html
  app.use('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'))
  })

  // error handling endware
  app.use(
    (err: ErrorWithStatus, req: Request, res: Response, next: NextFunction) => {
      console.error(err)
      console.error(err.stack)
      res
        .status(err.status || 500)
        .send(err.message || 'Internal server error.')
    }
  )
}

const startListening = () => {
  app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`))
}

const syncDb = () => db.sync()

async function bootApp() {
  await sessionStore.sync()
  await syncDb()
  await createApp()
  await startListening()
}
// This evaluates as true when this file is run directly from the command line,
// i.e. when we say 'node server/index.js' (or 'nodemon server/index.js', or 'nodemon server', etc)
// It will evaluate false when this module is required by another module - for example,
// if we wanted to require our app in a test spec
if (require.main === module) {
  bootApp()
} else {
  createApp()
}
