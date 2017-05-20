"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var Site_1 = require("./Site");
var element = document.getElementById('reactRoot');
if (element) {
    ReactDOM.render(React.createElement(Site_1.Site, null), element);
}
