import React, { useState } from 'react';
import { signup } from '../services/authService';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const Signup: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup(username, password);
      setMessage('Signup successful. Please login.');
    } catch (error) {
      setMessage('Signup failed. Try again.');
    }
  };

  return (
    <Container>
      <h2 className="my-4">Signup</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </Form.Group>
        <Button variant="primary" type="submit">Signup</Button>
      </Form>
      {message && <Alert className="mt-3" variant={message.includes('successful') ? 'success' : 'danger'}>{message}</Alert>}
    </Container>
  );
};

export default Signup;
