import React, { useState } from 'react';
import { Container, Paper, TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await api.post('/auth/login/', {
        username,
        password
      });
      
      // Сохраняем токен в localStorage
      localStorage.setItem('token', response.data.token);
      
      // Обновляем заголовки axios для последующих запросов
      api.defaults.headers.common['Authorization'] = `Token ${response.data.token}`;
      
      navigate('/');
    } catch (error) {
      setError('Неверное имя пользователя или пароль');
      console.error('Ошибка при входе:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Вход в систему
        </Typography>
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Имя пользователя"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Пароль"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            sx={{ mt: 3 }}
          >
            Войти
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login; 