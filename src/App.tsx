import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import LoginComponent from './components/LoginComponent';
import AdminHomeComponent from './components/AdminHomeComponent';

import { User } from './models/user';
import { Reimbursements } from './models/reimbursement';
import NavbarComponent from './components/NavbarComponent';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import RegisterComponent from './components/RegistrationComponent';
import UserComponent from './components/UserComponent';
import UpdateComponent from './components/editUserComponent';
import ReimbursementComponent from './components/ReimbursementComponent';
import EmployeeComponent from './components/EmployeeComponent';
import UpdateReimbComponent from './components/editReimbursementComponent';
import AddUserComponent from './components/AddUserComponent';
import { UserReimbursements } from './models/author-reimb';
import AddReimbursementComponent from './components/AddReimbursementComponent';
import StatusUpdateReimbursementComponent from './components/DetailReimbComponent';



function App() {

  // @ts-ignore
  const [authUser, setAuthUser] = useState(null as User);
  // @ts-ignore
  const [newUser, setNewUser] = useState(new User(0, '', '', '', '', '', 'Employee'));
  // @ts-ignore
  const [editUser, setEditUser] = useState(null as User);
  // @ts-ignore
  const [userReimbursement, setUserReimbursement] = useState(null as UserReimbursements);
  // @ts-ignore
  const [editReimbursement, setEditReimbursement] = useState(null as Reimbursements);
  // @ts-ignore
  const [newReimbursement, setNewReimbursement] = useState(new Reimbursements(0, 0, Date, Date, '', 0, 0, '', ''));
  // @ts-ignore
  const [newUserReimbursement, setNewUserReimbursement] = useState(new UserReimbursements(0, '', 0, '', Date, Date, 0, '', ''));

  

  return (
    <>
      <Router>

        <AppBar color="primary" position="static">
          <Toolbar>
              <Typography variant="h5" color="inherit">
                <NavbarComponent authUser={authUser} setAuthUser={setAuthUser}/>
              </Typography>
          </Toolbar>
        </AppBar>

        <Switch>
          <Route path="/home" render={() => <AdminHomeComponent username={authUser?.username} /> } />
          <Route path="/new-user" render={() => <AddUserComponent authUser={authUser} /> } />
          <Route path="/new-reimbursement" render={() => <AddReimbursementComponent authUser={authUser} /> } />
          <Route path="/login" render={() => <LoginComponent authUser={authUser} setAuthUser={setAuthUser} /> } />
          <Route path ="/users" render = {() => <UserComponent authUser = {authUser} editUser = {setEditUser}/> } />
          <Route path="/register" render={() => <RegisterComponent newUser={newUser} setNewUser = {setNewUser} /> } />
          <Route path="/editUser" render={() => <UpdateComponent authUser={authUser} updateUser = {editUser} /> } />
          <Route path="/editReimbursement" render={() => <UpdateReimbComponent authUser={authUser} updateReimbursement = {userReimbursement} /> } />
          <Route path = "/fmana-reimbursement" render = {() => <ReimbursementComponent authUser = {authUser} editReimbursement = {setEditReimbursement}/> } />
          <Route path = "/user-reimbursement" render = {() => <EmployeeComponent authUser = {authUser} userReimbursement = {setUserReimbursement}/> } />
          <Route path = {`/reimbursement/${newReimbursement.reimb_id}`} render = {() => <StatusUpdateReimbursementComponent authUser = {authUser} statusManagerReimbursement = {newReimbursement} statusUserReimbursement = {newUserReimbursement}/> } />
        </Switch>
        
      </Router>
    </>
  );
}

export default App;