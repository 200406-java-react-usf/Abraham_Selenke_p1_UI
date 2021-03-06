import React, { useState, useEffect } from 'react';
import { makeStyles, Button } from '@material-ui/core';
import { User } from '../models/user';
import { getAllUsers, deleteUser } from '../remote/user-service';
import { Link } from 'react-router-dom';

interface IUserProps {
    authUser: User,
    setThisUser: (user: User) => void
}   

const useStyles = makeStyles({
    userContainer: {
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
    },
    userForm: {
        fontSize: "24pt",
        padding: "25px"
    },
});


const ViewUserComponent = (props: IUserProps) => {
    
    const classes = useStyles();

    const [usersState, setUsersState] = useState([] as User[]);
    let users: any[] = [];
    useEffect(() => {
        let fetchData = async () => {
            const response = await getAllUsers();            
            for(let user of response){
                users.push(
                    <tr key = {user.user_id}>
                        <th scope="row">{user.user_id}</th>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.roles}</td>
                        <td><Button component={Link} to="/editUser" onClick={ () => {
                            props.setThisUser({...user})}} variant="contained" color="secondary" size="medium">Edit User</Button>
                        </td>
                        <td><Button component={Link} to="/users" onClick={async () => {
                            await deleteUser(user.user_id)}} variant="contained" color="secondary" size="medium">Delete User</Button>
                        </td>
                    </tr>
                )
            }
            setUsersState(users);
        }
        fetchData();
    },[users]);


    return (
        !props.authUser || (props.authUser.roles !== 'Admin') ?
        <>
            <div className={classes.userContainer}>
                <form className={classes.userForm}>
                    <h1>Youre not authorized to view this page</h1>
                </form>
            </div>
        </>
        :
        <>
            <div className={classes.userContainer}>
                <form className={classes.userForm}>
                    <h1 >Users Information</h1>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">First Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">Username</th>
                                <th scope="col">Email</th>
                                <th scope="col">Role</th>
                                <th scope="col">Update</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usersState}
                        </tbody>
                    </table>
                </form>
            </div>
        </>
    );

}

export default ViewUserComponent;