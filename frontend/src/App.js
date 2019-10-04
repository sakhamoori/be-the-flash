import React, { useState } from 'react';
import './App.css';
import NavBar from './NavBar'

import { MuiThemeProvider, createMuiTheme,responsiveFontSizes } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import AutoComplete from './AutoComplete';
import NestedList from './NestedList'
import AutoGrid from './AutoGridNoWrap';

// Or Create your Own theme:
let theme = createMuiTheme({
  palette: {
    primary: {
      main: '#355FB7'
    },
    secondary: {
        main: '#A8A8A8'
      },
      text: {
        primary: "#00000",
        secondary: "#00000"
  },
  typography: {
    fontFamily: '"Nunito", "Helvetica", "Arial", sans-serif',
    "fontSize": 24,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500,
  },
  text: {
    primary: "#4e1a38",
    secondary: "#4e1a38"
} ,
    }
  },
)
theme = responsiveFontSizes(theme);

theme.typography.h1 = {
  fontSize: '1rem',
  '@media (min-width:600px)': {
    fontSize: '1rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2rem',
  },
};

const useStyles = makeStyles(theme => ({
  paper: {
    maxWidth: "80%",
    margin: `0px auto`,
    padding: theme.spacing(2),
    alignItems: 'center',
    backgroundColor:'#4E1A38'
  },
}));


function App() {
  const classes = useStyles();
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");

  function setLocationValue(location) {
    setLocation(location);
  }

  const renderAutoGrid = () => {
    return <AutoGrid location={location} type={type}/>;
  }

  return (
    <MuiThemeProvider theme={theme}>
    <div className="App">
      <Paper  className={classes.paper}>             
        <NavBar/>
        <AutoComplete setLocation={setLocationValue}/>
        {/* <button onClick={() => setType('grocery_or_supermarket')}>Groceery Stores</button>
        <button onClick={() => setType('stores')}>Stores</button> */}
        {/* {location && type && this.renderAutoGrid} */}
        {location && <AutoGrid location={location} />}
     </Paper>
    </div>
    </MuiThemeProvider>
  );
}

export default App;
