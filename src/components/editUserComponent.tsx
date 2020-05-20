import React, { SyntheticEvent, useState } from 'react';
import { Typography, FormControl, InputLabel, Input, makeStyles, Button } from '@material-ui/core';
import { User } from '../models/user';
import {project1Client} from '../remote/project1-client';
import { Alert } from '@material-ui/lab';

interface IRegisterProps{
    newUser: User
    setNewUser: (user: User) => void;
}

const useStyles = makeStyles({
    registerContainer: {
        display: "flex",
        justifyContent: "center",
        margin: 20,
        marginTop: 40,
        padding: 20
    },
    registerForm: {
        width: "50%"
    }
})

function RegisterComponent(props: IRegisterProps){

    const classes = useStyles();

    const[errorMessage, setErrorMessage] = useState('');

    let setUsername = (e: any) => {

        if(!e.currentTarget.value){
            setErrorMessage('Please enter Username');
        }

        props.newUser.username = e.currentTarget.value;

    }

    let setPassword = (e: any) => {

        if(!e.currentTarget.value){
            setErrorMessage('Please enter Password');
        }

        props.newUser.password = e.currentTarget.value;

    }

    let setFirstName = (e: any) => {

        if(!e.currentTarget.value){
            setErrorMessage('Please enter First Name');
        }

        props.newUser.firstName = e.currentTarget.value;

    }

    let setLastName = (e: any) => {

        if(!e.currentTarget.value){
            setErrorMessage('Please enter Last Name');
        }

        props.newUser.lastName = e.currentTarget.value;

    }

    let setEmail = (e: any) => {

        if(!e.currentTarget.value){
            setErrorMessage('Please enter Email');
        }

        props.newUser.email = e.currentTarget.value;

    }

    let registerUser = (e:SyntheticEvent) => {

        project1Client.post('/users', {
            id: 0,
            username: props.newUser.username,
            password: props.newUser.password,
            firstName: props.newUser.firstName,
            lastName: props.newUser.lastName,
            email: props.newUser.email,
            roles: 'Employee'
        });
    }

    return (

        <>

            <div className = {classes.registerContainer}>

                <form className = {classes.registerForm}>

                    <Typography align="center" variant = "h6" > Register for Expense Reimbursement!</Typography>

                    <FormControl margin = "normal" fullWidth>

                        <InputLabel htmlFor = "username">Username</InputLabel>

                        <Input onChange = {setUsername} id = "username" type = "text" placeholder = "Username"/>
                                
                    </FormControl>

                    <FormControl margin = "normal" fullWidth>

                        <InputLabel htmlFor = "password">Password</InputLabel>

                        <Input onChange = {setPassword} id = "password" type = "text" placeholder = "Password"/>
                                
                    </FormControl>

                    <FormControl margin = "normal" fullWidth>

                        <InputLabel htmlFor = "firstName">First Name</InputLabel>

                        <Input onChange = {setFirstName} id = "firstname" type = "text" placeholder = "First Name"/>
                                
                    </FormControl>

                    <FormControl margin = "normal" fullWidth>

                        <InputLabel htmlFor = "lastName">Last Name</InputLabel>

                        <Input onChange = {setLastName} id = "lastname" type = "text" placeholder = "Last Name"/>
                                
                    </FormControl>

                    <FormControl margin = "normal" fullWidth>

                        <InputLabel htmlFor = "email">Email</InputLabel>

                        <Input onChange = {setEmail} id = "email" type = "text" placeholder = "Email Adress"/>
                                
                    </FormControl>

                    <br/> <br/>

                    <Button onClick = {registerUser} variant = "contained" color = "primary" size = "medium">Register</Button>

                    {errorMessage ? <Alert severity = "error">{errorMessage}</Alert>
                        :
                        <></>}

                </form>

            </div>


        </>

    )

}

export default RegisterComponent;
