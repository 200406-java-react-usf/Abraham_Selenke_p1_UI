import React from 'react';
import { makeStyles, Button } from '@material-ui/core';
import { User } from '../models/user';
import { newUpdateReimbursement } from '../remote/reimbursement-service';
import { Reimbursements } from '../models/reimbursement';
import { Link } from 'react-router-dom';

interface IReimbursementProps {
    authUser: User,
    thisReimbursement: Reimbursements,
    setThisReimbursement: (reimbursement: Reimbursements) => void
}   

const useStyles = makeStyles({
    reimbursementContainer: {
      textAlign: 'left',
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
    },
    reimbursementForm: {
        fontSize: "18pt",
        padding: "25px"
    },
});

const StatusUpdateReimbursementComponent = (props: IReimbursementProps) => {
    
    const classes = useStyles();
   
    let updateStatusApprovel = async () => {
        let update = {...props.thisReimbursement};

        update.resolver_id = props.authUser.user_id;
        //@ts-ignore
        update.resolved = new Date();
        update.reimb_status = 'Approved';

        await newUpdateReimbursement(
            update.reimb_id, update.amount,
            update.description, update.resolver_id,
            update.reimb_status, update.reimb_type);
        
        props.setThisReimbursement(update);
        console.log(update);
    }

    let updateStatusDeny = async () => {
        let update = {...props.thisReimbursement};

        update.resolver_id = props.authUser.user_id;
        //@ts-ignore
        update.resolved = new Date;
        update.reimb_status = 'Denied';

        let response = await newUpdateReimbursement(
            update.reimb_id, update.amount,
            update.description, update.resolver_id,
            update.reimb_status, update.reimb_type);
        props.setThisReimbursement(update);
        console.log(update);
    }
    
    return (
        <>
            <div className={classes.reimbursementContainer}>
                <form className={classes.reimbursementForm}>
                    <h1 >Reimbursement Information: Manager</h1>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Information</th>
                                <th scope="col">Information</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr key={props.thisReimbursement.reimb_id}>
                                <th scope="row">Id</th>
                                <td>{props.thisReimbursement.reimb_id}</td>
                            </tr>
                            <tr>
                                <th scope="row">Amount</th>
                                <td>{props.thisReimbursement.amount}</td>
                            </tr>
                            <tr>    
                                <th scope="row">Submitted Time</th>
                                <td>{props.thisReimbursement.submitted}</td>
                            </tr>
                            <tr>
                                <th scope="row">Description</th>
                                <td>{props.thisReimbursement.description}</td>
                            </tr>
                            <tr>
                                <th scope="row">Author Id</th>
                                <td>{props.thisReimbursement.author}</td>
                            </tr>
                            <tr>
                                <th scope="row">Resolved Time</th>
                                <td>{props.thisReimbursement.resolved}</td>
                            </tr>
                            <tr>
                                <th scope="row">Resolver Id</th>
                                <td>{props.thisReimbursement.resolver_id}</td>
                            </tr>
                            <tr>
                                <th scope="row">Status</th>
                                <td>{props.thisReimbursement.reimb_status}</td>
                            </tr>
                            <tr>
                                <th scope="row">Type</th>
                                <td>{props.thisReimbursement.reimb_type}</td>
                            </tr>
                        </tbody>
                    </table>
                    {!props.thisReimbursement.resolved && props.authUser.roles === "Manager"
                    ?
                    <>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "white",
                        }}>
                    <Button component={Link} to="/home" onClick = {updateStatusApprovel} variant = "contained" color = "secondary" size = "medium">Approve</Button>
                    <div style={{ marginLeft: '5rem' }}> </div>
                    <Button component={Link} to="/home" onClick = {updateStatusDeny} variant = "contained" color = "secondary" size = "medium">Deny</Button>
                    </div>
                    </>:<></>
                    }
                </form>
            </div>
        </>
    );

}

export default StatusUpdateReimbursementComponent;