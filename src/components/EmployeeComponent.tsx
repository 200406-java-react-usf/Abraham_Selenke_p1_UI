import React, { useState, useEffect } from 'react';
import { makeStyles, InputLabel } from '@material-ui/core';
import { User } from '../models/user';
import { getAllReimbursements, deleteReimbursement, getReimbursementById } from '../remote/reimbursement-service';
import { Reimbursements } from '../models/reimbursement';
import { Link } from 'react-router-dom';

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


const EmployeeComponent = (props: IReimbursementProps) => {
    
    const classes = useStyles();

    const [reimbursementsState, setReimbursementsState] = useState([] as Reimbursements[]);
    const [reimbStatus, setReimbStatus] = useState('All');
    const [reimbType, setReimbType] = useState('All');

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
                if((reimbursement.status == reimbStatus || reimbStatus == 'All') && (reimbursement.type == reimbType || reimbType == 'All')){
                    reimbursements.push(
                        <tr key={reimbursement.reimbId}>              
                            <td>{reimbursement.reimbId}</td>
                            <td>{reimbursement.amount}</td>
                            <td>{reimbursement.description}</td>
                            <td>{reimbursement.authorId}</td>
                            <td>{reimbursement.submitted}</td>
                            <td>{reimbursement.status}</td>
                            <td>{reimbursement.type}</td>
                            <td><Link to={'/editReimbursement'} onClick={ () => {
                            props.editReimbursement({...reimbursement})}}>Edit</Link>
                        </td>
                    </tr>
                    )
                }
            }
            setReimbursementsState(reimbursements)
        }
        fetchData();
    }, [reimbStatus, reimbType, reimbursements]);

    return (
        !props.authUser || (props.authUser.roles !== 'Employee') ?
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
                    <th scope="col">Description</th>
                    <th scope="col">Author Id</th>
                    <th scope="col">Submitted Time</th>
                    <th scope="col">Status</th>
                    <th scope="col">Types</th>
                    <th scope="col">Edit</th>
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

export default EmployeeComponent;