import * as ActionTypes from './ActionTypes';

export const leaders = (state={
        isLoading: true,
        errMesss: null,
        leaders: []
    }, action) => {
    
    switch(action.type){
        case ActionTypes.ADD_LEADERS:
            return {...state, isLoading: false, errMess: null, leaders: action.payload};
            break;
        
        case ActionTypes.LEADERS_LOADING:
            return {...state, isLoading: true, errMess: null, leaders: []};            
            break;
            
        case ActionTypes.LEADERS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};            
            break;
        
        default: 
            return state;
    }
}