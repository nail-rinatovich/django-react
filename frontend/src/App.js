import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import { CssBaseline } from '@mui/material';
import Header from './components/Header';
import PostList from './components/PostList';
import CreatePost from './components/CreatePost';
import PostDetail from './components/PostDetail';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/post/:id" element={<PostDetail />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
