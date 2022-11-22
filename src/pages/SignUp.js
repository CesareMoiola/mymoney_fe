import React from 'react';
import { Paper, Typography, TextField, Button } from "@mui/material";
import "../styles/SignUp.css";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import {signUp as submitSignUp} from "../js/ApiGateway";
import logo from "../images/logo.svg";

function SignUp() {

    const navigate = useNavigate();
    let firstName;
    let lastName;
    let email;
    let password;
    let confirmPassword;    

    const submit = () => {
        if(password === confirmPassword){
            let signUpCompleted = submitSignUp(firstName, lastName, email, password);
            if(signUpCompleted) navigate("/home");
        }
        else{
            console.log("Confirmation password doesn't match");
        }
    }

    return (
        <div className="signUp">
            <Paper className="signUp_card" elevation={0} variant="outlined">
                <form className="signUp_form">
                    <div className="title_container">
                        <img className="logo" alt="logo" src={logo}/>
                        <Typography className="title" variant="h6" fontWeight="600">MyMoney</Typography>
                    </div>
                    <Typography className="form_title" variant="h5" align="center">Create your account</Typography>
                    <div className="horizontal_texfields">
                        <TextField 
                            className="text_field"
                            id="name" 
                            label="Name" 
                            variant="outlined" 
                            size="small"
                            onChange={event => {firstName = event.target.value}}
                        />
                        <TextField 
                            className="text_field"
                            id="surname" 
                            label="Surname" 
                            variant="outlined" 
                            size="small"                            
                            onChange={event => {lastName = event.target.value}}
                        />
                    </div>                    
                    <TextField 
                        className="text_field"
                        id="email" 
                        label="Email" 
                        variant="outlined" 
                        size="small"
                        onChange={event => {email = event.target.value}}
                    />
                    <div className="horizontal_texfields">
                        <TextField
                            className="text_field"
                            id="password" 
                            label="Password" 
                            variant="outlined" 
                            type="password" 
                            size="small"
                            onChange={event => {password = event.target.value}}
                        />
                        <TextField 
                            className="text_field"
                            id="confirm_password" 
                            label="Confirm" 
                            variant="outlined" 
                            type="password" 
                            size="small"
                            onChange={event => {confirmPassword = event.target.value}}
                        />
                    </div>
                    <div className="signUp_button">
                        <Button className="button" component={RouterLink} to="/signin" >Sign in</Button>
                        <Button className="button_contained" variant="contained" onClick={()=>{submit()}}>Sign up</Button>
                    </div>
                </form>  
            </Paper>
        </div>        
    );
  }
  
  export default SignUp;