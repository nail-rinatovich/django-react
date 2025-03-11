import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Header';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import CreatePost from './components/CreatePost';
import Login from './components/Login';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route
            path="/create-post"
            element={
              <PrivateRoute>
                <CreatePost />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App; 