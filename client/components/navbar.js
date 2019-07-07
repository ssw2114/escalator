import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => (
  <div className="navbar">
    <div className="nav-header">ESCALATOR</div>

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
