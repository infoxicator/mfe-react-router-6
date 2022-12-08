import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';

import Signin from './components/Signin';
import Signup from './components/Signup';
import Outline from './components/Outline';


export default ({ history }) => {

  React.useEffect(() => {
    const hostNavigationHandler = ({ detail }) => {
      const { pathname: nextPathname } = detail ;
      const { pathname } = history.location;
      if (nextPathname !== pathname) {
        history.push(nextPathname);
      }

    }
    window.addEventListener('[host] navigated', hostNavigationHandler)
    return () => { 
      window.removeEventListener('[host] navigated', hostNavigationHandler)
    }
  }, []); 
  return (
    <Outline name="auth" color="green">
        <Router history={history}>
          <Switch>
            <Route path="/auth/signin" component={Signin} />
            <Route path="/auth/signup" component={Signup} />
          </Switch>
        </Router>
    </Outline>
  );
};
