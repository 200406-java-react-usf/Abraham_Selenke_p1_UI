import React, { SyntheticEvent, useState } from 'react';
import { Typography, FormControl, InputLabel, Input, makeStyles, Button } from '@material-ui/core';
import { User } from '../models/user';
import {project1Client} from '../remote/project1-client';
import { Reimbursements } from '../models/reimbursement';
import { Link } from 'react-router-dom';
import { UserReimbursements } from '../models/author-reimb';

interface IUpdateProps{
    authUser: User,
    updateReimbursement: UserReimbursements
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

function UpdateReimbComponent(props: IUpdateProps){

    const classes = useStyles();
    
    const[reimb_id, setId] = useState(props.updateReimbursement.reimb_id);
    const[amount, setAmount] = useState(props.updateReimbursement.amount);
    const[description, setDescription] = useState(props.updateReimbursement.description);
    const[type, setType] = useState(props.updateReimbursement.reimb_type);
    const[errorMessage, setErrorMessage] = useState('');

    let updateAmount = (e: any) => {
        if(!e.currentTarget.value){
            setErrorMessage('Please enter amount')
        }
        setAmount(e.currentTarget.value);
    }

    let updateDescription = (e: any) => {
        if(!e.currentTarget.value){
            setErrorMessage('Please enter description')
        }
        setDescription(e.currentTarget.value);
    }

    let updateType = (e: any) => {
        setType(e.currentTarget.value);
    }
    
    let updateReimbursement = (e: SyntheticEvent) => {
        project1Client.put('/reimbursement', {
            reimb_id: reimb_id,
            amount: amount,
            description: description,
            reimb_type: type
        });
    }

    return (
        <>
            <div className = {classes.updateContainer}>
                <form className = {classes.updateForm}>
                <Typography align="left" variant="h4">Update Reimbursement</Typography>
                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="firstname">Amount</InputLabel>
                        <Input 
                            onChange={updateAmount} 
                            value={amount} 
                            id="amount" type="text" 
                            placeholder="amount" />
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="firstname">Description</InputLabel>
                            <Input 
                                onChange={updateDescription} 
                                value={description} 
                                id="description" type="text" 
                                placeholder="description" />
                    </FormControl>
                    <p></p>
                    <span>Type of Reimbursement</span>
                    <FormControl fullWidth>
                        <InputLabel shrink htmlFor="age-native-label-placeholder"></InputLabel>
                        <select value={type} onChange={updateType}>
                            <option value={'Lodging'}>Lodging</option>
                            <option value={'Travel'}>Travel</option>
                            <option value={'Food'}>Food</option>
                            <option value={'Other'}>Other</option>
                        </select>
                    </FormControl>
                    <br/><br/>
                    <Button component={Link} to="/user-reimbursement" onClick={updateReimbursement} variant="contained" color="primary" size="medium">Update Reimbursement</Button>
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

export default UpdateReimbComponent;
