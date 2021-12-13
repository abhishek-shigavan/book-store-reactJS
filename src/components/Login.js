import React, { useState } from "react";
import "../sass/Login.scss";
import { TextField, InputAdornment, IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { handleLoginSignUpRequest } from "../services/RequestService";
import { Snackbar, Alert} from "@mui/material";
import { useHistory } from "react-router-dom";

function Login() {

    const[emailId, setEmailId] = useState("");
    const[emailIdError, setEmailIdError] = useState("");
    const[password, setPassword] = useState("");
    const[passwordError, setPasswordError] = useState("");
    const[showPassword, setShowPassword] = useState(false);
    const[loginError, setLoginError] = useState(false);
    const[loginSuccess, setLoginSuccess] = useState(false);

    const vertical = "top";
    const horizontal = "center";
    const history = useHistory();

    const handleEmailIdChange = (event) => {
        setEmailId(event.target.value);
        setEmailIdError("");
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordError("");
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }

    const handleClose = (event, reason) => {
        if(reason === 'clickaway') {
            return;
        }
        setLoginError(false);
        setLoginSuccess(false);
    }

    const handleLogin = () => {
        let flag = false;
        let userObj = {
            email: "",
            password: ""
        }

        const mailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const isValid = mailRegex.test(emailId);
        if(isValid) {
            userObj.email = emailId;
        }
        else if(emailId.length === 0){
            setEmailIdError("Enter email id");
            flag = true;
        }
        else{
            setEmailIdError("Invalid email id");
            flag = true;
        }

        const isPasswordValid = (/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&_-])([a-zA-Z0-9@$!%*?&_-]{8,})$/).test(password);
        if(isPasswordValid) {
            userObj.password = password;
        }
        else if(password.length === 0) {
            setPasswordError("Enter password");
            flag = true;
        }
        else {
            setPasswordError("Invalid password");
            flag = true;
        }

        if(!flag) {
            handleLoginSignUpRequest(userObj, "/bookstore_user/login").then((res) => {
                if(res.data.result === null) {
                    setLoginError(true);
                }
                else {
                    setLoginSuccess(true);
                    console.log(res);
                    history.push("/home")
                }
            })
        }
    }

    return(
        <div className="login-container">
            <div className="login-input">
                <label>Email Id</label>
                <TextField
                    data-testid="username"
                    variant="outlined"
                    size="small"
                    type="text"
                    onChange={(event) => handleEmailIdChange(event) }
                    helperText={emailIdError}
                    fullWidth
                    required
                />
            </div>
            <div className="login-input-forgot-container">
                <label>Password</label>
                <TextField
                    variant="outlined"
                    size="small"
                    helperText={passwordError}
                    fullWidth
                    required
                    style={{fontSize:'2rem'}}
                    type={showPassword ? "text" : "password"}
                    onChange={(event) => handlePasswordChange(event)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => handleShowPassword()}
                                    onMouseDown={(event) => handleMouseDownPassword(event)}
                                    edge="end">
                                    {showPassword ? (<VisibilityOff />) : (<Visibility />)}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <button className="forgot-button">Forgot Password?</button>
            </div>
            <button className="content-login-button" onClick={() => handleLogin()}>Login</button>
            <label className="footer-label">OR</label>
            <div className="footer-button">
                <button className="facebook-button">Facebook</button>
                <button className="google-button">Google</button>
            </div>
            <Snackbar open={loginError} anchorOrigin={{ vertical, horizontal }} autoHideDuration={6000} key={vertical + horizontal} onClose={handleClose}>
                <Alert onClose={handleClose} variant="filled" severity="error" sx={{ width: '100%' }}>
                    Wrong Email Id Password...!!!
                </Alert>
            </Snackbar>
            <Snackbar open={loginSuccess} anchorOrigin={{ vertical, horizontal }} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} variant="filled" severity="success" sx={{ width: '100%' }}>
                    Login Sucessfull...!!!
                </Alert>
            </Snackbar> 
        </div>
    );

}

export default Login;