import * as React from "react";
import { Row, Column } from "./bootstrap";

const siteStyle = {padding: '20px', border: '5px'};
export const Site = (props:{children:any}) => {
    const path = window.location.hash;
    return <div style={siteStyle}> 
        <nav className="navbar navbar-inverse">
            <div className="container-fluid">
                <div className="navbar-header">
                    <a className="navbar-brand" href="#">Home</a>
                </div>
                <ul className="nav navbar-nav">
                    {/* <li className={path=='#/' ? 'active' : ''}><a href="#">Home</a></li>  */}
                    <li className={path=='#/AboutMe' ? 'active' : ''}><a href="#/AboutMe">About Me</a></li> 
                    <li className={path=='#/page2' ? 'active' : ''}><a href="#/page2">Counter</a></li>
                    <li className={path=='#/page3' ? 'active' : ''}><a href="#/page3">Bouncing Box</a></li>
                    <li className={path=='#/page4' ? 'active' : ''}><a href="#/page4">Bouncy Ball</a></li>
                    <li className={path=='#/page5' ? 'active' : ''}><a href="#/page5">Empty</a></li>
                </ul>
            </div>
        </nav>
        {props.children}
    </div>
}