import React from 'react';
import { Redirect, Switch } from 'react-router';
import { Route } from 'react-router-dom';

import { asyncLoad } from '../common/utils/asyncLoad';
import {
  defaultPath,
  manufacturersPath,
  productsPath,
  usersPath,
} from './config/routePaths';

const AsyncManufacturersList = asyncLoad(() =>
  import('./containers/ManufacturersListContainer/ManufacturersListContainer'),
);
const AsyncProductsList = asyncLoad(() =>
  import('./containers/ProductsListContainer/ProductsListContainer'),
);
const AsyncUsersList = asyncLoad(() =>
  import('./containers/UsersListsContainer/UsersListContainer'),
);

export const Routes = () => (
  <Switch>
    <Route path={usersPath} component={AsyncUsersList} />
    <Route path={productsPath} component={AsyncProductsList} />
    <Route path={manufacturersPath} component={AsyncManufacturersList} />
    <Redirect to={defaultPath} />
  </Switch>
);
