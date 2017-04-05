
import json2csv                 from 'json2csv';
import moment                   from 'moment';
import { Map }                  from 'immutable';


import apiConfig                from 'main/Config';
import * as constants           from './constants';

import mockReport               from '../contracts/report.json'
import mockIdeas                from '../contracts/ideas.json';


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

export const deleteIdea = (index) => async (dispatch, getState) => {
    dispatch({type : constants.DELETE_IDEA});
    try{
        const url = `${apiConfig.IDEAS_API}api/ideas/delete`;
        const init = { 
            method: 'POST',
            headers : {
                'ContentType': 'application/json'
            }
        };
        const response = await fetch(url, init);
        const json  = await response.json();
        if(!response.ok)
            dispatch({ type: constants.DELETE_IDEA_FAILED, payload : json});
        
        dispatch( { type : constants.DELETE_IDEA_SUCCESS, payload : {indexToDelete : index}});

    } catch (error) {
        dispatch({type: constants.DELETE_IDEA_FAILED});
    }
    
} 

export const changeIdeaTitle = (indexToChange, newTitle) => async (dispatch, getState) => {
    dispatch({
        type : constants.CHANGE_IDEA_TITLE, 
        payload : { indexToChange, newTitle} 
    });
}

export const changeIdeaBody = (indexToChange, newBody) => async (dispatch, getState) => {
    dispatch({
        type : constants.CHANGE_IDEA_BODY, 
        payload : { indexToChange, newBody} 
    });
}


export const updateIdea = (indexToUpdate) => async (dispatch, getState) => {
    dispatch({type : constants.CLEAR_MESSAGES});
    dispatch({type : constants.CLEAR_ERRORS});
    dispatch({type : constants.UPDATE_IDEA});
    try{
        const url = `${apiConfig.IDEAS_API}api/ideas/update`;
        let updatedIdea = getState().ideas.ideaList.get(indexToUpdate);
        const init = { 
            method: 'POST',
            headers : {
                'ContentType': 'application/json'
            },
            body: JSON.stringify({id : updatedIdea.id, title: updatedIdea.title, body: updatedIdea.body })
        };
        const response = await fetch(url, init);
        const json  = await response.json();
        if(!response.ok){
            dispatch({ type: constants.UPDATE_IDEA_FAILED, payload : json});
        }
        
        dispatch( { type : constants.UPDATE_IDEA_SUCCESS, payload : { message :'Idea saved successfully', updatedIdea} });

    } catch (error) {
        dispatch({type: constants.UPDATE_IDEA_FAILED, payload : error});
    }
    
}
