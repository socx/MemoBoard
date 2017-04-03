import { GET_STUFF } from './constants'
import { createReducer }    from '../../shared/utils';

const initialState = {
  stuff: {"a" : 0, "b": 0}
}

const getStuff  = (state, payload) => {
    return { stuff: {"a" : state.stuff.a + payload.x, "b" : state.stuff.b + payload.y } }
}

const reducerMap = {
  [GET_STUFF]: (state, payload) => getStuff(state, payload),
}

export default createReducer(initialState, reducerMap);