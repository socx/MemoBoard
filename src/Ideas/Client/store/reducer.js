import { combineReducers }  from 'redux';
import { createReducer }    from 'main/Utils';
import * as constants       from './constants';
import { List, Map, fromJS }        from 'immutable';

export const initialState = Object.assign({}, {
    messages: List(),
    errors: List(),
    isFetchingIdeas : false,
    isAddingIdea : false,
    isUpdatingIdea : false,
    isDeletingIdea : false,
    ideaList: List(),
    newestIdeaId : null,
    newlySavedIdeaId : null
});

// reducer functions
const getIdeasSuccess  = (state, payload) => {  
    const errors = List();
    const ideaList = payload.ideas && payload.ideas.length > 0 ? List(payload.ideas) : List();    
    return { ...state, errors, isFetchingIdeas: false , ideaList};
}

const getIdeasFailed  = (state, payload) => {  
    let errors = state.errors;  
    errors = errors.push(payload);
    return { ...state, errors, isFetchingIdeas: false };
}

const addIdeaSuccess  = (state, payload) => {
    const ideaList = state.ideaList.push({id: payload.id, created_date : payload.created_date, title : '', body:'' });
    return { ...state, ideaList, isAddingIdea: false, newestIdeaId : payload.id};
}

const addIdeaFailed  = (state, payload) => {  
    let errors = state.errors;  
    errors = errors.push(payload);
    return { ...state, errors, isAddingIdea: false };
}

const deleteIdeaSuccess  = (state, payload) => {
    const ideaList = state.ideaList.delete(payload.indexToDelete);
    return { ...state, ideaList, isDeletingIdea: false};
}

const deleteIdeaFailed  = (state, payload) => {  
    let errors = state.errors;  
    errors = errors.push(payload);
    return { ...state, errors, isDeletingIdea: false };
}

const changeIdeaTitle = (state, payload) => {
    let ideaList = state.ideaList;
    let ideaToChange = ideaList.get(payload.indexToChange);
    ideaToChange['title'] =payload.newTitle;
    ideaList = ideaList.set(payload.indexToChange, ideaToChange);
    return {...state, ideaList}
}

const changeIdeaBody = (state, payload) => {
    let ideaList = state.ideaList;
    let ideaToChange = ideaList.get(payload.indexToChange);
    ideaToChange['body'] =payload.newBody;
    ideaList = ideaList.set(payload.indexToChange, ideaToChange);
    return {...state, ideaList}
}

const updateIdeaSuccess  = (state, payload) => {
    let messages = state.messages;  
    messages = messages.push(payload.message);
    return { ...state, messages, isUpdatingIdea: false, newlySavedIdeaId : payload.updatedIdea.id};
}

const updateIdeaFailed  = (state, payload) => {  
  debugger
    let errors = state.errors;  
    errors = errors.push(payload.message);
    return { ...state, errors, isUpdatingIdea: false };
}

const clearErrors = (state) => {
  const errors = List();
  return { ...state, errors }
}

const clearMessages = (state) => {
  const messages = List();
  return { ...state, messages}
}

const reducerMap = {
  [constants.GET_IDEAS]: (state, payload) => ({ ...state, isFetchingIdeas: true }),
  [constants.GET_IDEAS_SUCCESS]: (state, payload) => getIdeasSuccess(state, payload),
  [constants.GET_IDEAS_FAILED]: (state, payload) => getIdeasFailed(state, payload),
  
  [constants.ADD_IDEA]: (state, payload) =>  ({ ...state, isAddingIdea: true }),
  [constants.ADD_IDEA_SUCCESS]: (state, payload) => addIdeaSuccess(state, payload),
  [constants.ADD_IDEA_FAILED]: (state, payload) => addIdeaFailed(state, payload),

  [constants.DELETE_IDEA]: (state, payload) =>  ({ ...state, isDeletingIdea: true }),
  [constants.DELETE_IDEA_SUCCESS]: (state, payload) => deleteIdeaSuccess(state, payload),
  [constants.DELETE_IDEA_FAILED]: (state, payload) => deleteIdeaFailed(state, payload),

  [constants.CHANGE_IDEA_TITLE] : (state, payload) => changeIdeaTitle(state, payload),
  [constants.CHANGE_IDEA_BODY] : (state, payload) => changeIdeaBody(state, payload),

  [constants.UPDATE_IDEA]: (state, payload) => ({ ...state, isUpdatingIdea: true }),
  [constants.UPDATE_IDEA_SUCCESS]: (state, payload) => updateIdeaSuccess(state, payload),
  [constants.UPDATE_IDEA_FAILED]: (state, payload) => updateIdeaFailed(state, payload),

  [constants.CLEAR_ERRORS]: (state, payload) => clearErrors(state),
  [constants.CLEAR_MESSAGES]: (state, payload) => clearMessages(state)
}


export default createReducer(initialState, reducerMap);
