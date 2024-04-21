from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
from Processing.preprocessing import TextPreprocessor, TextProcessor

app = Flask(__name__)
CORS(app)  # Agregar CORS a la aplicación

# Cargar el modelo y crear instancias de los preprocesadores
modelo = joblib.load('pipeline_svc.pkl')
preprocessor = TextPreprocessor()
processor = TextPreprocessor()

@app.route('/predict', methods=['POST'])
def predict():
    # Obtener el texto del cuerpo de la solicitud
    data = request.get_json()
    texto = data['texto']
    
    # Preprocesar el texto
    texto = preprocessor.transform(texto)
    texto = processor.transform(texto)
    
    # Hacer la predicción
    prediccion = modelo.predict([texto])
    
    # Devolver la predicción como respuesta
    return jsonify({'prediccion': prediccion.tolist()})

if __name__ == '__main__':
    app.run(port=8000, debug=True)



