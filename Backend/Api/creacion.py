from main import app
from db.conexion import Conexion
from flask import request, jsonify
import sqlite3

@app.route('/crear_usuario', methods=['POST'])
def crear_usuario():
    data = request.get_json()
    nombre = data.get('nombre')
    correo = data.get('correo')
    contraseña = data.get('contraseña')
    if not nombre or not correo or not contraseña:
        return jsonify({'error': 'Faltan campos requeridos'}), 400
    conexion = Conexion()
    conn = conexion.conexion_base_datos()
    if conn:
        try:
            cursor = conn.cursor()
            cursor.execute('INSERT INTO usuarios (nombre, correo, contraseña) VALUES (?, ?, ?)', (nombre, correo, contraseña))
            conn.commit()
            return jsonify({'message': 'Usuario creado exitosamente'}), 201
        except sqlite3.IntegrityError:
            return jsonify({'error': 'El correo ya está registrado'}), 400
        except sqlite3.Error as e:
            return jsonify({'error': f'Error al crear el usuario: {e}'}), 500
    else:
        return jsonify({'error': 'Error al conectar a la base de datos'}), 500

@app.route('/crear_rutina', methods=['POST'])
def crear_rutina():
    data = request.get_json()
    nombre = data.get('nombre')
    descripcion = data.get('descripcion')
    if not nombre or not descripcion:
        return jsonify({'error': 'Faltan campos requeridos'}), 400
    conexion = Conexion()
    conn = conexion.conexion_base_datos()   
    if conn:
        try:
            cursor = conn.cursor()
            cursor.execute('INSERT INTO rutinas (nombre, descripcion) VALUES (?, ?)', (nombre, descripcion))
            conn.commit()
            return jsonify({'message': 'Rutina creada exitosamente'}), 201
        except sqlite3.Error as e:
            return jsonify({'error': f'Error al crear la rutina: {e}'}), 500
    else:
        return jsonify({'error': 'Error al conectar a la base de datos'}), 500

@app.route('/crear_ejercicio', methods=['POST'])
def crear_ejercicio():
    data = request.get_json()
    rutina_id = data.get('rutina_id')
    nombre = data.get('nombre')
    series = data.get('series')
    repeticiones = data.get('repeticiones')
    if not rutina_id or not nombre or not series or not repeticiones:
        return jsonify({'error': 'Faltan campos requeridos'}), 400
    conexion = Conexion()
    conn = conexion.conexion_base_datos()   
    if conn:
        try:
            cursor = conn.cursor()
            cursor.execute('INSERT INTO ejercicios (rutina_id, nombre, series, repeticiones) VALUES (?, ?, ?, ?)', (rutina_id, nombre, series, repeticiones))
            conn.commit()
            return jsonify({'message': 'Ejercicio creado exitosamente'}), 201
        except sqlite3.Error as e:
            return jsonify({'error': f'Error al crear el ejercicio: {e}'}), 500
    else:
        return jsonify({'error': 'Error al conectar a la base de datos'}), 500

@app.route('/crear_alimento', methods=['POST'])
def crear_alimento():
    data = request.get_json()
    desayuno = data.get('desayuno')
    almuerzo = data.get('almuerzo')
    cena = data.get('cena')
    usuario_id = data.get('usuario_id')
    if not desayuno or not almuerzo or not cena or not usuario_id:
        return jsonify({'error': 'Faltan campos requeridos'}), 400
    conexion = Conexion()
    conn = conexion.conexion_base_datos()   
    if conn:
        try:
            cursor = conn.cursor()
            cursor.execute('INSERT INTO alimentos (desayuno, almuerzo, cena, usuario_id) VALUES (?, ?, ?, ?)', (desayuno, almuerzo, cena, usuario_id))
            conn.commit()
            return jsonify({'message': 'Alimento creado exitosamente'}), 201
        except sqlite3.Error as e:
            return jsonify({'error': f'Error al crear el alimento: {e}'}), 500
    else:
        return jsonify({'error': 'Error al conectar a la base de datos'}), 500