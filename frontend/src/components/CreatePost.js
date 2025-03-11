import React, { useState } from 'react';
import { Container, Paper, TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) {
      formData.append('image', image);
    }

    try {
      await axios.post('http://localhost:8000/api/posts/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
      navigate('/');
    } catch (error) {
      console.error('Ошибка при создании поста:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Создать новый пост
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Заголовок"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Содержание"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            margin="normal"
            required
            multiline
            rows={6}
          />
          <Box sx={{ mt: 2, mb: 2 }}>
            <input
              accept="image/*"
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              style={{ display: 'none' }}
              id="image-upload"
            />
            <label htmlFor="image-upload">
              <Button variant="outlined" component="span">
                Загрузить изображение
              </Button>
            </label>
            {image && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Выбрано: {image.name}
              </Typography>
            )}
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 2 }}
          >
            Опубликовать
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreatePost; 