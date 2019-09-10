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
import { Route, Switch } from 'react-router-dom';
import { ImageUpload, ElevationChart, GpxUpload, SelectTrip, Home } from './components';
/**
 * COMPONENT
 */
var Routes = /** @class */ (function (_super) {
    __extends(Routes, _super);
    function Routes() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Routes.prototype.render = function () {
        return (React.createElement(Switch, null,
            React.createElement(Route, { path: "/chart", component: ElevationChart }),
            React.createElement(Route, { path: "/image", component: ImageUpload }),
            React.createElement(Route, { path: "/gpx", component: GpxUpload }),
            React.createElement(Route, { path: "/selectTrip", component: SelectTrip }),
            React.createElement(Route, { path: "/", component: Home })));
    };
    return Routes;
}(Component));
export default Routes;
//# sourceMappingURL=routes.js.map