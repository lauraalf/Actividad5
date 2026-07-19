import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [paises, setPaises] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [paisSeleccionado, setPaisSeleccionado] = useState('');
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState('');
  const [cargando, setCargando] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  // Mapeo de países a códigos de bandera
  const codigosBanderas = {
    'Mexico': 'mx',
    'España': 'es',
    'Colombia': 'co',
    'Argentina': 'ar',
    'Chile': 'cl',
    'Peru': 'pe',
    'Republica Dominicana': 'do'
  };

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

  const obtenerBandera = (pais) => {
    const codigo = codigosBanderas[pais];
    if (codigo) {
      return `https://flagcdn.com/64x48/${codigo}.png`;
    }
    return null;
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🌍 Selectores Dependientes</h1>
        <p>Selecciona un pais y luego una ciudad</p>

        <div className="selector-container">
          <label>Pais:</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {paisSeleccionado && (
              <img 
                src={obtenerBandera(paisSeleccionado)} 
                alt={paisSeleccionado}
                style={{ width: '40px', height: '30px', objectFit: 'cover' }}
              />
            )}
            <select value={paisSeleccionado} onChange={manejarCambioPais}>
              <option value="">-- Selecciona un pais --</option>
              {paises.map((pais) => (
                <option key={pais} value={pais}>
                  {pais}
                </option>
              ))}
            </select>
          </div>
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
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
              <img 
                src={obtenerBandera(paisSeleccionado)} 
                alt={paisSeleccionado}
                style={{ width: '60px', height: '40px', objectFit: 'cover' }}
              />
              <div>
                <h2>Has seleccionado:</h2>
                <p>{ciudadSeleccionada}, {paisSeleccionado}</p>
              </div>
            </div>
          </div>
        )}

        <div className="imagenes-container">
          <h2>📸 Manejo de imagenes</h2>
          <div className="imagenes-grid">
            
            <div className="imagen-item">
              <img 
                src="/logo192.png" 
                alt="Desde public" 
                style={{ width: '80px', height: '80px' }}
                onError={(e) => {
                  e.target.src = 'https://cdn.jsdelivr.net/npm/simple-icons@v3/icons/react.svg';
                }}
              />
              <p>Imagen desde public</p>
            </div>

            <div className="imagen-item">
              <img 
                src="https://reactjs.org/logo-og.png" 
                alt="Desde URL" 
                style={{ width: '80px', height: '80px' }}
              />
              <p>Imagen desde URL externa</p>
            </div>

            <div className="imagen-item">
              <img 
                src="https://flagcdn.com/mx.svg" 
                alt="Bandera México" 
                style={{ width: '80px', height: '60px', objectFit: 'cover' }}
              />
              <p>Bandera desde URL</p>
            </div>

          </div>
          <p>Las imagenes pueden venir de public, src, o URLs externas</p>
        </div>
      </header>
    </div>
  );
}

export default App;