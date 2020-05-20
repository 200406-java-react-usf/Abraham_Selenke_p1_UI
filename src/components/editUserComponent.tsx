import React, { SyntheticEvent, useState } from 'react';
import { Typography, FormControl, InputLabel, Input, makeStyles, Button } from '@material-ui/core';
import { User } from '../models/user';
import {project1Client} from '../remote/project1-client';
import { Alert } from '@material-ui/lab';
import { updateUser } from '../remote/user-service';

interface IUpdateProps{
    authUser: User,
    updateUser: User
}

const useStyles = makeStyles({
    updateContainer: {
        display: "flex",
        justifyContent: "center",
        margin: 20,
        marginTop: 40,
        padding: 20
    },
    updateForm: {
        width: "50%"
    }
})

function UpdateComponent(props: IUpdateProps){

    const classes = useStyles();

    let updateUserRole = props.updateUser.roles

    const[user_id, setId] = useState(props.updateUser.user_id)
    const[username, setUsername] = useState(props.updateUser.username);
    const[password, setPassword] = useState(props.updateUser.password);
    const[firstName, setFirstName] = useState(props.updateUser.firstName);
    const[lastName, setLastName] = useState(props.updateUser.lastName);
    const[email, setEmail] = useState(props.updateUser.email);
    const [role, setRole] = useState(updateUserRole);
    const[errorMessage, setErrorMessage] = useState('');

    let updateUsername = (e: any) => {
        setUsername(e.currentTarget.value);
    }

    let updatePassword = (e: any) => {
        setPassword(e.currentTarget.value);
    }

    let updateFirstName = (e: any) => {
        setFirstName(e.currentTarget.value);
    }

    let updateLastName = (e: any) => {
        setLastName(e.currentTarget.value);
    }

    let updateEmail = (e: any) => {
        setEmail(e.currentTarget.value);
    }
    let updateRole = (e:any) => {
        setRole(e.currentTarget.value);
    }

    let updateUser = (e: SyntheticEvent) => {

        project1Client.put('/users', {
            user_id: user_id,
            username: username,
            password: password,
            firstName: firstName,
            lastName: lastName,
            email: email,
            roles: role
        });
    }

    //console.log(updateUser);
    

    return (
        <>
            <div className = {classes.updateContainer}>
                <form className = {classes.updateForm}>
                <Typography align="left" variant="h4">Update User</Typography>
                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="firstname">First Name</InputLabel>
                        <Input 
                            onChange={updateFirstName} 
                            value={firstName} 
                            id="firstName" type="text" 
                            placeholder="firstName" />
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="lastName">Last Name</InputLabel>
                        <Input 
                            onChange={updateLastName} 
                            value={lastName} 
                            id="lastName" type="text" 
                            placeholder="lastName" />
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="username">Username</InputLabel>
                        <Input 
                            onChange={updateUsername} 
                            value={username} 
                            id="username" type="text" 
                            placeholder="username" />
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input 
                            onChange={updatePassword}
                            value={password}
                            id="password" type="password"
                            placeholder="password"/>
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <Input 
                            onChange={updateEmail} 
                            value={email} 
                            id="email" type="text" 
                            placeholder="email" />
                    </FormControl>
                    <p></p>
                    <span>Role</span>
                    <FormControl fullWidth>
                        <InputLabel shrink htmlFor="age-native-label-placeholder"></InputLabel>
                        <select value={role} onChange={updateRole}>
                            <option value={'Employee'}>Employee</option>
                            <option value={'Manager'}>Financial Manager</option>
                            <option value={'Admin'}>Admin</option>
                        </select>
                    </FormControl>
                    <br/><br/>
                    <Button onClick={updateUser} variant="contained" color="primary" size="medium">Update User</Button>
                    <br/><br/>
                    {
                        errorMessage 
                            ? 
                        <span style={{color:"red"}}>{errorMessage}</span>
                            :
                        <></>
                    }
                </form>

            </div>


        </>

    )

}

export default UpdateComponent;
