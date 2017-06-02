import {Scalar} from "./scalar";

export class ComplexNumber implements Scalar {
    constructor(public readonly realPart:number, public readonly imaginaryPart:number) {}

    plus(other:ComplexNumber):ComplexNumber {
        return new ComplexNumber(this.realPart + other.realPart, this.imaginaryPart + other.imaginaryPart);
    }

    times(other:ComplexNumber):ComplexNumber {
        return new ComplexNumber(
            this.realPart * other.realPart - this.imaginaryPart * other.imaginaryPart,
            this.realPart * other.imaginaryPart + this.imaginaryPart * other.realPart
        );
    }

    minus(other:ComplexNumber):ComplexNumber {
        return this.plus(other.additiveInverse);
    }

    dividedBy(other:ComplexNumber):ComplexNumber {
        return this.times(other.multiplicativeInverse);
    }

    equals(other:ComplexNumber | number):boolean {
        const otherAsComplex = other as ComplexNumber;
        console.log(other);
        console.log(typeof(other));
        return typeof(other)=='number'
            ? this.equals(new ComplexNumber(other as number, 0))
            : this.realPart == otherAsComplex.realPart && this.imaginaryPart == otherAsComplex.imaginaryPart;
    }

    get multiplicativeInverse():ComplexNumber {
        const denominator = this.realPart * this.realPart + this.imaginaryPart * this.imaginaryPart;
        return new ComplexNumber(this.realPart / denominator, -this.imaginaryPart / denominator)
    }

    get additiveInverse():ComplexNumber {
        return this.times(new ComplexNumber(-1,0));
    }

    get complexConjugate():ComplexNumber {
        return new ComplexNumber(this.realPart, this.imaginaryPart * -1);
    }

    get asNumber():number {
        if(this.imaginaryPart != 0) throw new Error(`${this} cannot be represented as a single real number`);
        return this.realPart;
    }

    toString():string {
        const realPartByItself = this.realPart == 0 && this.imaginaryPart != 0 ? '' : this.realPart;
        const space = this.imaginaryPart != 0 && this.realPart != 0 ? ' ' : '';
        const operand = this.imaginaryPart == 0 || this.realPart == 0 && this.imaginaryPart > 0 ? '' :
            this.imaginaryPart < 0 ? '-' : '+';
        const imaginaryPartByItself = this.imaginaryPart == 0 ? '' :
            Math.abs(this.imaginaryPart) == 1 ? 'i' : `${Math.abs(this.imaginaryPart)}i`;
        return `${realPartByItself}${space}${operand}${space}${imaginaryPartByItself}`;
    }

    get squared(): Scalar {
        return this.toThePowerOf(2);
    }

    toThePowerOf(power: number): Scalar {
        throw new Error('not implemented');
    }

    get magnitude():number {
        // return Math.sqrt(this.realPart * this.realPart + this.imaginaryPart * this.imaginaryPart);
        return Math.sqrt(this.times(this.complexConjugate).asNumber);
    }
}

export const ComplexAdditiveIdentity = new ComplexNumber(0,0);
export const ComplexMultiplicativeIdentity = new ComplexNumber(1,0);