import { FETCH_BOOKS_REQUEST, FETCH_BOOKS_SUCCESS, FETCH_BOOKS_FAILURE } from "./bookTypes";

const initialState = {
    loading: false,
    booksList: [],
    error: ''
}

const bookReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_BOOKS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_BOOKS_SUCCESS:
            return {
                loading: false,
                booksList: action.payload,
                error: ''
            }
        case FETCH_BOOKS_FAILURE:
            return {
                loading: false,
                booksList: [],
                error: action.payload
            }
        default:
            return state;
    }
}

export default bookReducer;