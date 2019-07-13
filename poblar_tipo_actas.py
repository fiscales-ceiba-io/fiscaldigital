from resultados.models import TipoActa
import csv

file_mapas = open('mapas.csv','r')
mapas = csv.reader(file_mapas)
mapas_list = list(mapas)

print('Starting...')
for i, mapa in enumerate(mapas_list):
	print(str(i/len(mapas_list) * 100) + '%')
	nuevo_tipo = TipoActa(tipo=i+1, mapa=mapa[0].strip())
	nuevo_tipo.save()

print('100%')
print('Boom. Finished.')
