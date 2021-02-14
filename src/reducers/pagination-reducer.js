import {
    SET_CURRENT_PAGE,
    SET_BUTTONS_PER_PAGE,
    SET_INDEX_FIRST_PAGE
} from '../constants/index';

const initialState = {
    currentPage: 1,
    usersPerPage: 50,
    buttonsPerPage: 5,
    indexFirstPage: 0
};

function paginationReducer (state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_PAGE:
            return {...state,
                currentPage: action.payload
            };
        case SET_BUTTONS_PER_PAGE: {
            return {...state,
                buttonsPerPage: state.buttonsPerPage + action.payload
            };
        }
        case SET_INDEX_FIRST_PAGE: {
            return {...state,
                indexFirstPage: state.indexFirstPage + action.payload
            };
        }
        default:
            return state
    }
}

export default paginationReducer;