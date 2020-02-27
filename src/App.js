import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import GuestPage from './Pages/GuestPage/GuestPage'


function App() {
  return (
    <div className="App">
      <GuestPage/>
    </div>
  );
}

export default App;
