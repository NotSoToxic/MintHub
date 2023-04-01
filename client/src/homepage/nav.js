






import React from "react";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import "./home.css";
// import { useHistory } from 'react-router-dom';
import Logo from "./assets/robinhood.svg"
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
export const NAV = () => {
    // let history = useHistory();
    return (
        <div className="header__wrapper">
          <div className="header__logo">
            <a href="./home"><img src={Logo} transform-origin="250 250" href="./home" width={25}/></a>
            <a href="./home"><img src={Logo} transform-origin="250 250" href="./home" width={25}/></a>
          </div>
          
          <div className="header__search">
            <div className="header__searchContainer">
              <SearchOutlinedIcon />
              <input placeholder="Search" type="text" />
            </div>
          </div>
          <div className="header__menuItems">
            <a href="/">Dashboard</a>
            <a href="/">PortFolio</a>
            <a href="/market">Market</a>
            <a href="/">Updates</a>
            <a href="/uniswap">Uniswap</a>
            <Dropdown  className="custom-dropdown">
              <Dropdown.Toggle variant="success" id="dropdown-basic"> Account </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="/Login">Login</Dropdown.Item>
                <Dropdown.Item href="/register">Sign Up</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Account Details</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="header__logo2">
            <a href="./home"><img src={Logo} transform-origin="250 250" href="./home" width={25}/></a>
            <a href="./home"><img src={Logo} transform-origin="250 250" href="./home" width={25}/></a>
          </div>
        </div>
      );
}