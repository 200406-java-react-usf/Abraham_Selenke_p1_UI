import React, { useState, SyntheticEvent } from 'react';

import { Alert } from '@material-ui/lab';
import { 
    Typography, 
    FormControl, 
    InputLabel, 
    Input, 
    Button, 
    makeStyles 
} from '@material-ui/core';

import { authenticate } from '../remote/auth-service';
import { User } from '../models/user';
import { Redirect, Link } from 'react-router-dom';

interface ILoginProps {
    authUser: User;
    setAuthUser: (user: User) => void;
}

const useStyles = makeStyles({
    loginContainer: {
        display: "flex",
        justifyContent: "center",
        margin: 20,
        marginTop: 40,
        padding: 20
    },
    loginForm: {
        width: "50%"
    }
});

function LoginComponent(props: ILoginProps) {

    const classes = useStyles();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    let updateUsername = (e: any) => {
        if(!e.currentTarget.value){
            setErrorMessage('Please enter Username')            
        }

        setUsername(e.currentTarget.value);
    }

    let updatePassword = (e: any) => {
        if(!e.currentTarget.value){
            setErrorMessage('Please enter password')
        }

        setPassword(e.currentTarget.value);
    }    

    let login = async (e: SyntheticEvent) => {
        e.preventDefault();

        let authUser = await authenticate(username, password);
        props.setAuthUser(authUser);
    }

    return (
        props.authUser ?
        <Redirect to="/home" /> :
        <>
            <div className={classes.loginContainer}>
                <form className={classes.loginForm}>
                    <Typography align="center" variant="h4">Login into ERS!</Typography>

                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="username">Username</InputLabel>
                        <Input 
                            onChange={updateUsername} 
                            value={username} 
                            id="username" type="text" 
                            placeholder="Enter your username" />
                    </FormControl>

                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input 
                            onChange={updatePassword}
                            value={password}
                            id="password" type="password"
                            placeholder="Enter your password"/>
                    </FormControl>
                    <br/><br/>
                        <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "white"
                        }}>
                          <Button onClick={login} variant="contained" color="primary" size="large">Login</Button>
                          <div style={{ marginLeft: '5rem' }}> </div>
                          <Link to='/register'>
                            <Button variant="contained" color="primary" size="large">Sign Up</Button>
                          </Link>
                        </div>
                    <br/><br/>
                    {
                        errorMessage 
                            ? 
                        <Alert severity="error">{errorMessage}</Alert>
                            :
                        <></>
                    }
                </form>
            </div>
        </> 
    );
    
}

export default LoginComponent;