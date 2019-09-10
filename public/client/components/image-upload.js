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
/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadImagesThunk } from '../store/image';
var ImageUpload = /** @class */ (function (_super) {
    __extends(ImageUpload, _super);
    function ImageUpload() {
        var _this = _super.call(this) || this;
        _this.onUpload = function (e) {
            e.preventDefault();
            var photos = Array.from(e.target.files);
            var formData = new FormData();
            photos.forEach(function (file, i) {
                formData.append(i, file);
            });
            _this.props.loadImages(formData, _this.state.offset);
        };
        _this.zoneChange = function (e) {
            event.preventDefault();
            _this.setState({ offset: e.target.value });
        };
        _this.state = {
            offset: 'Z'
        };
        return _this;
    }
    ImageUpload.prototype.render = function () {
        var offsets = [
            '-12:00',
            '-11:00',
            '-10:00',
            '-9:30',
            '-9:00',
            '-8:00',
            '-7:00',
            '-6:00',
            '-5:00',
            '-4:00',
            '-3:30',
            '-3:00',
            '-2:00',
            '-1:00',
            'UTC',
            '+1:00',
            '+2:00',
            '+3:00',
            '+3:30',
            '+4:00',
            '+4:30',
            '+5:00',
            '+5:30',
            '+5:45',
            '+6:00',
            '+6:30',
            '+7:00',
            '+8:00',
            '+8:45',
            '+9:00',
            '+9:30',
            '+10:00',
            '+10:30',
            '+11:00',
            '+12:00',
            '+12:45',
            '+13:00',
            '+14:00'
        ];
        return (React.createElement("div", { className: "upload" },
            React.createElement("label", null, "First, select a UTC Offset"),
            React.createElement("select", { value: this.state.offset, onChange: this.zoneChange }, offsets.map(function (offset, idx) {
                return offset === 'UTC' ? (React.createElement("option", { key: idx, value: "Z" }, offset)) : (React.createElement("option", { key: idx, value: offset }, offset));
            })),
            React.createElement("label", null, "Next, upload images"),
            React.createElement("input", { type: "file", onChange: this.onUpload, multiple: true })));
    };
    return ImageUpload;
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
    loadImages: function (data, offset) { return dispatch(loadImagesThunk(data, offset)); }
}); };
export default connect(mapState, mapDispatch)(ImageUpload);
//# sourceMappingURL=image-upload.js.map