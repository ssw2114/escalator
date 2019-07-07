import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => (
  <div className="navbar">
    <Link to="/">
      <div className="nav-header">ESCALATOR</div>
    </Link>
    <div className="nav-link">
      <Link to="/selectTrip">My Trips</Link>
    </div>
    <Link to="/gpx">
      <div className="nav-link">Upload GPX</div>
    </Link>
    <Link to="/image">
      <div className="nav-link">Upload Photos</div>
    </Link>
  </div>
)

export default Navbar
