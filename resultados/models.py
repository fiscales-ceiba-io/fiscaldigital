from django.db import models
from usuarios.models import Usuario


# Create your models here.
class TipoActa(models.Model):
    TIPO_CHOICES = (
        (1, 'Presidencial'),
        (2, 'Listado Nacional'),
        (3, 'Guatemala'),
        (4, 'Metropolitano'),
        (5, 'El Progreso'),
        (6, 'Sacatepequez'),
        (7, 'Chimaltenango'),
        (8, 'Escuintla'),
        (9, 'Santa Rosa'),
        (10, 'Solola'),
        (11, 'Totonicapan'),
        (12, 'Quetzaltenango'),
        (13, 'Suchitepequez'),
        (14, 'Retahuleu'),
        (15, 'San Marcos'),
        (16, 'Huehuetenango'),
        (17, 'El Quiche'),
        (18, 'Baja Verapaz'),
        (19, 'Alta Verapaz'),
        (20, 'El Peten'),
        (21, 'Izabal'),
        (22, 'Zacapa'),
        (23, 'Chiquimula'),
        (24, 'Jalapa'),
        (25, 'Jutiapa'),
        (26, 'Listado Municipal'),
        (27, 'Parlamento Centroamericano'),
    )
    tipo = models.IntegerField(choices=TIPO_CHOICES)
    mapa = models.TextField()

    def __str__(self):
        return str(self.tipo)


class Acta(models.Model):
    PRIORIDAD_CHOICES = (
        (-1, 'Inactiva'),
        (1, '1'),
        (2, '2'),
        (3, '3'),
        (4, '4'),
        (5, '5'),
        (5, '6'),
    )
    tipo = models.ForeignKey(TipoActa, on_delete=models.PROTECT)
    imagen = models.CharField(max_length=300)
    prioridad = models.IntegerField(default=1, choices=PRIORIDAD_CHOICES)
    sha1 = models.CharField(max_length=150)

    def __str__(self):
        return str(self.pk)


class Cuenta(models.Model):
    CAMPO_CHOICES = (
        (-6, 'VOTOS IMPUGNADOS'),
        (-5, 'VOTOS INVÁLIDOS'),
        (-4, 'TOTAL VOTOS VÁLIDAMENTE EMITIDOS'),
        (-3, 'VOTOS EN BLANCO'),
        (-2, 'VOTOS NULOS'),
        (-1, 'TOTAL VOTOS VÁLIDOS'),
        (0, 'TOTAL PAPELETAS'),
        (1, 'PAN'),
        (2, 'VALOR'),
        (3, 'TODOS'),
        (4, 'PODEMOS'),
        (5, 'URNG MAIZ'),
        (6, 'UNE'),
        (7, 'UNIONISTA'),
        (8, 'BIEN'),
        (9, 'UCN'),
        (10, 'EG'),
        (11, 'VIVA'),
        (12, 'FCN - NACION'),
        (13, 'CONVERGENCIA'),
        (14, 'CREO'),
        (15, 'VICTORIA'),
        (16, 'WINAQ'),
        (17, 'FUERZA'),
        (18, 'UNNIDOS'),
        (19, 'PPT'),
        (21, 'VAMOS'),
        (22, 'AVANZA'),
        (23, 'PHG'),
        (24, 'MLP'),
        (25, 'PC'),
        (26, 'SEMILLA'),
        (27, 'LIBRE'),
        (168, 'PAN - PODEMOS'),
    )

    usuario = models.ForeignKey(Usuario, on_delete=models.PROTECT)
    acta = models.ForeignKey(Acta, on_delete=models.PROTECT)
    campo = models.IntegerField(choices=CAMPO_CHOICES)
    valor = models.IntegerField(null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['usuario', 'acta', 'campo']

    def __str__(self):
        return str(self.acta.pk) + ' - ' + str(self.campo) + ': ' + str(self.valor)


class ErrorActa(models.Model):

    acta = models.ForeignKey(Acta, on_delete=models.PROTECT)
    usuario = models.ForeignKey(Usuario, on_delete=models.PROTECT)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['usuario', 'acta']

    def __str__(self):
        return str(self.acta.pk) + ' - ' + str(self.error)


class HashResultadoActa(models.Model):
    acta = models.ForeignKey(Acta, on_delete=models.PROTECT)
    usuario = models.ForeignKey(Usuario, on_delete=models.PROTECT)
    sha1 = models.CharField(max_length=250)

    def __str__(self):
        return self.sha1