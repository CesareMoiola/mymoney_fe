import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Home from "./Home";
import { ThemeProvider, Box } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import React, { useState } from 'react';
import {lightTheme} from "../js/ThemeUtils";
import '../styles/app.css';

function App() {

  const [theme, setTheme] = useState(lightTheme);

  return (
    <ThemeProvider theme={theme}>      
        <CssBaseline />
        <Box className="App">
          <BrowserRouter>
            <Routes>
              <Route path="/*" element={<Home/>}/>
              <Route path="/signin" element={<SignIn/>}/>
              <Route path="/signup" element={<SignUp/>}/>
            </Routes>  
          </BrowserRouter>       
        </Box>
    </ThemeProvider>
  );
}

export default App;
