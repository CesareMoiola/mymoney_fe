import { useTheme } from '@mui/styles';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, InputAdornment, Button, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import React, {useState, useContext, useEffect } from 'react';
import {isAmountFormat} from "../js/stringFormatUtils";
import { editSaving, saveSaving, getSavings } from "../js/ApiGateway";
import { UserContext } from '../pages/Home';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { formatInputDate } from '../js/dateUtils';
import properties from '../data/properties.json';

export default function SavingDialog(props){

    const theme = useTheme();

    const email = useContext(UserContext).email;

    //savings name
    const [name, setName] = useState();

    //savings type
    const [type, setType] = useState(); 

    //savings amount
    const [amount, setAmount] = useState();

    //Initial saved
    const [saved, setSaved] = useState();

    //Deadline
    const [date, setDate] = useState();


    useEffect(()=>{ if(props.isDialogOpen) resetForm(); },[props.isDialogOpen])


    //Change name
    const nameChangeHandler = (event) => {
        setName(event.target.value);
    }

    //Change type
    const typeChangeHandler = (event) => {
        setType(event.target.value);
    }

    //Change amount
    const amountChangeHandler = (event) => {        
        let newAmount = event.target.value.replace( ",", "." );
        if( isAmountFormat(newAmount) ){ 
            setAmount(newAmount); 
            if( type === 'TARGET' && saved*1 > newAmount*1) setSaved(newAmount);
        }            
    }

    //Change saved
    const savedChangeHandler = (event) => {        
        let newSaved = event.target.value.replace( ",", "." );
        if( isAmountFormat(newSaved) ){ 
            setSaved(newSaved);   
            if( type === 'TARGET' && newSaved !== '' && newSaved*1 > amount*1) setAmount(newSaved);
        }            
    }

    //Change date
    const dateChangeHandler = (newDate) => {
        setDate(formatInputDate(newDate));
    }

    //Close dialog handler
    const closeDialogHandler = () => { props.setIsDialogOpen(false); }

    //Reset form
    const resetForm = () => {
        if(props.variant === 'edit'){
            setName(props.saving.name);
            setType(props.saving.type);
            setAmount(props.saving.amount);
            setSaved(props.saving.saved);
            setDate(formatInputDate(props.saving.date));
        }
        if(props.variant === 'new'){
            setName('');
            setType(null);
            setAmount('');
            setSaved('');
            setDate(null);
        }
    }

    //Save savings
    const saveSavingsHandler = () => {
        if(props.variant === 'new') saveSaving(email, date, name, type, amount, saved);
        if(props.variant === 'edit') editSaving(email, props.saving.id, date, name, type, amount, saved);
        closeDialogHandler();
        props.setSavings(getSavings(email));
    }

    const getTitle = () => {
        let title = ''
        if(props.variant === 'new') title = 'New saving'
        if(props.variant === 'edit') title = 'Edit saving'
        return title;
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
                <Typography className = "account_title" variant="h5">{getTitle()}</Typography>
            </DialogTitle>
            <DialogContent className='dialog_content'>

                {/* Saving name */}
                <TextField sx={{width: "100%"}} label="name" onChange={nameChangeHandler} value={name}/>
                
                {/* Type */}
                <FormControl fullWidth>
                    <InputLabel>type</InputLabel>
                    <Select
                        value={type + ""}
                        label="type"
                        onChange={typeChangeHandler}
                    >
                        <MenuItem value='TARGET'>Target</MenuItem>
                        <MenuItem value='DAILY'>Daily</MenuItem>
                        <MenuItem value='MONTHLY'>Monthly</MenuItem>
                        <MenuItem value='ANNUAL'>Annual</MenuItem>
                    </Select>
                </FormControl>

                {/* Deadline */
                    (type==='TARGET')? (
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
                    ):null
                }

                {/* Saving amount */}
                <TextField sx={{width: "100%"}} label="amount"
                    onChange={amountChangeHandler}
                    value={amount}
                    InputProps={{startAdornment: <InputAdornment position="start">€</InputAdornment>,}}
                />

                {/* Saved */}
                <TextField sx={{width: "100%"}} label={props.variant==='new' ? "initial saved":"saved"}
                    onChange={savedChangeHandler}
                    value={saved}
                    InputProps={{startAdornment: <InputAdornment position="start">€</InputAdornment>,}}
                />

            </DialogContent>

            <DialogActions sx={{padding: "0 24px 24px 24px"}}>
                <Button onClick={closeDialogHandler}>Cancel</Button>
                <Button onClick={saveSavingsHandler} disabled={(name === "" || amount === "" || date === '') ? true : false}>Save</Button>
            </DialogActions>            
        </Dialog>
    )
}