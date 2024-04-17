import React, { useState } from 'react';
import { useOutletContext,useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { userLogIn } from '../../utils/account'; 
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const LogInPage = () => {
  const { setUser } = useOutletContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await userLogIn(email, password);
    if (user) {
      setUser(user);
      navigate('/dashboard');
    } else {
      console.error("Login failed");
    }
  };

  return (
    <div className="login-container">
      <h1>Log In</h1>
      <Form onSubmit={handleSubmit}>
        {/* Existing form fields for email and password */}
        <Form.Group className="mb-3" controlId="loginEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="loginPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">Log In</Button>

        <div className="mt-3">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </div>
      </Form>
    </div>
  );
};

export default LogInPage;