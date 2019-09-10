var __assign =
  (this && this.__assign) ||
  function() {
    __assign =
      Object.assign ||
      function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i]
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p]
        }
        return t
      }
    return __assign.apply(this, arguments)
  }
var __awaiter =
  (this && this.__awaiter) ||
  function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function(resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator.throw(value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __generator =
  (this && this.__generator) ||
  function(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
          if (t[0] & 1) throw t[1]
          return t[1]
        },
        trys: [],
        ops: []
      },
      f,
      y,
      t,
      g
    return (
      (g = {next: verb(0), throw: verb(1), return: verb(2)}),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function() {
          return this
        }),
      g
    )
    function verb(n) {
      return function(v) {
        return step([n, v])
      }
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.')
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y.return
                  : op[0]
                    ? y.throw || ((t = y.return) && t.call(y), 0)
                    : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t
          if (((y = 0), t)) op = [op[0] & 2, t.value]
          switch (op[0]) {
            case 0:
            case 1:
              t = op
              break
            case 4:
              _.label++
              return {value: op[1], done: false}
            case 5:
              _.label++
              y = op[1]
              op = [0]
              continue
            case 7:
              op = _.ops.pop()
              _.trys.pop()
              continue
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0
                continue
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1]
                break
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1]
                t = op
                break
              }
              if (t && _.label < t[2]) {
                _.label = t[2]
                _.ops.push(op)
                break
              }
              if (t[2]) _.ops.pop()
              _.trys.pop()
              continue
          }
          op = body.call(thisArg, _)
        } catch (e) {
          op = [6, e]
          y = 0
        } finally {
          f = t = 0
        }
      if (op[0] & 5) throw op[1]
      return {value: op[0] ? op[1] : void 0, done: true}
    }
  }
import axios from 'axios'
var initialState = {
  gpx: '',
  trips: [],
  loading: true,
  gpxLoaded: false
}
//actions
var GET_GPX = 'GET_GPX'
var GET_TRIPS = 'GET_TRIPS'
var GPX_LOADED = 'GPX_LOADED'
var CLEAR_GPX = 'CLEAR_GPX'
//action creators
var gotGpx = function(payload) {
  return {
    type: GET_GPX,
    payload: payload
  }
}
var gotTrips = function(payload) {
  return {
    type: GET_TRIPS,
    payload: payload
  }
}
var loadedGpx = function() {
  return {
    type: GPX_LOADED
  }
}
export var clearGpx = function() {
  return {
    type: CLEAR_GPX
  }
}
//thunks
export var getTripsThunk = function() {
  return function(dispatch) {
    return __awaiter(void 0, void 0, void 0, function() {
      var data, err_1
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2, , 3])
            return [4 /*yield*/, axios.get('api/gpx')]
          case 1:
            data = _a.sent().data
            dispatch(gotTrips(data))
            return [3 /*break*/, 3]
          case 2:
            err_1 = _a.sent()
            console.error('loadGPXThunk error:', err_1)
            return [3 /*break*/, 3]
          case 3:
            return [2 /*return*/]
        }
      })
    })
  }
}
export var loadGpxThunk = function(string, id, seq) {
  return function(dispatch) {
    return __awaiter(void 0, void 0, void 0, function() {
      var location_1, _a, _, lat, lon, reverseGeo, data, res, err_2
      return __generator(this, function(_b) {
        switch (_b.label) {
          case 0:
            _b.trys.push([0, 4, , 5])
            location_1 = ''
            if (!(seq === 1)) return [3 /*break*/, 2]
            ;(_a = string.match(/trkpt lat="([-.\d]+)" lon="([-.\d]+)"/) || [
              null,
              null,
              null
            ]),
              (_ = _a[0]),
              (lat = _a[1]),
              (lon = _a[2])
            return [
              4 /*yield*/,
              axios.get(
                'https://nominatim.openstreetmap.org/reverse?format=json&lat=' +
                  lat +
                  '&lon=' +
                  lon
              )
            ]
          case 1:
            reverseGeo = _b.sent()
            data = reverseGeo.data.address
            location_1 =
              data.village +
              ', ' +
              data.county +
              ', ' +
              data.state +
              ', ' +
              data.country
            _b.label = 2
          case 2:
            return [
              4 /*yield*/,
              axios.post('api/gpx', {
                string: string,
                id: id,
                seq: seq,
                location: location_1
              })
            ]
          case 3:
            res = _b.sent()
            if (res.status === 200) {
              dispatch(loadedGpx())
            }
            return [3 /*break*/, 5]
          case 4:
            err_2 = _b.sent()
            console.error('loadGPXThunk error:', err_2)
            return [3 /*break*/, 5]
          case 5:
            return [2 /*return*/]
        }
      })
    })
  }
}
export var getGpxThunk = function(id) {
  return function(dispatch) {
    return __awaiter(void 0, void 0, void 0, function() {
      var data, err_3
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2, , 3])
            return [4 /*yield*/, axios.get('api/gpx/' + id)]
          case 1:
            data = _a.sent().data
            dispatch(gotGpx(data))
            return [3 /*break*/, 3]
          case 2:
            err_3 = _a.sent()
            console.error('getGpxThunk error:', err_3)
            return [3 /*break*/, 3]
          case 3:
            return [2 /*return*/]
        }
      })
    })
  }
}
export default function(state, action) {
  if (state === void 0) {
    state = initialState
  }
  switch (action.type) {
    case GET_GPX:
      return __assign(__assign({}, state), {
        loading: false,
        gpx: action.payload
      })
    case CLEAR_GPX:
      return __assign(__assign({}, state), {loading: true, gpx: ''})
    case GPX_LOADED:
      return __assign(__assign({}, state), {gpxLoaded: true, loading: false})
    case GET_TRIPS:
      return __assign(__assign({}, state), {
        trips: action.payload,
        loading: false
      })
    default:
      return state
  }
}
//# sourceMappingURL=gpx.js.map
