//abstractions
interface PersonLike {
    firstName:string;
    lastName:string;
    speak():string;
}

//concretions (aka implementations)
//specific cases of the more general interface
const tommy:PersonLike = {
    firstName: "Tommy",
    lastName: "Sullivan",
    // speak():string { return "Hey"; }
    speak: () => "Hey!"
}

class PersonFromLiteralValues implements PersonLike {
    constructor(public readonly firstName:string, public readonly lastName:string) {}

    speak():string {
        return `Hi, I'm ${this.firstName} ${this.lastName}, nice to meet you`;
    }
}

const p1:PersonLike = new PersonFromLiteralValues("Tommy", "Sullivan");
const p2:PersonLike = new PersonFromLiteralValues("Mike", "Chen");

const people = [p1, p2];
console.log(people.map(person => person.speak()).join("; "));
console.log(people);

const num = 1;