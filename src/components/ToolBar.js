import React from 'react';
import { Avatar, TextField, Typography} from '@mui/material';
import '../styles/toolBar.css';
import { useTheme } from '@mui/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import properites from '../data/properties.json';
import { formatDate } from "../js/dateUtils";
import AccountsMenu from './AccountsMenu';
import { totalAmount } from '../js/AccountUtils';


export default function ToolBar(props){
    const theme = useTheme();

    return (
        <div className={"tool-bar " + props.className}>                
            <div className="total-section" style={{backgroundColor: theme.palette.primary_light.main}}>
                {/*Avatar*/}
                <Avatar style={{backgroundColor: theme.palette.background.surface1, height:"32px", width:"32px"}}>
                    <span className = "material-symbols-outlined" style={{color: theme.palette.primary.main}}>person</span>
                </Avatar>
                {/*Total*/}
                <Typography color={theme.palette.primary.dark} fontWeight="bold">
                        {properites.currency + " " + totalAmount(props.accounts)}
                </Typography>
            </div>

            <div className='tools'>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        value={props.date}
                        inputFormat = {properites.dateFormat}
                        onChange={(newDate) => {props.setDate(formatDate(newDate))}}
                        renderInput={(params) => <TextField className="data-picker" size="small" {...params} />}
                        componentsProps={{
                            actionBar: { actions: ["today"] },
                        }}
                    />
                </LocalizationProvider>
                
                {/*Context menu*/ <AccountsMenu/>}
                
            </div>
        </div>
    )
}