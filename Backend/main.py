from db.conexion import Conexion
from flask import Flask as flask

app = flask(__name__) 

from Api.creacion import *
from Api.actualizar import *
from Api.eliminar import *
from Api.busqueda import *

if __name__ == "__main__":
    conexion = Conexion()
    conexion.crear_tablas()
    print("Tablas creadas exitosamente.")
    app.run(debug=True)