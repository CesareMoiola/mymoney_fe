import { Fab, Button, Typography, List, ListItemButton, ListItemIcon, ListItemText, BottomNavigation, BottomNavigationAction, Paper, Stack} from "@mui/material";
import Grid from '@mui/material/Grid';
import { useNavigate, Routes, Route, Navigate } from "react-router-dom";
import logo from "../images/logo.svg";
import "../styles/home.css";
import { useTheme } from '@mui/styles';
import React, { useState } from 'react';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import Accounts from "../components/Accounts";
import {getAccounts} from "../js/ApiGateway";
import {today, formatDate, getDayBefore} from "../js/dateUtils";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import { meltColors } from "../js/ColorUtils";
import { totalAmount } from "../js/AccountUtils";

function Home() {
       
    const email = 'nome.cognome@gmail.com';    //User's email
    const navigate = useNavigate();    
    const theme = useTheme();    
    const [selectedIndex, setSelectedIndex] = React.useState(window.location.pathname);
    const [date, setDate] = useState(today());  //Date used to show account's balances
    const [accounts, setAccounts] = useState(getAccounts(email,date));
    const [fabDialogIsOpen, setFabDialogIsOpen] = useState(false);
    var dayBeforeAccounts = getAccounts(email, getDayBefore(date));
    var total = totalAmount(accounts);
    var dayBeforeTotal = totalAmount(dayBeforeAccounts);
    
    const menuButtonStyle = {
        "&:hover": { backgroundColor: theme.palette.primary.light + "99" },
        "&.Mui-selected:hover": { backgroundColor: theme.palette.primary.light + "99" },
        "&.Mui-selected": { backgroundColor: theme.palette.primary.light}
    }
    
    //Menu voice clicked
    const handleListItemClick = (page) => { 
        setSelectedIndex(page);
        navigate(page);
    };

    //Get menu voice color
    const getMenuTextColor = (index) => {
        let color = theme.palette.text.primary;
        if(index === selectedIndex || (index === "/home" && selectedIndex === "/")){ color = theme.palette.primary.dark; }
        return color;
    };

    //Get menu voice icon class
    const getIconClass = (index) => {
        let className = "material-symbols-outlined";
        if(index === selectedIndex || (index === "/home" && selectedIndex === "/")){ className = "material-symbols-outlined filled_icon"; }
        return className;
    };

    //Change date picked from datePicker
    const changeDate = (newDate) => {
        setDate(newDate);
        setAccounts(getAccounts(email, newDate));
    };

    //Return total amount component
    const getTotalAmount = () => {
        
        let variance = total - dayBeforeTotal
        let component = <div className = "total_section">
            <Typography variant="h6" sx={{color: theme.palette.tertiary.contrastText}}>Total € {total}</Typography>
        </div>;


        variance = parseFloat(variance.toFixed(2))

        if(variance > 0){
            component = <div className = "total_section" marginBottom = "-8px">
                <Typography variant="h6" sx={{color: theme.palette.tertiary.contrastText, marginBottom: "-8px"}}>Total € {total}</Typography>
                <Typography variant="caption" sx={{opacity: "0.6"}}> {"+ € " + variance} </Typography>
            </div> 
        }
        if(variance < 0){
            component = <div className = "total_section" marginBottom = "-8px">
                <Typography variant="h6" sx={{color: theme.palette.tertiary.contrastText, marginBottom: "-8px"}}>Total € {total}</Typography>
                <Typography variant="caption" sx={{opacity: "0.6"}}> {"- € " + (-variance)} </Typography>
            </div> 
        }     

        return component;
    }

    //Update accounts
    const updateAccounts = () => {
        setAccounts(getAccounts(email, date));
    }

    return (
        <Grid container spacing={2} className = "home">
            <Grid xs={4}>
                {/* Navigation */}
                <List className = "navigation">
                    <ListItemButton
                        className="home_menu_item"
                        sx={menuButtonStyle}     
                        selected={selectedIndex === "/home"}
                        onClick={() => handleListItemClick("/home")}
                        disableRipple={true}
                    >
                        <ListItemIcon>
                            <span className = {getIconClass("/home")} style={{color: getMenuTextColor("/home")}}
                            >home</span>
                        </ListItemIcon>
                        <ListItemText className="home_menu_item_text" primary="Home" sx={{color: getMenuTextColor("/home")}}/>
                    </ListItemButton>
                    <ListItemButton 
                        className="home_menu_item"
                        sx={menuButtonStyle} 
                        selected={selectedIndex === "/accounts"}
                        onClick={() => handleListItemClick("/accounts")}
                        disableRipple={true}
                    >
                        <ListItemIcon>
                            <span className = {getIconClass("/accounts")} style={{color: getMenuTextColor("/accounts")}} >Credit_Card</span>
                        </ListItemIcon>
                        <ListItemText className="home_menu_item_text" primary="Accounts" sx={{color: getMenuTextColor("/accounts")}}/>
                    </ListItemButton>
                    <ListItemButton
                        className="home_menu_item"
                        sx={menuButtonStyle} 
                        selected={selectedIndex === "/recurrence"}
                        onClick={() => handleListItemClick("/recurrence")}
                        disableRipple={true}
                    >
                        <ListItemIcon>
                            <span 
                                className = {getIconClass("/recurrence")}
                                style={{color: getMenuTextColor("/recurrence")}}
                            >Currency_Exchange</span>
                        </ListItemIcon>
                        <ListItemText className="home_menu_item_text" primary="Recurrence" sx={{color: getMenuTextColor("/recurrence")}}/>
                    </ListItemButton>
                    <ListItemButton
                        className="home_menu_item"
                        sx={menuButtonStyle} 
                        selected={selectedIndex === "/savings"}
                        onClick={() => handleListItemClick("/savings")}
                        disableRipple={true}
                    >
                        <ListItemIcon>
                            <span 
                                className = {getIconClass("/savings")}
                                style={{color: getMenuTextColor("/savings")}}
                            >savings</span>
                        </ListItemIcon>
                        <ListItemText className="home_menu_item_text" primary="Savings" sx={{color: getMenuTextColor("/savings")}}/>
                    </ListItemButton>
                    <ListItemButton
                        className="home_menu_item"
                        sx={menuButtonStyle} 
                        selected={selectedIndex === "/investments"}
                        onClick={() => handleListItemClick("/investments")}
                        disableRipple={true}
                    >
                        <ListItemIcon>
                            <span 
                                className = {getIconClass("/investments")}
                                style={{color: getMenuTextColor("/investments")}}
                            >trending_up</span>                        
                        </ListItemIcon>
                        <ListItemText className="home_menu_item_text" primary="Investments" sx={{color: getMenuTextColor("/investments")}}/>
                    </ListItemButton>
                </List>
            </Grid>
            <Grid xs={8}>
                <Stack>
                    {/* App bar */}
                    <div className="app_bar" style={{backgroundColor: meltColors(theme.palette.primary.dark.substring(0, 7) + "14", theme.palette.background.paper)}}>    
                        <div className="home_title_container">
                            <img className="home_logo" alt="logo" src={logo}/>            
                            <Typography className="home_title" variant="h5" fontWeight="500" color="text.secondary">
                                MyMoney
                            </Typography>
                        </div>
                        <div className="data_picker">
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    value={date}
                                    size = "small"
                                    inputFormat = 'dd/MM/yyyy'
                                    onChange={(newDate) => {changeDate(formatDate(newDate))}}
                                    renderInput={(params) => <TextField className='accounts_data_picker' size="small" {...params} />}
                                />
                            </LocalizationProvider>
                            <Button 
                                variant="outlined" 
                                size="small" 
                                onClick={()=>{changeDate(today())}}
                                sx={{visibility: (date === today()) ? "hidden" : "visible"}}
                            >today</Button>
                        </div> 
                        {getTotalAmount()}       
                    </div>
                    {/* Body */}
                    <div className="body">
                        <Routes>
                            <Route path="/" element={<Navigate to={"/home"}/>}/>
                            <Route path="/home/*" element={<div/>}/>
                            <Route path="/accounts/*" element={<Accounts accounts={accounts} date={date} dayBeforeAccounts={dayBeforeAccounts} email={email} updateAccounts={updateAccounts} fabDialogIsOpen={fabDialogIsOpen} setFabDialogIsOpen={setFabDialogIsOpen}/>}/>
                            <Route path="/recurrence/*" element={<div></div>}/>
                            <Route path="/savings/*" element={<div></div>}/>
                            <Route path="/investments/*" element={<div></div>}/>
                        </Routes>
                    </div>
                </Stack>
            </Grid>
        </Grid>
    );
  }
  
  export default Home;