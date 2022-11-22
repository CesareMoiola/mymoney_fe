import React, { useState, useEffect} from 'react';
import "../styles/layout.css";
import "../styles/home.css";
import { useTheme } from '@mui/styles';
import Menu from '../components/Menu';
import useWindowDimensions, {isMobileMode, isTabletMode} from '../js/WindowUtils';
import Header from '../components/Header';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Accounts from "./Accounts";
import Dashboard from './Dashboard';
import ToolBar from '../components/ToolBar';
import {today} from "../js/dateUtils";
import { getAccounts, getRecurrences } from '../js/ApiGateway';
import Recurrences from './Recurrences';
import Fab from '../components/Fab';

export default function Home(){
           
    const email = 'nome.cognome@gmail.com';    //User's email   
    const theme = useTheme();    
    const location = useLocation();
    const [selectedIndex, setSelectedIndex] = useState(location.pathname==="/"?"/home":location.pathname);
    const [date, setDate] = useState(today()); 
    const [accounts, setAccounts] = useState(getAccounts(email, date));
    const [recurrences, setRecurrences] = useState(getRecurrences(email));
    const windowDimensions = useWindowDimensions();
    let mobileMode = isMobileMode(windowDimensions);
    let tabletMode = isTabletMode(windowDimensions);
    

    const getMenuVariant = () => {
        let variant = "default";
        if(mobileMode) variant = "horizontal";
        if(tabletMode) variant = "collapsed";
        return variant;
    } 
    
    const updateHome = () => {
        setAccounts(getAccounts(email, date));
        setRecurrences(getRecurrences(email));
    }

    const getFab = () => {
        return <Fab email={email} date={date} accounts={accounts} updateHome={updateHome}/>
    }


    useEffect(
        ()=>{
            updateHome(); // eslint-disable-next-line
        }, [email, date]
    )  

    return (
        <div className="container" style={{backgroundColor: theme.palette.background.surface2}}>
            <div className='tool-bar'>
                <ToolBar email={email} date={date} setDate={setDate} accounts={accounts}/>
            </div>
            {/*Header*/ mobileMode?null:<Header className='header'/>}
            <div className='navigation' style={{backgroundColor: mobileMode?theme.palette.background.surface3:null}}>
                {/*Fab*/ mobileMode?null:getFab()}
                <Menu className='menu' variant={getMenuVariant()} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}/>
            </div>
            <div className='body'>
                <Routes>
                    <Route path="/" element={<Navigate to={"/home"}/>}/>
                    <Route path="/home/*" element={<Dashboard/>}/>
                    <Route path="/accounts/*" element={<Accounts email={email} date={date} accounts={accounts} updateHome={updateHome}/>}/>
                    <Route path="/recurrences/*" element={<Recurrences email={email} recurrences={recurrences} updateHome={updateHome}/>}/>
                    <Route path="/savings/*" element={<div></div>}/>
                    <Route path="/investments/*" element={<div></div>}/>
                </Routes>
                {/*Fab mobile*/ mobileMode? getFab():null}
            </div>
        </div>
    )
}