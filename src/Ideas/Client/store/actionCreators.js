import apiConfig                from 'main/Config';
import * as constants           from './constants';
import json2csv                 from 'json2csv';
import moment                   from 'moment';
import { Formats }              from 'main/Utils/DateTime';
import { Map }                  from 'immutable';
import mockReport               from '../contracts/report.json'
import mockIdeas                from '../contracts/ideas.json'

const REPORTS_URI = 'http://localhost:3000/api/ideas'

export const getIdeas = () => async (dispatch, getState) => {
  dispatch({ type: constants.GET_IDEAS });

  if(apiConfig.DEMO_MODE){
    if (mockIdeas && mockIdeas.ideas) {
        dispatch({ type: constants.GET_IDEAS_SUCCESS, payload : mockIdeas});
    } else {
        dispatch({ type: constants.GET_IDEAS_FAILED, payload: { error : 'No ideas found'} } );
    }
    return;      
  }

  const url = `${apiConfig.IDEAS_API}api/ideas`;
  const init = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
  };
  
  try {
      const response = await fetch(url, init);
      const json = await response.json();
      debugger;
      if (!response.ok) {
          dispatch({
              type: constants.GET_IDEAS_FAILED,
              payload: json
          });
          return;
      }

      dispatch({ type: constants.GET_IDEAS_SUCCESS, payload: json });
  } catch (error) {
      dispatch({ type: constants.GET_IDEAS_FAILED, payload: error });
  }
}

export const addIdea = () => async (dispatch, getState) => {
    
  dispatch({ type: constants.ADD_IDEA });

  if(apiConfig.DEMO_MODE){
    const idea = { 
        id: Math.random().toString(18).substring(2,12), 
        created_date : moment().format('DD-MM-YYYY'),
        title : '',
        body : ''
    }
    dispatch({ type: constants.ADD_IDEA_SUCCESS, payload : idea });
    return;      
  }

  const url = `${apiConfig.IDEAS_API}api/ideas/new`;
  const init = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
  };
  
  try {
      const response = await fetch(url, init);
      const json = await response.json();
      debugger;
      if (!response.ok) {
          dispatch({
              type: constants.ADD_IDEA_FAILED,
              payload: json
          });
          return;
      }

      dispatch({ type: constants.ADD_IDEA_SUCCESS, payload: json });
  } catch (error) {
      dispatch({ type: constants.ADD_IDEA_FAILED, payload: error });
  }
}
