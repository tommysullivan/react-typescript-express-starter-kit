export interface Scalar {
    plus(other:Scalar):Scalar;
    times(other:Scalar):Scalar;
    minus(other:Scalar):Scalar;
    dividedBy(other:Scalar):Scalar;
    squared:Scalar;
    toThePowerOf(power:number):Scalar;
    equals(other:Scalar | number):boolean;
    multiplicativeInverse:Scalar;
    additiveInverse:Scalar;
    asNumber:number;
    toString():string;
    magnitude:number;
    complexConjugate:Scalar;
}