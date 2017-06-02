export interface Number {
    plus(other:Number):Number;
    times(other:Number):Number;
    minus(other:Number):Number;
    dividedBy(other:Number):Number;
    equals(other:Number | number):boolean;
    multiplicativeInverse:Number;
    additiveInverse:Number;
    complexConjugate:Number;
    //realComponent:number;
    realPart:number;
    toString():string;
}

export class RealNumber implements Number {
    constructor(public readonly realPart:number) {}

    plus(other:RealNumber):RealNumber {
        return new RealNumber(this.realPart + other.realPart);
    }

    times(other:RealNumber):RealNumber {
        return new RealNumber(this.realPart * other.realPart);
    } 

    minus(other:RealNumber):RealNumber {
        return this.plus(other.additiveInverse);
    }

    dividedBy(other:RealNumber):RealNumber {
        return this.times(other.multiplicativeInverse);
    }

    equals(other:RealNumber | number):boolean {
        return typeof(other)=='number'
            ? this.realPart == other
            : this.realPart == other.realPart;
    }

    get multiplicativeInverse():RealNumber {
        return new RealNumber(1 / this.realPart);
    }

    get additiveInverse():RealNumber {
        return new RealNumber(this.realPart * -1);
    }

    get complexConjugate():RealNumber {
        return new RealNumber(this.realPart);
    }

    get realComponent():number {
        return this.realPart;
    }

    toString():string {
        return `${this.realPart}`;
    }
}

export class ComplexNumber implements Number {
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

    get realComponent():number {
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
}

export const ComplexAdditiveIdentity = new ComplexNumber(0,0);
export const ComplexMultiplicativeIdentity = new ComplexNumber(1,0);

export class Vector<NumberType extends Number> {
    constructor(private components:NumberType[]) {}

    get dimension():number {
        return this.components.length;
    }

    get magnitude():number {
        const squares = this.components.map(c => c.times(c));
        const sumOfSquares = squares.reduce((a,b) => a + b.realComponent, 0);
        return Math.sqrt(sumOfSquares);
    }
    //etc.
}

export function NumberToRealNumberArray(numberArray: number[]):RealNumber[] {
    return numberArray.map(x => new RealNumber(x));
}

export function NumberToComplexNumberArray(realArray: number[], imaginaryArray: number[]):ComplexNumber[] {
    let ComplexArray: Array<ComplexNumber> = [];
    if (realArray.length == imaginaryArray.length) {
        for (var i = 0; i < realArray.length; i++) {
            ComplexArray[i] = new ComplexNumber(realArray[i], imaginaryArray[i]);
        }
    }
    return ComplexArray;
}

const lalalala = new Vector<ComplexNumber>(NumberToRealNumberArray([1,2,3])); //error
const lalala = new Vector<RealNumber>(NumberToRealNumberArray([1,2,3]));
const lala = new Vector<ComplexNumber>(NumberToComplexNumberArray([1,2,3], [4,7,2]));
const la = new Vector<RealNumber>(NumberToComplexNumberArray([1,2,3], [4,7,2])); //error