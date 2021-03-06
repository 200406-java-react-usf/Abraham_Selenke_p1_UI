import React, { SyntheticEvent, useState } from 'react';
import { Typography, FormControl, InputLabel, Input, makeStyles, Button } from '@material-ui/core';
import { User } from '../models/user';
import { newUpdateUser } from '../remote/user-service';
import { Link } from 'react-router-dom';

interface IUpdateProps{
    authUser: User,
    newUser: User,
    setNewUser: (user: User) => void
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

function EditUserComponent(props: IUpdateProps){

    const classes = useStyles();

    let updateUserRole = props.newUser.roles
    //Gets the state of the current User
    const[user_id, setId] = useState(props.newUser.user_id)
    const[username, setUsername] = useState(props.newUser.username);
    const[password, setPassword] = useState(props.newUser.password);
    const[firstName, setFirstName] = useState(props.newUser.firstName);
    const[lastName, setLastName] = useState(props.newUser.lastName);
    const[email, setEmail] = useState(props.newUser.email);
    const[role, setRole] = useState(updateUserRole);
    const[errorMessage, setErrorMessage] = useState('');
    
    let updateUsername = (e: any) => {
        if(!e.currentTarget.value){
            setErrorMessage('Please enter username')
        }
        setUsername(e.currentTarget.value);
    }

    let updatePassword = (e: any) => {
        if(!e.currentTarget.value){
            setErrorMessage('Please enter password')
        }
        setPassword(e.currentTarget.value);
    }

    let updateFirstName = (e: any) => {
        if(!e.currentTarget.value){
            setErrorMessage('Please enter First Name')
        }
        setFirstName(e.currentTarget.value);
    }

    let updateLastName = (e: any) => {
        if(!e.currentTarget.value){
            setErrorMessage('Please enter Last Name')
        }
        setLastName(e.currentTarget.value);
    }

    let updateEmail = (e: any) => {
        if(!e.currentTarget.value){
            setErrorMessage('Please enter email')
        }
        setEmail(e.currentTarget.value);
    }
    let updateRole = (e:any) => {
        setRole(e.currentTarget.value);
    }

    let updateUser = async () => {
        let respones = await newUpdateUser(user_id, username, password, firstName, lastName, email, role);
        props.setNewUser(respones);
        console.log(respones);
    }

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
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "white",
                        }}>
                    <Button component={Link} to="/users" onClick={updateUser} variant="contained" color="secondary" size="medium">Update User</Button>
                    </div>
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

export default EditUserComponent;
