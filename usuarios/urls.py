from django.urls import path
from usuarios import views


urlpatterns = [
    path('crear/', views.CreateUsuario.as_view(), name='create_usuario'),
    path('token/', views.UsuarioToken.as_view(), name='crear_token_usuario'),
    path('validar/', views.ValidarUsuario.as_view(), name='validar_usuario'),
]
