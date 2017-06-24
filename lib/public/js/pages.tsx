import * as React from "react";
import { Row, Column } from "./bootstrap";
import * as ReactDOM from "@types/react-dom";
import { getCounterValue, updateCounter } from "../../elasticsearch";
import * as Konva from "konva";
import {Layer, Circle, Stage, Group} from "react-konva";

//-----Page 1-----//
// Some static content
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

//-----Page 2-----//
// Button that increases by 1 every time you click it. Elasticsearch database hosted at localhost:9200 on Mike's computer.
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
    const textStyle = {
        fontSize: 14,
        fontFamily: "cambria",
        color: "#333"
    };
 
    return <div style={textStyle}>
        {this.props.display}
    </div>
  }
};

export class Page2 extends React.Component<void, {counter?:number}> {
    constructor() {
        super();
        this.state = {}
    }

    async getCounterValueAndSetState() {
        getCounterValue().then(x => this.setState({counter:x}));
    }

    private componentWillMount() {
        this.getCounterValueAndSetState();
    }

    async onClick() {
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

//-----Page 3-----//
//Bouncing square using DOM
const canvasHeight3 = 400;
const canvasWidth3 = 500;

export class Box extends React.Component {
    render () {      
        const canvasStyle = {
            display: "block",
            margin: "20px auto",
            border: "1px solid #666",
            height: `${canvasHeight3}px`,
            width: `${canvasWidth3}px`
        };
        return <div style={canvasStyle}>
            <BouncyBall/>
        </div>
    }
}

var frameRate = 1/40; // Seconds
var frameDelay = frameRate * 1000; // ms
var ballWidth = 40;
var ballHeight = 40;
var looptimer;

export class BouncyBall extends React.Component <void, {x:number, y:number, vx:number, vy:number}> {
    constructor() {
        super();
        this.state = {x: 50, y: 50, vx: 2, vy: 2};
    }

    moveBall() {
        this.setState({x: this.state.x + this.state.vx, y: this.state.y + this.state.vy});
        if (this.state.x >= canvasWidth3 - ballWidth || this.state.x <= 0) this.setState({vx: this.state.vx * -1})
        if (this.state.y >= canvasHeight3 - ballHeight || this.state.y <= 0) this.setState({vy: this.state.vy * -1})
    }

    private componentDidMount() {
        looptimer = setInterval(this.moveBall.bind(this), frameDelay);
    }

    private componentWillUnmount() {
        clearInterval(looptimer);
    }

    render() {
        const ballStyle = {
            width: `${ballWidth}px`,
            height: `${ballHeight}px`,
            backgroundColor: "blue",
            position: "relative",
            top: `${this.state.y}px`,
            left: `${this.state.x}px`,
        }
        return <div style={ballStyle}/>
    };
}

export const Page3 = () => <Box/>

//-----Page 4-----//
// Bouncing ball using canvas. Stole this from the internet and React-ified it
// Source: https://www.burakkanber.com/blog/modeling-physics-javascript-gravity-and-drag/
const canvasHeight4 = 400;
const canvasWidth4 = 500;
var mouse = {x: 0, y: 0, isDown: false};
var ctx;

var ball = {
    position: {x: canvasWidth4/2, y: 0},
    velocity: {x: 10, y: 0},
    mass: 0.1, //kg
    radius: 15, // 1px = 1cm
    restitution: -1
};
var Cd = 0.47;  // Dimensionless
var rho = .5; // kg / m^3
var A = Math.PI * ball.radius * ball.radius / (10000); // m^2
var ag = 9.81;  // m / s^2
var frameRate = 1/40; // Seconds
var frameDelay = frameRate * 1000; // ms
var looptimer;

function drawCircle(ctx:any, x:number, y:number, radius:number) {
    //ctx.translate(x, y);
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI*2, true);
    ctx.fill();
    ctx.closePath();
    //ctx.restore();
}

export class Canvas extends React.Component<void, void> {
    private componentDidMount() {
        ctx = this.refs.canvas.getContext('2d');
        this.updateCanvas();
        looptimer = setInterval(this.moveBall.bind(this), frameDelay);
    }
    private componentWillUnmount() {
        clearInterval(looptimer);
    }
    updateCanvas() {
        ctx.clearRect(0,0, canvasWidth4, canvasHeight4);
        ctx.save();
        drawCircle(ctx, ball.position.x, ball.position.y, ball.radius);
    }
    getMousePosition(e) {
        mouse.x = e.pageX - canvas.offsetLeft;
        mouse.y = e.pageY - canvas.offsetTop;
    }
    mouseDown(e) {
        this.getMousePosition(e);
        mouse.isDown = true;
        console.log("grr");
        ball.position.x = mouse.x;
        ball.position.y = mouse.y;
    }
    mouseUp(e) {
        mouse.isDown = false;
        ball.velocity.y = (ball.position.y - mouse.y) / 10;
        ball.velocity.x = (ball.position.x - mouse.x) / 10;
    }
    moveBall() {
        if (!mouse.isDown) {
            // Do physics
                // Drag force: Fd = -1/2 * Cd * A * rho * v * v
            var Fx = -0.5 * Cd * A * rho * ball.velocity.x * ball.velocity.x * ball.velocity.x / Math.abs(ball.velocity.x);
            var Fy = -0.5 * Cd * A * rho * ball.velocity.y * ball.velocity.y * ball.velocity.y / Math.abs(ball.velocity.y);
            
            Fx = (isNaN(Fx) ? 0 : Fx);
            Fy = (isNaN(Fy) ? 0 : Fy);
            
                // Calculate acceleration ( F = ma )
            var ax = Fx / ball.mass;
            var ay = ag + (Fy / ball.mass);
                // Integrate to get velocity
            ball.velocity.x += ax*frameRate;
            ball.velocity.y += ay*frameRate;
            
                // Integrate to get position
            ball.position.x += ball.velocity.x*frameRate*100;
            ball.position.y += ball.velocity.y*frameRate*100;
        }
        // Handle collisions
        if (ball.position.y > canvasHeight4 - ball.radius) {
            ball.velocity.y *= ball.restitution;
            ball.position.y = canvasHeight4 - ball.radius;
        }
        if (ball.position.x > canvasWidth4 - ball.radius) {
            ball.velocity.x *= ball.restitution;
            ball.position.x = canvasWidth4 - ball.radius;
        }
        if (ball.position.x < ball.radius) {
            ball.velocity.x *= ball.restitution;
            ball.position.x = ball.radius;
        }
        this.updateCanvas()
        if (mouse.isDown) {
            ctx.beginPath();
            ctx.moveTo(ball.position.x, ball.position.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
            ctx.closePath();
        }
    }
    
    render () {
        const canvasStyle = {
            //display: "block",
            margin: "20px auto",
            border: "1px solid #666"
        };
        return <canvas
            id="canvas"
            ref="canvas"
            height={canvasHeight4}
            width={canvasWidth4}
            style={canvasStyle}
            onMouseMove={this.getMousePosition.bind(this)}
            onMouseDown={this.mouseDown.bind(this)}
            onMouseUp={this.mouseUp.bind(this)}>
        </canvas>
    }
}

export const Page4 = () => <Canvas>Browser does not support canvas.</Canvas>

//-----Page 5-----//
// Using konva library for a bit of interactivity still can't figure out how to set state to object's dragged location
export class Planet extends React.Component<void, {isMouseInside:boolean, color:any, x:number, y:number, vx:number, vy:number}> {
    constructor(...args) {
      super(...args);
      this.state = {
         isMouseInside: false,
         color: Konva.Util.getRandomColor(),
         x:50,
         y:50,
         vx:2,
         vy:2
      };
      this.handleMouseEnter = this.handleMouseEnter.bind(this);
      this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }
    handleMouseEnter() {
      this.setState({
        isMouseInside: true
      });
    }
    handleMouseLeave() {
      this.setState({
        isMouseInside: false
      });
    }
    handleOnClick() {
        this.setState({
            color: Konva.Util.getRandomColor()
        })
    }

    render() {
        return (
            <Circle
                x={this.state.x} y={this.state.y} radius={50}
                fill={this.state.color}
                stroke="black"
                strokeWidth={this.state.isMouseInside ? 5 : 1}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                onClick={this.handleOnClick.bind(this)}
                //onDragEnd={this.onDragEnd.bind(this)}
                draggable="true"
            />
        );
    }
} 

export class Universe extends React.Component<void, void> {
    render() {
        return (
            <div color="black">
        <Stage width={700} height={700}>
            <Layer>
                <Planet/>
            </Layer>
        </Stage>
        </div>
        );
    }
}

export const Page5 = () => <Universe/>