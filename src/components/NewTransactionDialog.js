import React, { useEffect, useState, useContext } from 'react';
import { Button, DialogActions, InputAdornment, TextField, MenuItem, Select, InputLabel, FormControl, Dialog, DialogContent, Typography, DialogTitle } from '@mui/material';
import { isAmountFormat } from '../js/stringFormatUtils';
import properties from '../data/properties.json';
import { useTheme } from '@mui/styles';
import { getAccounts, saveTransaction } from '../js/ApiGateway';
import { UserContext } from '../pages/Home';

export default function NewTransationDialog(props){

    const [type, setType] = useState('');
    const [account, setAccount] = useState('');
    const [accountTo, setAccountTo] = useState('');
    const [amount, setAmount] = useState(''); 
    const theme = useTheme();   
    const email = useContext(UserContext);

    //Change amount of selected account
    const amountChangeHandler = (event) => {        
        let value = event.target.value.replace( ",", "." );
        if( isAmountFormat(value) ){ setAmount(value); }            
    }

    //Rturn true if form is corectly completed
    const isFormValid = () => {
        return (
            type !== ''
            && account !== ''
            && (( type === 3 && accountTo !== '' && accountTo !== account) || ( type !== 3 ))
            && ( amount !== '' && amount !== '0') 
        )
    }

    //Save transaction
    const saveHandler = () => {
        let isTransactionSuccessful = saveTransaction(email, props.date, type, account, accountTo, amount);
        if(isTransactionSuccessful){
            console.log("Transition was successfully processed")
            props.setAccounts(getAccounts(email, props.date));
        }
        else{ console.error("Transition was not processed correctly")}
        props.setIsDialogOpen(false);
    }  
    
    useEffect(()=>{
        setType('');
        setAccount('');
        setAccountTo('');
        setAmount('');
    },[props.isDialogOpen])

    return(
        <Dialog 
            open={props.isDialogOpen} 
            sx={
                { " .MuiDialog-paper": {
                    backgroundColor: theme.palette.primary_light.main,
                    color: theme.palette.primary_light.contrastText,
                    borderRadius: "28px",
                    padding: "16px"}}
            }
            onClose = {()=>props.setIsDialogOpen(false)}
            >

            <DialogTitle className='dialog_header'>
                <Typography className = "account_title" variant="h5"> Transaction </Typography>
            </DialogTitle>

            <DialogContent className='dialog_content'>   

                <FormControl>
                    <InputLabel id="type">Type</InputLabel>
                    <Select
                        labelId="type"
                        label="Type"
                        onChange={(event) => {setType(event.target.value);}}
                        MenuProps={{MenuListProps: {sx:{backgroundColor: theme.palette.primary_light.light}}}}
                        value={type}
                    >
                        <MenuItem key={1} value={1}>Expense</MenuItem>
                        <MenuItem key={2} value={2}>Gain</MenuItem>
                        <MenuItem key={3} value={3}>Movement</MenuItem>
                    </Select>
                </FormControl>

                <FormControl>
                    <InputLabel id="account">{type===3?"Account from":"Account"}</InputLabel>
                    <Select
                        labelId="account"
                        label={type===3?"Account from":"Account"}
                        onChange={(event,) => {setAccount(event.target.value);}}
                        MenuProps={{MenuListProps: {sx:{backgroundColor: theme.palette.primary_light.light}}}}
                        value={account}
                    >
                        { props.accounts.map( account => <MenuItem key={account.id} value={account.id}>{account.name}</MenuItem> ) }
                    </Select>
                </FormControl>

                    {   type===3?
                        (<FormControl>
                            <InputLabel id="account_to">Account to</InputLabel>
                            <Select
                                labelId="account_to"
                                onChange={(event) => {setAccountTo(event.target.value);}}
                                label="Account to"
                                MenuProps={{MenuListProps: {sx:{backgroundColor: theme.palette.primary_light.light}}}}
                                value={accountTo}
                            >
                                { props.accounts.map( account => <MenuItem key={account.id} value={account.id}>{account.name}</MenuItem> ) }
                            </Select>
                        </FormControl>):null
                    }
                
                
                <TextField id='amount' label="Amount" value={amount} onChange={amountChangeHandler}
                    type="number"
                    InputProps={{startAdornment: <InputAdornment position="start">{properties.currency}</InputAdornment>,}}
                />
            </DialogContent>
            
            <DialogActions sx={{padding: "0 24px 24px 24px"}}>
                <Button onClick={()=>{props.setIsDialogOpen(false);}}>Cancel</Button>
                <Button onClick = {saveHandler} disabled={false === isFormValid()}>Save</Button>
            </DialogActions>            
        </Dialog>
    )
}