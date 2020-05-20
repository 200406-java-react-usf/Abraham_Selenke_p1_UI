import React from 'react';
import { Redirect } from 'react-router-dom';
import { makeStyles, Typography } from '@material-ui/core';

interface IHomeProps {
    username: string
}

const useStyles = makeStyles({
    homeContainer: {
        display: "flex",
        justifyContent: "center",
        margin: 20,
        marginTop: 40,
        padding: 20
    },
    homeForm: {
        width: "50%"
    }
});

const AdminHomeComponent = (props: IHomeProps) => {

    const classes = useStyles();
    
    return (
        !props.username ?
        <Redirect to="/login" /> : 
        <>
            <div className={classes.homeContainer}>
                <form className={classes.homeForm}>
                    <Typography align="center" variant="h3">Welcome, {props.username}!</Typography>
                </form>
            </div>
        </>
    );

}

export default AdminHomeComponent;