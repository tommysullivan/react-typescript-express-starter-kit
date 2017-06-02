import {Scalar} from "./scalar";

export class RealNumber implements Scalar {
    constructor(private readonly primitiveNumber:number) {}

    plus(other:RealNumber):RealNumber {
        return new RealNumber(this.primitiveNumber + other.primitiveNumber);
    }

    times(other:RealNumber):RealNumber {
        return new RealNumber(this.primitiveNumber * other.primitiveNumber);
    }

    minus(other:RealNumber):RealNumber {
        return this.plus(other.additiveInverse);
    }

    dividedBy(other:RealNumber):RealNumber {
        return this.times(other.multiplicativeInverse);
    }

    equals(other:RealNumber | number):boolean {
        return typeof(other)=='number'
            ? this.primitiveNumber == other
            : this.primitiveNumber == other.asNumber;
    }

    get multiplicativeInverse():RealNumber {
        return new RealNumber(1 / this.primitiveNumber);
    }

    get additiveInverse():RealNumber {
        return new RealNumber(this.primitiveNumber * -1);
    }

    get squared(): RealNumber {
        return this.toThePowerOf(2);
    }

    toThePowerOf(power: number):RealNumber {
        let result = 1;
        for(let c = 0; c < Math.abs(power); c++) {
            result = result * this.primitiveNumber;
        }
        return new RealNumber(power < 0 ? 1 / result : result);
    }

    get asNumber():number {
        return this.primitiveNumber;
    }

    toString():string {
        return `${this.primitiveNumber}`;
    }

    get magnitude():number {
        return this.asNumber;
    }

    get complexConjugate():Scalar {
        return this;
    }
}

export const RealAdditiveIdentity:RealNumber = new RealNumber(0);