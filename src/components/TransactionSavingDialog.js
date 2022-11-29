import { useTheme } from '@mui/styles';
import { Slider, Dialog, DialogActions, DialogContent, DialogTitle, TextField, InputAdornment, Button, Typography } from '@mui/material';
import React, {useState, useContext } from 'react';
import { transactionSaving, getSavings } from "../js/ApiGateway";
import { UserContext } from '../pages/Home';
import {isAmountFormat} from "../js/stringFormatUtils";

export default function TransactionSavingDialog(props){

    const theme = useTheme();

    const email = useContext(UserContext);

    //Transiction amount
    const [transactionAmount, setTransictionAmount] = useState('');


    //Deposit or withdraw from an amount
    const transactionAmountHandler = (event) => {
        let newAmount = '' + event.target.value;
        newAmount.replace( ",", "." );

        if( isAmountFormat(newAmount) && newAmount >= 0){
            if( props.variant === 'withdraw'){
                if( newAmount <= props.saving.saved ) setTransictionAmount(newAmount);
                else setTransictionAmount(props.saving.saved);
            } 
            if( props.variant === 'deposit' ){
                if((newAmount*1 + props.saving.saved*1) <= props.saving.amount) setTransictionAmount(newAmount);
                else setTransictionAmount(props.saving.amount*1 - props.saving.saved*1);
            }            
        }       
    }

    //Close dialog handler
    const closeDialogHandler = () => {
        props.setIsDialogOpen(false);
        setTransictionAmount('');
    }

    //Edit saving
    const editSavingsHandler = () => {
        if(props.variant === 'deposit') transactionSaving(email, props.saving.id, transactionAmount);
        if(props.variant === 'withdraw') transactionSaving(email, props.saving.id, (0 - transactionAmount));
        
        closeDialogHandler();
        props.setSavings(getSavings(email));
    }

    //Get title
    const getTitle = () => {
        let title = '';
        if(props.variant === 'deposit'){ title = 'Deposit into ' + props.saving.name}        
        if(props.variant === 'withdraw'){ title = 'Withdraw from ' + props.saving.name}
        return title;
    }

    return (
        <Dialog 
            open={props.isDialogOpen} 
            sx={{ ".MuiDialog-paper":{
                    backgroundColor: theme.palette.primary_light.main,
                    color: theme.palette.primary_light.contrastText,
                    borderRadius: "28px",
                    padding: "16px" }}}
            onClose = {closeDialogHandler}
        >
            <DialogTitle className='dialog_header'>
                <Typography className = "account_title" variant="h5"> {getTitle()} </Typography>
            </DialogTitle>
            <DialogContent className='dialog_content'>

                {/* Transaction amount */}
                <TextField sx={{width: "100%"}} label="amount"
                    onChange={transactionAmountHandler}
                    value={transactionAmount}
                    InputProps={{startAdornment: <InputAdornment position="start">€</InputAdornment>}}
                />

            </DialogContent>
            <DialogActions sx={{padding: "0 24px 24px 24px"}}>
                <Button onClick={closeDialogHandler}>Cancel</Button>
                <Button onClick={editSavingsHandler} disabled={(transactionAmount === "" || transactionAmount <= 0) ? true : false}>Save</Button>
            </DialogActions>
        </Dialog>
    )
}