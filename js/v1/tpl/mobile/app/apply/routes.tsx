import * as React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom';
import { HttpStatus404 } from '../httpStatus404/page/404';
import { routes as pageRoutes } from './page/routes';

export const routes = (
    <Router>
        <Switch>
            <Route path='/apply' component={() => pageRoutes} />
            <Route component={HttpStatus404} />
        </Switch>
    </Router>
);
