import React, { useState } from 'react';
import '../styles/context_menu.css';
import { Menu, MenuItem, Button, IconButton, ListItemIcon, ListItemText } from "@mui/material";
import { useTheme } from '@mui/styles';
import NewAccountDialog from './NewAccountDIalog';
import useWindowDimensions, {isMobileMode} from '../js/WindowUtils';

export default function AccountsMenu(){

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [newAccountDialogIsOpen, setNewAccountDialogIsOpen] = useState(false);
    const open = Boolean(anchorEl);
    const theme = useTheme();
    const windowDimensions = useWindowDimensions();
    let mobileMode = isMobileMode(windowDimensions);

    const handleClick = (event) => { setAnchorEl(event.currentTarget); };

    const handleClose = () => { setAnchorEl(null); };

    const getExtendedVersion = ()=>{
        return(
            <Button disableElevation className="icon-text-button" variant="outlined"
                onClick={()=>{setNewAccountDialogIsOpen(true); handleClose();}}
            >
                <span className = "material-symbols-outlined">add</span>
                New account
            </Button>
        )
    }

    const getCompactVersion = ()=>{
        return(
            <div>
                <IconButton sx={{margin:"0 -8px"}}
                    id="long-button"
                    aria-controls={open ? 'long-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    <span className = "material-symbols-outlined" style={{color: theme.palette.primary.main}}>more_vert</span>
                </IconButton>
                <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        'style': {'backgroundColor': theme.palette.primary_light.light, borderRadius:'4px', color: theme.palette.primary_light.contrastText},
                        'elevation': 2,
                    }}
                >
                    <MenuItem onClick={()=>{setNewAccountDialogIsOpen(true); handleClose();}}>
                        <ListItemIcon>
                            <span className = "material-symbols-outlined" style={{color: theme.palette.primary_light.contrastText, fontSize:20}}>add</span>
                        </ListItemIcon>
                        <ListItemText>New account</ListItemText>
                    </MenuItem>
                </Menu>
            </div>
        )
    }

    return (
        <div>
            {mobileMode?getCompactVersion():getExtendedVersion()}
            <NewAccountDialog dialogIsOpen={newAccountDialogIsOpen} setDialogIsOpen={setNewAccountDialogIsOpen} handleClose={handleClose}/>
        </div>
    )
}