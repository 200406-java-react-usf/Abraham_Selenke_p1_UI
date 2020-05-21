import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import { User } from '../models/user';
import { getAllReimbursements, deleteReimbursement, getReimbursementById } from '../remote/reimbursement-service';
import { Link } from 'react-router-dom';
import { Reimbursements } from '../models/reimbursement';

interface IReimbursementProps {
    authUser: User;
    editReimbursement: (reimbursement: Reimbursements) => void;
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


const ReimbursementComponent = (props: IReimbursementProps) => {
    
    const classes = useStyles();

    const [reimbursementsState, setReimbursementsState] = useState([] as Reimbursements[]);
    const [reimbStatus, setReimbStatus] = useState(0);
    const [reimbType, setReimbType] = useState(0);

    let updateStatus = (e: any) => {
        setReimbStatus(e.currentTarget.value);
    }

    let updateType = (e: any) => {
        setReimbType(e.currentTarget.value);
    }

    let reimbursements: any[] = [];

    useEffect(() => {
        let fetchData = async () => {
            const response = await getAllReimbursements();
            for(let reimbursement of response){
                if((reimbursement.status == reimbStatus || reimbStatus == 0) && (reimbursement.type == reimbType || reimbType == 0)){
                    reimbursements.push(
                        <tr>
                            <td>{reimbursement.amount}</td>
                            <td>{reimbursement.description}</td>
                            <td>{reimbursement.authorId}</td>
                            <td>{reimbursement.resolverId}</td>
                            {
                                reimbursement.status === 'Pending' ?
                                    <td>Pending</td>
                                :
                                reimbursement.status === 'Denied' ?
                                    <td>Denied</td>
                                :
                                reimbursement.status === 'Approved' ?
                                    <td>Approved</td>
                                :
                                    <td>Unknown</td>
                            }
                            {
                                reimbursement.type === 'Lodging' ?
                                    <td>Lodging</td>
                                :
                                reimbursement.type === 'Travel' ?
                                    <td>Travel</td>
                                :
                                reimbursement.type === 'Food' ?
                                    <td>Food</td>
                                :
                                    <td>Other</td>
                            }
                            <td><Link to = {`/reimbursmentdetails-${reimbursement.reimb_id}`} onClick = {
                                async () => {
                                    const response = await getReimbursementById(reimbursement.reimb_id);
                                    props.editReimbursement(response);
                                }
                            }>Details</Link></td>
                        </tr>
                    )
                }
            }
            setReimbursementsState(reimbursements)
        }
        fetchData();
    }, [reimbStatus, reimbType]);

    // useEffect(() => {
    //     let fetchData = async () => {
    //         const response = await getAllReimbursements();            
    //         for(let reimbursement of response){
    //             reimbursements.push(
    //                 <tr key = {reimbursement.reimbId}>
    //                     <th scope="row">{reimbursement.reimbId}</th>
    //                     <td>{reimbursement.amount}</td>
    //                     <td>{reimbursement.submitted}</td>
    //                     <td>{reimbursement.resolved}</td>
    //                     <td>{reimbursement.description}</td>
    //                     <td>{reimbursement.authorId}</td>
    //                     <td>{reimbursement.resolver}</td>
    //                     <td>{reimbursement.status}</td>
    //                         <select value = {reimbStatus} onChange = {updateStatus}>
    //                             <option value = {0}>All</option>
    //                             <option value = {1}>Pending</option>
    //                             <option value = {2}>Denied</option>
    //                             <option value = {3}>Approved</option>
    //                         </select>
    //                     <td>{reimbursement.type}</td>
    //                         <select value = {reimbType} onChange = {updateType}>
    //                             <option value = {0}>All</option>
    //                             <option value = {1}>Lodging</option>
    //                             <option value = {2}>Travel</option>
    //                             <option value = {3}>Food</option>
    //                             <option value = {4}>Other</option>
    //                         </select>
    //                     <td><Link to={'/editReimbursement'} onClick={ () => {
    //                         props.editReimbursement({...reimbursement})}}>edit</Link>
    //                     </td>
    //                     <td><Link to = '/reimbursements' onClick = {async () => {
    //                         await deleteReimbursement(reimbursement.reimbId);
    //                     }}>Delete</Link></td>
    //                 </tr>
    //             )
    //         }
    //         setReimbursementsState(reimbursements);
    //     }
    //     fetchData();
    // },[]);


    return (
        !props.authUser || (props.authUser.roles !== 'Manager') ?
        <>
            <div className={classes.reimbursementContainer}>
                <form className={classes.reimbursementForm}>
                    <h1>Youre not authorized to view this page</h1>
                </form>
            </div>
        </>
        :
        <>
            <div className={classes.reimbursementContainer}>
                <form className={classes.reimbursementForm}>
                    <h1 >Reimbursement Information</h1>
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
                            {reimbursementsState}
                        </tbody>
                    </table>
                </form>
            </div>
        </>
    );

}

export default ReimbursementComponent;