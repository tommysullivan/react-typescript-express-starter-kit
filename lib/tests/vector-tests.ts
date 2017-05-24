import 'mocha';
import * as sinonChai from "sinon-chai";
// import * as sourceMapSupport from "source-map-support";
import * as chai from 'chai';
import {expect} from 'chai';

// sourceMapSupport.install();

chai.use(sinonChai);
chai.config.includeStack = true;
chai.config.showDiff = true;

describe('2d vector', () => {
    describe('create', () => {
        it('can be created by calling the Vector2D constructor, passing two real numbers and yield a new object of type Vector2D', () => {
            expect(new Vector2d(3,4)).to.be.a(Vector2d);
        });
    })
})