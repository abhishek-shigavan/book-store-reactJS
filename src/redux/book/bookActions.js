import { FETCH_BOOKS_REQUEST, FETCH_BOOKS_SUCCESS, FETCH_BOOKS_FAILURE } from "./bookTypes";
import { handleGetListRequest } from "../../services/RequestService";

export const fetchBooksRequest = () => {
    return {
        type: FETCH_BOOKS_REQUEST
    }
}

export const fetchBooksSuccess = (booksList) => {
    return {
        type: FETCH_BOOKS_SUCCESS,
        payload: booksList
    }
}

export const fetchBooksFailure = (error) => {
    return {
        type: FETCH_BOOKS_FAILURE,
        payload: error
    }
}

export const fetchBooks = () => {
    return (dispatch) => {
        dispatch(fetchBooksRequest)
        handleGetListRequest().then((res) => {
            const booksList = res.data.result;
            dispatch(fetchBooksSuccess(booksList))
        }).catch((err) => {
            const errorMsg = err.message
            dispatch(fetchBooksFailure(errorMsg))
        })
    }
}