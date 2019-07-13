from django.urls import path
from resultados import views


urlpatterns = [
    path('cuenta/', views.CrearCuentas.as_view(), name='crear_cuenta'),
    path('acta/', views.ServirActa.as_view(), name='servir_acta'),
    path('prueba/', views.ServirPrueba.as_view(), name='servir_prueba'),
    path('corregir/', views.CorregirPrueba.as_view(), name='corregir_prueba'),
    path('acta/error/', views.CrearErrorActa.as_view(), name='crear_error_acta'),
    path('avances_usuario/', views.MostrarAvancesUsuario.as_view(), name='mostrar_avances_usuario'),
    path('high_scores/', views.MostrarHighScores.as_view(), name='mostrar_high_scores'),
    path('avances/', views.MostrarAvances.as_view(), name='mostrar_avances'),
]
