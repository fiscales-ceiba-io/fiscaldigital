from resultados.models import Acta, TipoActa
import csv

def guardar_acta(sha1, url_imagen):
	imagen = url_imagen
	pre_terminacion = url_imagen.split('/')
	pre_terminacion = pre_terminacion[4].split('.')
	terminacion_acta = pre_terminacion[0][-1]
	
	if terminacion_acta == '1':
		prioridad = 4
		tipo = '1'
	elif terminacion_acta == '2':
		prioridad = 2
		tipo = '2'
	elif terminacion_acta == '3':
		prioridad = 1
		if int(pre_terminacion[0]) < 18786:
			tipo = '3'
		elif int(pre_terminacion[0]) < 46646:
			tipo = '4'
		elif int(pre_terminacion[0]) < 51486:
			tipo = '5'
		elif int(pre_terminacion[0]) < 59476:
			tipo = '6'
		elif int(pre_terminacion[0]) < 62516:
			tipo = '7'
		elif int(pre_terminacion[0]) < 72746:
			tipo = '8'
		elif int(pre_terminacion[0]) < 78876:
			tipo = '9'
		elif int(pre_terminacion[0]) < 85006:
			tipo = '10'
		elif int(pre_terminacion[0]) < 90536:
			tipo = '11'
		elif int(pre_terminacion[0]) < 102066:
			tipo = '12'
		elif int(pre_terminacion[0]) < 109616:
			tipo = '13'
		elif int(pre_terminacion[0]) < 114296:
			tipo = '14'
		elif int(pre_terminacion[0]) < 128886:
			tipo = '15'
		elif int(pre_terminacion[0]) < 144836:
			tipo = '16'
		elif int(pre_terminacion[0]) < 156996:
			tipo = '17'
		elif int(pre_terminacion[0]) < 161096:
			tipo = '18'
		elif int(pre_terminacion[0]) < 175096:
			tipo = '19'
		elif int(pre_terminacion[0]) < 182496:
			tipo = '20'
		elif int(pre_terminacion[0]) < 187996:
			tipo = '21'
		elif int(pre_terminacion[0]) < 191926:
			tipo = '22'
		elif int(pre_terminacion[0]) < 197886:
			tipo = '23'
		elif int(pre_terminacion[0]) < 202326:
			tipo = '24'
		elif int(pre_terminacion[0]) < 209906:
			tipo = '25'
	elif terminacion_acta == '4':
		prioridad = -1
		tipo = '26'
	elif terminacion_acta == '5':
		prioridad = 3
		tipo = '27'
	
	tipo_acta = TipoActa.objects.get(pk=tipo)
	
	nueva_acta = Acta(tipo=tipo_acta, imagen=imagen, prioridad=prioridad, sha1=sha1)
	nueva_acta.save()


file_tse_hashes = open('tse_hashes.csv','r')
tse_hashes = csv.reader(file_tse_hashes)
tse_hashes_list = list(tse_hashes)

print('Starting...')
for i, tse_hash in enumerate(tse_hashes_list):
	print(str(i/len(tse_hashes_list) * 100) + '%')
	guardar_acta(tse_hash[0], tse_hash[1])

print('100%')

