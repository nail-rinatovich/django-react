import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, Button, Box, CardMedia } from '@mui/material';
import moment from 'moment';
import 'moment/locale/ru';
import axios from 'axios';

const PostDetail = () => {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/posts/${id}/`);
        setPost(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке поста:', error);
        navigate('/');
      }
    };

    fetchPost();
  }, [id, navigate]);

  if (!post) {
    return (
      <Container>
        <Typography>Загрузка...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {post.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Автор: {post.author.username} | Опубликовано: {moment(post.created_at).format('DD.MM.YYYY HH:mm')}
        </Typography>
        {post.image && (
          <Box sx={{ my: 2 }}>
            <CardMedia
              component="img"
              image={post.image}
              alt={post.title}
              sx={{ maxHeight: 400, objectFit: 'cover', borderRadius: 1 }}
            />
          </Box>
        )}
        <Typography variant="body1" sx={{ mt: 2, whiteSpace: 'pre-wrap' }}>
          {post.content}
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button variant="outlined" onClick={() => navigate('/')}>
            Назад к списку
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default PostDetail; 