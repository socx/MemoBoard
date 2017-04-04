import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import Router from './Router';
import persistState from 'redux-localstorage';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import { hashHistory } from 'react-router';
import thunk from 'redux-thunk';
import reducer from './reducer';

const middlewares = [thunk, routerMiddleware(hashHistory)];
const enhancers = [persistState('auth')];

const enhancedStore = compose(
    applyMiddleware(...middlewares),
    ...enhancers)(createStore);

const store = enhancedStore(reducer, {});
const history = syncHistoryWithStore(hashHistory, store);

//render setup
const MOUNT_NODE = document.getElementById('react-container');

let render = () => { 
    ReactDOM.render(
    <Provider store={store}>
        <div>
            <Router store={store} history={history} location={location} />
        </div>
    </Provider>
    , MOUNT_NODE)
}

//app start
render();