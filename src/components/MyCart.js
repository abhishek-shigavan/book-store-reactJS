import React, { useState, useEffect } from "react";
import "../sass/MyCart.scss";
import book1 from "../assets/book1.png";
import book2 from "../assets/book2.png";
import book3 from "../assets/book3.png";
import book4 from "../assets/book4.png";
import book5 from "../assets/book5.png";
import book6 from "../assets/book6.png";
import book7 from "../assets/book7.png";
import book8 from "../assets/book8.png";
import book9 from "../assets/book9.png";
import { handleAddRemoveCartRequests, handleCustomerDetailsRequest, handleGetCartRequest, handlePlaceOrderRequest, handleUpdateCartRequest } from "../services/RequestService";
import Navbar from "./Navbar";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useHistory } from "react-router";

function MyCart() {
    const BookImage = [book1, book2, book3, book4, book5, book6, book7, book8, book9, book1, book2, book3, book4, book5, book6, book7, book8, book9];

    const[myCartItems, setMyCartItems] = useState([]);
    const[expandMyCart, setExpandMyCart] = useState(false);
    const[expandCustomerDetails, setExpandCustomerDetails] = useState(false);
    const[expandOrderSummary, setExpandOrderSummary] = useState(false);
    const[enablePlaceOrder, setEnablePlaceOrder] = useState(false);
    const[enableContinue, setEnableContinue] = useState(false)
    const[fullName, setFullName] = useState("");
    const[mobileNo, setMobileNo] = useState("");
    const[userAddress, setUserAddress] = useState("");
    const[userCity, setUserCity] = useState("");
    const[userState, setUserState] = useState("");
    const[placedOrders, setPlacedOrders] = useState([]);
    const[address, setAddress] = useState([]);

    const history = useHistory();

    useEffect(() => {
        handleGetCartRequest().then((res) => {
            console.log(res);
            setMyCartItems(res.data.result);
        })
    },[])

    useEffect(() => {
        handelMyCartToggle()
        handleSaveUserDetails()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[myCartItems])

    useEffect(() => {
        handleCustomerDetailsToggle()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[placedOrders])

    useEffect(() => {
        handleOrderSummaryToggle()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[address])

    const handleSaveUserDetails = () => {
        console.log(myCartItems.length);
        if(myCartItems.length > 0) {
            const userDetails = myCartItems[0].user_id;
            let addressDetails = []; 
            addressDetails = myCartItems[0].user_id.address;
            setFullName(userDetails.fullName);
            setMobileNo(userDetails.phone);
            addressDetails.forEach((add) => {
                if(add.addressType === "Office") {
                    setUserAddress(add.fullAddress);
                    setUserCity(add.city);
                    setUserState(add.state)
                }
            })
            console.log(userDetails);
        }

        
    }

    const handelMyCartToggle = () => {
        if(myCartItems.length > 0) {
            setExpandMyCart(true);
            setEnablePlaceOrder(true);
        }
        else {
            setEnablePlaceOrder(false);
            setExpandMyCart(false);
        }
    }

    const handleUpdatedCartQuantity = (operation, bookId, bookQuantity) => {
        let BookQuantity;
        if(operation === "add") {
            BookQuantity = bookQuantity + 1;
        }
        else if(operation === "remove") {
            BookQuantity = bookQuantity - 1;
        }

        const UpdatedQuantityObj = {
            "quantityToBuy" : BookQuantity
        }

        handleUpdateCartRequest(UpdatedQuantityObj, bookId).then((res) => {
            console.log("Quantity updated : ", res);
        });

        getUpdatedCartItemList();
    }

    const getUpdatedCartItemList = () => {
        handleGetCartRequest().then((res) => {
            console.log("New Cart List : ",res);
            setMyCartItems(res.data.result);
        })
    }

    const handleRemoveCartItem = (bookId) => {
        handleAddRemoveCartRequests("remove", bookId).then((res) => {
            console.log("remove result : ", res);
            getUpdatedCartItemList();
        })
    }

    const handlePlaceOrder = () => {
        const item = "book";
        let allOrders = [];
        myCartItems.forEach((book, index) => {
            let itemName = item+index;

            itemName = {
                product_id : book.product_id._id,
                product_name : book.product_id.bookName,
                product_quantity : book.quantityToBuy,
                product_price : book.product_id.price
            }
            console.log(itemName);
            allOrders.push(itemName);
        })

        const placeOrderObj = {
            orders : allOrders
        }

        console.log("OrderObj" ,placeOrderObj);
    
        handlePlaceOrderRequest(placeOrderObj).then((res) => {
            console.log("Order Placed : ", res);
            setPlacedOrders(res.data.result);
        }) 
    }

    const handleCustomerDetailsToggle = () => {
        if(placedOrders.length > 0) {
            setEnablePlaceOrder(false);
            setExpandCustomerDetails(true);
            setEnableContinue(true);
        }
    }

    const handleAddressChange = (e) => {
        setUserAddress(e.target.value);
    }

    const handleCityChange = (e) => {
        setUserCity(e.target.value);
    }

    const handleStateChange = (e) => {
        setUserState(e.target.value);
    }

    const handleEditAddress = () => {
        const CustomerDetailsObj = {
            "addressType": "Office",
            "fullAddress": userAddress,
            "city": userCity,
            "state": userState
        }

        console.log(CustomerDetailsObj);

        handleCustomerDetailsRequest(CustomerDetailsObj).then((res) => {
            console.log("Address Edit : ", res);
            setAddress(res.data.result.address);
        })
    }

    const handleOrderSummaryToggle = () => {
        if(address.length > 0) {
            setEnableContinue(false)
            setExpandOrderSummary(true);
        }
    }

    const handleHomeNavLink = () => {
        history.push("/home");
    }

    const handleCheckoutClick = () => {
        history.push("/home/placeorder");
    }

    return(
        <>
            <Navbar />
        
            <div className="cart-navigation-header">
                <div className="navigation-header-container" onClick={() => handleHomeNavLink()}>
                    <label className="home-link">Home/</label>
                    <label className="home-sub-link">My Cart</label>
                </div>
            </div>
            {!expandMyCart && (
                <div className="minimize-cart-container">
                    <label>My Cart</label>
                </div>
            )}
            {expandMyCart && (
                <div className="my-cart-outer-container">
                    <div className="my-cart-inner-container">
                        <div className="my-cart-count-container">
                            <label>{"My cart ( "+myCartItems.length+" )"}</label>
                        </div>
                        {myCartItems.map((book, index) => (
                            <div className="my-cart-item-details">
                                <div className="cart-item-image">
                                    <img src={BookImage[index]} alt="" />
                                </div>
                                <div className="my-cart-item-description">
                                    <div className="item-title">
                                        <label>{book.product_id.bookName}</label>
                                    </div>
                                    <div className="item-author">
                                        <label>{"by "+book.product_id.author}</label>
                                    </div>
                                    <div className="item-price">
                                        <label>{"Rs. "+book.product_id.price}</label>
                                    </div>
                                    <div className="quantity-update-container">
                                        <div className="item-buy-quantity-container">
                                            <div className="remove-add-item-quantity" onClick={() => handleUpdatedCartQuantity("remove", book._id, book.quantityToBuy)}>
                                                <RemoveIcon />
                                            </div>
                                            <label className="item-total-quantity"> {book.quantityToBuy} </label>
                                            <div className="remove-add-item-quantity" onClick={() => handleUpdatedCartQuantity("add", book._id, book.quantityToBuy)}>
                                                <AddIcon />
                                            </div>
                                        </div>
                                        <button onClick={() => handleRemoveCartItem(book._id)}>Remove</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {enablePlaceOrder && (
                            <div className="place-order-button">
                                <button onClick={() => handlePlaceOrder()}>PLACE ORDER</button>
                            </div>
                        )}
                    </div>
                </div>
            )}
            {!expandCustomerDetails && (
                <div className="minimize-cart-container">
                    <label>Address Details</label>
                </div>
            )}
            {expandCustomerDetails && (
                <div className="customer-details-main-container">
                    <div className="customer-details-sub-container">
                        <div className="customer-details-title">
                            <label>Customer Details</label>
                        </div>
                        <div className="customer-details-input-container">
                            <div className="text-input-field-container">
                                <div className="input-field-sub-container">
                                    <label>Full Name</label>
                                    <div className="input-field-box">
                                        <input type="text" value={fullName} placeholder="Full Name"/>
                                    </div>
                                </div>
                                <div className="input-field-sub-container">
                                    <label>Mobile Number</label>
                                    <div className="input-field-box">
                                        <input type="text" value={mobileNo} placeholder="Mobile Number"/>
                                    </div>
                                </div>
                            </div>
                            <div className="address-container">
                                <div className="address-title">
                                     <label>1.WORK</label>
                                </div>
                                <label>Address</label>
                                <div className="address-input">
                                    <textarea placeholder="Address..." value={userAddress} onChange={(e) => handleAddressChange(e)}></textarea>            
                                </div> 
                            </div>
                            <div className="text-input-field-container">
                                <div className="input-field-sub-container">
                                    <label>City / Town</label>
                                    <div className="input-field-box">
                                        <input type="text" value={userCity} placeholder="City or Town" onChange={(e) => handleCityChange(e)}/>
                                    </div>
                                </div>
                                <div className="input-field-sub-container">
                                    <label>State</label>
                                    <div className="input-field-box">
                                        <input type="text" value={userState} placeholder="State" onChange={(e) => handleStateChange(e)}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {enableContinue && (
                            <div className="continue-button">
                                <button onClick={() => handleEditAddress()}>CONTINUE</button>
                            </div>
                        )}
                    </div>
                </div>
            )}
            {!expandOrderSummary && (
                <div className="minimize-cart-container">
                    <label>Order Summery</label>
                </div>
            )}
            {expandOrderSummary && (
                <div className="summary-main-container">
                    <div className="summary-inner-container">
                        <div className="summary-title">
                            <label>Order Summary</label>
                        </div>
                        {myCartItems.map((item, index) => (
                            <div className="checkout-item-container">
                                <div className="checkout-item-img">
                                    <img src={BookImage[index]} alt="" />
                                </div>
                                <div className="checkout-item-description">
                                    <div className="item-title">
                                        <label>{item.product_id.bookName}</label>
                                    </div>
                                    <div className="item-author">
                                        <label>{"by "+item.product_id.author}</label>
                                    </div>
                                    <div className="item-price">
                                        <label>{"Rs. "+item.product_id.price}</label>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="checkout-button">
                        <button onClick={() => handleCheckoutClick()}>CHECKOUT</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default MyCart;
