import React, { useState, useEffect } from 'react';
import { makeStyles, InputLabel, Button } from '@material-ui/core';
import { getByAuthor, deleteReimbursement, getReimbursementById } from '../remote/reimbursement-service';
import { Link } from 'react-router-dom';
import { UserReimbursements } from '../models/author-reimb';
import { User } from '../models/user';

interface IReimbursementProps {
    authUser: User;
    userReimbursement: (reimbursement: UserReimbursements) => void;
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

    const [reimbursementsState, setReimbursementsState] = useState([] as UserReimbursements[]);

    let reimbursements: any[] = [];    

    useEffect(() => {
        let fetchData = async () => {
            
            const response = await getByAuthor(props.authUser.user_id);
            
            for(let reimbursement of response){
                reimbursements.push(
                    <tr key={reimbursement.reimb_id}>              
                        <td>{reimbursement.reimb_id}</td>
                        <td>{reimbursement.first_name}</td>
                        <td>{reimbursement.amount}</td>
                        <td>{reimbursement.description}</td>
                        <td>{reimbursement.reimb_type}</td>
                        <td>{reimbursement.reimb_status}</td>
                        <td><Button component={Link} to="/editReimbursement" onClick={ () => {
                            props.userReimbursement({...reimbursement})}} variant="contained" color="secondary" size="medium">Edit Reimbursement</Button>
                        </td>
                        <td><Button component={Link} to={`/reimbursement/${reimbursement.reimb_id}`} onClick={
                                async () => { props.userReimbursement(await getReimbursementById(reimbursement.reimb_id));}}
                                variant="contained" color="secondary" size="medium">Details</Button>
                        </td>
                </tr>
                )
            }
            setReimbursementsState(reimbursements)            
        }
        fetchData();
    }, [reimbursements]);

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
                    <th scope="col">First Name</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Description</th>
                    <th scope="col">Status</th>
                    <th scope="col">Types</th>
                    <th scope="col">Edit</th>
                    <th scope="col">More Information</th>
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