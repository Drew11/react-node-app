import LocalService from '../services/local-service';

import {
    START_LOADING,
    FINISH_LOADING,
    LOADING_FAILURE,
    LOADING_COMPLETE,
    SET_CURRENT_PAGE,
    SET_BUTTONS_PER_PAGE,
    SET_INDEX_FIRST_PAGE
} from '../constants/index';


export function setIndexFirstPage(range) {
    return {
        type: SET_INDEX_FIRST_PAGE,
        payload: range
    };
}

export function setButtonsPerPage(range) {
    return {
        type: SET_BUTTONS_PER_PAGE,
        payload: range
    };
}

export function setCurrentPage(page) {
    return {
        type: SET_CURRENT_PAGE,
        payload: page
    };
}

export function startLoading() {
    return {
        type: START_LOADING,
    };
}

export function finishLoading() {
    return {
        type: FINISH_LOADING,
    };
}


export function loadingFailure(error) {
    return {
        type: LOADING_FAILURE,
        payload: error
    };
}

export function usersLoadingComplete(users) {
    return {
        type: LOADING_COMPLETE,
        payload: users
    };
}

export const fetchData =  (usersOnPage, currentPage ) => {
    console.log(usersOnPage, currentPage)
    return async dispatch => {
            dispatch(startLoading());
        try {
            const service = new LocalService();
            const params= {
                users_on_page: usersOnPage,
                current_page: currentPage
            };
            const users = await service.getUsers(params);
            dispatch(usersLoadingComplete(users));
            dispatch(finishLoading());

        }catch (err) {
            console.log(err.message);
            dispatch(loadingFailure(err.message));
            dispatch(finishLoading());
        }
    };
};

