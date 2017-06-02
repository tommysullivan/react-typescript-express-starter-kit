import './support';
import {expect} from 'chai';
import {Let} from 'mocha-let-ts';
import {ComplexVector, RealVector, Vector} from "../public/js/vector";
import {ComplexNumber} from "../public/js/ComplexNumber";
import {P, Pair} from "../public/js/Pair";

describe('Vector', () => {

    context('of Reals', () => {

        const realComponents = Let(()=>[] as number[]);
        const realVector = Let(() => RealVector(...realComponents()));

        describe('constructor', () => {
            it('yields a new Vector', () => {
                expect(realVector()).to.be.an.instanceOf(Vector);
            });
        });

        describe('dimension', () => {
            context('when realComponents is empty', () => {
                it(`is 0`, () => {
                    expect(realVector().dimension).to.equal(0);
                });
            });

            context('when realComponents is [1,2,3]', () => {
                realComponents(()=>[1,2,3]);
                it(`is 3`, () => {
                    expect(realVector().dimension).to.equal(3);
                });
            });
        });

        describe(`magnitude`, () => {
            context('when realComponents is empty', () => {
                it(`is 0`, () => {
                    expect(realVector().magnitude).to.equal(0);
                });
            });

            context('when realComponents, [1,1,1]', () => {
                realComponents(()=>[1,1,1]);
                it(`is root 3`, () => {
                    expect(realVector().magnitude).to.equal(Math.sqrt(3));
                });
            });
        });
    });

    context('of ComplexNumbers', () => {

        const complexComponents = Let(()=>[] as Pair<number,number>[]);
        const complexVector = Let(() => ComplexVector(...complexComponents()));

        describe('constructor', () => {
            it('yields a new Vector', () => {
                expect(complexVector()).to.be.an.instanceOf(Vector);
            });
        });

        describe('dimension', () => {
            context('when complexComponents is empty', () => {
                it(`is 0`, () => {
                    expect(complexVector().dimension).to.equal(0);
                });
            });

            context('when complexComponents is [P(1,1),P(-1,-1)]', () => {
                complexComponents(()=>[P(1,1),P(-1,-1)]);
                it(`is 2`, () => {
                    expect(complexVector().dimension).to.equal(2);
                });
            });
        });

        describe(`magnitude`, () => {
            context('when complexComponents is empty', () => {
                it(`is 0`, () => {
                    expect(complexVector().magnitude).to.equal(0);
                });
            });

            context('when complexComponents, [P(1,1),P(-1,-1)]', () => {
                complexComponents(()=>[P(1,1),P(-1,-1)]);
                it(`is 2`, () => {
                    expect(complexVector().magnitude).to.equal(2);
                });
            });
        });
    });
});