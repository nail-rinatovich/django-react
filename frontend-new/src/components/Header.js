import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <AppBar position="static" sx={{ marginBottom: 4 }}>
      <Container>
        <Toolbar>
          <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
            Мой Блог
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Главная
          </Button>
          <Button color="inherit" component={Link} to="/create">
            Создать пост
          </Button>
          <Button color="inherit" href="/admin/" target="_blank">
            Админ
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header; 