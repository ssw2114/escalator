import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import image from './image';
import gpx from './gpx';
var reducer = combineReducers({ image: image, gpx: gpx });
var devMiddleware = composeWithDevTools(applyMiddleware(thunkMiddleware, createLogger({ collapsed: true })));
var prodMiddleware = composeWithDevTools(applyMiddleware(thunkMiddleware));
var store = process.env.NODE_ENV === 'production'
    ? createStore(reducer, prodMiddleware)
    : createStore(reducer, devMiddleware);
export default store;
export * from './image';
export * from './gpx';
//# sourceMappingURL=index.js.map