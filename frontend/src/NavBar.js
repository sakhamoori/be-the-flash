import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';
import { spacing } from '@material-ui/system';
const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      overflow: 'hidden',
      padding: theme.spacing(0, 3),
    },
    paper: {
      maxWidth: "100%",
      maxHeight:"100%",
      margin: `0px auto`,
      width:"100%",
      height:"100%",
      padding: theme.spacing(2),
      alignItems: 'center',
      background:"#4e1a38"
    },
  }));

export default function NavBar() {
    const classes = useStyles();
    return(
        <div>
        <AppBar color="secondary" className={classes.paper} position="static">
          <Typography style={{"color":"white", "fontSize": "30px"}}>{'Be the flash'}</Typography>
            {/* <Typography style={{"color":"white"}}>{'Helping you find best time to go shopping!'}</Typography> */}
        </AppBar>
        </div>
    )
}
