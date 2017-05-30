import * as chaiOequal from "chai-oequal";
import * as chai from 'chai';
import 'mocha';
import * as sinonChai from "sinon-chai";

chai.use(sinonChai);
chai.use(chaiOequal);
chai.config.includeStack = true;
chai.config.showDiff = true;