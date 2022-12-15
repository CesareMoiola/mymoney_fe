import React, { useEffect, useState, createContext } from 'react';
import "../styles/layout.css";
import "../styles/home.css";
import { useTheme } from '@mui/styles';
import Menu from '../components/Menu';
import useWindowDimensions, { getScreen } from '../js/WindowUtils';
import Header from '../components/Header';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Accounts from "./Accounts";
import Dashboard from './Dashboard';
import ToolBar from '../components/ToolBar';
import {today} from "../js/dateUtils";
import { getAccounts, getBudget, getRecurrences, getSavings } from '../js/ApiGateway';
import Recurrences from './Recurrences';
import Fab from '../components/Fab';
import Savings from './Savings';
import properties from "../data/properties.json";

export const UserContext = createContext();

export default function Home(){
           
    const email = 'nome.cognome@gmail.com';    //User's email   
    const theme = useTheme();    
    const location = useLocation();
    const [selectedIndex, setSelectedIndex] = useState(location.pathname==="/"?"/home":location.pathname);
    const [date, setDate] = useState(today()); 
    const [accounts, setAccounts] = useState(getAccounts(email, date));
    const [recurrences, setRecurrences] = useState(getRecurrences(email));
    const [savings, setSavings] = useState(getSavings(email));
    const [budget, setBudget] = useState(getBudget(email));
    const windowDimensions = useWindowDimensions();
    let screen = getScreen(windowDimensions);

    const getMenuVariant = () => {
        let variant = "default";
        if(screen === properties.screen.MOBILE) variant = "horizontal";
        if(screen === properties.screen.TABLET) variant = "collapsed";
        return variant;
    } 

    const getFab = () => {
        return (
            <Fab 
                date={date} 
                accounts={accounts} 
                setAccounts={setAccounts} 
                setRecurrences={setRecurrences} 
                setSavings={setSavings}
            />
        )
    }

    const changeDateHandler = (newDate) => {
        setDate(newDate);
        setAccounts(getAccounts(email, newDate));
    }

    useEffect(()=>{ setBudget(getBudget(email)) },[accounts, recurrences, savings])

    return (
        <UserContext.Provider value={{email: email, screen: screen}}>
            <div className="container" style={{backgroundColor: theme.palette.background.surface2}}>
                
                <div className='tool-bar'>
                    {/*Tool bar*/}
                    <ToolBar date={date} setDate={changeDateHandler} accounts={accounts}/>
                </div>
                
                {/*Header*/ screen===properties.screen.MOBILE?null:<Header className='header'/>}
                <div className='navigation' style={{backgroundColor: screen===properties.screen.MOBILE?theme.palette.background.surface3:null}}>
                    {/*Fab*/ screen===properties.screen.MOBILE?null:getFab()}
                    <Menu className='menu' variant={getMenuVariant()} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}/>
                </div>

                {/*Body*/}
                <div className='body'>
                    <Routes>
                        <Route path="/" element={<Navigate to={"/home"}/>}/>
                        <Route path="/home/*" element={<Dashboard budget={budget}/>}/>
                        <Route path="/accounts/*" element={<Accounts date={date} accounts={accounts} setAccounts={setAccounts}/>}/>
                        <Route path="/recurrences/*" element={<Recurrences recurrences={recurrences} setRecurrences={setRecurrences} budget={budget}/>}/>
                        <Route path="/savings/*" element={<Savings savings={savings} setSavings={setSavings} budget={budget}/>}/>
                        <Route path="/investments/*" element={<div></div>}/>
                    </Routes>

                    {/*Fab mobile*/ screen===properties.screen.MOBILE? getFab():null}
                </div>
            </div>
        </UserContext.Provider>
    )
}