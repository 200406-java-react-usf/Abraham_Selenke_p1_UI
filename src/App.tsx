import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import LoginComponent from './components/LoginComponent';
import AdminHomeComponent from './components/AdminHomeComponent';

import { User } from './models/user';
import NavbarComponent from './components/NavbarComponent';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import RegisterComponent from './components/RegistrationComponent';
import UserComponent from './components/UserComponent';
import UpdateComponent from './components/editUserComponent';
import ReimbursementComponent from './components/ReimbursementComponent';
import EmployeeComponent from './components/EmployeeComponent';
import UpdateReimbComponent from './components/editReimbursementComponent';



function App() {

  // @ts-ignore
  const [authUser, setAuthUser] = useState(null as User);
  // @ts-ignore
  const [newUser, setNewUser] = useState(new User(0, '', '', '', '', '', 'Employee'));
  // @ts-ignore
  const [editUser, setEditUser] = useState(null as User);
  // @ts-ignore
  //const [newReimbursement, setNewReimbursement] = useState(new Reimbursement(0, '', '', '', '', '', 'Employee'));
  // @ts-ignore
  const [editReimbursement, setEditReimbursement] = useState(null as Reimbursement);

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
          <Route path="/login" render={() => <LoginComponent authUser={authUser} setAuthUser={setAuthUser} /> } />
          <Route path = "/users" render = {() => <UserComponent authUser = {authUser} editUser = {setEditUser}/> } />
          <Route path="/register" render={() => <RegisterComponent newUser={newUser} setNewUser = {setNewUser} /> } />
          <Route path="/editUser" render={() => <UpdateComponent authUser={authUser} updateUser = {editUser} /> } />
          <Route path="/editReimbursement" render={() => <UpdateReimbComponent authUser={authUser} updateReimbursement = {editReimbursement} /> } />
          <Route path = "/fmana-reimbursement" render = {() => <ReimbursementComponent authUser = {authUser} editReimbursement = {setEditReimbursement}/> } />
          <Route path = "/user-reimbursement" render = {() => <EmployeeComponent authUser = {authUser} editReimbursement = {setEditReimbursement}/> } />
        </Switch>
        
      </Router>
    </>
  );
}

export default App;