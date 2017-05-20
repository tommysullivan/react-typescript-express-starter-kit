"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var mikesFavoritePeople = [
    {
        firstName: "Tommy",
        lastName: "Sullivan",
        favoriteColors: ["red", 'blue']
    },
    {
        firstName: "Bobby",
        lastName: "Chen",
        favoriteColors: ["green", 'orange']
    }
];
exports.Site = function () { return React.createElement("div", null,
    React.createElement("h1", null, "Mike Chen Resume"),
    React.createElement("h2", null, "Favorite People:"),
    React.createElement("ul", null, mikesFavoritePeople.map(function (person) { return React.createElement("li", { key: person.firstName },
        React.createElement(exports.Person, { person: person })); }))); };
exports.Person = function (props) { return React.createElement("div", null,
    React.createElement("h4", null,
        props.person.firstName,
        " ",
        props.person.lastName),
    React.createElement("ul", null, props.person.favoriteColors.map(function (color) { return React.createElement("li", { key: color }, color); }))); };
