import {LOADING_COMPLETE} from '../constants/index';

function usersReducer(state = null, action) {
    switch (action.type) {
        case LOADING_COMPLETE:
            return action.payload;
        default:
            return state
    }
}

export default usersReducer;