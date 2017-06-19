import * as React from "react";
import { Row, Column } from "./bootstrap";

const siteStyle = {padding: '20px', border: '5px'};
export const Site = (props:{children:any}) => {
    const path = window.location.hash;
    return <div style={siteStyle}> 
        <nav className="navbar navbar-inverse">
            <div className="container-fluid">
                <div className="navbar-header">
                    <a className="navbar-brand" href="#">WebSiteNameee</a>
                </div>
                <ul className="nav navbar-nav">
                    <li className={path=='#/' ? 'active' : ''}><a href="#">Home</a></li>
                    <li className={path=='#/page1' ? 'active' : ''}><a href="#/page1">Page 1</a></li>
                    <li className={path=='#/page2' ? 'active' : ''}><a href="#/page2">Page 2</a></li>
                    <li className={path=='#/page3' ? 'active' : ''}><a href="#/page3">Page 3</a></li>
                </ul>
            </div>
        </nav>
        {props.children}
    </div>
}