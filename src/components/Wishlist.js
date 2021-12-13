import React, { useEffect, useState } from "react";
import "../sass/Wishlist.scss";
import { handleAddRemoveWishlistRequest, handleGetWishlistRequest } from "../services/RequestService";
import Navbar from "./Navbar";
import book1 from "../assets/book1.png";
import book2 from "../assets/book2.png";
import book3 from "../assets/book3.png";
import book4 from "../assets/book4.png";
import book5 from "../assets/book5.png";
import book6 from "../assets/book6.png";
import book7 from "../assets/book7.png";
import book8 from "../assets/book8.png";
import book9 from "../assets/book9.png";
import { IconButton } from "@material-ui/core";
import DeleteIcon from '@mui/icons-material/Delete';
import { useHistory } from "react-router";

function Wishlist() {
    
    const BookImage = [book1, book2, book3, book4, book5, book6, book7, book8, book9, book1, book2, book3, book4, book5, book6, book7, book8, book9];
    const history = useHistory();

    const[wishlistBooks, setWishlistBooks] = useState([]);

    useEffect(() => {
        handleGetWishlistRequest().then((res) => {
            setWishlistBooks(res.data.result)        
        })
    }, [])

    // useEffect(() => {

    // }, [wishlistBooks])

    const handleRemoveWishlistItem = (productId) => {
        handleAddRemoveWishlistRequest( "remove", productId).then((res) => {
            console.log("Wishlist item removed : ", res);
            handleWishlistUpdate();
        })
    }

    const handleWishlistUpdate = () => {
        handleGetWishlistRequest().then((res) => {
            setWishlistBooks(res.data.result)        
        })
    }

    const handleHomeLink = () => {
        history.push("/home");
    }

    return(
        <>
            <Navbar />
            <div className="wishlist-navigation-header">
                <div className="nav-link-container" onClick={() => handleHomeLink()}>
                    <label className="home-nav-link">Home/</label>
                    <label className="home-nav-sub-link">My Wishlist</label>
                </div>
            </div>
            <div className="wishlist-title-container">
                <label>My Wishlist{" ("+ wishlistBooks.length +")"}</label>
            </div>
            {wishlistBooks.map((item, index) => (
                <div className="wishlist-item-main-container">
                    <div className="wishlist-item-sub-container">
                        <div className="wishlist-item-img-des">
                            <div className="wishlist-item-img">
                                <img src={BookImage[index]} alt="" />
                            </div>
                            <div className="wishlist-item-description">
                                <div className="wishlist-item-title">
                                    <label>{item.product_id.bookName}</label>
                                </div>
                                <div className="wishlist-item-author">
                                    <label>{"by "+item.product_id.author}</label>
                                </div>
                                <div className="wishlist-item-price">
                                    <label>{"Rs. "+item.product_id.price}</label>
                                </div>
                            </div>
                        </div>
                        <IconButton onClick={() => handleRemoveWishlistItem(item.product_id._id)}> <DeleteIcon fontSize="large"/></IconButton>
                    </div>
                </div>
            ))}

        </>
    )
}

export default Wishlist;