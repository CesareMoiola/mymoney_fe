import { LinearProgress, Typography, List } from '@mui/material';
import React from 'react';
import '../styles/dashboard.css';
import PreviewCard from '../components/PreviewCard';
import properties from '../data/properties.json';

export default function Dashboard(props){    

    let startingBudget = Math.round(props.budget.startingBudget * 100) / 100;
    let availability = Math.round(props.budget.currentBudget * 100) / 100;
    let monthlyExpense = Math.abs(Math.round(props.budget.monthlyExpense * 100) / 100);


    const getBudgetContent = () => {

        let progress = 100*availability/startingBudget;

        return(
            <div style={{display:'flex', flexDirection:'column', gap:'8px'}}>
                <Typography variant='h5' sx={{marginBottom:'8px'}}>
                    {properties.currency + ' ' + availability + ' / ' + startingBudget}
                </Typography>
                
                <LinearProgress 
                    sx={{height:'8px', borderRadius:'16px'}} 
                    variant="determinate" 
                    value={progress > 100 ? 100 : progress}/>
                
                <Typography color='secondary' variant='caption'>
                    <li>                            
                        {"Availability of " + properties.currency + ' ' + props.budget.dailyBudget + ' per day for ' + props.budget.remainingDays + ' more days'}
                    </li>
                    <li>{'This month I spent ' + properties.currency + ' ' + monthlyExpense}</li>
                </Typography>
            </div>
        )
    }

    return (
        <div className='dashboard'>
            <PreviewCard className='item-1' title="Budget" icon="pie_chart" content={getBudgetContent()}></PreviewCard>
            <PreviewCard className='item-2' title="Accounts" icon="credit_card"></PreviewCard>
            <PreviewCard className='item-3' title="Savings" icon="savings"></PreviewCard>
            <PreviewCard className='item-4' title="Recurrence" icon="currency_exchange"></PreviewCard>
            <PreviewCard className='item-5' title="Charts" icon="insert_chart"></PreviewCard>
            <PreviewCard className='item-6' title="Investments" icon="trending_up"></PreviewCard>
        </div>
    )
}