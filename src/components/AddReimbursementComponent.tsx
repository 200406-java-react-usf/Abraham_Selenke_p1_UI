import React, { SyntheticEvent, useState } from 'react';
import { Typography, FormControl, InputLabel, Input, makeStyles, Button } from '@material-ui/core';
import { User } from '../models/user';
import { addNewReimbursement } from '../remote/reimbursement-service';
import { Alert } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import { Reimbursements } from '../models/reimbursement';

interface INewReimbProps{
    authUser: User
    setNewReimbursement: (reimbursement: Reimbursements) => void
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

function NewReimbComponent(props: INewReimbProps){

    const classes = useStyles();
    const [authorId, setAuthorId] = useState(props.authUser.user_id)
    const [newReimbursement, setNewReimbursement] = useState(new Reimbursements(0, 0, new Date(), new Date(), '', authorId, 0, 'Pending',''))
    const[errorMessage, setErrorMessage] = useState('');

    let setAmount = (e: any) => {
        if(!e.currentTarget.value){
            setErrorMessage('Please enter amount')
        }
        newReimbursement.amount = e.currentTarget.value;
    }

    let setDescription = (e: any) => {
        if(!e.currentTarget.value){
            setErrorMessage('Please enter description')
        }
        newReimbursement.description = e.currentTarget.value;
    }

    let setType = (e: any) => {
        newReimbursement.reimb_type = e.currentTarget.value;
    }

    let addReimbursement = async () => {
        let respones = await addNewReimbursement(newReimbursement.amount, newReimbursement.description, newReimbursement.author, newReimbursement.reimb_status, newReimbursement.reimb_type);
        props.setNewReimbursement(respones);
        console.log(respones);
    }

    return (

        <>
            <div className = {classes.registerContainer}>
                <form className = {classes.registerForm}>
                    <Typography align="center" variant = "h6" > Add New Reimbursement for Employee!</Typography>
                    <FormControl margin = "normal" fullWidth>
                        <InputLabel htmlFor = "amount">Amount</InputLabel>
                        <Input onChange = {setAmount} id = "amount" type = "money" placeholder = "Amount"/>
                    </FormControl>

                    <FormControl margin = "normal" fullWidth>
                        <InputLabel htmlFor = "description">Description</InputLabel>
                        <Input onChange = {setDescription} id = "description" type = "text" placeholder = "Description"/>
                    </FormControl>
                    <span>Type of Reimbursement</span>
                    <FormControl fullWidth>
                        <InputLabel shrink htmlFor="age-native-label-placeholder"></InputLabel>
                        <select onChange={setType}>
                            <option aria-label="None" value="" />
                            <option value={'Lodging'}>Lodging</option>
                            <option value={'Travel'}>Travel</option>
                            <option value={'Food'}>Food</option>
                            <option value={'Other'}>Other</option>
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
                    <Button component={Link} to="/home" onClick = {addReimbursement} variant = "contained" color = "secondary" size = "medium">Add New Reimbursement</Button>
                    </div>
                    {errorMessage ? <Alert severity = "error">{errorMessage}</Alert>
                        :
                        <></>}
                </form>
            </div>
        </>
    )
}

export default NewReimbComponent;