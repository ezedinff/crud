/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { UserPage } from './pages/UserPage/Loadable';

export function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={UserPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
}
