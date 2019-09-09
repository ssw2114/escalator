import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => (
  <div className="navbar">
    <Link to="/">
      <div className="nav-header">ESCALATOR</div>
    </Link>
    <Link to="/selectTrip">
      <div className="nav-link">My Trips</div>
    </Link>
    <Link to="/gpx">
      <div className="nav-link">Upload GPX</div>
    </Link>
    <Link to="/image">
      <div className="nav-link">Upload Photos</div>
    </Link>
  </div>
)

export default Navbar
