import { useTheme } from '@mui/styles';
import { Slider, Dialog, DialogActions, DialogContent, DialogTitle, TextField, InputAdornment, Button, Typography} from '@mui/material';
import React, {useState, useContext} from 'react';
import {isAmountFormat} from "../js/stringFormatUtils";
import { UserContext } from '../pages/Home';
import properties from '../data/properties.json';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { formatInputDate } from '../js/dateUtils';
import { saveSaving, getSavings } from '../js/ApiGateway';
import '../styles/new_savings_dialog.css';

export default function NewSavingsDialog(props){

    const theme = useTheme();

    const email = useContext(UserContext);

    //New savings name
    const [name, setName] = useState('');

    //New savings amount
    const [amount, setAmount] = useState('');

    //Initial saved
    const [saved, setSaved] = useState(0);

    //Deadline
    const [date, setDate] = useState(null);


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
    }

    //Change date
    const dateChangeHandler = (newDate) => {
        setDate(formatInputDate(newDate));
    }

    //Close dialog handler
    const closeDialogHandler = () => {
        props.setIsDialogOpen(false)
        setName('');
        setDate(null);
        setAmount('');
        setSaved(0);
    }

    //Save savings
    const saveSavingsHandler = () => {
        saveSaving(email, date, name, amount, saved);
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
                <Typography className = "account_title" variant="h5"> New savings </Typography>
            </DialogTitle>
            <DialogContent className='dialog_content'>

                {/* Saving name */}
                <TextField sx={{width: "100%"}} label="name" onChange={nameChangeHandler}> {name} </TextField>

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

                {/* Saving amount */}
                <TextField sx={{width: "100%"}} label="amount"
                    onChange={amountChangeHandler}
                    value={amount}
                    InputProps={{startAdornment: <InputAdornment position="start">€</InputAdornment>,}}
                />

                {/* Initial saved */}
                <div>
                    <div className='saving-saved-label'>
                        <Typography color='secondary'>inital saved</Typography>
                        <Typography color='secondary'>{properties.currency + ' ' + saved}</Typography>
                    </div>
                    <div style={{padding: '0 4px'}}>
                        <Slider className='initial-saved-slider' value={saved} max={amount} onChange={savedChangeHandler}/>
                    </div>
                </div>

            </DialogContent>
            <DialogActions sx={{padding: "0 24px 24px 24px"}}>
                <Button onClick={closeDialogHandler}>Cancel</Button>
                <Button onClick={saveSavingsHandler} disabled={(name === "" || amount === "" || date === '') ? true : false}>Save</Button>
            </DialogActions>            
        </Dialog>
    )
}