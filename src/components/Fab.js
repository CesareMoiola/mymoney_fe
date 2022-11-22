import '../styles/fab.css';
import React, { useEffect, useState } from "react";
import useWindowDimensions, {isMobileMode, isTabletMode} from '../js/WindowUtils';
import { useTheme } from '@mui/styles';
import { Typography } from '@mui/material';
import { useLocation } from "react-router-dom";
import NewTransationDialog from './NewTransactionDialog';
import MuiFab from '@mui/material/Fab';
import NewAccountDialog from './NewAccountDIalog';
import NewRecurrenceDialog from './NewRecurrenceDialog';


export default function Fab(props){

    const location = useLocation();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const windowDimensions = useWindowDimensions();
    const theme = useTheme();    
    let mobileMode = isMobileMode(windowDimensions);
    let tabletMode = isTabletMode(windowDimensions);

    useEffect(()=>{ setIsDialogOpen(false) },[location.pathname])
    
    //Get dialog
    const getDialog = () => {
        let dialog = null;

        switch(location.pathname){
            case '/':               dialog = <NewTransationDialog email={props.email} date={props.date} updateHome={props.updateHome} accounts={props.accounts} isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />;    break;
            case '/home':           dialog = <NewTransationDialog email={props.email} date={props.date} updateHome={props.updateHome} accounts={props.accounts} isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />;    break;
            case '/accounts':       dialog = <NewAccountDialog email={props.email} date={props.date} updateHome={props.updateHome} isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen}/>;    break;
            case '/recurrences':    dialog = <NewRecurrenceDialog  email={props.email} updateHome={props.updateHome} isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen}/>;    break;
            case '/savings':        dialog = null;    break;
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
            case '/savings':        fabTitle = null;  break;
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
            case '/savings':        fabIcon = null;  break;
            case '/investments':    fabIcon = null;  break;
        }

        return fabIcon;
    }

    const getStyle = () => {
        return {
            boxShadow:  mobileMode?2:0, 
            bottom: (location.pathname === '/recurrences' && mobileMode) ?'55px': null
        }
    }

    return (
        <div>
            {getDialog()}
            <MuiFab className="fab" variant="extended" color="tertiary_light" aria-label="Transaction" sx={getStyle()} onClick={()=>{setIsDialogOpen(true)}}>
                <span className = "material-symbols-outlined fab-icon" style={{color: theme.palette.tertiary_light.contrastText}}>{getFabIcon()}</span>
                {(mobileMode||tabletMode)?null:<Typography color={theme.palette.tertiary_light.contrastText} fontWeight="bold">{getFabTitle()}</Typography>}
            </MuiFab>
        </div>
    )
}