from main import app
from db.conexion import Conexion
from flask import request, jsonify
import sqlite3

@app.route('/eliminar_ejercicio/<int:id>', methods=['DELETE'])
def eliminar_ejercicio(id):
    conexion = Conexion()
    conn = conexion.conexion_base_datos()
    if conn:
        try:
            cursor = conn.cursor()
            cursor.execute('DELETE FROM ejercicios WHERE id = ?', (id,))
            if cursor.rowcount == 0:
                return jsonify({'error': 'Ejercicio no encontrado'}), 404
            conn.commit()
            return jsonify({'message': 'Ejercicio eliminado exitosamente'}), 200
        except sqlite3.Error as e:
            return jsonify({'error': f'Error al eliminar el ejercicio: {e}'}), 500
    else:
        return jsonify({'error': 'Error al conectar a la base de datos'}), 500

@app.route('/eliminar_rutina/<int:id>', methods=['DELETE'])
def eliminar_rutina(id):
    conexion = Conexion()
    conn = conexion.conexion_base_datos()
    if conn:
        try:
            cursor = conn.cursor()
            cursor.execute('DELETE FROM rutinas WHERE id = ?', (id,))
            if cursor.rowcount == 0:
                return jsonify({'error': 'Rutina no encontrada'}), 404
            conn.commit()
            return jsonify({'message': 'Rutina eliminada exitosamente'}), 200
        except sqlite3.Error as e:
            return jsonify({'error': f'Error al eliminar la rutina: {e}'}), 500
    else:
        return jsonify({'error': 'Error al conectar a la base de datos'}), 500

@app.route('/eliminar_alimentos/<int:id>', methods=['DELETE'])
def eliminar_alimento(id):
    conexion = Conexion()
    conn = conexion.conexion_base_datos()
    if conn:
        try:
            cursor = conn.cursor()
            cursor.execute('DELETE FROM alimentos WHERE id = ?', (id,))
            if cursor.rowcount == 0:
                return jsonify({'error': 'Alimento no encontrado'}), 404
            conn.commit()
            return jsonify({'message': 'Alimento eliminado exitosamente'}), 200
        except sqlite3.Error as e:
            return jsonify({'error': f'Error al eliminar el alimento: {e}'}), 500
    else:
        return jsonify({'error': 'Error al conectar a la base de datos'}), 500