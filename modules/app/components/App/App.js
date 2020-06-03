import { ConnectedRouter } from 'connected-react-router';
import PropTypes from 'prop-types';
import React from 'react';
import { Provider } from 'react-redux';

import { Routes } from '../../routes';
import { ModalsRoot } from '../../containers/ModalsRoot';
import { NotificationsRoot } from '../../containers/NotificationsRoot';
import { Layout } from '../Layout';

const App = props => {
  return (
    <Provider store={props.store}>
      <ConnectedRouter history={props.history}>
        <Layout>
          <Routes />
        </Layout>
      </ConnectedRouter>
      <ModalsRoot />
      <NotificationsRoot />
    </Provider>
  );
};

App.propTypes = {
  history: PropTypes.object,
  store: PropTypes.object,
};

export { App };
