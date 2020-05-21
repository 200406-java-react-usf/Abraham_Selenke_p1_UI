import React from 'react';
import { Link } from 'react-router-dom';

import { 
    makeStyles, 
    List, 
    ListItem, 
    Typography, 
    ListItemText 
} from '@material-ui/core';

import { User } from '../models/user';
import {logout} from '../remote/auth-service';

interface INavbarProps {
    authUser: User;
    setAuthUser: (user: User) => void
}

const useStyles = makeStyles({
    link: {
        textDecoration: "none",
        color: "white"
    }
});

const NavbarComponent = (props: INavbarProps) => {

    let logoutUser = async () => {
        await logout();
        //@ts-ignore
        props.setAuthUser(null as User);
    }

    const classes = useStyles();

    return (
        <>
            <List component="nav">
                <ListItem component="div">
                    <Typography align="center" color="inherit" variant="h5">Expense Reimbursement System</Typography>
                    {
                        (props.authUser && props.authUser.roles === 'Admin')
                        ?
                        <ListItemText inset>
                            <Typography color="inherit" variant="h6" >
                                <Link to="/home" className={classes.link}>Home</Link>
                                <span>  </span>
                                <span>  </span>
                                <Link to="/users" className={classes.link}>Users</Link>
                                <span>  </span>
                                <span>  </span>
                                <a className={classes.link} onClick={logoutUser}>Logout</a>
                            </Typography>
                        </ListItemText>
                        :
                        (props.authUser && props.authUser.roles === 'Manager')
                        ?
                        <ListItemText inset>
                            <Typography color="inherit" variant="h6">
                                <Link to="/home" className={classes.link}>Home</Link>
                                <span>  </span>
                                <span>  </span>
                                <Link to="/fmana-reimbursement" className={classes.link}>Reimbursements</Link>
                                <span>  </span>
                                <span>  </span>
                                <a className={classes.link} onClick={logoutUser}>Logout</a>
                            </Typography>
                        </ListItemText>
                        :
                        (props.authUser && props.authUser.roles === 'Employee')
                        ?
                        <ListItemText inset>
                            <Typography color="inherit" variant="h6">
                                <Link to="/home" className={classes.link}>Home</Link>
                                <span>  </span>
                                <span>  </span>
                                <Link to="/user-reimbursement" className={classes.link}>Reimbursements</Link>
                                <span>  </span>
                                <span>  </span>
                                <a className={classes.link} onClick={logoutUser}>Logout</a>
                            </Typography>
                        </ListItemText>
                        :
                        <ListItemText inset>
                            <Typography color="inherit" variant="h6">
                                <Link to="/home" className={classes.link}>Home</Link>
                                <span>  </span>
                                <span>  </span>
                                <Link to="/login" className={classes.link}>Login</Link>
                                <span>  </span>
                                <span>  </span>
                                <Link to="/register" className={classes.link}>Register</Link>
                            </Typography>
                        </ListItemText>
                    }
                </ListItem>
            </List>
        </>
    );

}

export default NavbarComponent;