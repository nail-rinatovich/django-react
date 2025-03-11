from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import Post
from .serializers import PostSerializer
from django.views.generic import ListView

# Create your views here.

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.AllowAny]  # Временно разрешаем всем
    
    def perform_create(self, serializer):
        # Временно устанавливаем первого пользователя как автора
        from django.contrib.auth.models import User
        default_author = User.objects.first()
        serializer.save(author=default_author)

class HomeView(ListView):
    model = Post
    template_name = 'blog/home.html'
    context_object_name = 'posts'
    ordering = ['-created_at']
