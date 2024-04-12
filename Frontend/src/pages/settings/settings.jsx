import React, { useState } from 'react';
import { Form, Button, Alert} from 'react-bootstrap';

const Settings = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState({text: '', type: ''});

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    // Implement the logic to update the username or email here
    // For demonstration, let's assume the update is successful
    setMessage({text: 'Profile updated successfully.', type: 'success'});
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    // Implement the logic to change the password here
    // For demonstration, let's assume the password change is successful
    setMessage({text: 'Password changed successfully.', type: 'success'});
  };

  return (
    <div className="settings-container">
      <h2>Settings</h2>
      {message.text && <Alert variant={message.type}>{message.text}</Alert>}
      <Form onSubmit={handleUpdateProfile} className="mb-3">
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter new username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter new email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit">Update Profile</Button>
      </Form>

      <Form onSubmit={handleChangePassword}>
        <Form.Group className="mb-3">
          <Form.Label>Current Password</Form.Label>
          <Form.Control type="password" placeholder="Current Password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>New Password</Form.Label>
          <Form.Control type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit">Change Password</Button>
      </Form>
    </div>
  );
};

export default Settings;
