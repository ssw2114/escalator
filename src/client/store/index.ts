import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import image from './image'
import gpx from './gpx'

const reducer = combineReducers({image, gpx})
const devMiddleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)

const prodMiddleware = composeWithDevTools(applyMiddleware(thunkMiddleware))

const store =
  process.env.NODE_ENV === 'production'
    ? createStore(reducer, prodMiddleware)
    : createStore(reducer, devMiddleware)

export default store
export * from './image'
export * from './gpx'
export type AppState = ReturnType<typeof reducer>
