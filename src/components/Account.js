import React, { useState } from 'react';
import {Card, Typography} from "@mui/material";
import useTheme from "@mui/material/styles/useTheme";
import properties from '../data/properties.json';
import {} from "../js/ApiGateway";
import "../styles/account.css";
import "../styles/accounts.css";


function Account(props) {

    const theme = useTheme();
    const [isFocus, setFocus] = useState(false);

    return(
        <Card 
            tabIndex={props.index}
            className={"account " + props.className}
            elevation={0}
            sx={{
                backgroundColor: theme.palette.primary_light.main,
                color: theme.palette.primary_light.contrastText,
            }} 
            onClick={() => {props.onClick()}}
            onBlur={() => {setFocus(false)}}
            onFocus={()=>{setFocus(true)}}
        >
            <div className = "account_data">
                <div className='account-header'>
                    <Typography className= "account_title" variant="h5">{props.account.name}</Typography>
                    {props.account.favorite ? <span className = "material-symbols-outlined filled_icon" style={{fontSize:'20px', color: theme.palette.primary.main}}>favorite</span> : null}
                </div>
                <div>
                    <Typography sx={{opacity: 0.6, textAlign: "right"}}>current balance</Typography>
                    <Typography variant="h5" sx={{textAlign: "right"}}>{properties.currency + " " + props.account.amount}</Typography>
                </div>                
            </div>
        </Card>
    );
}
  
export default Account;