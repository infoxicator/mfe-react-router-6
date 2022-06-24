import React from 'react';
import { Routes, Route, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import {
  StylesProvider,
  createGenerateClassName,
} from '@material-ui/core/styles';

import Signin from './components/Signin';
import Signup from './components/Signup';

const generateClassName = createGenerateClassName({
  productionPrefix: 'au',
});

export default ({ history, onSignIn }) => {
  return (
    <div>
      <StylesProvider generateClassName={generateClassName}>
        <HistoryRouter history={history} >
          <Routes>
            <Route path="/auth/signin" element={<Signin onSignIn={onSignIn} />} />
            <Route path="/auth/signup" element={<Signup onSignIn={onSignIn} />}/>
          </Routes>
        </HistoryRouter>
      </StylesProvider>
    </div>
  );
};
