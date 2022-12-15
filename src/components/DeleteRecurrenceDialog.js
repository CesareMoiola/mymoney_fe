import React, {useContext} from 'react';
import { Dialog, DialogContent, Typography, DialogActions, Button } from '@mui/material';
import { useTheme } from '@mui/styles';
import { deleteRecurrence, getRecurrences } from '../js/ApiGateway';
import { UserContext } from '../pages/Home';

export default function DeleteRecurrenceDialog(props){

    const theme = useTheme();

    const email = useContext(UserContext).email;

    const deleteHandler = () => {
        
        deleteRecurrence(email, props.recurrence.id);
        props.setIsDialogOpen(false);
        props.setRecurrences(getRecurrences(email));
    }

    return(
        <Dialog 
            open={props.isDialogOpen} 
            sx={{ " .MuiDialog-paper": {
                    backgroundColor: theme.palette.primary_light.main,
                    color: theme.palette.primary_light.contrastText,
                    borderRadius: "28px",
                    padding: "16px"}}}
            onClose={()=>{props.setIsDialogOpen(false)}}
        >
            <DialogContent className='dialog_content'>
                <Typography>
                    Are you sure you want to delete the recurrence called "{props.recurrence.name}" ?
                </Typography>                    
            </DialogContent>
            <DialogActions sx={{padding: "0 24px 24px 24px"}}>
                <Button onClick={()=>{props.setIsDialogOpen(false)}}> No </Button>
                <Button onClick={deleteHandler}> Yes </Button>
            </DialogActions>
        </Dialog>
    )
}