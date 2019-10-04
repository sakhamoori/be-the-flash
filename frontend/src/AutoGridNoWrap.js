import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';

import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';

import Divider from '@material-ui/core/Divider';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { deepOrange, deepPurple } from '@material-ui/core/colors';


import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import StarBorderIcon from '@material-ui/icons/StarBorder';


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';


import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import TextField from '@material-ui/core/TextField';
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
  },
  paper: {
    maxWidth: "80%",
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
  name:{
    fontFamily: "Helvetica, sans-serif",
    fontWeight: 600,
    fontSize: 15,

  },
  location:{
    fontFamily: "Helvetica, sans-serif",
    fontWeight: 400,
    fontSize: 13,
    color:"black"

  },
  divider:{
    width: "10px",
    color: '#4e1a38',
  },
  avatar: {
    marginTop: "0px",
    color: '#fff',
    backgroundColor: '#4e1a38',
    fontSize:13,
  },
  greenAvatar: {
    margin: 0,
    color: '#fff',
    backgroundColor: '#4CBB17',
    fontSize:13
  },
  lightGreenAvatar: {
    margin: 0,
    color: '#fff',
    backgroundColor: '#b4b4b4',
    fontSize:13

  },
  orangeAvatar: {
    margin: 0,
    color: '#fff',
    backgroundColor: '#e88c30',
    fontSize:13
  },
  redAvatar: {
    margin: 0,
    color: '#fff',
    backgroundColor: '#e60000',
    fontSize:13
  },
  card: {
    maxWidth: "95%",
    textAlign:"left",
    margin: `${theme.spacing(3)}px auto`,
    '@media (min-width:780px)':{maxWidth:"60%"}
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  roottable: {
    width: '100%',
    overflowX: "auto", 
    borderWidth: 1, borderColor: '#4e1a38',borderStyle: 'solid'
  },
  roottabletimes: {
    width: '100%',
    height:"50px",
    overflowX: "auto", 
    boxShadow: "0px 0px 0px 0px"
  },
  table: {
    width: "100%",

  },
 MuiTableCell:{
   padding:4,
   margin:10
  },
  button: {
    margin: theme.spacing(1),
    width:"80%",
    border:"1px solid black",
    margin:"0 auto"
  },
  popupbutton: {
    margin: theme.spacing(1),
    width:"100%",
    border:"1px solid black",
    margin:"0 auto"
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  iconSmall: {
    fontSize: 20,
  },
  popuproot: {
    backgroundColor: "rgba(52, 52, 52, 0.2)"
  },

  popuppaper: {
    backgroundColor: "white",
    boxShadow: "none",
    overflow: "hidden"
  },
}));

const message = `Truncation should be conditionally applicable on this long line of text
 as this is a much longer line than what the container can support. `;

 function createData(name, calories, fat, carbs, protein,name1, calories1, fat1, carbs1, protein1,name2, calories2, fat2, carbs2, protein2,name3, calories3, fat3, carbs3, protein3, fat4, carbs4, protein4) {
  return { name, calories, fat, carbs, protein,name1, calories1, fat1, carbs1, protein1,name2, calories2, fat2, carbs2, protein2,name3, calories3, fat3, carbs3, protein3,fat4, carbs4, protein4 };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 159, 6.0, 24, 4.0, 159, 6.0, 24, 4.0, 159, 6.0, 24, 4.0, 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 159, 6.0, 24, 4.0, 159, 6.0, 24, 4.0, 159, 6.0, 24, 4.0, 159, 6.0, 24, 4.0, 159, 6.0, 24, 4.0),
  createData('Eclair', 159, 6.0, 24, 4.0, 159, 6.0, 24, 4.0, 159, 6.0, 24, 4.0, 159, 6.0, 24, 4.0, 159, 6.0, 24, 4.0),
  createData('Cupcake', 159, 6.0, 24, 4.0, 159, 6.0, 24, 4.0, 159, 6.0, 24, 4.0, 159, 6.0, 24, 4.0, 159, 6.0, 24, 4.0),
  createData('Gingerbread', 159, 6.0, 24, 4.0, 159, 6.0, 24, 4.0, 159, 6.0, 24, 4.0, 159, 6.0, 24, 4.0, 159, 6.0, 24, 4.0),
];

export default function AutoGridNoWrap(props) {
  const classes = useStyles();
  //const [open, setOpen] = React.useState(true);
  // const [location, setLocation] = props && setUserLocation(props.usersLocation);
  const [location, setLocation] = useState(props.location === null || props.location === ""  ? "San Jose,CA" :props.location);
  const [type, setType] = useState(props.type === null ? "grocery_or_supermarket" : props.type );
  const [groceryStores, setGStores] = useState([])
  const [allStores, setAllStores] = useState([]);
  const [open, setOpen] = useState(false);

  // function setUserLocation(usersLocation) {
  //   if(usersLocation) {
  //     setLocation(usersLocation);
  //     fetchAPIResults(usersLocation);
  //   }
  // }

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
    console.log('request submitted');
  }

  async function fetchAPIResults() {
    let url1 = `http://localhost:8081/api/fetchresults?location=${location}&type=stores&radius=500`;

    // let url1 = "http://localhost:8081/api/fetchresults?location=329%20expedition%20lane,milpitas,ca,95035&type=grocery_or_supermarket&radius=5000";
    // let url1 = "http://localhost:8081/api/fetchresults?location=3315%20scott%20blvd,%20santa%20clara,ca,95054&type=grocery_or_supermarket&radius=500";
    // let url2 = "http://localhost:8081/api/fetchresults?location=329%20expedition%20lane,milpitas,ca,95035&type=shop&radius=500";

    const allowedState = [
      { id: 1, value: "A" },
      { id: 2, value: "B" },
      { id: 3, value: "Tennessee" }
    ];
  

    await fetch(url1)
    .then(response => response.json())
    .then(data => {console.log(data);
      setGStores(data)
      // Prints result from `response.json()` in getRequest
    })
    .catch(error => console.error(error))
/*
  await fetch(url2)
    .then(response => response.json())
    .then(data => {
      setAllStores(data); // Prints result from `response.json()` in getRequest
    })
    .catch(error => console.error(error))
    */

    //let response = await fetch('api/data')
    //response = await response.json()
    //console.log(response);
    //setGStores(response)
    //console.log(JSON.stringify({groceryStores}));
  }

  useEffect(() => {
    if (location) { 
      fetchAPIResults(); 
    }
    const allowedState = [
      { id: 1, value: "Alabama" },
      { id: 2, value: "Georgia" },
      { id: 3, value: "Tennessee" }
    ];
  
    //setGStores(allowedState);
    //console.log(groceryStores);
  }, []);


  function handleClick() {
    setOpen(!open);
  }

  const bull = <span className={classes.bullet}>•</span>;
  return (
    <div>
      {groceryStores.map(value => (
        <Card className={classes.card}>
          <CardHeader  style={{"background":"lightgrey"}}
          avatar={ <Avatar alt="Cart" src="https://images-eu.ssl-images-amazon.com/images/I/41Z3RaKX2ZL.png" className={classes.avatar} /> }
          action={
            <IconButton aria-label="settings">
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                {Math.round(value.driving.dist * 10) / 10}{` mi`}
              </Typography>
            </IconButton>
          }
          title={<Typography className={classes.name} color="textSecondary" gutterBottom> {value.storename} </Typography>}
          subheader={<Typography className={classes.location} color="textSecondary" gutterBottom>{value.address}</Typography>}
        />
        <Divider variant="middle" />
        <CardContent>
            {"updated_todays_schedule_expanded_cleaned" in value ?  <Paper className={classes.roottabletimes}>
            <Table>
              <TableBody>
                <TableRow >
                  {"updated_todays_schedule_expanded_cleaned" in value ? value["updated_todays_schedule_expanded_cleaned"].map(row => {
                    if(row.busy_score >=0  && row.busy_score <=34 ){
                      return <TableCell className={classes.MuiTableCell}component="th" scope="row"><Avatar className={classes.greenAvatar}>{row.time_string}</Avatar></TableCell>
                    } else if (row.busy_score >=35 && row.busy_score <=70 ){
                      return <TableCell className={classes.MuiTableCell} component="th" scope="row"><Avatar className={classes.orangeAvatar}>{row.time_string}</Avatar></TableCell>
                    } else if(row.busy_score >=71 && row.busy_score <=100 ){
                      return <TableCell className={classes.MuiTableCell} component="th" scope="row"><Avatar className={classes.redAvatar}>{row.time_string}</Avatar></TableCell>
                    }
                  }):""}
                </TableRow>
              </TableBody>
            </Table>
            </Paper> : ""}
            {"updated_todays_schedule_expanded_cleaned" in value ? <br></br> : ""}
              <Paper className={classes.roottable}>
                <Table className={classes.table}>
                  <TableBody>
                    <TableRow key={"Car"}>
                      <TableCell component="th" scope="row">
                        <Avatar className={classes.lightGreenAvatar}>  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11 11v-3h1.247c.882 0 1.235.297 1.828.909.452.465 1.925 2.091 1.925 2.091h-5zm-1-3h-2.243c-.688 0-1.051.222-1.377.581-.316.348-.895.948-1.506 1.671 1.719.644 4.055.748 5.126.748v-3zm14 5.161c0-2.823-2.03-3.41-2.794-3.631-1.142-.331-1.654-.475-3.031-.794-.55-.545-2.052-2.036-2.389-2.376l-.089-.091c-.666-.679-1.421-1.269-3.172-1.269h-7.64c-.547 0-.791.456-.254.944-.534.462-1.944 1.706-2.34 2.108-1.384 1.402-2.291 2.48-2.291 4.603 0 2.461 1.361 4.258 3.179 4.332.41 1.169 1.512 2.013 2.821 2.013 1.304 0 2.403-.838 2.816-2h6.367c.413 1.162 1.512 2 2.816 2 1.308 0 2.409-.843 2.82-2.01 1.934-.056 3.181-1.505 3.181-3.829zm-18 4.039c-.662 0-1.2-.538-1.2-1.2s.538-1.2 1.2-1.2 1.2.538 1.2 1.2-.538 1.2-1.2 1.2zm12 0c-.662 0-1.2-.538-1.2-1.2s.538-1.2 1.2-1.2 1.2.538 1.2 1.2-.538 1.2-1.2 1.2zm2.832-2.15c-.399-1.188-1.509-2.05-2.832-2.05-1.327 0-2.44.868-2.836 2.062h-6.328c-.396-1.194-1.509-2.062-2.836-2.062-1.319 0-2.426.857-2.829 2.04-.586-.114-1.171-1.037-1.171-2.385 0-1.335.47-1.938 1.714-3.199.725-.735 1.31-1.209 2.263-2.026.34-.291.774-.432 1.222-.43h5.173c1.22 0 1.577.385 2.116.892.419.393 2.682 2.665 2.682 2.665s2.303.554 3.48.895c.84.243 1.35.479 1.35 1.71 0 1.196-.396 1.826-1.168 1.888z"/></svg></Avatar>
                      </TableCell>
                      <TableCell align="right">{value.driving.timeString}</TableCell>
                    </TableRow>
                  <TableRow key={"HOV"}>
                    <TableCell component="th" scope="row">
                    <Avatar className={classes.lightGreenAvatar}>  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11 15v-3h1.247c.882 0 1.235.297 1.828.909.452.465 1.925 2.091 1.925 2.091h-5zm-1-3h-2.243c-.688 0-1.051.222-1.377.581-.316.348-.895.948-1.506 1.671 1.719.644 4.055.748 5.126.748v-3zm14 5.161c0-2.823-2.03-3.41-2.794-3.631-1.142-.331-1.654-.475-3.031-.794-.549-.545-2.051-2.035-2.389-2.375l-.089-.091c-.666-.68-1.421-1.27-3.172-1.27h-7.64c-.547 0-.791.456-.254.944-.534.462-1.945 1.705-2.341 2.107-1.383 1.403-2.29 2.481-2.29 4.604 0 2.461 1.361 4.258 3.179 4.332.41 1.169 1.512 2.013 2.821 2.013 1.304 0 2.403-.838 2.816-2h6.367c.413 1.162 1.512 2 2.816 2 1.308 0 2.409-.843 2.82-2.01 1.934-.056 3.181-1.505 3.181-3.829zm-18 4.039c-.662 0-1.2-.538-1.2-1.2s.538-1.2 1.2-1.2 1.2.538 1.2 1.2-.538 1.2-1.2 1.2zm12 0c-.662 0-1.2-.538-1.2-1.2s.538-1.2 1.2-1.2 1.2.538 1.2 1.2-.538 1.2-1.2 1.2zm2.832-2.15c-.399-1.188-1.509-2.05-2.832-2.05-1.327 0-2.44.868-2.836 2.062h-6.328c-.396-1.194-1.509-2.062-2.836-2.062-1.319 0-2.426.857-2.829 2.04-.586-.114-1.171-1.037-1.171-2.385 0-1.335.47-1.938 1.714-3.199.725-.735 1.309-1.209 2.263-2.025.34-.291.774-.432 1.222-.43h5.173c1.22 0 1.577.385 2.116.892.419.393 2.682 2.665 2.682 2.665s2.303.554 3.48.895c.84.243 1.35.479 1.35 1.71 0 1.195-.396 1.825-1.168 1.887zm-6.457-13.55c0 .276-.224.5-.5.5h-1.875v1h-1.889c-.843 0-1.588-.417-2.041-1.057-.418-.59-1.099-.943-1.822-.943h-.019c-4.017 0-5.255 3.215-3.502 5.254l-.735.677c-2.341-2.679-.663-6.931 4.237-6.931h.019c.724 0 1.404-.352 1.822-.943.453-.64 1.198-1.057 2.041-1.057h1.889v1h1.875c.276 0 .5.224.5.5s-.224.5-.5.5h-1.875v1h1.875c.276 0 .5.224.5.5z"/></svg>     </Avatar>         </TableCell>
                    <TableCell align="right">{value.hov.timeString}</TableCell>
                  </TableRow>
                  <TableRow key={"Bike"}>
                    <TableCell component="th" scope="row">
                      <Avatar className={classes.lightGreenAvatar}> <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M8.141 11.624l-.653-.519c-.395-.312-.477-.878-.187-1.291l2.474-3.519c.237-.337.7-.42 1.04-.186l4.185 2.884h1.5c.31 0 .5.259.5.5 0 .276-.224.5-.5.5h-.728l1.3 2.393c.593-.248 1.244-.386 1.928-.386 2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5c0-1.72.87-3.237 2.193-4.138l-1.563-2.877-2.541-.782-.872 1.309 2.287 2.948c.179.231.216.535.122.811-.338.994-1.201 3.429-1.567 4.398-.09.244-.351.38-.604.316l-.023-.006c-.286-.071-.46-.347-.42-.637.156-1.159.573-3.986.573-3.986l-2.659-2.109-.674.957c1.07.917 1.748 2.277 1.748 3.796 0 2.76-2.24 5-5 5s-5-2.24-5-5 2.24-5 5-5c.883 0 1.712.229 2.433.632l.708-1.008zm-1.288 1.831c-.554-.291-1.185-.455-1.853-.455-2.208 0-4 1.792-4 4s1.792 4 4 4c2.207 0 4-1.792 4-4 0-1.18-.512-2.241-1.326-2.974l-1.779 2.529c.067.133.105.285.105.445 0 .552-.448 1-1 1s-1-.448-1-1 .448-1 1-1l.061.002 1.792-2.547zm9.821.292c-1.014.726-1.674 1.913-1.674 3.253 0 2.208 1.792 4 4 4s4-1.792 4-4-1.792-4-4-4c-.511 0-.998.096-1.447.27l1.483 2.731c.535.019.964.459.964.999 0 .552-.448 1-1 1s-1-.448-1-1c0-.194.056-.377.152-.53l-1.478-2.723zm-3.597-11.747c1.147 0 2.077.931 2.077 2.077 0 1.147-.93 2.077-2.077 2.077-1.146 0-2.077-.93-2.077-2.077 0-1.146.931-2.077 2.077-2.077z"/></svg>              
                      </Avatar>
                    </TableCell>
                    <TableCell align="right">{value.biking.timeString}</TableCell>
                  </TableRow>
                  <TableRow key={"Walking"}>
                    <TableCell component="th" scope="row">
                    <Avatar className={classes.lightGreenAvatar}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"/><path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7"/></svg>  </Avatar>            </TableCell>
                    <TableCell align="right">{value.walking.timeString}</TableCell>
                  </TableRow>
                  <TableRow key={"Transit"}>
                    <TableCell component="th" scope="row">
                      <Avatar className={classes.lightGreenAvatar}><svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M6 24h-2c-.552 0-1-.448-1-1v-1c-.53 0-1.039-.211-1.414-.586s-.586-.884-.586-1.414v-8c-.552 0-1-.448-1-1v-3c0-.552.448-1 1-1v-4c0-1.657 1.343-3 3-3h16c1.657 0 3 1.343 3 3v4c.552 0 1 .448 1 1v3c0 .552-.448 1-1 1v8c0 .53-.211 1.039-.586 1.414s-.884.586-1.414.586v1c0 .552-.448 1-1 1h-2c-.552 0-1-.448-1-1v-1h-10v1c0 .552-.448 1-1 1zm-1.5-7c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm15 0c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm-5 1h-5c-.276 0-.5.224-.5.5s.224.5.5.5h5c.276 0 .5-.224.5-.5s-.224-.5-.5-.5zm6.5-12.5c0-.276-.224-.5-.5-.5h-17c-.276 0-.5.224-.5.5v8.5s3.098 1 9 1 9-1 9-1v-8.5zm-5-3.5h-8v1h8v-1z"/></svg>
                      </Avatar>
                    </TableCell>
                    <TableCell align="right">{value.transit.timeString}</TableCell>
                  </TableRow>
                  { value.postmates.duration && <TableRow key={"PostMate"}>
                      <TableCell component="th" scope="row">
                        <Avatar className={classes.lightGreenAvatar}>
                          <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="1336" height="445.333" viewBox="0 0 1002 334"><path d="M183.4 87.9c-6.5 3.8-8.9 8.3-8.1 15.2.7 6.1 3.8 12 7.8 15.2l3.2 2.5-8.4 6.7c-21.6 17.1-63.6 42.5-70.5 42.5-1.3 0-2.4.4-2.4.9 0 3.4 33.7 4.3 45.5 1.1 3.9-1 7.1-1.7 7.2-1.6.2.2-.2 3.8-.7 8.2-1.1 8.8-.7 14.7 1.7 21.3l1.6 4.3-3.4 2.7c-8 6.2-9.2 7.6-8.4 10 .7 2.3 1 2.3 7.2 1.8 3.8-.4 8-1.5 10-2.7l3.5-2.1 7 4.8c3.8 2.6 7.4 5.3 7.9 5.9.6.8.7 4.2.3 8.8l-.7 7.5-4.6.6c-19.5 2.7-35.8 17.1-40 35.6-1.5 6.5-1.3 16.7.5 23.4 3.2 12.4 12.2 23.3 24.3 29.3 7.5 3.7 7.5 3.7 20.5 3.7 12.7 0 13.3-.1 19.9-3.2 8-3.8 16.6-11.6 20.7-18.8 6.4-11.1 7.8-26.6 3.6-38.8-1.5-4.4-1.9-7-1.2-7.4.5-.4 3.2-.5 5.8-.4 4.2.2 5.2-.1 7.8-2.7 2-2.1 3-4 3-6.1 0-2.9.3-3.1 8.8-5.6 10.1-3.1 13-5.2 11.3-8.3-1-1.8-2.2-2.2-9.4-2.4l-8.2-.3-2.2-4.6-2.1-4.6 3.4-25.4c1.9-14 3.7-26.4 3.9-27.7l.6-2.3 4.5 3.3c6.7 4.8 6.8 5.1 4.3 10-9.1 17.8-5.5 40.3 8.8 54.4 9.5 9.4 22.2 14 36.3 13.1 24.3-1.5 43-21.6 43-46.1 0-18.8-9.8-34.3-26.6-42.3-6.9-3.3-8.7-3.7-17.8-4.1-8.5-.3-11.1-.1-16.5 1.8-6.3 2.1-15.7 7.6-18.1 10.5-1 1.2-2.1.7-7.1-3.2l-6-4.7 5.6-2.9c4.4-2.4 5.5-3.5 5.3-5.1-.2-1.4-1.2-2.2-3.3-2.6-1.6-.3-2.8-1-2.5-1.5.3-.7 19.2-17.6 26.8-24 .5-.4-7.6-16.3-8.5-16.8-.5-.3-7.4 5.5-15.5 12.8l-14.7 13.2-7.8.7c-4.3.4-10.8 1-14.4 1.3-9 .8-11.7-.8-17.1-9.9-2.6-4.4-5.5-7.9-7.6-9.1l-3.4-2 4.1-2.2c4.7-2.4 8.1-6.8 8.1-10.6 0-1.4-.6-4.7-1.4-7.3l-1.4-4.6 4.4-3.6c2.4-2 4.4-4.1 4.4-4.6 0-.7-2.5-.8-7-.4-6.2.6-7.3.5-9.6-1.3-3.9-3.1-9.8-2.7-16 .8zm22.7 77.4c2.4 1.4 6.8 3.5 9.6 4.6l5.2 2.1 8.7-2.6c12.6-3.6 13.2-2.8 4.3 6.2-4.1 4.2-8.1 7.9-9 8.4-1 .6-3 .4-5.5-.5-4.6-1.7-17.4-1.9-26.3-.5-3.5.6-6.5.9-6.7.8-.1-.2 2-4.2 4.7-8.8 2.7-4.7 5.4-10.1 6-12.1 1.1-3.5 1.2-3.6 2.9-1.9 1 1 3.8 2.9 6.1 4.3zm109.2 11.5c8.3 3.8 14.1 9.6 18 18 2.7 5.8 3.2 7.8 3.1 14.7 0 10.3-3.2 17.9-10.7 25.3-7.5 7.4-15.1 10.6-25.2 10.6-6.9 0-9-.4-14.5-3-8.3-3.9-14.5-10.1-18.4-18.4-2.6-5.6-3.1-7.6-3.1-14.5.1-6.6.5-9 2.8-13.8l2.7-5.9 5.2 3.8c2.9 2.1 9.7 7.1 15.1 11.1s10.4 7.3 11.1 7.3c1.6 0 3.6-2.1 3.6-3.7 0-1-18.5-16.4-28.3-23.5-1.7-1.3-1.5-1.6 2.8-4.7 10.8-7.7 23.8-8.9 35.8-3.3zm-76.4 21.1c-1.3 9.4-2.6 17.1-2.9 17.1-1.1 0-6.9-15.6-7.2-19.2-.2-3.4.3-4.4 5.7-9.8 3.2-3.3 6.1-5.8 6.3-5.6.2.2-.7 8.1-1.9 17.5zm-43.8 14.5l-6.4 6.5-6.9-4.7c-3.7-2.6-6.2-4.8-5.5-5 1.9-.4 21-3 23.2-3.1 1.4-.1.2 1.6-4.4 6.3zm31 13.9c7.2 11.4 8.8 17.7 4.7 17.7-1.8 0-14.8-7.5-14.8-8.6 0-.9 6.5-13.4 7-13.4.3 0 1.7 1.9 3.1 4.3zM201 239c0 3.7 1.7 4.9 12.4 9.1 9 3.5 9.1 3.5 9.4 7.2.2 2 0 3.7-.4 3.7s-3.1-2.3-6-5c-5.7-5.4-15.1-10.4-21.6-11.5-3.5-.6-3.9-1-3.4-2.9.3-1.1.6-3.8.6-5.9v-3.8l4.5 3.2c3.4 2.5 4.5 3.9 4.5 5.9zm-19.6 26.7c-.7 7.6-1.6 16.4-1.9 19.5-.6 5.4-.4 5.9 1.8 6.9s4 .1 18.2-9c8.6-5.6 16.2-10.3 16.8-10.4.5-.1 1.9 2.5 2.9 5.8 5 15.5-2.8 33.1-18.4 41.6-5.9 3.2-6.9 3.4-15.8 3.4-8.7 0-10.1-.3-16.2-3.3-12.9-6.3-20.1-17.9-20.1-32.2 0-9.3 2.7-16.9 8.4-23.4 5.9-6.7 16.5-12.4 22.9-12.6h2.6l-1.2 13.7zm18.1-10.3c5.3 2.4 12.8 8.3 12.3 9.7-.4 1-23.2 15.8-23.7 15.3-.2-.2.2-6.7.9-14.4 1.5-15.9.5-15 10.5-10.6z"/><path d="M247 123.7c-8 6.8-14.9 12.8-15.4 13.4-.6.5 2.1.9 7.5.9h8.4l13.7-12.2c7.6-6.7 13.4-12.5 13-12.9-.4-.4-3.4-.9-6.7-1.1l-6-.5-14.5 12.4zM502.7 171.4c-9.3 2.6-16 10.6-18.7 22.4-.8 3.3-1.3 11.1-1.3 18.2.1 19.3 4.3 30 14.1 35.7 4.2 2.5 5.7 2.8 13.7 2.8 8 0 9.5-.3 13.7-2.8 10-5.8 14.2-17.1 14.2-37.2 0-16.2-2.2-24.7-8.4-31.7-6.3-7.3-17.3-10.2-27.3-7.4zm11 17.1c3.6 2.5 4.7 7.9 4.7 22 0 18.3-2.2 24.3-8.6 23.3-3.7-.5-5.8-4.7-6.8-13.8-1.7-14.2.3-28.7 4.3-31.5 2.7-1.9 3.7-1.9 6.4 0zM570.7 171c-11.4 2.9-17.7 11-17.7 22.7 0 6.7 2.4 12.5 6.6 16.5 1.6 1.5 7.1 4.9 12.2 7.5 10 5.1 12.9 8.2 11.9 12.5-.4 1.3-1.8 3-3.2 3.6-3.4 1.6-6.9.1-12.1-4.9l-4-4-6.8 6.2-6.7 6.2 4.3 4.4c5.9 6.1 10.9 8.5 19 9.1 12 .8 21.3-3.1 25.9-11.1 2-3.5 2.4-5.6 2.4-12.2 0-7-.4-8.6-2.8-12.8-3-5.1-8.8-9.4-18.9-13.9-6.8-3.1-9.6-6.7-8.2-10.6.7-2.1 1.7-2.8 4.1-3 2.6-.3 4.1.5 7.8 3.9l4.5 4.1 6.5-5.7c3.6-3.1 6.5-6 6.5-6.4 0-1.7-7.8-8.5-11.7-10.2-5-2.3-14.4-3.2-19.6-1.9zM968.8 171.3c-12.3 3.5-19 15.4-15.9 28.5 1.8 7.4 5.7 11.3 17.1 17.2 10.6 5.4 13.3 8.1 12.8 12.7-.5 4.2-4.7 5.9-9.3 3.7-1.9-.9-4.9-3.2-6.5-5.1l-3-3.4-6.5 5.7c-3.6 3.1-6.5 6.2-6.5 6.9 0 2.4 9.9 10.3 15.1 12 11.9 4 26.3.2 32.4-8.4 2.5-3.6 3-5.4 3.3-11.7.7-13.7-3.8-20.1-19.4-27.6-9.2-4.3-12-7.3-11-11.3 1.3-5 9.6-4.1 13.7 1.6 1.1 1.6 2.4 2.9 2.9 2.9 1.5 0 13-11.1 13-12.5 0-1.7-6.1-7-10.9-9.5-5.1-2.5-15.3-3.4-21.3-1.7zM418 211v39h19v-28h5.3c17.9-.1 26.7-8.3 26.7-25 0-9.2-1.3-14-4.7-18.1-5.1-6-8.7-6.9-28.5-6.9H418v39zm30-21.5c.7.9 1.5 3.8 1.8 6.5.4 4.2.1 5.2-2.1 7.4-2 1.9-3.6 2.6-6.7 2.6h-4v-18h4.9c3.1 0 5.3.5 6.1 1.5zM615 180.5v8.5h16v61h19v-61h16v-17h-51v8.5zM681 211v39h18v-34.5l4.4 12.5c5.9 16.8 8.7 24 9.5 24 .7 0 2.7-5.1 9.7-25l4.4-12.5-.7 17.8-.6 17.7H744v-78h-17.8l-5 14.2c-2.7 7.9-5.5 16.1-6.1 18.3-.7 2.2-1.5 4.6-1.7 5.4-.3.8-3.5-7.4-7.1-18.2l-6.7-19.7H681v39zM778.6 173.7c-.8 2.7-19.6 75.3-19.6 75.8 0 .3 4.5.5 10 .5 11.2 0 10 .9 11.7-9l.9-4.5 7.1-.3c7.8-.3 7.4-.6 8.8 6.8 1.4 7.4.7 7 11.6 7 5.4 0 9.9-.3 9.9-.8 0-.4-4.5-17.8-9.9-38.7l-9.8-38-10.1-.3c-8.9-.2-10.1-.1-10.6 1.5zM824 180.5v8.5h15v61h20v-61h15v-17h-50v8.5zM890 211v39h47v-17h-28v-16h18v-16h-18v-13h27v-16h-46v39zM87.5 206.2c-1.2 11.7-1.1 11.5-6.5 12.7-2.7.6-6.8 1.4-9 1.7-2.2.4-4 1-4 1.4 0 .4 3.8 2.4 8.5 4.5 5.3 2.4 8.4 4.3 8.1 5-.2.7-.8 5-1.2 9.6l-.7 8.4 6.3-6.8c3.4-3.7 6.7-6.7 7.4-6.7.6 0 4.5 1.6 8.5 3.5 4.1 2 7.6 3.3 7.9 3.1.2-.3-1.6-4-4.1-8.3l-4.5-7.8 6-6.8c3.4-3.7 5.8-7 5.6-7.3-.3-.2-3.7.2-7.7 1.1-4 .8-7.9 1.5-8.6 1.5-.8 0-3.4-3.4-5.7-7.5-2.4-4.1-4.6-7.5-5-7.5-.3 0-.9 2.8-1.3 6.2zM19.7 250.6c-.3 1.1-.9 5.3-1.2 9.5l-.7 7.7-8.9 1.7C4 270.5 0 271.6 0 272c0 .3 3.6 2.3 8 4.3 8.9 3.9 8.5 3.3 7 14.1-.6 3.8-.8 7.2-.4 7.5.3.3 3.3-2.4 6.7-6.1l6.2-6.7 7.8 3.6c4.2 2 8 3.3 8.3 3 .3-.3-1.3-3.9-3.6-8.1l-4.2-7.6 6.1-6.7c3.3-3.7 5.9-6.9 5.7-7.1-.2-.2-4.3.4-9 1.4-4.8.9-8.8 1.5-9 1.3-.2-.2-2.4-3.9-4.8-8.3-3.5-6-4.7-7.4-5.1-6zM79.6 282.7c-1.6 14.1-.8 12.8-8.9 14.3-12.2 2.2-12.3 2.3-2.6 6.8l8.6 4-.8 5.4c-.4 2.9-.8 7.1-.8 9.3v4l6.3-6.8 6.3-6.8 7.8 3.6c4.3 1.9 8.2 3.5 8.7 3.5s-1.1-3.7-3.6-8.2l-4.5-8.3 6.1-6.2c3.4-3.4 5.9-6.5 5.5-6.9-.5-.6-8.1.5-15.3 2.2-1.8.5-2.9-.7-6.8-7.5-2.6-4.5-4.8-8.1-5-8.1-.2 0-.7 2.6-1 5.7z"/></svg>
                        </Avatar>
                      </TableCell>
                      <TableCell align="right">Delivers in {value.postmates.duration} min <br/> Delivery cost ${value.postmates.fee /100}</TableCell>
                    </TableRow>
                  }
              </TableBody>
            </Table>
            </Paper>
          </CardContent>
          {"updated_todays_schedule_expanded_cleaned" in value ? "": 
          <CardActions>
              <div></div>
              <Button className={classes.button} onClick={handleClickOpen}>
                Request best times
              </Button>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                BackdropProps={{
                  classes: {
                  root: classes.popuproot
                  }
                }
                }
              PaperProps ={{
                classes: {
                root: classes.popuppaper
                }
              }}>
                <DialogTitle id="alert-dialog-title">{"Please enter your email id or phone number to get notified when we add times for this store."}</DialogTitle>
                <DialogContent>
                <TextField
                  id="outlined-input"
                  label="Phone Number"
                  className={classes.textField}
                  type="number"
                  name="number"
                  autoComplete="number"
                  margin="normal"
                  variant="outlined"
                />
                <br></br>
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
              </DialogContent>
                <DialogActions>
                <Button  className={classes.popupbutton} onClick={handleClose} autoFocus>
                  Submit
                </Button>
              </DialogActions>
              </Dialog>
            </CardActions>
          }
        </Card>
        ))}
        {groceryStores.length <1 ? <div><br></br>  
          <Paper className={classes.paper}>
            <Grid container wrap="nowrap" spacing={2}>
              <Grid item xs>
                <Typography>{'Fetching nearby stores.'}</Typography>
              </Grid>
            </Grid>
          </Paper></div> :"" 
      }
    </div>
  );
}
