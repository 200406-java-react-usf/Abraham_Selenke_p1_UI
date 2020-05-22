import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import LoginComponent from './components/LoginComponent';
import AdminHomeComponent from './components/AdminHomeComponent';

import { User } from './models/user';
import { Reimbursements } from './models/reimbursement';
import NavbarComponent from './components/NavbarComponent';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import ViewUserComponent from './components/UserComponent';
import EditUserComponent from './components/EditUserComponent';
import ViewReimbursementComponent from './components/ReimbursementComponent';
import ViewReimbEmployeeComponent from './components/EmployeeComponent';

import EditReimbComponent from './components/EditReimbursementComponent';
import AddUserComponent from './components/AddUserComponent';
import AddReimbursementComponent from './components/AddReimbursementComponent';
import StatusUpdateReimbursementComponent from './components/DetailReimbComponent';



function App() {

  // @ts-ignore
  const [authUser, setAuthUser] = useState(null as User);
  // @ts-ignore
  const [newUser, setNewUser] = useState(new User(0, '', '', '', '', '', 'Employee'));
  // @ts-ignore
  const [newThis, setThisUser] = useState(null as User);
  // @ts-ignore
  const [newReimbursement, setNewReimbursement] = useState(new Reimbursements(0, 0, Date, Date, '', 0, 0, '', ''));
  // @ts-ignore
  const [thisReimbursement, setThisReimbursement] = useState(new Reimbursements(0, 0, Date, Date, '', 0, 0, '', ''));

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

          <Route path="/new-user" render={() => <AddUserComponent authUser={authUser} setNewUser={setNewUser}/> } />
          <Route path="/editUser" render={() => <EditUserComponent authUser={authUser} newUser = {newUser} setNewUser = {setNewUser} /> } />
          <Route path ="/users" render = {() => <ViewUserComponent authUser = {authUser} setThisUser = {setThisUser}/> } />

          <Route path="/new-reimbursement" render={() => <AddReimbursementComponent authUser={authUser} setNewReimbursement={setNewReimbursement}/> } />
          <Route path="/editReimbursement" render={() => <EditReimbComponent authUser={authUser} newReimbursement = {newReimbursement} setNewReimbursement = {setNewReimbursement} /> } />
          <Route path = "/fmana-reimbursement" render = {() => <ViewReimbursementComponent authUser = {authUser} thisReimbursement = {thisReimbursement} setThisReimbursement = {setThisReimbursement} /> } />
          <Route path = "/user-reimbursement" render = {() => <ViewReimbEmployeeComponent authUser = {authUser} thisReimbursement = {thisReimbursement} setThisReimbursement = {setThisReimbursement} setNewReimbursement = {setNewReimbursement}/> } />

          <Route path = {`/reimbursement/${thisReimbursement.reimb_id}`} render = {() => <StatusUpdateReimbursementComponent authUser = {authUser} thisReimbursement = {thisReimbursement} setThisReimbursement = {setThisReimbursement} /> } />

          {/* <Route path="/register" render={() => <RegisterComponent newUser={newUser} setNewUser = {setNewUser} /> } /> */}

        </Switch>
        
      </Router>
    </>
  );
}

export default App;