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
import { Paper } from '@material-ui/core';
import { Multiselect } from 'multiselect-react-dropdown';


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
        width: 140,
        float: 'right'
    },
    multiSelectContainer: {
        marginTop: 18
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
const Teacher = () => {
    const classes = useStyles();
    const objectArray=[
    {name:'Physics', id:1},
    {name:'Chemistry', id: 2},
    {name:'Maths', id: 2},
    {name:'English', id: 2},
    {name:'French', id: 2}];
    const [openModal, setOpenModal] = useState(false);
    const [detail, setDetail] = useState({ username: '', email: '',subjects:[] } , 0);
    const [rows, setRow] = useState([]);
    let [isModalSubmit, setIsModalSubmit] = useState(true);
    const handleClickOpen = () => {
        setDetail({ ...detail });
        setOpenModal(true);
    };
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
        detail.username!=='' && detail.subjects.length>=3 ?setIsModalSubmit(false) : setIsModalSubmit(true);       
    }, [detail]);

    const handleSearch = (e) => {
        if (e.target.value !== '') {
            const data = rows.filter(element => element.username.includes(e.target.value));
            if (data.length > 0) setRow(data);
        } else {
            setRow(dataArr);
        }

    }
    const onSelect= (selectedList, selectedItem) => {
        setDetail({...detail,subjects: selectedList});
    }
    
    const onRemove=(selectedList, removedItem) => {
        setDetail({...detail,subjects: selectedList});
    }

    const onRowSelection = (e) => {
        console.log(e,'wwwwww');
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
                        margin="dense"
                        id="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        onChange={eve => { setDetail({ ...detail, email: eve.target.value }) }}
                    />
                        <div className={classes.multiSelectContainer}>
                        <Multiselect
                            options={objectArray}
                            displayValue="name"
                            placeholder='Select Subjects'
                            onSelect={onSelect}
                            onRemove={onRemove}
                            showCheckbox={true}
                        />
                        </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
          </Button>
                    <Button disabled={isModalSubmit} onClick={handleSubmit} color="primary">
                        Submit
          </Button>
                </DialogActions>
            </Dialog>

            <TableContainer component={Paper}>
                <Table
                className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Student Name</TableCell>
                            <TableCell>Email ID</TableCell>
                            <TableCell>Subjects</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row,index) => (
                            <TableRow key={index}>
                                <TableCell  component="th" scope="row">
                                    {row.username}
                                </TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>
                                {
                                    row.subjects && row.subjects.map(element => (
                                        element.name+ ' '
                                    ))
                                }
                                  </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default Teacher;