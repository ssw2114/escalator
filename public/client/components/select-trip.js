var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTripsThunk, getGpxThunk } from '../store/gpx';
import { getImagesThunk } from '../store/image';
var SelectTrip = /** @class */ (function (_super) {
    __extends(SelectTrip, _super);
    function SelectTrip() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SelectTrip.prototype.componentDidMount = function () {
        this.props.getTrips();
        this.props.getImages();
    };
    SelectTrip.prototype.render = function () {
        return this.props.loading ? (React.createElement("div", null, "Loading...")) : (React.createElement("div", { className: "triplist" },
            React.createElement("h1", null, "Select a Trip "),
            this.props.trips.map(function (trip) { return (React.createElement("div", { key: trip.uniqueId },
                React.createElement(Link, { to: "/chart?id=" + trip.uniqueId }, trip.location))); })));
    };
    return SelectTrip;
}(Component));
var mapState = function (state) {
    return {
        trips: state.gpx.trips
    };
};
var mapDispatch = function (dispatch) { return ({
    getTrips: function () { return dispatch(getTripsThunk()); },
    getGpx: function (id) { return dispatch(getGpxThunk(id)); },
    getImages: function () { return dispatch(getImagesThunk()); }
}); };
export default connect(mapState, mapDispatch)(SelectTrip);
//# sourceMappingURL=select-trip.js.map