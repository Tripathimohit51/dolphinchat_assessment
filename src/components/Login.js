import React, { useState, useEffect } from 'react';
import '../App.css';
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

const Login = (props) => {
    const [isSubmit, setSubmit] = useState(false);
    const [login, setLogin] = useState({ username: '', password: '' , userType:''}, 0);

    const handleChange = (e) => {
        if (login.username !== '' && login.password !== ''  && login.userType!== '') {
            setSubmit(true);
        }
        else {
            setSubmit(false);
        }
    }
    useEffect(() => {
        handleChange();
    }, [login]);

    const mySubmit = (e) => {
        e.preventDefault();
        props.handleSubmit(login);
    }

    return (
        <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
            <CssBaseline />
            <Typography variant="h4" align="center" component="h1" gutterBottom>
                Login
      </Typography>
            <form onSubmit={mySubmit}>
                <Paper style={{ padding: 16 }}>
                    <Grid container alignItems="flex-start" spacing={2}>
                        <div style={{ width: 616 }}>
                            <FormControl>
                                <InputLabel htmlFor="username">User Name</InputLabel>
                                <Input id="username" aria-describedby="my-helper-text" onChange={e => setLogin({ ...login, username: e.target.value })} />
                            </FormControl>
                            <br />
                            <FormControl>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input type="password" id="username" aria-describedby="my-helper-text" onChange={e => setLogin({ ...login, password: e.target.value })} />
                            </FormControl>
                            <br />
                            <div className="radio-container">
                                <RadioGroup aria-label="userType" name="userType">
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
    );
}
export default Login;