import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {axiosWithAuth} from './utils/axiosWithAuth'
import './App.css';
import Navbar from './components/Navbar.js'
import Login from './components/Login.js'
import UserList from './components/UserList.js'

function App() {
  


  return (
    <Router>
      <div className="App">
        <Navbar />
      </div>

      <Route path="/login" exact component={Login} />
      <Route path="/" exact render={() => <UserList />} />
    </Router>
  );
}

export default App;
