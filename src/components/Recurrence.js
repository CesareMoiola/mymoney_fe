import { Typography, Checkbox, Divider, IconButton } from '@mui/material';
import React, { useState, useContext } from 'react';
import '../styles/recurrence.css';
import properties from '../data/properties.json';
import DeleteRecurrenceDialog from './DeleteRecurrenceDialog';
import EditRecurrenceDialog from './EditRecurrenceDialog';
import { checkRecurrence, getRecurrences } from '../js/ApiGateway';
import { UserContext } from '../pages/Home';

export default function Recurrence(props){

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isCompleted, setIsCompleted] = useState(props.recurrence.completed);
    const email = useContext(UserContext).email;



    const getValue = () => {
       return properties.currency + ' ' + (props.recurrence.type === 'EXPENSE' || props.recurrence.type === 'OTHER' ?'-':'') + Math.abs(props.recurrence.amount);
    }

    const checkHandler = (isChecked) => {
        setIsCompleted(isChecked);
        checkRecurrence(email, props.recurrence.id, isChecked);     
        props.setRecurrences(getRecurrences(email));   
    }

    return(
        <div className="recurrence" key={props.recurrence.id}>
            
            <DeleteRecurrenceDialog recurrence={props.recurrence} isDialogOpen={isDeleteDialogOpen} setIsDialogOpen={setIsDeleteDialogOpen} setRecurrences={props.setRecurrences}/>
            <EditRecurrenceDialog recurrence={props.recurrence} isDialogOpen={isEditDialogOpen} setIsDialogOpen={setIsEditDialogOpen} setRecurrences={props.setRecurrences}/>
            
            <div className='recurrence-actions'>
                <IconButton className={props.notInteractable?'hidden-component':'recurrence-edit-button'} onClick={() => setIsDeleteDialogOpen(true)} size='small' sx={{height:'24px', width:'24px', opacity:'0.6'}}>
                    <span className = "material-symbols-outlined" style={{fontSize:'20px'}}>delete</span>
                </IconButton>
                <IconButton className={props.notInteractable?'hidden-component':'recurrence-edit-button'} onClick={() => setIsEditDialogOpen(true)} size='small' sx={{height:'24px', width:'24px', opacity:'0.6'}}>
                    <span className = "material-symbols-outlined" style={{fontSize:'20px'}}>edit</span>
                </IconButton>
            </div>
            <div style={{width: '100%'}}>
                <div className="recurrence-layout">
                    <div className="recurrence-layout">
                        <Typography variant="body2">
                            {props.recurrence.name}
                        </Typography>
                    </div>
                    <div className="recurrence-layout">
                        <Typography variant="body2">{getValue()}</Typography>
                        {props.notInteractable? <div style={{width:'40px'}}/>:<Checkbox checked={isCompleted} onClick={()=>checkHandler(!isCompleted)} size="small" sx={{marginLeft:'12px', height:'28px', width:'28px'}}/>}
                    </div>
                </div>                            
                <Divider sx={{marginRight:'5px'}}/>
            </div>            
        </div>
    )
}