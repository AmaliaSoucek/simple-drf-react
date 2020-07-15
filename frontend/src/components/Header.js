import React, {useContext} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import { Link, navigate } from "@reach/router";
import UserContext from '../userContext';


function Profile() {
  const context = useContext(UserContext);

  console.log(context.user);
  if (!context.user)
    return <Link to="login" className="nav-link">Login</Link>;

  const logout = function () {
    localStorage.setItem('token', '');
    context.setUser(null);
    navigate('/');
  };

  return (
      <NavDropdown title={ context.user.email } id="basic-nav-dropdown">
        <Link to="profile" className="dropdown-item">Profile</Link>
        <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
      </NavDropdown>
  )
}


function Header() {
  return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Link to="/" className="navbar-brand">Hotel</Link>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Link to="room-list" className="nav-link">Rooms</Link>
          <Link to="my_bookings" className="nav-link">My Bookings</Link>
        </Nav>
        <Nav className="ml-auto">
          <Profile/>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header;