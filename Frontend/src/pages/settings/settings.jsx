import React, { useState } from 'react';
import { Form, Button, Alert, Card, Container, Row, Col } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa'; // You need to install react-icons if not already installed

const Settings = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setMessage({ text: 'Profile updated successfully.', type: 'success' });
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setMessage({ text: 'Password changed successfully.', type: 'success' });
  };

  return (
    <Container className="my-5">
      <h2 className="mb-3">Settings</h2>
      {message.text && <Alert variant={message.type}>{message.text}</Alert>}
      <Row>
        <Col lg={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Update Profile</Card.Title>
              <Form onSubmit={handleUpdateProfile}>
                <Form.Group className="mb-3">
                  <Form.Label><FaUser className="me-2" />Username</Form.Label>
                  <Form.Control type="text" placeholder="Enter new username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label><FaEnvelope className="me-2" />Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter new email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit">Update Profile</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6}>
          <Card>
            <Card.Body>
              <Card.Title>Change Password</Card.Title>
              <Form onSubmit={handleChangePassword}>
                <Form.Group className="mb-3">
                  <Form.Label><FaLock className="me-2" />Current Password</Form.Label>
                  <Form.Control type="password" placeholder="Current Password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label><FaLock className="me-2" />New Password</Form.Label>
                  <Form.Control type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit">Change Password</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Settings;
