import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    dense: {
      marginTop: theme.spacing(2),
    },
    menu: {
      width: 200,
    },
  }));

export default function DialogBox() {

    const classes = useStyles();

    const [open, setOpen] = React.useState(true);
    const [selectedValue, setSelectedValue] = React.useState("");
  
    function handleClickOpen() {
      setOpen(false);
    }
  
    const handleClose = value => {
      setOpen(false);
      setSelectedValue(value);
    };
  
    return (
      <div>
          <h3>Please enter your email id or phone number to get notified when we add times for this store.</h3>
          <TextField
        required
        id="outlined-input"
        label="Phone Number"
        defaultValue="Phone Number"
        className={classes.textField}
        margin="normal"
        variant="outlined"
      />
<br />
          <TextField
        id="outlined-email-input"
        label="Email"
        className={classes.textField}
        type="email"
        name="email"
        autoComplete="email"
        margin="normal"
        variant="outlined"
      />
       <br />
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
         Submit Request
        </Button>
         />
 
      </div>
    );
}