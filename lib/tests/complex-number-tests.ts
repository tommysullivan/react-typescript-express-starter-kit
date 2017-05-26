import 'mocha';
import * as sinonChai from "sinon-chai";
import * as chaiOequal from "chai-oequal";
// import * as sourceMapSupport from "source-map-support";
import * as chai from 'chai';
import {expect} from 'chai';

// sourceMapSupport.install();

chai.use(sinonChai);
chai.use(chaiOequal);
chai.config.includeStack = true;
chai.config.showDiff = true;

export class ComplexNumber {
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

    equals(other:ComplexNumber | Number):boolean {
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

    toString():string {
        const operand = this.imaginaryPart < 0 ? '-' : '+';
        const imaginaryPartByItself = `${Math.abs(this.imaginaryPart)}i`;
        return this.realPart==0 
            ? this.imaginaryPart==0 
                ? '0'
                : `${this.imaginaryPart.toString()}i`
            : this.imaginaryPart==0 
                ? this.realPart.toString()
                : `${this.realPart} ${operand} ${imaginaryPartByItself}`;
        
    }

    toStringMike():string {
        const realPartByItself = this.realPart == 0 && this.imaginaryPart != 0 ? '' : this.realPart;
        const operand = this.imaginaryPart == 0 ? '' : this.imaginaryPart < 0 ? ' - ' : ' + ';
        const imaginaryPartByItself = this.imaginaryPart == 0 ? '' : `${Math.abs(this.imaginaryPart)}i`;
        return `${realPartByItself}${operand}${imaginaryPartByItself}`;
    }
}

export const ComplexAdditiveIdentity = new ComplexNumber(0,0);
export const ComplexMultiplicativeIdentity = new ComplexNumber(1,0);

describe('ComplexNumber', () => {

    describe('constructor', () => {
        it('takes two numbers, the real and imaginary parts', () => {
            expect(new ComplexNumber(3,4)).to.be.an.instanceOf(ComplexNumber);
        });
    });

    describe('toString()', () => {
        context(`when realPart is 5 and imaginaryPart is -2`, () => {
            it(`should yield 5 - 2i`, () => {
                expect(new ComplexNumber(5,-2).toString()).to.equal('5 - 2i');
            });
        });

        context(`when realPart is 5 and imaginaryPart is 2`, () => {
            it(`should yield 5 + 2i`, () => {
                expect(new ComplexNumber(5,2).toString()).to.equal('5 + 2i');
            });
        });

        context(`when realPart is 0 and imaginaryPart is 2`, () => {
            it(`should yield 2i`, () => {
                expect(new ComplexNumber(0,2).toString()).to.equal('2i');
            });
        });

        context(`when realPart is 0 and imaginaryPart is 0`, () => {
            it(`should yield 0`, () => {
                expect(new ComplexNumber(0,0).toString()).to.equal('0');
            });
        });

        context(`when realPart is 2 and imaginaryPart is 0`, () => {
            it(`should yield 2`, () => {
                expect(new ComplexNumber(2,0).toString()).to.equal('2');
            });
        });

        context(`when realPart is 0 and imaginaryPart is -7`, () => {
            it(`should yield -7i`, () => {
                expect(new ComplexNumber(0,-7).toString()).to.equal('-7i');
            });
        });
    });

    const c1 = new ComplexNumber(5,-2);
    const c2 = new ComplexNumber(-7,5);

    describe('plus', () => {
        context('when 5-2i add -7+5i', () => {
            it(`should yield -2 + 3i`, () => {
                expect(c1.plus(c2)).to.oequal(new ComplexNumber(-2,3));
            });
        });
    });

    describe('additiveInverse', () => {
        context('when 5-2i add -5+2i', () => {
            it(`should yield 0`, () => {
                expect(c1.plus(c1.additiveInverse)).to.oequal(ComplexAdditiveIdentity);
            });
        });
    });

    describe('multiplicativeInverse', () => {
        context('given a number and its multiplicativeInverse', () => {
            it(`should yield 1`, () => {
                expect(c1.times(c1.multiplicativeInverse)).to.oequal(ComplexMultiplicativeIdentity);
            });
        });
    });
    
    describe('times', () => {
        context('when 5-2i times 5+2i', () => {
            it(`should yield 29`, () => {
                expect(c1.times(new ComplexNumber(5,2)).equals(29)).to.be.true;
            });
        });
    });
    
    describe('minus', () => {
        context('when 5-2i minus 2+4i', () => {
            it(`should yield 3 - 6i`, () => {
                expect(c1.minus(new ComplexNumber(2,4))).to.oequal(new ComplexNumber(3, -6));
            });
        });
    });
    
    describe('dividedBy', () => {
        context('when 5-2i minus 2+4i', () => {
            it(`should yield 3 - 6i`, () => {
                expect(c1.dividedBy(new ComplexNumber(2,2))).to.oequal(new ComplexNumber(3/4, -7/4));
            });
        });
    });

});