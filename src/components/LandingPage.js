import React, { useState } from "react";
import "../sass/LandingPage.scss";
import Login from "./Login";
import SignUp from "./SignUp";

function LandingPage() {

    const[bgColor, setBgColor] = useState("#B0B0B0");
    const[openLogin, setOpenLogin] = useState(true);
    const[openSignUp, setOpenSignUp] = useState(false);

    const handleLoginToggle = () => {
        setOpenLogin(true); 
        setOpenSignUp(false);
        setBgColor("#B0B0B0");    
    }

    const handleSignUpToggle = () => {
        setOpenLogin(false);
        setOpenSignUp(true);
        setBgColor("#777777");
    }

    return(
        <div className="main-container" style={{backgroundColor: bgColor}}>
            <div className="outer-container">
                <div className="image-container">
                    <div className="image-card">
                        <div className="image-card-title">Online Book Shopping</div>
                    </div>
                </div>
                <div className="login-signup-container">
                    <div className="login-signup-header">
                        <button className="login-button" onClick={() => handleLoginToggle()}>LOGIN</button>
                        <button className="signup-button" onClick={() => handleSignUpToggle()}>SIGNUP</button>
                    </div>
                    <div className="login-signup-content">
                        {openLogin && (
                            <Login />
                        )}
                        {openSignUp && (
                            <SignUp />
                        )}
                    </div>
                </div>   
            </div>
        </div>
    );

}

export default LandingPage;
