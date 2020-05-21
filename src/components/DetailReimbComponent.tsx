import React from 'react';
import { makeStyles } from '@material-ui/core';
import { User } from '../models/user';
import { updateReimbursement } from '../remote/reimbursement-service';
import { Reimbursements } from '../models/reimbursement';
import { UserReimbursements } from '../models/author-reimb';

interface IReimbursementProps {
    authUser: User;
    statusManagerReimbursement: Reimbursements;
    statusUserReimbursement: UserReimbursements;
}   

const useStyles = makeStyles({
    reimbursementContainer: {
      textAlign: 'center',
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
   console.log('hello');
   console.log(props.statusUserReimbursement);
   
   
    // let updateStatusApprovel = async () => {
    //     let updateManager = {...props.statusManagerReimbursement}
    //     let updateUser = {...props.statusUserReimbursement}
        
    //     updateManager.resolver_id = props.authUser.user_id;
    //     //@ts-ignore
    //     updateManager.resolved = Date.now();
    //     updateManager.reimb_status = 'Approved';

    //     let updatedManagerReimb = await updateReimbursement(
    //             updateManager.reimb_id, updateManager.amount,
    //             updateManager.description, updateManager.author,
    //             updateManager.reimb_status, updateManager.reimb_type);

    //     updateUser.resolver_id = props.authUser.user_id;
    //     //@ts-ignore
    //     updateUser.resolved = Date.now();
    //     updateManager.reimb_status = 'Approved';

    //     let updatedUserReimb = await updateReimbursement(
    //             updateUser.reimb_id, updateUser.amount,
    //             updateUser.description, updateManager.author,
    //             updateUser.reimb_status, updateUser.reimb_type);

    //     console.log(updatedManagerReimb);
    //     console.log(updatedUserReimb);        
    // }

    // let updateStatusDen = async () => {
    //     let updateManager = {...props.statusManagerReimbursement}
    //     let updateUser = {...props.statusUserReimbursement}
        
    //     updateManager.resolver_id = props.authUser.user_id;
    //     //@ts-ignore
    //     updateManager.resolved = Date.now();
    //     updateManager.reimb_status = 'Denied';

    //     let updatedManagerReimb = await updateReimbursement(
    //             updateManager.reimb_id, updateManager.amount,
    //             updateManager.description, updateManager.author,
    //             updateManager.reimb_status, updateManager.reimb_type);

    //     updateUser.resolver_id = props.authUser.user_id;
    //     //@ts-ignore
    //     updateUser.resolved = Date.now();
    //     updateManager.reimb_status = 'Denied';

    //     let updatedUserReimb = await updateReimbursement(
    //             updateUser.reimb_id, updateUser.amount,
    //             updateUser.description, updateManager.author,
    //             updateUser.reimb_status, updateUser.reimb_type);

    //     console.log(updatedManagerReimb);
    //     console.log(updatedUserReimb);         
    // }

    return (
        (props.authUser.roles !== 'Admin')
        ?
        <>
            <div className={classes.reimbursementContainer}>
                <form className={classes.reimbursementForm}>
                    <h1 >Reimbursement Information: Manager</h1>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="row">Id</th>
                                <th scope="row">Amount</th>
                                <th scope="row">Submitted Time</th>
                                <th scope="row">Description</th>
                                <th scope="row">Author Id</th>
                                <th scope="row">Resolved Time</th>
                                <th scope="row">Resolver Id</th>
                                <th scope="row">Status</th>
                                <th scope="row">Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* <tr key={updatedManagerReimb.reimb_id}>              
                                <td>{updatedManagerReimb.reimb_id}</td>
                                <td>{updatedManagerReimb.amount}</td>
                                <td>{updatedManagerReimb.description}</td>
                                <td>{updatedManagerReimb.reimb_status}</td>
                                <td>{updatedManagerReimb.reimb_type}</td>
                                
                            </tr> */}
                        </tbody>
                    </table>
                </form>
            </div>
        </>
        :
        <>
            <div className={classes.reimbursementContainer}>
                <form className={classes.reimbursementForm}>
                    <h1 >Reimbursement Information: Employee</h1>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Submitted Time</th>
                                <th scope="col">Resolved Time</th>
                                <th scope="col">Description</th>
                                <th scope="col">Author Id</th>
                                <th scope="col">Resolver Id</th>
                                <th scope="col">Status</th>
                                <th scope="col">Type</th>
                                <th scope="col">Update</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {reimbursementsState} */}
                        </tbody>
                    </table>
                </form>
            </div>
        </>
        //!props.authUser || (props.authUser.roles !== 'Admin') 
        //:
        // <>
        //     <div className={classes.reimbursementContainer}>
        //         <form className={classes.reimbursementForm}>
        //             <h1>Youre not authorized to view this page</h1>
        //         </form>
        //     </div>
        // </>
    );

}

export default StatusUpdateReimbursementComponent;