import { useTheme } from '@mui/styles';
import { Radio, FormControlLabel, RadioGroup, Dialog, DialogActions, DialogContent, DialogTitle, TextField, InputAdornment, Button, Typography, FormControl } from '@mui/material';
import React, {useState, useEffect, useContext} from 'react';
import {isAmountFormat} from "../js/stringFormatUtils";
import { editRecurrence, getRecurrences } from "../js/ApiGateway";
import { UserContext } from '../pages/Home';

export default function EditRecurrenceDialog(props){

    const theme = useTheme();

    const email = useContext(UserContext);

    //New recurrence type
    const [type, setType] = useState(props.recurrence.type);

    //New recurrence name
    const [name, setName] = useState(props.recurrence.name);

    //New recurrence amount
    const [amount, setAmount] = useState(props.recurrence.amount);


    //Change amount
    const amountChangeHandler = (event) => {        
        let newAmount = event.target.value.replace( ",", "." );
        if( isAmountFormat(newAmount) ){ setAmount(newAmount); }            
    }

    //Change name
    const nameChangeHandler = (event) => {
        setName(event.target.value);
    }

    //Save new account and refresh all accounts
    const editRecurrenceHandler = () => {
        editRecurrence(email, props.recurrence.id,  type, name, amount);
        props.setIsDialogOpen(false);
        props.setRecurrences(getRecurrences(email));
    }

    useEffect(()=>{
        setType(props.recurrence.type);
        setName(props.recurrence.name);
        setAmount(props.recurrence.amount);
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
                <Typography className = "account_title" variant="h5"> Edit recurrence </Typography>
            </DialogTitle>
            <DialogContent className='dialog_content'>
                <FormControl>
                    <RadioGroup defaultValue={type} row aria-labelledby="type" onChange={(event) => {setType(event.target.value);}}>
                        <FormControlLabel value="EARNING" control={<Radio size='small'/>} label="Earning" />
                        <FormControlLabel value="EXPENSE" control={<Radio size='small'/>} label="Expense" />
                    </RadioGroup>
                </FormControl>
                
                {/* Recurrence name */}
                <TextField sx={{width: "100%"}} label="name" onChange={nameChangeHandler} value={name}/>
                
                {/* Recurrence amount */}
                <TextField sx={{width: "100%"}} label="amount"
                    onChange = {amountChangeHandler}
                    value={amount}
                    InputProps={{startAdornment: <InputAdornment position="start">€</InputAdornment>,}}
                />             
            </DialogContent>

            <DialogActions sx={{padding: "0 24px 24px 24px"}}>
                <Button onClick={()=>{props.setIsDialogOpen(false)}}>Cancel</Button>
                <Button onClick = {editRecurrenceHandler} disabled = {(name === "" || amount === "" || type === '') ? true : false}>Save</Button>
            </DialogActions>            
        </Dialog>
    )
}