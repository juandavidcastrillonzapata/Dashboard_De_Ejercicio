from main import app
from db.conexion import Conexion
from flask import request, jsonify
import sqlite3

@app.route('/Actualizar_usuario/<int:id>', methods=['PUT'])
def actualizar_usuario(id):
    data = request.get_json()
    nombre = data.get('nombre')
    if not nombre:
        return jsonify({'error': 'Faltan campos requeridos'}), 400
    conexion = Conexion()
    conn = conexion.conexion_base_datos()
    if conn:
        try:
            cursor = conn.cursor()
            cursor.execute('UPDATE usuarios SET nombre = ? WHERE id = ?', (nombre, id))
            if cursor.rowcount == 0:
                return jsonify({'error': 'Usuario no encontrado'}), 404
            conn.commit()
            return jsonify({'message': 'Usuario actualizado exitosamente'}), 200
        except sqlite3.Error as e:
            return jsonify({'error': f'Error al actualizar el usuario: {e}'}), 500
    else:
        return jsonify({'error': 'Error al conectar a la base de datos'}), 500

@app.route('/Actualizar_rutina/<int:id>', methods=['PUT'])
def actualizar_rutina(id):
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
            cursor.execute('UPDATE rutinas SET nombre = ?, descripcion = ? WHERE id = ?', (nombre, descripcion, id))
            if cursor.rowcount == 0:
                return jsonify({'error': 'Rutina no encontrada'}), 404
            conn.commit()
            return jsonify({'message': 'Rutina actualizada exitosamente'}), 200
        except sqlite3.Error as e:
            return jsonify({'error': f'Error al actualizar la rutina: {e}'}), 500
    else:
        return jsonify({'error': 'Error al conectar a la base de datos'}), 500

@app.route('/Actualizar_ejercicio/<int:id>', methods=['PUT'])
def actualizar_ejercicio(id):
    data = request.get_json()
    nombre = data.get('nombre')
    series = data.get('series')
    repeticiones = data.get('repeticiones')
    if not nombre or not series or not repeticiones:
        return jsonify({'error': 'Faltan campos requeridos'}), 400
    conexion = Conexion()
    conn = conexion.conexion_base_datos()   
    if conn:
        try:
            cursor = conn.cursor()
            cursor.execute('UPDATE ejercicios SET nombre = ?, series = ?, repeticiones = ? WHERE id = ?', (nombre, series, repeticiones, id))
            if cursor.rowcount == 0:
                return jsonify({'error': 'Ejercicio no encontrado'}), 404
            conn.commit()
            return jsonify({'message': 'Ejercicio actualizado exitosamente'}), 200
        except sqlite3.Error as e:
            return jsonify({'error': f'Error al actualizar el ejercicio: {e}'}), 500
    else:
        return jsonify({'error': 'Error al conectar a la base de datos'}), 500

@app.route('/Actualizar_alimento/<int:id>', methods=['PUT'])
def actualizar_alimento(id):
    data = request.get_json()
    desayuno = data.get('desayuno')
    almuerzo = data.get('almuerzo')
    cena = data.get('cena')
    if not desayuno or not almuerzo or not cena:
        return jsonify({'error': 'Faltan campos requeridos'}), 400
    conexion = Conexion()
    conn = conexion.conexion_base_datos()   
    if conn:
        try:
            cursor = conn.cursor()
            cursor.execute('UPDATE alimentos SET desayuno = ?, almuerzo = ?, cena = ? WHERE id = ?', (desayuno, almuerzo, cena, id))
            if cursor.rowcount == 0:
                return jsonify({'error': 'Alimento no encontrado'}), 404
            conn.commit()
            return jsonify({'message': 'Alimento actualizado exitosamente'}), 200
        except sqlite3.Error as e:
            return jsonify({'error': f'Error al actualizar el alimento: {e}'}), 500
    else:
        return jsonify({'error': 'Error al conectar a la base de datos'}), 500