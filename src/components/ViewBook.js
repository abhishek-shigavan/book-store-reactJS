import React, { useEffect, useState } from "react";
import "../sass/ViewBook.scss";
import book1 from "../assets/book1.png";
import book2 from "../assets/book2.png";
import book3 from "../assets/book3.png";
import book4 from "../assets/book4.png";
import book5 from "../assets/book5.png";
import book6 from "../assets/book6.png";
import book7 from "../assets/book7.png";
import book8 from "../assets/book8.png";
import book9 from "../assets/book9.png";
import StarSharpIcon from '@mui/icons-material/StarSharp';
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
import { Rating } from "@mui/material";
import { Button } from "@material-ui/core";
import { createTheme, MuiThemeProvider } from "@material-ui/core";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { handleGetCartRequest, handleUpdateCartRequest, handleAddRemoveCartRequests, handleAddRemoveWishlistRequest, handleGetWishlistRequest } from "../services/RequestService";

function ViewBook(props) {

    const BookImage = [book1, book2, book3, book4, book5, book6, book7, book8, book9, book1, book2, book3, book4, book5, book6, book7, book8, book9];

    const[cartBooks, setCartBooks] = useState([]);
    const[openAddToBag, setOpenAddToBag] = useState(true);
    const[openQuantityButton, setOpenQuantityButton] = useState(false);
    const[buyQuantity, setBuyQuantity] = useState(1);
    const[idOfBook, setIdOfBook] = useState();
    const[wishListBooks, setWishListBooks] = useState([]);
    const[enableWishlist, setEnableWishlist] = useState(false);

    useEffect(() => {
        handleGetCartRequest().then((res) => {
            console.log(res);
            setCartBooks(res.data.result);
        })

        handleGetWishlistRequest().then((result) => {
            console.log("wishlist : ", result);
            setWishListBooks(result.data.result);
        })
    },[])

    useEffect(() =>{
        handleBooksCart()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cartBooks])

    useEffect(() => {
        handleWishListToggle()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wishListBooks])

    const buttonTheme = createTheme({
        overrides: {
            MuiButton: {
                root: {
                    width: "160px",
                    height: "40px",
                },
                startIcon: {
                    color:"white",
                },
                containedPrimary: {
                    fontSize: "14px",
                    color: "white",
                    backgroundColor: "#333333",
                    "&:hover": {
                        backgroundColor: "#333333",   
                    },
                },
            }
        }
    })

    const handleBooksCart = () => {
        if(cartBooks.length > 0) {
            cartBooks.forEach((book, index) => {
                if(book.product_id._id === props.BookDetails._id) {
                    setIdOfBook(book._id);
                    setBuyQuantity(book.quantityToBuy);
                    setOpenAddToBag(false);
                    setOpenQuantityButton(true);
                    console.log("book in cart : ", book.quantityToBuy);
                }
            })
        }
        else if(cartBooks.length === 0) {
            setIdOfBook();
            setBuyQuantity(1);
            setOpenQuantityButton(false);
            setOpenAddToBag(true);
        }
    }

    const handleWishListToggle = () => {
        if(wishListBooks.length > 0) {
            wishListBooks.forEach((book) => {
                if(book.product_id._id === props.BookDetails._id) {
                    setEnableWishlist(true);
                }
            })
        }
        else {
            setEnableWishlist(false);
        }
    }

    const handleAddToBagClick = () => {
        const BookId = props.BookDetails._id;
        handleAddRemoveCartRequests("add", BookId).then((res) => {
            console.log("Book Added To Cart : ", res);
            getUpdatedCartList();
        }).catch((err) => {
            console.log("error : ",err);
        })
    }

    const handleWishlistClick = () => {
        const productId = props.BookDetails._id;
        handleAddRemoveWishlistRequest("add", productId).then((res) => {
            console.log("wishlist result : ", res);
            setEnableWishlist(true);
        })
    }

    const handleUpdatedBookCart = (operation) => {
        const updatingBookId = idOfBook;
        // const productId = props.BookDetails._id;
        let quantity;
        if(operation === "add") {
            quantity = buyQuantity + 1;
        }
        else {
            quantity = buyQuantity - 1;
        }
        
        //calling update quantity api for quantity > 1
        if(quantity >= 1) {
            const BookQuantityObj = {
                "quantityToBuy" : quantity
            }
            console.log("Updated Quantity : ", BookQuantityObj);
            console.log("Book Id : ", updatingBookId);
            handleUpdateCartRequest(BookQuantityObj, updatingBookId).then((res) => {
                console.log("Quantity updated : ", res);
                getUpdatedCartList();
            });
        }
        //calling remove book api for quantity < 1
        else {
            handleAddRemoveCartRequests("remove", updatingBookId).then((res) => {
                console.log("book removed from cart : ", res);
                getUpdatedCartList();
            });
        }
    }

    const getUpdatedCartList = () => {
        handleGetCartRequest().then((res) => {
            console.log("New Cart List : ",res);
            setCartBooks(res.data.result);
        })
    }

    const handleBackToHome = () => {
        props.BackToHome();
    }

    return(
        <div>
            <div className="view-book-navigation-container">
                <div className="navigation-container" onClick={() => handleBackToHome()}>
                    <label className="main-link">Home/</label>
                    <label className="sub-link">{"Book("+ props.BookNo +")"}</label>
                </div>
            </div>
            <div className="book-details-main-container">
                <div className="book-icon-img-container">    
                    <div className="image-icon-container">
                        <img src={BookImage[props.BookNo - 1]} alt="" />
                    </div>
                    <div className="book-image-button-container">
                        <div className="book-main-image-container">
                            <img src={BookImage[props.BookNo - 1]} alt="" />
                        </div>
                        <div className="cart-wishlist-button-container">
                            {openAddToBag && (
                                <button className="add-to-bag-button" onClick={() => handleAddToBagClick()}>ADD TO BAG</button>
                            )}
                            {openQuantityButton && (
                                <div className="book-quantity-container">
                                    <div className="remove-add-quantity" onClick={() => handleUpdatedBookCart("remove")}>
                                        <RemoveIcon />
                                    </div>
                                    <label className="book-quantity"> {buyQuantity} </label>
                                    <div className="remove-add-quantity" onClick={() => handleUpdatedBookCart("add")}>
                                        <AddIcon />
                                    </div>
                                </div>
                            )}

                            <MuiThemeProvider theme={buttonTheme}>
                                <Button data-testid="wishlist-button" id="wishlistButton" variant="contained" color="primary" startIcon={<FavoriteSharpIcon/>} onClick={() => handleWishlistClick()} disabled={enableWishlist}>Wishlist</Button>
                            </MuiThemeProvider>
                        </div>
                    </div>
                </div>
                <div className="book-details-feedback-container">
                    <div className="book-title-price-container">
                        <div className="view-book-title">
                            <label>{props.BookDetails.bookName}</label>
                        </div>
                        <div className="view-book-author">
                            <label>{"by "+props.BookDetails.author}</label>
                        </div>
                        <div className="view-book-rating">
                            <div className="book-star-rating">
                                <label>4.5</label>
                                <div className="align-book-star">
                                    <StarSharpIcon />
                                </div>
                            </div>
                            <label className="book-rating-count">(20)</label>
                        </div>
                        <div className="view-book-price">
                            <label> {"Rs. " +props.BookDetails.price}</label>
                        </div>
                    </div>
                    <div className="book-info-container">
                        <div className="info-container-title">
                            <label>Book Detail</label>
                        </div>
                        <div className="info-container-description">
                            <p>{props.BookDetails.description + " Two years ago, Julia lost her family in a tragic accident. "+ 
                                "Her husband drowned trying to save their daughter."+
                                "But the little girl’s body was never found—and Julia believes Lily is somehow still alive."}</p>
                        </div>
                    </div>
                    <div className="customer-feedback-container">
                        <div className="feedback-container-title">
                            <label>Customer Feedback</label>
                        </div>
                        <div className="feedback-rating-box">
                            <div className="feedback-rating-inner-box">
                                <div className="rating-title-star">
                                    <label>Overall rating</label>
                                    <Rating name="no-value" value={null} size="large" readOnly />
                                </div>
                                <div className="review-input-box">
                                    <textarea placeholder="write something..."></textarea>
                                </div>
                                <div className="review-submit-button">
                                    <button>Submit</button>
                                </div>
                            </div>
                        </div>
                        <div className="user-review-container">
                            <div className="user-review-box">
                                <div className="user-name-rating">
                                    <label>Abhishek Shigavan</label>
                                    <Rating name="no-value" value={4} size="large" readOnly />
                                </div>
                                <div className="user-review">
                                    <p>I got the chills so many times toward the end of this book. It completely blew my mind. 
                                    It managed to surpass my high expectations AND be nothing at all like I expected.</p>
                                </div>
                            </div>
                            <div className="user-review-box">
                                <div className="user-name-rating">
                                    <label>Pratik Choudhary</label>
                                    <Rating name="no-value" value={4} size="large" readOnly />
                                </div>
                                <div className="user-review">
                                    <p>I got the chills so many times toward the end of this book. It completely blew my mind. 
                                    It managed to surpass my high expectations AND be nothing at all like I expected.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default ViewBook;