import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
//import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@material-ui/core';
import { User } from '../models/user';
import { getAllUsers } from '../remote/user-service';
import { Link } from 'react-router-dom';

interface IUserProps {
    authUser: User;
    editUser: (user: User) => void;
}   

const useStyles = makeStyles({
    userContainer: {
      width: '100%',
      margin: '100',
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
      transform: 'scale(1)',
    },
    userForm: {
        fontSize: "24pt",
        border: "100",
        padding: "15px"
    },
    table: {
        minWidth: 650,
    },
});


const UserComponent = (props: IUserProps) => {
    
    const classes = useStyles();

    const [usersState, setUsersState] = useState([] as User[]);
    let users: any[] = [];
    useEffect(() => {
        let fetchData = async () => {
            const response = await getAllUsers();            
            for(let user of response){
                users.push(
                    <tr key = {user.id}>
                        <th scope="row">{user.id}</th>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.roles}</td>
                        <td><Link to={'/edit'} onClick={ () => {
                            props.editUser({...user})}}>edit</Link>
                        </td>
                    </tr>
                )
            }
            setUsersState(users);
        }
        fetchData();
    },[]);


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
            {/* <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Id </TableCell>
                        <TableCell align="right">First Name</TableCell>
                        <TableCell align="right">Last Name</TableCell>
                        <TableCell align="right">Username</TableCell>
                        <TableCell align="right">User Email</TableCell>
                        <TableCell align="right">User Role</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                        <TableCell component="th" scope="row">
                            {user.id}
                        </TableCell>
                        <TableCell align="right">{user.firstName}</TableCell>
                        <TableCell align="right">{user.lastName}</TableCell>
                        <TableCell align="right">{user.username}</TableCell>
                        <TableCell align="right">{user.email}</TableCell>
                        <TableCell align="right">{user.roles}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer> */}
            <div className={classes.userContainer}>
                <form className={classes.userForm}>
                    <h1 >Users Information</h1>
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">First Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">Username</th>
                                <th scope="col">Email</th>
                                <th scope="col">Role</th>
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

export default UserComponent;