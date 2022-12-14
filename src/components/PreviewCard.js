import { Card, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { useTheme } from '@mui/styles';
import '../styles/previewCard.css'

export default function PreviewCard(props){

    const theme = useTheme();

    return(
        <Card className={props.className + ' preview-card'} elevation={0} sx={{backgroundColor: theme.palette.background.default}}>
            <div className='preview-card-header'>
                <div className='preview-card-title'>
                    <span className = "preview-card-icon material-symbols-outlined" style={{fontSize:'20px'}}>{props.icon}</span>
                    <Typography fontWeight='bold'>{props.title}</Typography>
                </div>
                <Tooltip title='Show how much you can spend this month'>
                    <span className = "preview-card-icon material-symbols-outlined" style={{fontSize:'20px', color: theme.palette.text.secondary}}>info</span>                    
                </Tooltip>
            </div>
            <div className='preview-body'>
                {props.content}
            </div>
        </Card>
    )
}