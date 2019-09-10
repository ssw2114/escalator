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
import { loadGpxThunk } from '../store';
var GpxUpload = /** @class */ (function (_super) {
    __extends(GpxUpload, _super);
    function GpxUpload() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onChange = function (e) {
            e.preventDefault();
            var loadGpx = _this.props.loadGpx.bind(_this);
            var files = Array.from(e.target.files);
            var reader = new FileReader();
            reader.onload = function () {
                var uniqueId = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
                //convert to text
                var text = reader.result;
                //slice text into sufficiently small strings
                var start = 0;
                var packageSize = 80000;
                var end = packageSize;
                var seq = 1;
                while (start < text.length) {
                    var payload = text.slice(start, end);
                    loadGpx(payload, uniqueId, seq);
                    start = end;
                    end += packageSize;
                    seq++;
                }
            };
            reader.readAsText(files[0]);
        };
        return _this;
    }
    GpxUpload.prototype.render = function () {
        return (React.createElement("div", { className: "upload" },
            React.createElement("label", null, "Upload Gpx file"),
            React.createElement("input", { type: "file", onChange: this.onChange })));
    };
    return GpxUpload;
}(Component));
/**
 * CONTAINER
 */
var mapState = function (state) {
    return {
        images: state.image.images
    };
};
var mapDispatch = function (dispatch) { return ({
    loadGpx: function (data, id, seq, location) {
        return dispatch(loadGpxThunk(data, id, seq, location));
    }
}); };
export default connect(mapState, mapDispatch)(GpxUpload);
//# sourceMappingURL=gpx-upload.js.map