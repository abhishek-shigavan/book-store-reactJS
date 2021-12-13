import axios from "axios";

const config = {
    headers: {
        "accept": "application/json",
        "Content-Type": "application/json"
    }
}

const authConfig = {
    headers: {
        "accept": "application/json",
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem('BookStoreToken'),
    },
}

const BASE_URL = "https://new-bookstore-backend.herokuapp.com";

export const handleLoginSignUpRequest = async function(obj, requestName) {
    let response;

    if (requestName === "/bookstore_user/registration") {
        response = await axios.post(`${BASE_URL}${requestName}`, obj, config);
    } else {
        response = await axios.post(`${BASE_URL}${requestName}`, obj, config);
        localStorage.setItem('BookStoreToken', response.data.result.accessToken);
    }

    return response;
}

export const handleGetListRequest = async function() {
    const response = await axios.get(`${BASE_URL}/bookstore_user/get/book`, );
    return response;
}

export const handleGetCartRequest = async function() {
    const response = await axios.get(`${BASE_URL}/bookstore_user/get_cart_items`, authConfig);
    return response;
}

export const handleAddRemoveCartRequests = async function(operation, bookId) {
    let response;

    if (operation === "add") {
        response = await axios.post(`${BASE_URL}/bookstore_user/add_cart_item/${bookId}`, {}, authConfig);
    } else if (operation === "remove") {
        response = await axios.delete(`${BASE_URL}/bookstore_user/remove_cart_item/${bookId}`, authConfig);
    }

    return response;
}

export const handleUpdateCartRequest = async function(obj, bookId) {
    const response = await axios.put(`${BASE_URL}/bookstore_user/cart_item_quantity/${bookId}`, obj, authConfig);
    return response;
}

export const handlePlaceOrderRequest = async function(obj) {
    const response = await axios.post(`${BASE_URL}/bookstore_user/add/order`, obj, authConfig);
    return response;
}

export const handleCustomerDetailsRequest = async function(obj) {
    const response = await axios.put(`${BASE_URL}/bookstore_user/edit_user`, obj, authConfig);
    return response;
}

export const handleGetWishlistRequest = async function() {
    const response = await axios.get(`${BASE_URL}/bookstore_user/get_wishlist_items`, authConfig);
    return response;
}

export const handleAddRemoveWishlistRequest = async function(operation, productId) {
    let response;
    if (operation === "add") {
        response = await axios.post(`${BASE_URL}/bookstore_user/add_wish_list/${productId}`, {}, authConfig);
    } else {
        response = await axios.delete(`${BASE_URL}/bookstore_user/remove_wishlist_item/${productId}`, authConfig);
    }
    return response;
}