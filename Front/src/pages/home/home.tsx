import React, { useState } from 'react';
import { ResponsiveAppBar } from '../../component/home/appbar';
import '../../styles.css';
import FullWidthTextField from '../../component/home/textField';
import BasicButtons from '../../component/home/button_p';

const Home: React.FC = () => {
  const [prediccion, setPrediccion] = useState<string>('');

  // Función para enviar la solicitud al backend
  const enviarSolicitud = (texto: string) => {
    const url = 'http://127.0.0.1:8000/predict'; // URL del backend

    const data = { texto: texto };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    fetch(url, options)
      .then(response => response.json())
      .then(data => {
        // Actualizar el estado con la predicción obtenida del backend
        setPrediccion(data.prediccion);
      })
      .catch(error => {
        console.error('Error al enviar la solicitud:', error);
      });
  };


  return (
    <>
      <ResponsiveAppBar />
      <canvas height='10px'></canvas>
      <div className='opinion-section'>A continuación por favor escriba su opinión sobre el hotel:</div>
      <canvas height='10px'></canvas>
      <FullWidthTextField onSubmit={enviarSolicitud} />
      <BasicButtons buttonText='Enviar' enviarSolicitud={enviarSolicitud} />
      <canvas height='10px'></canvas>
      {prediccion === '' ? null : (
        <div className='opinion-section'>Calificación: {prediccion}</div>
      )}
    </>
  );
}

export default Home;

