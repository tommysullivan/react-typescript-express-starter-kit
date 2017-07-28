import * as React from "react";
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { Site } from "./Site";
import { HomePage, AboutMe, Page2, Page3, Page4, Page5 } from "./pages";

export const SiteRouter = () => <Router history={hashHistory} onUpdate={() => window.scrollTo(0,0)}>
    <Route path="/" component={Site}>
        <Route path="AboutMe" component={() => <AboutMe heading="p1 heading" />} />
        <Route path="page2" component={Page2} />
        <Route path="page3" component={Page3} />
        <Route path="page4" component={Page4} />
        <Route path="page5" component={Page5} />
        <IndexRoute component={() => <HomePage heading="home heading" />} />
    </Route>
</Router>