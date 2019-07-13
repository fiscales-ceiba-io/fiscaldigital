from django.db import models


# Create your models here.
class Usuario(models.Model):
    nombre = models.CharField(max_length=150)
    apellido = models.CharField(max_length=150)
    telefono = models.CharField(max_length=50, unique=True)
    # confianza = models.IntegerField(default=5)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.telefono


class Token(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.PROTECT)
    token = models.CharField(max_length=6, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.token