import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <Typography variant="h6" component={RouterLink} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
          Блог
        </Typography>
        <Box>
          {isAuthenticated ? (
            <>
              <Typography variant="body1" component="span" sx={{ mr: 2 }}>
                {user?.username}
              </Typography>
              <Button 
                color="inherit" 
                component={RouterLink} 
                to="/create-post"
                sx={{ mr: 2 }}
              >
                Создать пост
              </Button>
              <Button 
                color="inherit"
                onClick={logout}
              >
                Выйти
              </Button>
            </>
          ) : (
            <Button 
              color="inherit"
              component={RouterLink}
              to="/login"
            >
              Войти
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 