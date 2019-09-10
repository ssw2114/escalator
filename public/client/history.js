import {createMemoryHistory, createBrowserHistory} from 'history'
var history =
  process.env.NODE_ENV === 'test'
    ? createMemoryHistory()
    : createBrowserHistory()
export default history
//# sourceMappingURL=history.js.map
