import * as React from "react";
import * as ReactDOM from "react-dom";
import {Site} from "./Site";

const element = document.getElementById('reactRoot');
if(element) {
    ReactDOM.render(<Site />, element);
}