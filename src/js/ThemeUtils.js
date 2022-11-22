import { createTheme } from "@mui/material";
import ProductSans_regular from '../fonts/ProductSans-Regular.woff';
import paletteLight from '../data/paletteLight.json';

const lightTheme = createTheme({
    palette: paletteLight,
    shape: {
      borderRadius: 16
    },
    typography: {
      fontFamily: "'roboto', 'Product Sans', 'helvetica'",
      h1:{
        fontFamily: "'Product Sans', 'roboto', 'helvetica'",
        fontWeight: 400,
      },
      h2:{
        fontFamily: "'Product Sans', 'roboto', 'helvetica'",
        fontWeight: 400,
      },
      h3:{
        fontFamily: "'Product Sans', 'roboto', 'helvetica'",
        fontWeight: 400,
      },
      h4:{
        fontFamily: "'Product Sans', 'roboto', 'helvetica'",
        fontWeight: 400,
      },
      h5:{
        fontFamily: "'Product Sans', 'roboto', 'helvetica'",
        fontWeight: 400,
      },
      h6:{
        fontFamily: "'Product Sans', 'roboto', 'helvetica'",
        fontWeight: 400,
      },
      button:{
        textTransform: "none"
      }
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: 
          `@font-face {
            font-family: 'Product Sans';
            font-style: normal;
            font-weight: normal;
            src: local('Product Sans'), url(${ProductSans_regular}) format('woff');
          }`,
      },
    },
  });

  export {lightTheme};