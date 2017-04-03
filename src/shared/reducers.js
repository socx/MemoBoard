import ideas from '../Ideas/store/reducer'

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'

const initialState = {
    ideas: ideas.initialState,
    routing: {}
};
const reducers = combineReducers({
    ideas: ideas,
    routing: routerReducer
})

export default function(state, action) {
    
    return (action.type === 'RESET_STATE') ? initialState : reducers(state, action);
}

