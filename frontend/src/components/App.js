import React from 'react';
import Header from './Header';
import Container from 'react-bootstrap/Container';
import Home from './Home';
import RoomList from './RoomList';
import Login from './Login';
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
            <RoomList path="room-list"/>
            <Login path="login"/>
          </Router>
        </Container>
      </UserContextProvider>
    </div>
  );
}

export default App;
