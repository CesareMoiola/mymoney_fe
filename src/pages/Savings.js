import React from 'react';
import Saving from '../components/Saving';
import '../styles/savings.css';

export default function Savings(props){
    
    return (
        <div className='savings'>
            <div className='savings-list'>
                {props.savings.map( saving => <Saving saving={saving} setSavings={props.setSavings}/> )}
            </div>
        </div>
    );
}