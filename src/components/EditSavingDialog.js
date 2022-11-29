import { useTheme } from '@mui/styles';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, InputAdornment, Button, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import React, {useState, useContext } from 'react';
import {isAmountFormat} from "../js/stringFormatUtils";
import { editSaving, getSavings } from "../js/ApiGateway";
import { UserContext } from '../pages/Home';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { formatInputDate } from '../js/dateUtils';
import properties from '../data/properties.json';

export default function EditSavingDialog(props){

    const theme = useTheme();

    const email = useContext(UserContext);

    //New savings name
    const [name, setName] = useState(props.saving.name);

    //New savings amount
    const [amount, setAmount] = useState(props.saving.amount);

    //Initial saved
    const [saved, setSaved] = useState(props.saving.saved);

    //Deadline
    const [date, setDate] = useState(formatInputDate(props.saving.date));



    //Change name
    const nameChangeHandler = (event) => {
        setName(event.target.value);
    }

    //Change amount
    const amountChangeHandler = (event) => {        
        let newAmount = event.target.value.replace( ",", "." );
        if( isAmountFormat(newAmount) ){ 
            setAmount(newAmount); 
            setSaved(0);
        }            
    }

    //Change saved
    const savedChangeHandler = (event) => {
        setSaved(event.target.value);   
        if(event.target.value > amount) setAmount(event.target.value);
    }

    //Change date
    const dateChangeHandler = (newDate) => {
        setDate(formatInputDate(newDate));
    }

    //Close dialog handler
    const closeDialogHandler = () => {
        props.setIsDialogOpen(false)
    }

    //Edit savings
    const editSavingsHandler = () => {
        editSaving(email, props.saving.id, date, name, amount, saved);
        closeDialogHandler();
        props.setSavings(getSavings(email));
    }


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
            onClose = {closeDialogHandler}
            >
            <DialogTitle className='dialog_header'>
                <Typography className = "account_title" variant="h5"> Edit savings </Typography>
            </DialogTitle>
            <DialogContent className='dialog_content'>

                {/* Recurrence name */}
                <TextField sx={{width: "100%"}} label="name" onChange={nameChangeHandler} value={name}/>

                {/* Deadline */}
                <LocalizationProvider className='date-picker' dateAdapter={AdapterDayjs}>
                    <MobileDatePicker
                        disablePast
                        label='deadline'
                        value={date}
                        inputFormat = {properties.dateFormat}
                        onChange={dateChangeHandler}
                        renderInput={(params) => <TextField {...params} />}
                        componentsProps={{ actionBar: { actions: ['accept'] },}}
                    />
                </LocalizationProvider>

                {/* Recurrence amount */}
                <TextField sx={{width: "100%"}} label="amount"
                    onChange={amountChangeHandler}
                    value={amount}
                    InputProps={{startAdornment: <InputAdornment position="start">€</InputAdornment>,}}
                />

                {/* Initial saved */}
                <TextField sx={{width: "100%"}} label="saved"
                    onChange={savedChangeHandler}
                    value={saved}
                    InputProps={{startAdornment: <InputAdornment position="start">€</InputAdornment>,}}
                />

            </DialogContent>
            <DialogActions sx={{padding: "0 24px 24px 24px"}}>
                <Button onClick={closeDialogHandler}>Cancel</Button>
                <Button onClick={editSavingsHandler} disabled={(name === "" || amount === "" || date === '') ? true : false}>Save</Button>
            </DialogActions>            
        </Dialog>
    )
}