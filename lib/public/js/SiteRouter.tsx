import * as React from "react";
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { Site } from "./Site";
import { Page1, Page2, Page3 } from "./pages";

export const SiteRouter = () => <Router history={hashHistory} onUpdate={() => window.scrollTo(0,0)}>
    <Route path="/" component={Site}>
        <Route path="page1" component={() => <Page1 heading="p1 heading" />} />
        <Route path="page2" component={Page2} />
        <Route path="page3" component={Page3} />
        <IndexRoute component={() => <Page1 heading="home heading" />} />
    </Route>
</Router>