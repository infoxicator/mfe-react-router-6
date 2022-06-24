import React from 'react';
import { Routes, Route, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import {
  StylesProvider,
  createGenerateClassName,
} from '@material-ui/core/styles';

import Landing from './components/Landing';
import Pricing from './components/Pricing';

const generateClassName = createGenerateClassName({
  productionPrefix: 'ma',
});

export default ({ history }) => {
  return (
    <div>
      <StylesProvider generateClassName={generateClassName}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/pricing" element={<Pricing/>} />
          </Routes>
        </HistoryRouter>
      </StylesProvider>
    </div>
  );
};
