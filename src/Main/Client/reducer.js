import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import * as ideas from 'ideas/store/reducer';

const initialState = {
    ideas : ideas.initialState,
    routing: {}
};

const reducers = combineReducers({
    routing                 : routerReducer,
    ideas                   : ideas.default,
});

export default function(state, action) {
    return reducers(state, action);
}
