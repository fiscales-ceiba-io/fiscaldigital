from django.db.models import Count
from rest_framework import generics, views, status, response
from resultados.models import Acta, Cuenta, ErrorActa, HashResultadoActa
from usuarios.models import Usuario
from resultados.serielizers import ActaSerializer, CuentaSerializer, ErrorActaSerializer

import os
import jwt
import random
import hashlib
import json
from math import floor


# Create your views here.
class CrearCuentas(views.APIView):
    def create_hash(self):
        # self.request.data._mutable = True
        usuario = Usuario.objects.get(pk=self.request.data[0]['usuario'])
        acta = Acta.objects.get(pk=self.request.data[0]['acta'])

        for element in self.request.data:
            del element['usuario']

        result_data = json.dumps(self.request.data).encode('utf-8')
        sha1 = hashlib.sha1(result_data).hexdigest()
        nuevo_hash_resultado_acta = HashResultadoActa(acta=acta, usuario=usuario, sha1=sha1)
        nuevo_hash_resultado_acta.save()
        coincidencias = HashResultadoActa.objects.filter(sha1=sha1).count()

        if coincidencias >= 5:
            acta.prioridad = 0
            acta.save()

        return status.HTTP_201_CREATED

    def post(self, request):

        # Variabes
        success_data = []
        error_data = []
        null_flag = False
        jwt_secret_key = os.environ.get('JWT_SECRET_KEY')

        # Verificar que el token este asociada a un usuario registrado.
        try:
            user_token = request.META['HTTP_AUTHORIZATION']
            pk_usuario = jwt.decode(user_token, jwt_secret_key)['usuario']
            Usuario.objects.get(pk=pk_usuario)

        except jwt.exceptions.DecodeError:
            return response.Response({'error': 'JWT pirata.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except KeyError:
            return response.Response({'error': 'Falta JWT.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Usuario.DoesNotExist:
            return response.Response({'error': 'Usuario no existe.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except TypeError:
            return response.Response({'error': 'Error consiguiendo llave JWT.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        for cuenta in request.data:
            serializer = CuentaSerializer(data=cuenta)
            if serializer.is_valid():
                serializer.save()
                success_data.append(serializer.data)
                if serializer.data['valor'] is None:
                    null_flag = True
            else:
                error_data.append({'data': serializer.data, 'errors': serializer.errors})

        # Preparar y enviar respuesta.
        response_data = {'success_data': success_data, 'error_data': error_data}

        if len(error_data) > 0:
            request_status = status.HTTP_500_INTERNAL_SERVER_ERROR
        elif null_flag:
            request_status = status.HTTP_201_CREATED
        else:
            request_status = self.create_hash()

        return response.Response(response_data, status=request_status)


class ServirActa(views.APIView):
    def get(self, request):
        # Variables
        prioridad_acta = 1
        total_actas_activas = 0
        jwt_secret_key = os.environ.get('JWT_SECRET_KEY')

        # Verificar que el token este asociada a un usuario registrado.
        try:
            user_token = request.META['HTTP_AUTHORIZATION']
            pk_usuario = jwt.decode(user_token, jwt_secret_key)['usuario']
            Usuario.objects.get(pk=pk_usuario)

        except jwt.exceptions.DecodeError:
            return response.Response({'error': 'JWT pirata.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except KeyError:
            return response.Response({'error': 'Falta JWT.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Usuario.DoesNotExist:
            return response.Response({'error': 'Usuario no existe.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except TypeError:
            return response.Response({'error': 'Error consiguiendo llave JWT.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        while prioridad_acta <= 6 and total_actas_activas == 0:
            actas = Acta.objects.filter(prioridad=prioridad_acta)
            total_actas_activas = actas.count()

            # Seleccionar actas de baja prioridad si ya no hay activas.
            if total_actas_activas == 0:
                prioridad_acta += 1

        # Seleccionar acta activa aleatoriamente.
        try:
            numero_aleatorio = random.randint(0, total_actas_activas - 1)
            acta = actas[numero_aleatorio]
        except ValueError:
            return response.Response({'error': 'Ya no hay actas para validar!.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        serializer = ActaSerializer(acta, data=request.data, partial=True)
        return response.Response(serializer.data, status=status.HTTP_200_OK) if serializer.is_valid() else response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CrearErrorActa(generics.CreateAPIView):
    queryset = ErrorActa.objects.all()
    serializer_class = ErrorActaSerializer

    def post(self, request, *args, **kwargs):
        # Variables
        jwt_secret_key = os.environ.get('JWT_SECRET_KEY')

        try:
            user_token = request.META['HTTP_AUTHORIZATION']
            pk_usuario = jwt.decode(user_token, jwt_secret_key)['usuario']
            Usuario.objects.get(pk=pk_usuario)

        except jwt.exceptions.DecodeError:
            return response.Response({'error': 'JWT pirata.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except KeyError:
            return response.Response({'error': 'Falta JWT.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Usuario.DoesNotExist:
            return response.Response({'error': 'Usuario no existe.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except TypeError:
            return response.Response({'error': 'Error consiguiendo llave JWT.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        if pk_usuario == request.data['usuario']:
            # Desactivar Ata si ha sido reportada como erronea mas de N veces.
            if ErrorActa.objects.filter(acta=request.data['acta']).count() >= 200:
                acta = Acta.objects.get(pk=request.data['acta'])
                acta.prioridad = -1
            elif ErrorActa.objects.filter(acta=request.data['acta']).count() >= 100:
                acta = Acta.objects.get(pk=request.data['acta'])
                acta.prioridad = 6

            return self.create(request, *args, **kwargs)
        else:
            return response.Response({'mensaje': 'Credenciales corruptas.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ServirPrueba(views.APIView):
    def get(self, request):
        # Variables
        actas_prueba = [1, 2, 3]
        jwt_secret_key = os.environ.get('JWT_SECRET_KEY')

        # Verificar que el token este asociada a un usuario registrado.
        try:
            user_token = request.META['HTTP_AUTHORIZATION']
            pk_usuario = jwt.decode(user_token, jwt_secret_key)['usuario']
            Usuario.objects.get(pk=pk_usuario)

        except jwt.exceptions.DecodeError:
            return response.Response({'error': 'JWT pirata.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except KeyError:
            return response.Response({'error': 'Falta JWT.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Usuario.DoesNotExist:
            return response.Response({'error': 'Usuario no existe.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except TypeError:
            return response.Response({'error': 'Error consiguiendo llave JWT.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


        # Seleccionar acta activa aleatoriamente.
        numero_aleatorio = random.randint(0, len(actas_prueba) - 1)
        pk_acta = actas_prueba[numero_aleatorio]

        acta = Acta.objects.get(pk=pk_acta)

        serializer = ActaSerializer(acta, data=request.data, partial=True)
        return response.Response(serializer.data, status=status.HTTP_200_OK) if serializer.is_valid() else response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CorregirPrueba(views.APIView):
    def post(self, request):
        # Variables
        jwt_secret_key = os.environ.get('JWT_SECRET_KEY')
        puntos = 0
        respuestas = {
            1: [
                {'campo': 1, 'valor': 10},
                {'campo': 2, 'valor': 10},
                {'campo': 3, 'valor': 10},
                {'campo': 4, 'valor': 10},
                {'campo': 5, 'valor': 10},
            ],
            2: [
                {'campo': 1, 'valor': 10},
                {'campo': 2, 'valor': 10},
                {'campo': 3, 'valor': 10},
                {'campo': 4, 'valor': 10},
                {'campo': 5, 'valor': 10},
            ],
            3: [
                {'campo': 1, 'valor': 10},
                {'campo': 2, 'valor': 10},
                {'campo': 3, 'valor': 10},
                {'campo': 4, 'valor': 10},
                {'campo': 5, 'valor': 10},
            ],
        }
        # Verificar que el token este asociada a un usuario registrado.
        try:
            user_token = request.META['HTTP_AUTHORIZATION']
            pk_usuario = jwt.decode(user_token, jwt_secret_key)['usuario']
            Usuario.objects.get(pk=pk_usuario)

        except jwt.exceptions.DecodeError:
            return response.Response({'error': 'JWT pirata.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except KeyError:
            return response.Response({'error': 'Falta JWT.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Usuario.DoesNotExist:
            return response.Response({'error': 'Usuario no existe.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except TypeError:
            return response.Response({'error': 'Error consiguiendo llave JWT.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        for i, cuenta in enumerate(request.data):
            if cuenta['valor'] == respuestas[cuenta['acta']][i]['valor']:
                puntos += 1
            else:
                puntos -= 1

        print(puntos)
        return response.Response({'mensaje': 'Prueba corregida exitosamente.'}, status=status.HTTP_200_OK)


class MostrarAvances(views.APIView):
    def get(self, request):
        # Variables
        datos_estadisticos = {
            'usuarios': 0,
            'avances': {
                'p': 0,
                'l_n': 0,
                'l_d': 0,
                'l_m': 0,
                'p_c': 0
            },
            'digitaciones': {
                'validas': 0,
                'totales': 0
            }
        }

        # Numero de usuarios.
        datos_estadisticos['usuarios'] = Usuario.objects.all().count()

        # Avance en cada tipo de acta.
        actas = Acta.objects.all()
        for i in range(1, 28):
            if i == 1:
                datos_estadisticos['avances']['p'] += floor(Acta.objects.filter(tipo=i, prioridad=0).count() / 21099)
            elif i == 2:
                datos_estadisticos['avances']['l_n'] += floor(Acta.objects.filter(tipo=i, prioridad=0).count() / 20990)
            elif 2 < i < 26:
                datos_estadisticos['avances']['l_d'] += floor(Acta.objects.filter(tipo=i, prioridad=0).count() / 20990)
            elif i == 26:
                datos_estadisticos['avances']['l_m'] += floor(Acta.objects.filter(tipo=i, prioridad=0).count() / 20990)
            elif i == 27:
                datos_estadisticos['avances']['p_c'] += floor(Acta.objects.filter(tipo=i, prioridad=0).count() / 20990)

        # Digtaciones validas y totales.
        datos_estadisticos['digitaciones']['validas'] = HashResultadoActa.objects.all().count()
        datos_estadisticos['digitaciones']['totales'] = floor(Cuenta.objects.all().count() / 30)

        return response.Response(datos_estadisticos, status=status.HTTP_200_OK) if len(datos_estadisticos) is not 0 else response.Response('errores', status=status.HTTP_400_BAD_REQUEST)


class MostrarAvancesUsuario(views.APIView):
    def get(self, request):
        # Variables
        resultados_usuario = {
            'actas_validas': 0,
            'actas_totales': 0
        }
        jwt_secret_key = os.environ.get('JWT_SECRET_KEY')

        # Verificar que el token este asociada a un usuario registrado.
        try:
            user_token = request.META['HTTP_AUTHORIZATION']
            pk_usuario = jwt.decode(user_token, jwt_secret_key)['usuario']
            usuario = Usuario.objects.get(pk=pk_usuario)

        except jwt.exceptions.DecodeError:
            return response.Response({'error': 'JWT pirata.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except KeyError:
            return response.Response({'error': 'Falta JWT.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Usuario.DoesNotExist:
            return response.Response({'error': 'Usuario no existe.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except TypeError:
            return response.Response({'error': 'Error consiguiendo llave JWT.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        resultados_usuario['actas_validas'] = HashResultadoActa.objects.filter(usuario=usuario).count()
        resultados_usuario['actas_totales'] = floor(Cuenta.objects.filter(usuario=usuario).count() / 30)

        return response.Response(resultados_usuario, status=status.HTTP_200_OK) if len(resultados_usuario) is not 0 else response.Response({'error': 'El usuario no tiene resultados.'}, status=status.HTTP_400_BAD_REQUEST)


class MostrarHighScores(views.APIView):
    def get(self, request):
        # Variables
        high_scores = Usuario.objects.annotate(actas_validadas=Count('hashresultadoacta')).order_by('-actas_validadas').values('nombre', 'actas_validadas')[:50]
        return response.Response(high_scores, status=status.HTTP_200_OK) if len(high_scores) is not 0 else response.Response({'error': 'No hay high scores registrados.'}, status=status.HTTP_400_BAD_REQUEST)

