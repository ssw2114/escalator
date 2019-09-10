import React from 'react';
import { Link } from 'react-router-dom';
var Navbar = function () { return (React.createElement("div", { className: "navbar" },
    React.createElement(Link, { to: "/" },
        React.createElement("div", { className: "nav-header" }, "ESCALATOR")),
    React.createElement(Link, { to: "/selectTrip" },
        React.createElement("div", { className: "nav-link" }, "My Trips")),
    React.createElement(Link, { to: "/gpx" },
        React.createElement("div", { className: "nav-link" }, "Upload GPX")),
    React.createElement(Link, { to: "/image" },
        React.createElement("div", { className: "nav-link" }, "Upload Photos")))); };
export default Navbar;
//# sourceMappingURL=navbar.js.map