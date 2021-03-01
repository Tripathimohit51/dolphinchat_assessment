import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {Paper,FormControlLabel,Checkbox} from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    addBtn: {
        margin: 10
    },
    menuRoot: {
        display: 'flex',
    },
    paper: {
        marginRight: theme.spacing(2),
    },
    toggleBtn: {
        width:140,
        float:'right'
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

let dataArr = [];
let sujectcell = '';
const Teacher = () => {
    const classes = useStyles();
    const [openModal, setOpenModal] = useState(false);
    const [detail, setDetail] = useState({ username: '', email: '', physics:false,chemistry:false,maths:false,english:false,computers: false}, 0);
    const [rows, setRow] = useState([]);

    const handleClickOpen = () => {
        setDetail({ ...detail, physics:false,chemistry:false,maths:false,english:false,computers: false });
        setOpenModal(true);
    };

    const handleSubjectChange = (event) => {
        setDetail({ ...detail, [event.target.name]: event.target.checked });
        handleCell();
    };

    const handleCell= () => {
        if(detail.physics) sujectcell = <TableCell>Physics</TableCell>
        if(detail.chemistry) sujectcell = <TableCell>Chemistry</TableCell>
        if(detail.english) sujectcell = <TableCell>English</TableCell>
        if(detail.maths) sujectcell = <TableCell>Maths</TableCell>
        if(detail.computers) sujectcell = <TableCell>Computers</TableCell>

    }
    const handleClose = () => {
        setOpenModal(false);
    };

    const handleSubmit = () => {
        setRow([...rows, detail]);
        localStorage.setItem('users', JSON.stringify([...rows, detail]));
        handleClose();
    }

    useEffect(() => {
        dataArr = JSON.parse(localStorage.getItem("users") || "[]");
        setRow(dataArr);
}, []);

const handleSearch = (e) => {
    if(e.target.value !==''){
        const data = rows.filter(element => element.username.includes(e.target.value));
        if(data.length> 0) setRow(data);
    } else {
        setRow(dataArr);
    }
   
}
    return (
        <div>
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="open drawer"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography className={classes.title} variant="h6" noWrap>
                            Teacher Portal
          </Typography>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                onChange={handleSearch}
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </div>
                        <div className={classes.addBtn}>
                            <Button onClick={handleClickOpen} variant="contained" className="add-btn" color="secondary">Add Students</Button>
                        </div>
                    </Toolbar>
                </AppBar>

            </div>

            <Dialog style={{ height: 'fit-content' }} open={openModal} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add student</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Student Name"
                        type="text"
                        fullWidth
                        onChange={eve => { setDetail({ ...detail, username: eve.target.value }) }}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        onChange={eve => { setDetail({ ...detail, email: eve.target.value }) }}
                    />
       <div>         
    <FormControlLabel
        control={<Checkbox checked={detail.physics} onChange={handleSubjectChange} name="physics" />}
        label="Physics" color="primary"
      />  
      <FormControlLabel
        control={<Checkbox checked={detail.chemistry} onChange={handleSubjectChange} name="chemistry" />}
        label="Chemistry" color="primary"
      /> 
      <FormControlLabel
        control={<Checkbox checked={detail.maths} onChange={handleSubjectChange} name="maths" />}
        label="Maths" color="primary"
      /> 
      <FormControlLabel
        control={<Checkbox checked={detail.english} onChange={handleSubjectChange} name="english" />}
        label="English" color="primary"
      /> 
      <FormControlLabel
        control={<Checkbox checked={detail.computers} onChange={handleSubjectChange} name="computers" />}
        label="Computers" color="primary"
      /> 
      </div>             
        </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
          </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Submit
          </Button>
                </DialogActions>
            </Dialog>

            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Student Name</TableCell>
                            <TableCell>Email ID</TableCell>
                            <TableCell>Subjects</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.username}>
                                <TableCell component="th" scope="row">
                                    {row.username}
                                </TableCell>
                                <TableCell>{row.email}</TableCell>
                               {sujectcell}
                               <TableCell>Physics,Chemistry,Maths</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default Teacher;