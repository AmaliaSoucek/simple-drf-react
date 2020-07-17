import React from 'react';
import Header from './Header';
import Container from 'react-bootstrap/Container';
import Home from './pages/Home';
import Login from './pages/Login';
import Rooms from './pages/Rooms';
import Reservations from './pages/Reservations';
import { Router } from "@reach/router";
import {UserContextProvider} from '../userContext';


function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <Header/>
        <Container className="p-5">
          <Router>
            <Home path="/"/>
            <Login path="login"/>
            <Rooms path="rooms"/>
            <Reservations path="reservations"/>
          </Router>
        </Container>
      </UserContextProvider>
    </div>
  );
}

export default App;
