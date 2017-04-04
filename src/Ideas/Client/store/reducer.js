import { combineReducers }  from 'redux';
import { createReducer }    from 'main/Utils';
import * as constants       from './constants';
import { List, Map }        from 'immutable';

export const initialState = Object.assign({}, {
    isFetchingReport: false,
    warnings: List(),
    errors: List(),
    isFetchingIdeas : false,
    ideaList: [],
    newestIdeaId : null
});

// reducer functions
const getIdeas  = (state, payload) => {
    return { ...state, errors : List(), isFetchingIdeas: true };
}

const getIdeasSuccess  = (state, payload) => {  
    const errors = List();
    return { ...state, errors, isFetchingIdeas: false , ideaList : payload.ideas};
}

const getIdeasFailed  = (state, payload) => {  
    let errors = state.errors;  
    errors = errors.push(payload);
    return { ...state, errors, isFetchingIdeas: false };
}

const addIdea  = (state, payload) => {
    return { ...state, errors : List(), isFetchingIdeas: true };
}

const addIdeaSuccess  = (state, payload) => {  
    const errors = List();
    let ideaList = state.ideaList;
    ideaList.push(payload)
    return { ...state, errors , ideaList, isFetchingIdeas: false, newestIdeaId : payload.id};
}

const addIdeaFailed  = (state, payload) => {  
    let errors = state.errors;  
    errors = errors.push(payload);
    return { ...state, errors, isFetchingIdeas: false };
}

/////////////////////

const getReportEmpty = (state, payload) => {
  const warning = `${payload.reportType} report was processed successfully but has no data.`;
  const warnings = state.warnings.push(warning);
  return { ...state, warnings, isFetchingReport: false };
};

const getReportFailed = (state, payload) => {
  const errors = state.errors.push('Error processing report');
  return { ...state, errors, isFetchingReport: false }
}

const clearReportErrors = (state) => {
  const errors = List();
  return { ...state, errors }
}

const clearReportWarnings = (state) => {
  const warnings = List();
  return { ...state, warnings}
}

const reducerMap = {
  [constants.GET_IDEAS]: (state, payload) => getIdeas(state, payload),
  [constants.GET_IDEAS_SUCCESS]: (state, payload) => getIdeasSuccess(state, payload),
  [constants.GET_IDEAS_FAILED]: (state, payload) => getIdeasFailed(state, payload),
  [constants.ADD_IDEA]: (state, payload) => addIdea(state, payload),
  [constants.ADD_IDEA_SUCCESS]: (state, payload) => addIdeaSuccess(state, payload),
  [constants.ADD_IDEA_FAILED]: (state, payload) => addIdeaFailed(state, payload),

  [constants.GET_REPORT]: (state, payload) => Object.assign({}, state, { isFetchingReport: true }),
  [constants.GET_REPORT_SUCCESS]: (state, payload) => Object.assign({}, state, { isFetchingReport: false }),
  [constants.GET_REPORT_EMPTY]: (state, payload) => getReportEmpty(state, payload),  
  [constants.GET_REPORT_FAILED]: (state, payload) => getReportFailed(state, payload),  
  [constants.CLEAR_REPORT_ERRORS]: (state, payload) => clearReportErrors(state),  
  [constants.CLEAR_REPORT_WARNINGS]: (state, payload) => clearReportWarnings(state),
  [constants.UPDATE_COMING_SOON_HOURS]: (state, payload) => clearReportWarnings(state),
  [constants.UPDATE_COMING_SOON_HOURS_SUCCESS]: (state, payload) => clearReportWarnings(state),
  [constants.UPDATE_COMING_SOON_HOURS_FAILURE]: (state, payload) => clearReportWarnings(state),
}


export default createReducer(initialState, reducerMap);
