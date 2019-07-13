from rest_framework import serializers
from resultados.models import Acta, Cuenta, ErrorActa


class ActaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Acta
        fields = '__all__'
        depth = 1


class CuentaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cuenta
        fields = '__all__'


class ErrorActaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ErrorActa
        fields = '__all__'