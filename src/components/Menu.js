import React from 'react';
import { ListItemButton, ListItemText } from "@mui/material";
import { useNavigate} from "react-router-dom";
import "../styles/menu.css";
import { useTheme } from '@mui/styles';

/*
    Possible menu variants are:
    - default:      icons and text voice are visible. Menu direction is vertical.
    - collapsed:    icons are visible, no text. Menu direction is vertical.
    - horizontal:   icons are visible, no text. Menu direction is horizontal.
*/
export default function Menu(props) {

    const theme = useTheme();
    const navigate = useNavigate();
    let isCollapsed = (props.variant === "collapsed");
    let isHorizontal = (props.variant === "horizontal");

    const menuButtonStyle = {
        "&:hover": { backgroundColor: theme.palette.primary_light.main + "80" },
        "&.Mui-selected:hover": { backgroundColor: theme.palette.primary_light.main },
        "&.Mui-selected": { backgroundColor: theme.palette.primary_light.main},
        "justifyContent":"center",
    }

    //Handle Menu voice click
    const handleListItemClick = (page) => { 
        props.setSelectedIndex(page);
        navigate(page);
    };

    //Get menu voice icon class
    const getIconClass = (index) => {
        let className = "material-symbols-outlined";
        if(index === props.selectedIndex || (index === "/home" && props.selectedIndex === "/")){ className = "material-symbols-outlined filled_icon"; }
        return className;
    };

    //Get menu voice color
    const getMenuTextColor = (index) => {
        let color = theme.palette.text.primary;
        if(index === props.selectedIndex || (index === "/home" && props.selectedIndex === "/")){ color = theme.palette.primary_light.contrastText; }
        return color;
    };

    //Get menu button
    const getListItemButton = (name, index, iconName) => {
        return(
            <div>
                <ListItemButton
                    className="home_menu_item"
                    sx={menuButtonStyle}     
                    selected={props.selectedIndex === index}
                    onClick={() => handleListItemClick(index)}
                    disableRipple={true}
                >
                    <span className = {getIconClass(index)} style={{color: getMenuTextColor(index)}}>{iconName}</span>
                    {   
                        (isCollapsed || isHorizontal)?
                        null:
                        <ListItemText primary={name} sx={{color: getMenuTextColor("/home")}}/>
                    }
                </ListItemButton>
            </div>
        )
    }

    return (
        <div className="menu">

            {/*Voice menu: home*/           getListItemButton("Home", "/home", "Home")}
            {/*Voice menu: accounts*/       getListItemButton("Accounts", "/accounts", "Credit_Card")}
            {/*Voice menu: recurrence*/     getListItemButton("Recurrences", "/recurrences", "Currency_Exchange")}
            {/*Voice menu: savings*/        getListItemButton("Savings", "/savings", "savings")}
            {/*Voice menu: investments*/    getListItemButton("Investments", "/investments", "trending_up")}

        </div>
    );
}