import * as React from "react";
import * as ReactDOM from "react-dom";  
import { SiteRouter } from "./SiteRouter";

const element = document.getElementById('reactRoot');
if(element) {
    ReactDOM.render(<SiteRouter />, element);
}