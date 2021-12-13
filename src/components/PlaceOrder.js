import React from "react";
import "../sass/PlaceOrder.scss";
import orderGraphic from "../assets/orderGraphic.png";
import orderGraphic1 from "../assets/orderGraphic1.png";
import Navbar from "./Navbar";
import { useHistory } from "react-router";

function PlaceOrder() {

    const history = useHistory();

    const handleContinueShoppingClick = () => {
        history.push("/home");
    }

    return (
        <>
            <Navbar />
            <div className="place-order-main-container">
                <div className="place-order-design1">
                    <img src={orderGraphic} alt="" />
                </div>
                <div className="place-order-message">
                    <label>Order Placed Successfully</label>
                </div>
                <div className="place-order-design2">
                    <img src={orderGraphic1} alt="" />
                </div>
                <div className="place-order-details-msg">
                    <p>hurray!!! your order is confirmed <br />
                        the order id is #123456 save the order id for <br />
                        further communication..</p>
                </div>
                <div className="seller-details-table">
                    <div className="details-table-column">
                        <div className="table-column-title">
                            <label>Email us</label>
                        </div>
                        <div className="table-column-content">
                            <label>admin@bookstore.com</label>
                        </div>
                    </div>    
                    <div className="details-table-column">
                        <div className="table-column-title">
                            <label>Contact us</label>
                        </div>
                        <div className="table-column-content">
                            <label>+91 8163748579</label>
                        </div>
                        
                    </div>
                    <div className="details-table-column-address">
                        <div className="table-column-title-address">
                            <label>Address</label>
                        </div>
                        <div className="table-column-content-address">
                            <p>42, 14th Main, 15th Cross, Sector 4 ,opp to BDA <br />
                                complex, near Kumarakom restaurant, HSR Layout, <br />
                                Bangalore 560034</p>
                        </div>
                    </div>
                </div>
                <div className="continue-shopping-button">
                    <button onClick={() => handleContinueShoppingClick()}>CONTINUE SHOPPING</button>
                </div>
            </div>
        </>
    );
}

export default PlaceOrder;
