import * as React from "react";
import { Row, Column } from "./bootstrap";

const siteStyle = {padding: '20px', border: '5px'};
export const Site = (props:{children:any}) => {
    const href = window.location.href;
    const pageName = ['home', 'page1', 'page2', 'page3'];
    return <div style={siteStyle}> 
        <nav className="navbar navbar-inverse">
            <div className="container-fluid">
                <div className="navbar-header">
                    <a className="navbar-brand" href="#">WebSiteNameee</a>
                </div>
                <ul className="nav navbar-nav">
                    <li className={href=='home' ? 'active' : ''}><a href="#">Home</a></li>
                    <li className={href=='page1' ? 'active' : ''}><a href="#/page1">Page 1</a></li>
                    <li className={href=='page2' ? 'active' : ''}><a href="#/page2">Page 2</a></li>
                    <li className={href=='page3' ? 'active' : ''}><a href="#/page3">Page 3</a></li>
                </ul>
            </div>
        </nav>
        {props.children}
    </div>
}

interface PersonData {
    firstName:string,
    lastName:string,
    favoriteColors:string[]
}
export interface PersonProps {
    person:PersonData
}

export const Person = (props:PersonProps) => <div>
    <h4>{props.person.firstName} {props.person.lastName}</h4>
    <ul>
        {props.person.favoriteColors.map(color => <li key={color}>{color}</li>)}
    </ul>
</div>