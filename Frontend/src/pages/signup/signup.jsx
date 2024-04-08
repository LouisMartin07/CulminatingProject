import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Sign up logic here...
    console.log("Register with:", email, password);
    // Handle registration response
  };

  return (
    <div className="signup-container">
      <Form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <Form.Group className="mb-3" controlId="signupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="signupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        {/* do I want any additional information? */}
        <Button variant="primary" type="submit">Sign Up</Button>
        <div className="mt-3">
          Already have an account? <Link to="/login">Log In</Link>
        </div>
      </Form>
    </div>
  );
};

export default SignUpPage;
