from rest_framework import generics, response, status, views
from rest_framework.response import Response
from twilio.base.exceptions import TwilioException
from twilio.rest import Client
from usuarios.models import Token, Usuario
from usuarios.serializers import UsuarioSerializer

import os
import random

import jwt


# Create your views here.
class CreateUsuario(generics.CreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

    def post(self, request, *args, **kwargs):
        cantidad_usuarios = Usuario.objects.all().count()
        return self.create(request, *args, **kwargs) if cantidad_usuarios < 25000 else response.Response({'mensaje': 'Cantidad permitida de usuarios excedida.'}, status=status.HTTP_503_SERVICE_UNAVAILABLE)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        self.generar_token(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def generar_token(self, data):
        # Variables
        twilio_account = os.environ.get('TWILIO_ACCOUNT')
        twilio_token = os.environ.get('TWILIO_TOKEN')

        # Evitar que hayan varias tokens por usuario.
        usuario = Usuario.objects.get(pk=data['id'])
        tokens_pasadas = Token.objects.filter(usuario=usuario)
        for token_pasada in tokens_pasadas:
            token_pasada.delete()

        # Generar nueva token.
        token = random.randint(100000, 999999)
        nueva_token = Token(usuario=usuario, token=token)
        nueva_token.save()

        try:
            client = Client(twilio_account, twilio_token)
            mensaje = 'El token generado es ' + str(token)
            message = client.messages.create(to=usuario.telefono, from_="TWILIO NUMBER", body=mensaje)

        except TwilioException:
            return response.Response({'error': 'No se mando SMS.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UsuarioToken(views.APIView):
    def post(self, request):
        # Variables
        twilio_account = os.environ.get('TWILIO_ACCOUNT')
        twilio_token = os.environ.get('TWILIO_TOKEN')

        # Buscar usuario
        try:
            usuario = Usuario.objects.get(telefono=self.request.data['telefono'])

        except KeyError:
            return response.Response({'error': 'Datos parciales.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Usuario.DoesNotExist:
            return response.Response({'error': 'Usuario no existe.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # Evitar que hayan varias tokens por usuario.
        tokens_pasadas = Token.objects.filter(usuario=usuario)
        for token_pasada in tokens_pasadas:
            token_pasada.delete()

        # Generar nueva token.
        token = random.randint(100000, 999999)
        nueva_token = Token(usuario=usuario, token=token)
        nueva_token.save()

        try:
            client = Client(twilio_account, twilio_token)
            mensaje = 'El token generado es ' + str(token)
            message = client.messages.create(to=usuario.telefono, from_="TWILIO NUMBER", body=mensaje)
            return response.Response({'mensaje': 'Token generado.'}, status=status.HTTP_200_OK)

        except TwilioException:
            return response.Response({'error': 'No se mando SMS.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ValidarUsuario(views.APIView):
    def post(self, request):
        # Variables
        jwt_secret_key = os.environ.get('JWT_SECRET_KEY')

        # Buscar usuario.
        try:
            # Verificar que el token exista y este relacionada al usuario intentando ingresar.
            usuario = Usuario.objects.get(telefono=self.request.data['telefono'])
            token = Token.objects.get(usuario=usuario, token=self.request.data['token'])
            token.delete()

        except jwt.exceptions.DecodeError:
            return response.Response({'error': 'JWT pirata.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Token.DoesNotExist:
            return response.Response({'error': 'Token no existe.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except KeyError:
            return response.Response({'error': 'Faltan credenciales.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Usuario.DoesNotExist:
            return response.Response({'error': 'Usuario no existe.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except TypeError:
            return response.Response({'error': 'Error consiguiendo llave JWT.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        serializer = UsuarioSerializer(usuario, data=request.data, partial=True)
        web_token = jwt.encode({"usuario": str(usuario.id)}, jwt_secret_key)
        if serializer.is_valid():
            response_data = serializer.data
            return response.Response(response_data, headers={"token": str(web_token.decode('utf-8'))}, status=status.HTTP_202_ACCEPTED)
        else:
            return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
