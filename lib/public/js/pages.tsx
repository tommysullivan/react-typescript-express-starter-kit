import * as React from "react";
import { Row, Column } from "./bootstrap";
import * as ReactDOM from "@types/react-dom";
import * as $ from 'jquery';
import { getCounterValue, updateCounter } from "../../elasticsearch";

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

export interface IPageProps {
    heading:string;
}

export const Page1 = (props:IPageProps) => (
    <div>
        <h1>Mike Chen Resume {props.heading}</h1>
        <Row>
            {words.map(word => <Column columnWidthForMediumScreen={5} ><p className="fa ">{word}</p></Column>)}
        </Row>
        <ul>
            {mikesFavoritePeople.map(person => <li key={person.firstName}><Person person={person} /></li>)}
        </ul>
    </div>
)

/////////////////////////////////////////////////////////////////////

const backgroundStyle = {
    padding: 50,
    backgroundColor: "#00F000",
    width: 250,
    height: 150,
    borderRadius: 10,
    textAlign: "center"
};
 
const buttonStyle = {
    fontSize: "1em",
    width: 30,
    height: 30,
    fontFamily: "cambria",
    color: "#333",
    lineHeight: "3px"
};

class Counter extends React.Component<{display?:number}, void> {

  render() {
      var textStyle = {
        fontSize: 14,
        fontFamily: "cambria",
        color: "#333"
      };
 
      return (
        <div style={textStyle}>
          {this.props.display}
        </div>
      )
  }
};

export class If extends React.Component<{condition:boolean}, void> {
    render():any { return this.props.condition ? this.props.children : null }
}

async function test() {
    const httpResponse = await getCounterValue();
        console.log(`gg${httpResponse}`);
}
test();

export class Page2 extends React.Component<void, {counter?:number}> {
    constructor() {
        super();
        this.state = {}
    }

    async getCounterValueAndSetState() {
        //const httpResponse = await $.ajax({url: '/counter'});
        //const httpResponse = await getCounterValue();
        //this.setState({counter:httpResponse});
        getCounterValue().then(x => this.setState({counter:x}));
    }

    private componentWillMount() {
        this.getCounterValueAndSetState();
    }

    async onClick() {
        //const httpResponse = await $.ajax({type: "POST", url: '/addToCounter'});
        const counterValue = await getCounterValue();
        await updateCounter(counterValue, 1);
        this.getCounterValueAndSetState();
    }

    render() { 
        return <div style={backgroundStyle}>
            <Counter display={this.state.counter} />
            <button style={buttonStyle} onClick={() => this.onClick()}>+</button>
        </div>
    }
};

export const Page3 = () => <h1>Page3</h1>

