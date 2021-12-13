import React, { useState } from "react";
import "../sass/Navbar.scss";
import education from "../assets/education.png";
import { createTheme, IconButton, MuiThemeProvider } from "@material-ui/core";
import SearchIcon from '@mui/icons-material/Search';
import { PersonOutlineSharp } from '@mui/icons-material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useHistory } from "react-router";
import AccountPopper from "./AccountPopper";
import Popper from '@mui/material/Popper';



function Navbar() {

    const history = useHistory();
    const[openAccountPopper, setOpenAccountPopper] = useState(false);
    const[anchorEl, setAnchorEl] = useState(null);

    const theme = createTheme({
        overrides: {
            MuiIconButton: {
                root: {
                    padding: "4px 4px",
                    margin: "0px",
                }
            }
        }
    })

    const handleHomePage = () => {
        history.push("/home");    
    }

    const handleAccountPopper = (e) => {
        setOpenAccountPopper(!openAccountPopper);
        setAnchorEl(e.currentTarget);
    }

    const handlePopperOptionsClick = (option) => {
        setOpenAccountPopper(!openAccountPopper);
        setAnchorEl(null);

        if(option === "wishlist") {
            history.push("/home/wishlist");
        }
    }

    const handleMyCart = () => {
        history.push("/home/mycart");
    }

    return(
        <MuiThemeProvider theme={theme}>
        <div className="navbar-main-container">
            <div className="icon-title-container" onClick={() => handleHomePage()}>
                <img src={education} alt="" />
                <label>Bookstore</label>
            </div>
            <div className="search-bar">
                <div className="search-bar-icon">
                    <IconButton type="submit" aria-label="search">
                        <SearchIcon sx={{ fontSize: "2.5rem"}} />
                    </IconButton>
                </div>
                <div>
                    <input type="text" placeholder="Search" aria-label="search-input" />
                </div>
            </div>
            <div className="navbar-button" onClick={(e) => handleAccountPopper(e)}>
                <IconButton>
                    <PersonOutlineSharp sx={{ fontSize: "2rem"}}/>
                </IconButton>
                <label>Profile</label>
            </div>
            <Popper open={openAccountPopper} anchorEl={anchorEl}>
                <AccountPopper handlePopperOptions={handlePopperOptionsClick} />
            </Popper>   
            <div className="navbar-button" style={{borderLeft: "none"}} onClick={() => handleMyCart()}>
                <IconButton>
                    <ShoppingCartOutlinedIcon sx={{ fontSize: "2rem"}}/>
                </IconButton>
                <label>Cart</label>
            </div>
        </div>
        </MuiThemeProvider>
    );
}

export default Navbar;