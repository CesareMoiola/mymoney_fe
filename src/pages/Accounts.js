import React, { useState } from 'react';
import {} from "../js/ApiGateway";
import "../styles/accounts.css";
import Account from "../components/Account";
import properites from "../data/properties.json"
import { totalAmount } from "../js/AccountUtils";
import { updateAmount, updateAccountName, deleteAccount} from "../js/ApiGateway";
import { Dialog, DialogActions, DialogContent, IconButton, TextField, InputAdornment, Button,Typography } from '@mui/material';
import { useTheme } from '@mui/styles';
import {isAmountFormat} from "../js/stringFormatUtils";
import {getAccounts} from "../js/ApiGateway";
import {getDayBefore} from "../js/dateUtils";

function Accounts(props) {

    //Date before selected date
    var dayBeforeAccounts = getAccounts(props.email, getDayBefore(props.date));

    //How much was spent today
    let spendingToday = totalAmount(props.accounts) - totalAmount(dayBeforeAccounts);

    //Application theme
    const theme = useTheme();

    //Account currenctly selected
    const [selectedAccount, setSelectedAccount] = useState(null);

    //Account selected to be deleted
    const [accountToDelete, setAccountToDelete] = useState(null);
    
    //New Account balance
    const [newAccountAmount, setNewAccountAmount] = useState("");

    //New Account name
    const [newAccountName, setNewAccountName] = useState("");

    //Change amount of selected account
    const amountChangeHandler = (event) => {
        let amount = event.target.value.replace( ",", "." );
        
        if( isAmountFormat(amount) ){ setNewAccountAmount(amount); }    
    }

    //Change name of selected account
    const nameChangeHandler = (event) => {
        setNewAccountName(event.target.textContent);
    }

    //Get account by id
    const getAccountById = (accounts, id) => {
        let account = null;
        accounts.forEach(element => {
            if(element.id === id) account = element;
            return account;
        });
        return account;
    }

    //Save account changes and refresh all accounts
    const saveAccount = () => {
        updateAmount(props.email, selectedAccount.id, newAccountAmount, props.date); 
        updateAccountName(props.email, selectedAccount.id, newAccountName);
        unselectAccount();
    }

    //Unselect all accounts
    const unselectAccount = () => {
        setSelectedAccount(null);
        setNewAccountName(null);
        setNewAccountAmount(0);
        setAccountToDelete(null);

        props.updateHome();
    }

    //Select an account
    const selectAccount = (account) => {
        setSelectedAccount(account);
        setNewAccountName(account.name);
        setNewAccountAmount(account.amount);
    }

    //Start process for deleting an account
    const deleteAccountHandler = () => {
        deleteAccount(props.email, selectedAccount.id);
        unselectAccount();
    }

    //Get dialog component
    const getEdtiAccountDialog = () => {

        if(selectedAccount === null || selectedAccount === undefined) return null;

        let dayBeforeAccount = getAccountById(dayBeforeAccounts, selectedAccount.id);
        let variance = 0;

        if(dayBeforeAccount !== null) variance = (selectedAccount.amount - dayBeforeAccount.amount).toFixed(2);

        const editDialog = <div>
            <div className='dialog_header'>
                <Typography 
                    className = "account_title" 
                    suppressContentEditableWarning={true} 
                    contentEditable={true} 
                    onInput={nameChangeHandler}
                    variant="h5">
                    {selectedAccount.name}
                </Typography>
                
                <div className='buttons_header_container' style={{minWidth: "70px"}}>
                    <IconButton size='small'>
                        <span className = "material-symbols-outlined" style={{color: theme.palette.primary.main}}>favorite</span>
                    </IconButton>
                    <IconButton size="small" onClick={() => setAccountToDelete(selectedAccount)}>
                        <span className = "material-symbols-outlined" style={{color: theme.palette.primary.main}}>delete</span>
                    </IconButton>
                </div>   
            </div>
            <DialogContent className='dialog_content'>
                <div className='dialog_balance_container'>
                    <TextField sx={{width: "100%"}} label="balance" onChange = {amountChangeHandler} value={newAccountAmount}
                        InputProps={{ startAdornment: <InputAdornment position="start">€</InputAdornment>, }}/>
                    <Typography visibility={(variance * 1 === 0) ? "hidden" : "visible" } sx={{ textAlign: "right", opacity: "0.6", fontSize: "14px"}}>
                        { "variance:"  + (variance > 0 ? "+" + variance : variance) + "€"}
                    </Typography>
                </div>                        
            </DialogContent>
            <DialogActions sx={{padding: "0 24px 24px 24px"}}>
                <Button onClick={()=>{setSelectedAccount(null)}}>Cancel</Button>
                <Button onClick={() => {saveAccount()}} disabled = {(selectedAccount.amount === "" || newAccountName === "") ? true : false}>Save</Button>
            </DialogActions>
        </div>;

        const deleteDialog = <div>
            <DialogContent className='dialog_content'>
                <Typography>
                    Are you sure you want to delete the "{selectedAccount.name}" account?
                </Typography>                    
            </DialogContent>
            <DialogActions sx={{padding: "0 24px 24px 24px"}}>
                <Button onClick={() => {setAccountToDelete(null)}}> No </Button>
                <Button onClick={deleteAccountHandler}> Yes </Button>
            </DialogActions>
        </div>;

        let dialogContent = editDialog;

        if(accountToDelete != null) {dialogContent = deleteDialog}

        return <Dialog 
            open={selectedAccount !== null} 
            sx={{ " .MuiDialog-paper": {
                    backgroundColor: theme.palette.primary_light.main,
                    color: theme.palette.primary_light.contrastText,
                    borderRadius: "28px",
                    padding: "16px"}}}
            onClose={()=>{unselectAccount()}}
            >
            {dialogContent}            
        </Dialog>;
    }  

    return(
        <div className="accounts">
            {getEdtiAccountDialog()}

            {/*Chips*/}
            <div className="data-view">
                {spendingToday>=0?null:<Typography className="chip" color="secondary" variant="outlined">{"Today I spent " + properites.currency + " " + Math.abs(spendingToday)}</Typography>}
                {spendingToday<=0?null:<Typography className="chip" color="secondary" variant="outlined">{"Today I earned " + properites.currency + " " + Math.abs(spendingToday)}</Typography>}  
            </div>
            
            {/*Accounts*/}
            <div className="accounts_list">
                {   
                    props.accounts.map((account) => 
                        <Account 
                            key={account.id} 
                            index={account.id}
                            account={account}
                            isSelected={account.id === selectedAccount} 
                            onClick={() => { selectAccount(account); }}
                        /> 
                    )
                }
            </div>  
        </div>      
    );
}

export default Accounts;