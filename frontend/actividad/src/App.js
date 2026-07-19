import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [paises, setPaises] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [paisSeleccionado, setPaisSeleccionado] = useState('');
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState('');
  const [cargando, setCargando] = useState(false);

  // URL del backend (cambiar en producción)
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const obtenerPaises = async () => {
      try {
        const respuesta = await fetch(`${API_URL}/api/paises`);
        const data = await respuesta.json();
        setPaises(data);
      } catch (error) {
        console.log('Error al cargar paises:', error);
        alert('No se pudo conectar al backend');
      }
    };
    obtenerPaises();
  }, [API_URL]);

  useEffect(() => {
    const obtenerCiudades = async () => {
      if (!paisSeleccionado) {
        setCiudades([]);
        setCiudadSeleccionada('');
        return;
      }

      setCargando(true);
      try {
        const respuesta = await fetch(`${API_URL}/api/ciudades?pais=${paisSeleccionado}`);
        const data = await respuesta.json();
        setCiudades(data);
        setCiudadSeleccionada('');
      } catch (error) {
        console.log('Error al cargar ciudades:', error);
      } finally {
        setCargando(false);
      }
    };
    obtenerCiudades();
  }, [paisSeleccionado, API_URL]);

  const manejarCambioPais = (e) => {
    setPaisSeleccionado(e.target.value);
  };

  const manejarCambioCiudad = (e) => {
    setCiudadSeleccionada(e.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Selectores Dependientes</h1>
        <p>Selecciona un pais y luego una ciudad</p>

        <div className="selector-container">
          <label>Pais:</label>
          <select value={paisSeleccionado} onChange={manejarCambioPais}>
            <option value="">-- Selecciona un pais --</option>
            {paises.map((pais) => (
              <option key={pais} value={pais}>
                {pais}
              </option>
            ))}
          </select>
        </div>

        <div className="selector-container">
          <label>Ciudad:</label>
          <select 
            value={ciudadSeleccionada} 
            onChange={manejarCambioCiudad}
            disabled={ciudades.length === 0}
          >
            <option value="">-- Selecciona un pais primero --</option>
            {ciudades.map((ciudad) => (
              <option key={ciudad} value={ciudad}>
                {ciudad}
              </option>
            ))}
          </select>
        </div>

        {cargando && <p>Cargando ciudades...</p>}

        {ciudadSeleccionada && (
          <div className="resultado">
            <h2>Has seleccionado:</h2>
            <p>{ciudadSeleccionada}, {paisSeleccionado}</p>
          </div>
        )}

        <div className="imagenes-container">
          <h2>Manejo de imagenes</h2>
          <div className="imagenes-grid">
            
            {/* Imagen desde public */}
            <div className="imagen-item">
              <img 
                src={`${process.env.PUBLIC_URL}/logo192.png`}
                alt="Desde public"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://cdn.jsdelivr.net/npm/simple-icons@v3/icons/react.svg';
                }}
              />
              <p>Imagen desde public</p>
            </div>

            {/* Imagen desde src (importada) */}
            <div className="imagen-item">
              <img 
                src={logo} 
                alt="Desde src"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg';
                }}
              />
              <p>Imagen desde src</p>
            </div>

            {/* Imagen desde URL externa */}
            <div className="imagen-item">
              <img 
                src="https://reactjs.org/logo-og.png" 
                alt="Desde URL"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://cdn.jsdelivr.net/npm/simple-icons@v3/icons/react.svg';
                }}
              />
              <p>Imagen desde URL externa</p>
            </div>

          </div>
          <p>Las imagenes pueden venir de public, src, o URLs externas</p>
        </div>
      </header>
    </div>
  );
}

export default App;