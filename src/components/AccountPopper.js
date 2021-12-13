import React from "react";
import "../sass/AccountPopper.scss";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useHistory } from "react-router-dom";

function AccountPopper(props) {

    const history = useHistory();

    const handleOptionsClick = (option) => {
        props.handlePopperOptions(option)
    } 

    const handleLogout = () => {
        console.log("In logout");
        localStorage.clear();
        history.push("/")
    }

    return (
        <>
            <div className="account-popper-container">
                <div className="account-popper-inner-container">
                    <label>Hello User,</label>
                    <div className="popper-options" onClick={() => handleOptionsClick("profile")}>
                        <PersonOutlineIcon sx={{paddingRight: "10px"}}/> Profile
                    </div>
                    <div className="popper-options" onClick={() => handleOptionsClick("myorders")}>
                        <AccountBalanceWalletOutlinedIcon sx={{paddingRight: "10px"}}/> My Orders
                    </div>
                    <div className="popper-options" onClick={() => handleOptionsClick("wishlist")}>
                        <FavoriteBorderIcon sx={{paddingRight: "10px"}}/> My Wishlist
                    </div>
                    <button onClick={() => handleLogout()}>Logout</button>
                </div>
            </div>
        </>
    );
}

export default AccountPopper;