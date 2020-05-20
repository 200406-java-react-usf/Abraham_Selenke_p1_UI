import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';


const useStyles = makeStyles({
    adminHomeContainer: {
        display: "flex",
        justifyContent: "center",
        margin: 20,
        marginTop: 40,
        padding: 20
    },
    adminHomeForm: {
        width: "50%"
    }
});

const HomeComponent = () => {

    const classes = useStyles();

    return (
        <>
            <div className={classes.adminHomeContainer}>
                <form className={classes.adminHomeForm}>
                    <Typography align="center" variant="h3">Welcome, </Typography>
                </form>
            </div>
        </>
    );

}

export default HomeComponent;

/* Need to a add a home page 
<div style="text-align:center;">

<h1 style="font-size: 40pt;"> <b>Welcome to Expense Reimbursement System!</b></h1>
<br>
<p style="font-size: 24pt;"> Expense Reimbursement System, ERS, is a system setup for employees to submit requests for reimbursement for expenses incurred while on company time.</p>
<p style="font-size: 24pt;"> Please login to begin!</p> */