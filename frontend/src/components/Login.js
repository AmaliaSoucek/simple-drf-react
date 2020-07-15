import React, {useContext, useState} from 'react';
import UserServiceData from '../services/user.js';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { navigate } from "@reach/router"
import UserContext from '../userContext';


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const context = useContext(UserContext);

  const handleSubmit = function(event) {
    event.preventDefault();
    UserServiceData.login({
      'email': email,
      'password': password
    }).then(() => {
      context.setUser({'email': email});
      navigate('/');
    });
  };

  return (
    <Row className="justify-content-md-center">
      <Col xs lg="4">
        <Form className="justify-content-md-center" onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" name="password" onChange={(e) => setPassword(e.target.value)}/>
          </Form.Group>
          <Button variant="outline-primary" type="submit" className="mt-2">
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  )
}

export default Login;
