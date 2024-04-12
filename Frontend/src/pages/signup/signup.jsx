import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { userRegistration } from '../../utils/account';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const SignUpPage = () => {
  const { setUser } = useOutletContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [display_name, setDisplay_name] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from causing a page reload
    const user = await userRegistration(email, password);
    if (user) {
      setUser(user); // If user registration is successful, update the user context
    } else {
      console.error("Registration failed");
    }
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <Form onSubmit={handleSubmit}>

        {/* Set email */}
        <Form.Group className="mb-3" controlId="signupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        {/* Set password */}
        <Form.Group className="mb-3" controlId="signupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        {/* Set displayname */}
        <Form.Group className="mb-3" controlId="signupDisplayName">
          <Form.Label>Display Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter display name"
            value={display_name}
            onChange={(e) => setDisplay_name(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">Sign Up</Button>
        <div className="mt-3">
          Already have an account? <Link to="/login">Log In</Link>
        </div>
      </Form>
    </div>
  );
};

export default SignUpPage;
