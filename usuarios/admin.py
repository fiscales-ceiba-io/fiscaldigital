from django.contrib import admin
from usuarios.models import Usuario, Token


# Register your models here.
admin.site.register(Usuario)
admin.site.register(Token)
