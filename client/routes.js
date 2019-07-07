import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import {
  ImageUpload,
  ElevationChart,
  GpxUpload,
  SelectTrip,
  Home
} from './components'

/**
 * COMPONENT
 */
export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/chart" component={ElevationChart} />
        <Route path="/image" component={ImageUpload} />
        <Route path="/gpx" component={GpxUpload} />
        <Route path="/selectTrip" component={SelectTrip} />
        <Route path="/" component={Home} />
      </Switch>
    )
  }
}
