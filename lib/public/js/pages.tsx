import * as React from "react";
import { Row, Column } from "./bootstrap";
import { Person } from "./Site";

interface PersonData {
    firstName:string,
    lastName:string,
    favoriteColors:string[]
}

const mikesFavoritePeople:PersonData[] = [
    {
        firstName: "Tommy",
        lastName: "Sullivan",
        favoriteColors: ["red",'blue']
    },
    {
        firstName: "Bobby",
        lastName: "Chen",
        favoriteColors: ["green",'orange']
    }
]

const words = ["hi","bye",'hello','goodbye'];

export const Page1 = () => <div>
    <h1>Mike Chen Resume</h1>
    <Row>
        {words.map(word => <Column columnWidthForMediumScreen={5} ><p>{word}</p></Column>)}
    </Row>
    <ul>
        {mikesFavoritePeople.map(person => <li key={person.firstName}><Person person={person} /></li>)}
    </ul>
</div>

export const Page2 = () => <h1>Page2</h1>
export const Page3 = () => <h1>Page3</h1>