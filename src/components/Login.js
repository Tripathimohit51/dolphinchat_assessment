import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import '../App.css';
import Footer from './Footer';
import {
    Typography,
    Paper,
    Grid,
    Button,
    CssBaseline,
    RadioGroup,
    Radio,
    FormControl,
    FormControlLabel,
    InputLabel,
    Input,
} from '@material-ui/core';

const myStyles = makeStyles(()=>({
    header:{
        paddingBottom: 10,
        paddingTop: 5,
        backgroundColor: 'black',
        color:'white'
    },
    radioContainer: {
        display:"inline"   
    }
}));

const Login = (props) => {
    const [isSubmit, setSubmit] = useState(false);
    const [login, setLogin] = useState({ username: '', password: '' , userType:''}, 0);
    const classes = myStyles();
    useEffect(() => {
        if (login.username !== '' && login.password !== ''  && login.userType!== '') {
            setSubmit(true);
        }
        else {
            setSubmit(false);
        }
    }, [login]);

    const mySubmit = (e) => {
        e.preventDefault();
        props.handleSubmit(login);
    }

    return (
        <>
        <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
            <CssBaseline />
            <div className={classes.header}>
                <Typography variant="h5" align="center" component="h5" gutterBottom>
                Login
                </Typography>
                </div>
            <form onSubmit={mySubmit}>
                <Paper style={{ padding: 16 }} elevation={3}>
            <Grid container alignItems="flex-start" spacing={2}>
                        <div style={{ width: 616 }}>
                            <FormControl>
                                <InputLabel htmlFor="username">User Name</InputLabel>
                                <Input id="username" aria-describedby="my-helper-text" onChange={e => setLogin({ ...login, username: e.target.value.trim() })} />
                            </FormControl>
                            <br />
                            <FormControl>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input type="password" id="password" aria-describedby="my-helper-text" onChange={e => setLogin({ ...login, password: e.target.value })} />
                            </FormControl>
                            <br />
                            <div style={{marginBottom:10}}>
                                <RadioGroup className={classes.radioContainer} aria-label="userType" name="userType">
                                    <FormControlLabel value="teacher" control={<Radio />} label="Teacher" onChange={e => setLogin({ ...login, userType: e.target.value })} />
                                    <FormControlLabel value="student" control={<Radio />} label="Student" onChange={e => setLogin({ ...login, userType: e.target.value })} />
                                </RadioGroup>
                            </div>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                disabled={!isSubmit}
                            >
                                Login
                  </Button>
                        </div>
                    </Grid>
                </Paper>

            </form>
        </div>
        <Footer/>
        </>
    );
}
export default Login;