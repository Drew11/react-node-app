import { createStore, combineReducers,  applyMiddleware} from 'redux';
import thunk from "redux-thunk";
import usersReducer from '../reducers/users-reducer';
import loadingReducer from '../reducers/loading-reducer';
import paginationReducer from '../reducers/pagination-reducer';

const rootReducer = combineReducers({
    users: usersReducer,
    loading: loadingReducer,
    paginationOptions: paginationReducer
});

export default createStore(rootReducer, applyMiddleware(thunk));