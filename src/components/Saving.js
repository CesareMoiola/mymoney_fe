import { ListItemIcon, ListItemText, Menu, MenuItem, Card, IconButton, LinearProgress, Typography, Tooltip } from '@mui/material';
import React, { useState, useContext } from 'react';
import '../styles/saving.css';
import properties from '../data/properties.json';
import { formatDate, today, getDateDifference } from '../js/dateUtils';
import { useTheme } from '@mui/styles';
import DeleteSavingsDialog from './DeleteSavingsDialog';
import SavingDialog from './SavingDialog';
import { activeSaving, getSavings } from '../js/ApiGateway.js';
import { UserContext } from '../pages/Home';
import TransactionSavingDialog from './TransactionSavingDialog';

export default function Saving(props){

    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [editDialog, setEditDialog] = useState(false);
    const [depositDialog, setDepositDialog] = useState(false);
    const [withdrawDialog, setWithdrawDialog] = useState(false);
    const open = Boolean(anchorEl);
    const email = useContext(UserContext).email;

    const getProgress = () => {
        return 100 * ( props.saving.saved / props.saving.amount)
    }

    const isSavingCompleted = () => {
        return props.saving.type === 'TARGET' && props.saving.saved >= props.saving.amount;
    }

    const handleMenuClick = (event) => { setAnchorEl(event.currentTarget); };

    const handleCloseMenu = () => { setAnchorEl(null); };

    const getMenu = () => {
        return(
            <div style={{margin: '-5px -5px -5px 3px'}} >
                <DeleteSavingsDialog saving={props.saving} setSavings={props.setSavings} isDialogOpen={deleteDialog} setIsDialogOpen={setDeleteDialog}/>
                <SavingDialog variant='edit' saving={props.saving} setSavings={props.setSavings} isDialogOpen={editDialog} setIsDialogOpen={setEditDialog}/> 
                <TransactionSavingDialog variant='deposit' saving={props.saving} setSavings={props.setSavings} isDialogOpen={depositDialog} setIsDialogOpen={setDepositDialog}/>
                <TransactionSavingDialog variant='withdraw' saving={props.saving} setSavings={props.setSavings} isDialogOpen={withdrawDialog} setIsDialogOpen={setWithdrawDialog}/>

                <IconButton 
                    size='small'
                    aria-controls={open ? 'long-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleMenuClick}
                >
                    <span className = "material-symbols-outlined" style={{fontSize:'20px'}}>more_vert</span>
                </IconButton>
                <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleCloseMenu}
                    PaperProps={{
                        'style': {'backgroundColor': theme.palette.primary_light.light, borderRadius:'4px', color: theme.palette.primary_light.contrastText},
                        'elevation': 2,
                    }}
                >
                    <MenuItem onClick={()=>{setEditDialog(true); handleCloseMenu()}} sx={{paddingLeft: '12px'}}>
                        <ListItemIcon>
                            <span className = "material-symbols-outlined" style={{color: theme.palette.primary_light.contrastText, fontSize:20}}>edit</span>
                        </ListItemIcon>
                        <ListItemText>Edit</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={()=>{setDeleteDialog(true); handleCloseMenu()}} sx={{paddingLeft: '12px'}}>
                        <ListItemIcon>
                            <span className = "material-symbols-outlined" style={{color: theme.palette.primary_light.contrastText, fontSize:20}}>delete</span>
                        </ListItemIcon>
                        <ListItemText>Delete</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={()=>{setDepositDialog(true); handleCloseMenu()}} sx={{paddingLeft: '12px'}}>
                        <ListItemIcon>
                            <span className = "material-symbols-outlined rotate-90" style={{color: theme.palette.primary_light.contrastText, fontSize:20}}>login</span>
                        </ListItemIcon>
                        <ListItemText>Deposit</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={()=>{setWithdrawDialog(true); handleCloseMenu()}} sx={{paddingLeft: '12px'}}>
                        <ListItemIcon>
                            <span className = "material-symbols-outlined rotate-270" style={{color: theme.palette.primary_light.contrastText, fontSize:20}}>logout</span>
                        </ListItemIcon>
                        <ListItemText>Withdraw</ListItemText>
                    </MenuItem>
                </Menu>
            </div>
        )
    }

    const activeClickHandler = () => {
        activeSaving(email, props.saving.id);
        props.setSavings(getSavings(email));
    }

    const getPauseButton = () => {

        const completeButton = (
            <Tooltip title={'Completed'}>
                <IconButton className='icon-button'  size='small' color='primary' disableRipple>
                    <span className = "material-symbols-outlined" style={{fontSize: '20px'}}>done</span>
                </IconButton>
            </Tooltip>  
        )

        const pausePlayButton = (
            <Tooltip title={props.saving.active?'Pause saving':'Active saving'}>
                <IconButton className='icon-button' size='small' onClick={()=>{activeClickHandler()}}>
                    <span className = "material-symbols-outlined" style={{fontSize: '20px'}}>{props.saving.active?'pause':'play_arrow'}</span>
                </IconButton>
            </Tooltip>
        )

        return isSavingCompleted()? completeButton : pausePlayButton;
    }

    return(
        <Card className='saving-card' elevation={0} sx={{borderRadius:'8px'}}>
            <div className='saving-header'>
                <div className='saving-name'>
                    {/*Pause / play / completed button*/ getPauseButton()}

                    {/* Name */}
                    <Typography fontWeight='bold'>{props.saving.name}</Typography> 
                </div>
                
                <div className='right-header'>
                    {/* Saved */}
                    <Typography fontWeight='bold'> {properties.currency + ' ' + props.saving.saved} </Typography>

                    {/* Amount */
                        props.saving.type === 'TARGET' ? (
                            <Typography variant='caption' color='secondary' style={{marginLeft: '4px'}}>
                                { ' / ' + props.saving.amount }
                            </Typography>
                        ) : null
                    }

                    {/*Saving menu*/ getMenu()} 
                </div>   
            </div>
            
            <LinearProgress className='saving-progress-bar' variant="determinate" style={{opacity: props.saving.type === 'TARGET' ? 1 : 0}} value={getProgress()}/>
            <Typography variant='caption' color='secondary' sx={{opacity: isSavingCompleted()?'0':'1'}}>
                {
                    props.saving.active?
                    (properties.currency + ' ' + props.saving.dailyAmount + ' per day' + (props.saving.type === 'TARGET' ? ' until ' + formatDate(props.saving.date):''))
                    :
                    'Paused'
                }
            </Typography>
        </Card>
    )
}