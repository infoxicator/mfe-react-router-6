import React, { lazy, Suspense, useState, useEffect } from 'react';
import { unstable_HistoryRouter as HistoryRouter, Route, Routes } from 'react-router-dom';
import {
  StylesProvider,
  createGenerateClassName,
} from '@material-ui/core/styles';
import { createBrowserHistory } from 'history';

import Progress from './components/Progress';
import Header from './components/Header';

const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));
const DashboardLazy = lazy(() => import('./components/DashboardApp'));

const generateClassName = createGenerateClassName({
  productionPrefix: 'co',
});
const history = createBrowserHistory();
const HistoryContext = React.createContext(undefined);

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      history.push('/dashboard');
    }
  }, [isSignedIn]);

  return (
    <HistoryContext.Provider value={history}>
    <HistoryRouter history={history}>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header
            onSignOut={() => setIsSignedIn(false)}
            isSignedIn={isSignedIn}
          />
          <Suspense fallback={<Progress />}>
            <Routes>
              <Route path="/auth/*" element={<AuthLazy onSignIn={() => setIsSignedIn(true)} />} />
              <Route path="/dashboard" element={<DashboardLazy />}>
              </Route>
              <Route path="/*" element={<MarketingLazy />} />
            </Routes>
          </Suspense>
        </div>
      </StylesProvider>
    </HistoryRouter>
    </HistoryContext.Provider>
  );
};

export const useHistory = () => {
  const history = React.useContext(HistoryContext);

  if (!history) {
    throw new Error(
      `You must add a UniversalRouter component at the root of the component tree`
    );
  }

  return history;
};