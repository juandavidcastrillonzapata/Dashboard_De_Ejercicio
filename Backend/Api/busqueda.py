from main import app
from db.conexion import Conexion
from flask import request, jsonify
import sqlite3

@app.route('/buscar_rutinas', methods=['GET'])
def buscar_rutinas():
    conexion = Conexion()
    conn = conexion.conexion_base_datos()
    if conn:
        try:
            cursor = conn.cursor()
            cursor.execute('SELECT * FROM rutinas')
            rutinas = cursor.fetchall()
            return jsonify({'rutinas': rutinas}), 200
        except sqlite3.Error as e:
            return jsonify({'error': f'Error al buscar rutinas: {e}'}), 500
    else:
        return jsonify({'error': 'Error al conectar a la base de datos'}), 500

@app.route('/buscar_ejercicios', methods=['GET'])
def buscar_ejercicios():
    conexion = Conexion()
    conn = conexion.conexion_base_datos()
    if conn:
        try:
            cursor = conn.cursor()
            cursor.execute('SELECT * FROM ejercicios')
            ejercicios = cursor.fetchall()
            return jsonify({'ejercicios': ejercicios}), 200
        except sqlite3.Error as e:
            return jsonify({'error': f'Error al buscar ejercicios: {e}'}), 500
    else:
        return jsonify({'error': 'Error al conectar a la base de datos'}), 500

@app.route('/buscar_alimentos', methods=['GET'])
def buscar_alimentos():
    conexion = Conexion()
    conn = conexion.conexion_base_datos()
    if conn:
        try:
            cursor = conn.cursor()
            cursor.execute('SELECT * FROM alimentos')
            alimentos = cursor.fetchall()
            return jsonify({'alimentos': alimentos}), 200
        except sqlite3.Error as e:
            return jsonify({'error': f'Error al buscar alimentos: {e}'}), 500
    else:
        return jsonify({'error': 'Error al conectar a la base de datos'}), 500