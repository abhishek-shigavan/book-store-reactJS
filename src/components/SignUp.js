import React, { useState } from "react";
import "../sass/SignUp.scss";
import { TextField, InputAdornment, IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { handleLoginSignUpRequest } from "../services/RequestService";

function SignUp() {

    const[name, setName] = useState("");
    const[nameError, setNameError] = useState("");
    const[email,setEmail] = useState("");
    const[emailError, setEmailError] = useState("");
    const[signUpPassword, setSignUpPassword] = useState("");
    const[signupPassError, setSignupPassError] = useState("");
    const[mobileNo, setMobileNo] = useState("");
    const[mobileError, setMobileError] = useState("");
    const[openPassword, setOpenPassword] = useState(false);

    const handleNameChange = (e) => {
        setName(e.target.value);
        setNameError("");
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setEmailError("");
    }

    const handleSignUpPasswordChange = (e) => {
        setSignUpPassword(e.target.value);
        setSignupPassError("");
    }

    const handleOpenPassword = () => {
        setOpenPassword(!openPassword);
    }

    const handleMouseDownPass = (e) => {
        e.preventDefault();
    }

    const handleMobNoChange = (e) => {
        setMobileNo(e.target.value);
        setMobileError("");
    }

    const handleSignUp = () => {
        let errorFlag = false;
        let userObj = {
            fullName: "",
            email: "",
            password: "",
            phone: ""
        }

        const nameRegex = /^[A-Z]{1}[a-z]{2,}([ ][A-Z]{1}[a-z]{2,})?$/
        const isNameValid = nameRegex.test(name);
        if(isNameValid) {
            userObj.fullName = name;
        }
        else if(name.length === 0) {
            setNameError("Enter full name");
            errorFlag = true;
        }
        else {
            setNameError("Only characters.. minimum 3");
            errorFlag = true;
        }

        const mailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const isEmailValid = mailRegex.test(email);
        if(isEmailValid) {
            userObj.email = email;
        }
        else if(email.length === 0){
            setEmailError("Enter email id");
            errorFlag = true;
        }
        else{
            setEmailError("Invalid email id");
            errorFlag = true;
        }

        const isPasswordValid = (/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&_-])([a-zA-Z0-9@$!%*?&_-]{8,})$/).test(signUpPassword);
        if(isPasswordValid) {
            userObj.password = signUpPassword;
        }
        else if(signUpPassword.length === 0) {
            setSignupPassError("Enter password");
            errorFlag = true;
        }
        else {
            setSignupPassError("Invalid password");
            errorFlag = true;
        }

        const isMobileValid = (/^[6789]\d{9}$/).test(mobileNo);
        if(isMobileValid) {
            userObj.phone = mobileNo;
        }
        else {
            setMobileError("Invalid mobile no");
            errorFlag = true;
        }

        if(!errorFlag) {
            handleLoginSignUpRequest(userObj, "/bookstore_user/registration").then((res) => {
                console.log(res);
            })
        }
    }

    return(
        <div className="signup-container">
            <div className="signup-input">
                <label>Full Name</label>
                <TextField
                    data-testid="fullName"
                    variant="outlined"
                    size="small"
                    type="text"
                    onChange={(event) => handleNameChange(event) }
                    helperText={nameError}
                    fullWidth
                    required
                />
            </div>

            <div className="signup-input">
                <label>Email Id</label>
                <TextField
                    data-testid="emailId"
                    variant="outlined"
                    size="small"
                    type="text"
                    onChange={(event) => handleEmailChange(event) }
                    helperText={emailError}
                    fullWidth
                    required
                />
            </div>

            <div className="signup-input">
                <label>Password</label>
                <TextField
                    variant="outlined"
                    size="small"
                    helperText={signupPassError}
                    fullWidth
                    required
                    style={{fontSize:'2rem'}}
                    type={openPassword ? "text" : "password"}
                    onChange={(event) => handleSignUpPasswordChange(event)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => handleOpenPassword()}
                                    onMouseDown={(event) => handleMouseDownPass(event)}
                                    edge="end">
                                    {openPassword ? (<VisibilityOff />) : (<Visibility />)}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </div>

            <div className="signup-input">
                <label>Mobile Number</label>
                <TextField
                    data-testid="mobileNumber"
                    variant="outlined"
                    size="small"
                    type="text"
                    onChange={(event) => handleMobNoChange(event) }
                    helperText={mobileError}
                    fullWidth
                    required
                />
            </div>
            <button className="content-signup-button" onClick={() => handleSignUp()}>Signup</button>
        </div>
    );
}

export default SignUp;