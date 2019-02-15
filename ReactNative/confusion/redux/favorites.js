import * as ActionTypes from './ActionTypes';

export const favorites = (state={
        favoritesArr: []
    }, action) => {
    switch(action.type){
        case ActionTypes.ADD_FAVORITE:
            if(state.favoritesArr.some(element=>element === action.payload))
                return state;
            else
                return {...state, favoritesArr: state.favoritesArr.concat(action.payload)};
            break;
        
        default: 
            return state;
    }
}