import '../styles/fab.css';
import React, { useEffect, useState, useContext } from "react";
import { UserContext } from '../pages/Home';
import { useTheme } from '@mui/styles';
import { Typography } from '@mui/material';
import { useLocation } from "react-router-dom";
import NewTransationDialog from './NewTransactionDialog';
import MuiFab from '@mui/material/Fab';
import NewAccountDialog from './NewAccountDIalog';
import NewRecurrenceDialog from './NewRecurrenceDialog';
import SavingDialog from './SavingDialog';
import properties from "../data/properties.json";


export default function Fab(props){

    const location = useLocation();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const theme = useTheme();
    const screen = useContext(UserContext).screen;

    useEffect(()=>{ setIsDialogOpen(false) },[location.pathname])
    
    //Get dialog
    const getDialog = () => {
        let dialog = null;

        switch(location.pathname){
            case '/':               dialog = <NewTransationDialog date={props.date} accounts={props.accounts} setAccounts={props.setAccounts} isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />;    break;
            case '/home':           dialog = <NewTransationDialog date={props.date} accounts={props.accounts} setAccounts={props.setAccounts} isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />;    break;
            case '/accounts':       dialog = <NewAccountDialog date={props.date} setAccounts={props.setAccounts} isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen}/>;    break;
            case '/recurrences':    dialog = <NewRecurrenceDialog setRecurrences={props.setRecurrences} isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen}/>;    break;
            case '/savings':        dialog = <SavingDialog variant='new' setSavings={props.setSavings} isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen}/>;    break;
            case '/investments':    dialog = null;    break;
        }

        return dialog;
    }

    //Get fab title
    const getFabTitle = () => {
        let fabTitle = null;

        switch(location.pathname){
            case '/':               fabTitle = 'New transaction';  break;
            case '/home':           fabTitle = 'New transaction';  break;
            case '/accounts':       fabTitle = 'New account';  break;
            case '/recurrences':    fabTitle = 'New recurrence';  break;
            case '/savings':        fabTitle = 'New savings';  break;
            case '/investments':    fabTitle = null;  break;
        }

        return fabTitle;
    }

    //Get fab icon
    const getFabIcon = () => {
        let fabIcon = null;

        switch(location.pathname){
            case '/':               fabIcon = 'sync_alt';  break;
            case '/home':           fabIcon = 'sync_alt';  break;
            case '/accounts':       fabIcon = 'add';  break;
            case '/recurrences':    fabIcon = 'add';  break;
            case '/savings':        fabIcon = 'add';  break;
            case '/investments':    fabIcon = null;  break;
        }

        return fabIcon;
    }

    const getStyle = () => {
        return {
            boxShadow:  screen===properties.screen.MOBILE?2:0, 
            bottom: (location.pathname === '/recurrences' && screen===properties.screen.MOBILE) ?'55px': null
        }
    }

    return (
        <div>
            {getDialog()}
            <MuiFab className="fab" variant="extended" color="tertiary_light" aria-label="Transaction" sx={getStyle()} onClick={()=>{setIsDialogOpen(true)}}>
                <span className = "material-symbols-outlined fab-icon" style={{color: theme.palette.tertiary_light.contrastText}}>{getFabIcon()}</span>
                {(screen===properties.screen.MOBILE||screen===properties.screen.TABLET) ? null:<Typography color={theme.palette.tertiary_light.contrastText} fontWeight="bold">{getFabTitle()}</Typography>}
            </MuiFab>
        </div>
    )
}