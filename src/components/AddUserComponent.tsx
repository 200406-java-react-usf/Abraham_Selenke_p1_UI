import React, { SyntheticEvent, useState } from 'react';
import { Typography, FormControl, InputLabel, Input, makeStyles, Button } from '@material-ui/core';
import { User } from '../models/user';
import { addNewUser } from '../remote/user-service';
import { Alert } from '@material-ui/lab';
import { Link } from 'react-router-dom';

interface INewUserProps{
    authUser: User,
    setNewUser: (user: User) => void 
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

function NewUserComponent(props: INewUserProps){

    const classes = useStyles();
    const [newUser, setNewUser] = useState(new User(0, '', '', '', '', '', ''))
    const[errorMessage, setErrorMessage] = useState('');

    let setUsername = (e: any) => {
        if(!e.currentTarget.value){
            setErrorMessage('Please enter Username');
        }
        newUser.username = e.currentTarget.value;
    }
    let setPassword = (e: any) => {
        if(!e.currentTarget.value){
            setErrorMessage('Please enter Password');
        }
        newUser.password = e.currentTarget.value;
    }
    let setFirstName = (e: any) => {
        if(!e.currentTarget.value){
            setErrorMessage('Please enter First Name');
        }
        newUser.firstName = e.currentTarget.value;
    }
    let setLastName = (e: any) => {
        if(!e.currentTarget.value){
            setErrorMessage('Please enter Last Name');
        }
        newUser.lastName = e.currentTarget.value;
    }
    let setEmail = (e: any) => {
        if(!e.currentTarget.value){
            setErrorMessage('Please enter Email');
        }
        newUser.email = e.currentTarget.value;
    }
    let setRole = (e: any) => {
        newUser.roles = e.currentTarget.value;
    }
    let addUser = async () => {        
        let respones = await addNewUser(newUser.username, newUser.password, newUser.firstName, newUser.lastName, newUser.email);
        props.setNewUser(respones);
        console.log(respones);
    }

    return (

        <>
            <div className = {classes.registerContainer}>
                <form className = {classes.registerForm}>
                    <Typography align="center" variant = "h6" > Add New User for Expense Reimbursement!</Typography>
                    <FormControl margin = "normal" fullWidth>
                        <InputLabel htmlFor = "username">Username</InputLabel>
                        <Input onChange = {setUsername} id = "username" type = "text" placeholder = "Username"/>
                    </FormControl>
                    <FormControl margin = "normal" fullWidth>
                        <InputLabel htmlFor = "password">Password</InputLabel>
                        <Input onChange = {setPassword} id = "password" type = "password" placeholder = "Password"/>
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
                    <span>Role</span>
                    <FormControl fullWidth>
                        <InputLabel shrink htmlFor="age-native-label-placeholder"></InputLabel>
                        <select onChange={setRole}>
                            <option aria-label="None" value="" />
                            <option value={'Employee'}>Employee</option>
                            <option value={'Manager'}>Financial Manager</option>
                            <option value={'Admin'}>Admin</option>
                        </select>
                    </FormControl>
                    <br/> <br/>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "white",
                        }}>
                    <Button component={Link} to="/home" onClick = {addUser} variant = "contained" color = "secondary" size = "medium">Add New User</Button>
                    </div>
                    {errorMessage ? <Alert severity = "error">{errorMessage}</Alert>
                        :
                        <></>}
                </form>
            </div>
        </>
    )
}

export default NewUserComponent;