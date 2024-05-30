import React, { useState } from 'react';
import { login } from '../services/authService';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const Login: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
      onLogin();
    } catch (error) {
      setMessage('Login failed. Try again.');
    }
  };

  return (
    <Container>
      <h2 className="my-4">Login</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </Form.Group>
        <Button variant="primary" type="submit">Login</Button>
      </Form>
      {message && <Alert className="mt-3" variant="danger">{message}</Alert>}
    </Container>
  );
};

export default Login;
