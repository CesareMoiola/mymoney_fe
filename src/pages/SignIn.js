import React from 'react';
import { Paper, Typography, TextField, Button } from "@mui/material";
import "../styles/SignIn.css";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import logo from "../images/logo.svg";
import {signIn as submitSignIn} from "../js/ApiGateway";

function SignIn() {
    
    const navigate = useNavigate();
    let email;
    let password;

    const submit = () => {
        let signInCompleted = submitSignIn(email, password);
        if(signInCompleted) navigate("/");
    }

    return (
        <div className="signIn">
            <Paper className="signIn_card" elevation={0} variant="outlined">
                <form className="signIn_form">
                    <div className="title_container">
                        <img className="logo" alt="logo" src={logo}/>
                        <Typography className="title" variant="h6" fontWeight="bold">MyMoney</Typography>
                    </div>
                    <Typography variant="h5" align="center">Sign in</Typography>             
                    <TextField 
                        className="signIn_text_field" 
                        id="email" 
                        label="Email" 
                        variant="outlined"
                        onChange={event => {email = event.target.value}}
                    />
                    <div className="password_div">
                        <TextField 
                            className="signIn_text_field" 
                            id="password" 
                            label="Password" 
                            variant="outlined" 
                            type="password"
                            onChange={event => {password = event.target.value}}
                        />
                        <Button className="forgot_password" component={RouterLink} to="/forgot_password" style={{textTransform: 'none'}}>Forgot password?</Button>
                    </div>                    
                    <div className="signIn_button">
                        <Button className="button_contained button" component={RouterLink} to="/signup">Create account</Button>
                        <Button className="button_contained" variant="contained" onClick={()=>{submit()}}>Sign in</Button>
                    </div>
                </form>  
            </Paper>
        </div>        
    );
  }
  
  export default SignIn;