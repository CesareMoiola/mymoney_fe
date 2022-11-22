import { useTheme } from '@mui/styles';
import {  Dialog, DialogActions, DialogContent, DialogTitle, TextField, InputAdornment, Button,Typography } from '@mui/material';
import React, {useState, useEffect} from 'react';
import {isAmountFormat} from "../js/stringFormatUtils";
import { createNewAccount } from "../js/ApiGateway";

export default function NewAccountDialog(props){

    const theme = useTheme();

    //New Account name
    const [newAccountName, setNewAccountName] = useState("");

    //New Account balance
    const [newAccountAmount, setNewAccountAmount] = useState("");


    //Change amount of selected account
    const amountChangeHandler = (event) => {        
        let amount = event.target.value.replace( ",", "." );
        if( isAmountFormat(amount) ){ setNewAccountAmount(amount); }            
    }

    //Change name of selected account
    const nameChangeHandler = (event) => {
        setNewAccountName(event.target.value);
    }

    //Save new account and refresh all accounts
    const saveNewAccount = () => {
        createNewAccount(props.email, newAccountName, newAccountAmount, props.date);
        props.setIsDialogOpen(false);
        props.updateHome();
    }


    useEffect(()=>{
        setNewAccountAmount('');
        setNewAccountName('');
    },[props.isDialogOpen])

    return (
        <Dialog 
            open={props.isDialogOpen} 
            sx={
                { " .MuiDialog-paper": {
                    backgroundColor: theme.palette.primary_light.main,
                    color: theme.palette.primary_light.contrastText,
                    borderRadius: "28px",
                    padding: "16px"}}
            }
            onClose = {()=>{props.setIsDialogOpen(false)}}
            >
            <DialogTitle className='dialog_header'>
                <Typography className = "account_title" variant="h5"> New account </Typography>
            </DialogTitle>
            <DialogContent className='dialog_content'>
                {/* Account name */}
                <TextField sx={{width: "100%"}} label="name" onChange={nameChangeHandler}> {newAccountName} </TextField>
                {/* Account balance */}
                <TextField sx={{width: "100%"}} label="balance"
                    onChange = {amountChangeHandler}
                    value={newAccountAmount}
                    InputProps={{startAdornment: <InputAdornment position="start">€</InputAdornment>,}}
                />             
            </DialogContent>
            <DialogActions sx={{padding: "0 24px 24px 24px"}}>
                <Button onClick={()=>{props.setIsDialogOpen(false)}}>Cancel</Button>
                <Button onClick = {saveNewAccount} disabled = {(newAccountName === "" || newAccountAmount === "" || newAccountName === null) ? true : false}>Save</Button>
            </DialogActions>            
        </Dialog>
    )
}