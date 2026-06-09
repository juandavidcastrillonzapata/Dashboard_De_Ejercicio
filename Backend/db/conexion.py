import sqlite3

class Conexion:
    def conexion_base_datos(self):
        try:
            with sqlite3.connect('db/rutinas.db') as conexion:
                return conexion
        except sqlite3.Error as e:
            print(f"Error al conectar a la base de datos: {e}")
            return None
        
    def crear_tablas(self):
        conexion = self.conexion_base_datos()
        if conexion:
            try:
                cursor = conexion.cursor()
                cursor.execute('''
                    CREATE TABLE IF NOT EXISTS usuarios (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        nombre TEXT NOT NULL,
                        correo TEXT NOT NULL UNIQUE,
                        contraseña TEXT NOT NULL
                    )
                ''')
                cursor.execute('''
                    CREATE TABLE IF NOT EXISTS rutinas (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        usuario_id INTEGER,
                        nombre TEXT NOT NULL,
                        descripcion TEXT,
                        FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
                    )
                ''')
                cursor.execute('''
                    CREATE TABLE IF NOT EXISTS ejercicios (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        rutina_id INTEGER,
                        nombre TEXT NOT NULL,
                        series INTEGER,
                        repeticiones INTEGER,
                        FOREIGN KEY (rutina_id) REFERENCES rutinas(id)
                    )
                ''')
                cursor.execute('''
                    CREATE TABLE IF NOT EXISTS alimentos (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        desayuno TEXT,
                        almuerzo TEXT,
                        cena TEXT,
                        usuario_id INTEGER,
                        FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
                    )
                ''')
                conexion.commit()
            except sqlite3.Error as e:
                print(f"Error al crear las tablas: {e}")