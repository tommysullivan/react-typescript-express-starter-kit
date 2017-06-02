import {RealAdditiveIdentity, RealNumber} from "./RealNumber";
import {Scalar} from "./scalar";
import {ComplexAdditiveIdentity, ComplexNumber} from "./ComplexNumber";
import {Pair, zip} from "./Pair";

export class Vector<NumberType extends Scalar> {
    constructor(public components:NumberType[], private additiveIdentity:NumberType) {}

    get dimension():number {
        return this.components.length;
    }

    times(other:Vector<Scalar>):Scalar {
        return zip(this.components, other.components)
            .map(p => p._1.times(p._2))
            .reduce((a,b)=>a.plus(b), this.additiveIdentity);
    }

    get complexConjugate():Vector<Scalar> {
        return new Vector(this.components.map(c => c.complexConjugate), this.additiveIdentity);
    }

    get magnitude():number {
        return Math.sqrt(this.times(this.complexConjugate).asNumber);
    }
    //etc.
}

export function RealVector(...realNumbers:Array<number>):Vector<RealNumber> {
    return new Vector(realNumbers.map(x => new RealNumber(x)), RealAdditiveIdentity);
}

export function ComplexVector(...realImaginaryPairs:Array<Pair<number, number>>):Vector<ComplexNumber> {
    return new Vector(realImaginaryPairs.map(pair => new ComplexNumber(pair._1, pair._2)), ComplexAdditiveIdentity);
}