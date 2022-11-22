import React from 'react';
import logo from "../images/logo.svg";
import { Typography } from "@mui/material";
import '../styles/header.css';

export default function Header(){
    return(
        <div className="header_container">
            <img className="header_logo" alt="logo" src={logo}/>            
            <Typography className="header_title" variant="h5" fontWeight="500" color="text.secondary">
                MyMoney
            </Typography>
        </div>   
    )
}