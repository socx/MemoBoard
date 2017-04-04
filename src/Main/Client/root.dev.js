import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import Router from './Router';
import DevTools from './DevTools';
import persistState from 'redux-localstorage';
import { persistState as persisStateDevTools } from 'redux-devtools';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import { hashHistory } from 'react-router';
import thunk from 'redux-thunk';
import reducer from './reducer';

let getDebugSessionKey = () => {
    const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
    return (matches && matches.length > 0)? matches[1] : null;
}

//store & hmr setup
const middlewares = [thunk, routerMiddleware(hashHistory)];
const enhancers = [ persistState('auth') ];
let composeEnhancers = compose;

if('__REDUX_DEVTOOLS_EXTENSION_COMPOSE__' in window) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        name: 'Memo Board', actionsBlacklist: ['REDUX_STORAGE_SAVE']
      })
} else {
    enhancers.push(DevTools.instrument(), persisStateDevTools(getDebugSessionKey()));
}

const enhancedStore = composeEnhancers(
  applyMiddleware(...middlewares),
  ...enhancers)(createStore);

const store = enhancedStore(reducer, {});
const history = syncHistoryWithStore(hashHistory, store);

if (module.hot) {
    const renderApp = render;
    const renderError = (error) => {
      const RedBox = require('redbox-react').default;

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE);
    }

    // Wrap render in try/catch
    render = () => {
      try {
        renderApp();
      } catch (error) {
        renderError(error);
      }
    }

    module.hot.accept(() => {
        setImmediate(() => {
            ReactDOM.unmountComponentAtNode(MOUNT_NODE);
            render();
        })
    });
}

//render setup
const MOUNT_NODE = document.getElementById('react-container');

let render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <div>
                <Router store={store} history={history} location={location} />
                { ('__REDUX_DEVTOOLS_EXTENSION_COMPOSE__' in window) || <DevTools /> }
            </div>
        </Provider>
        , MOUNT_NODE)
}

//app start
render();