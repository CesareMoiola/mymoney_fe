import { Paper } from '@mui/material';
import React from 'react';
import '../styles/dashboard.css';
import PreviewCard from '../components/PreviewCard';

export default function Dashboard(){    

    return (
        <div className='dashboard'>
            <PreviewCard className='item-1' title="Budget" icon="pie_chart"></PreviewCard>
            <PreviewCard className='item-2' title="Accounts" icon="credit_card"></PreviewCard>
            <PreviewCard className='item-3' title="Savings" icon="savings"></PreviewCard>
            <PreviewCard className='item-4' title="Recurrence" icon="currency_exchange"></PreviewCard>
            <PreviewCard className='item-5' title="Charts" icon="insert_chart"></PreviewCard>
            <PreviewCard className='item-6' title="Investments" icon="trending_up"></PreviewCard>
        </div>
    )
}