from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

paises = {
    "Mexico": ["Ciudad de Mexico", "Guadalajara", "Monterrey", "Puebla", "Cancun"],
    "España": ["Madrid", "Barcelona", "Sevilla", "Valencia", "Bilbao"],
    "Colombia": ["Bogota", "Medellin", "Cali", "Barranquilla", "Cartagena"],
    "Argentina": ["Buenos Aires", "Cordoba", "Mendoza", "Rosario", "La Plata"],
    "Chile": ["Santiago", "Valparaiso", "Concepcion", "La Serena", "Antofagasta"],
    "Peru": ["Lima", "Cusco", "Arequipa", "Trujillo", "Chiclayo"],
    "Republica Dominicana": ["Santo Domingo", "Santiago", "Puerto Plata", "La Romana", "San Pedro"]
}

@app.route('/api/paises', methods=['GET'])
def get_paises():
    return jsonify(list(paises.keys()))

@app.route('/api/ciudades', methods=['GET'])
def get_ciudades():
    pais = request.args.get('pais')
    if pais in paises:
        return jsonify(paises[pais])
    return jsonify([])

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({"status": "OK", "mensaje": "Backend funcionando"})

if __name__ == '__main__':
    print("Servidor corriendo en http://localhost:5000")
    app.run(debug=True, port=5000)