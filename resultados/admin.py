from django.contrib import admin
from resultados.models import TipoActa, Acta, Cuenta, ErrorActa, HashResultadoActa


# Register your models here.
admin.site.register(TipoActa)
admin.site.register(Acta)
admin.site.register(Cuenta)
admin.site.register(ErrorActa)
admin.site.register(HashResultadoActa)