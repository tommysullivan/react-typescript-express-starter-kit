import * as React from "react";

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

export const Site = () => <div>
    <h1>Mike Chen Resume</h1>
    <h2>Favorite People:</h2>
    <ul>
        {mikesFavoritePeople.map(person => <li key={person.firstName}><Person person={person} /></li>)}
    </ul>
</div>

export interface PersonProps {
    person:PersonData
}

export const Person = (props:PersonProps) => <div>
    <h4>{props.person.firstName} {props.person.lastName}</h4>
    <ul>
        {props.person.favoriteColors.map(color => <li key={color}>{color}</li>)}
    </ul>
</div>