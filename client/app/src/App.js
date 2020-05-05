import React from 'react';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import SignIn from 'components/SignIn/SignIn';
import PrivateRoute from './PrivateRoute';
// core components
import Admin from 'layouts/Admin.js';
import 'assets/css/material-dashboard-react.css?v=1.8.0';
const hist = createBrowserHistory();

function App() {
  return (
    <div>
      <Router history={hist}>
        <Switch>
          <Route path='/signin' component={SignIn} />
          <PrivateRoute path='/admin' component={Admin} />
          <Redirect from='/' to='/admin' />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
