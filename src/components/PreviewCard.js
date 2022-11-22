import { Card, Typography } from '@mui/material';
import React from 'react';
import { useTheme } from '@mui/styles';
import '../styles/previewCard.css'

export default function PreviewCard(props){

    const theme = useTheme();

    return(
        <Card className={props.className} elevation={0} sx={{backgroundColor: theme.palette.background.default}}>
            <div className='preview-card-header'>
                <span className = "preview-card-icon material-symbols-outlined">{props.icon}</span>
                <Typography className={"preview-card-title"} variant="h6">{props.title}</Typography>
            </div>
        </Card>
    )
}