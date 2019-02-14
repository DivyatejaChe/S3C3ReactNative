import * as ActionTypes from './ActionTypes';

export const comments= (state={
        errMess: null,
        comments: []
    }, action)=>{
    
    switch(action.type){
        case ActionTypes.ADD_COMMENTS:
            return {...state, errMess: null, comments: action.payload};
            break;
        
        case ActionTypes.COMMENTS_FAILED:
            return {...state, errMess: action.payload, comments: []};
            break;
        
        default: 
            return state;
    }
}