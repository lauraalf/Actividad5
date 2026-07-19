import React, { useState, useEffect } from 'react';
import './App.css';

const paisesData = ["Mexico", "España", "Colombia", "Argentina", "Chile", "Peru", "Republica Dominicana"];

const ciudadesData = {
  "Mexico": ["Ciudad de Mexico", "Guadalajara", "Monterrey", "Puebla", "Cancun"],
  "España": ["Madrid", "Barcelona", "Sevilla", "Valencia", "Bilbao"],
  "Colombia": ["Bogota", "Medellin", "Cali", "Barranquilla", "Cartagena"],
  "Argentina": ["Buenos Aires", "Cordoba", "Mendoza", "Rosario", "La Plata"],
  "Chile": ["Santiago", "Valparaiso", "Concepcion", "La Serena", "Antofagasta"],
  "Peru": ["Lima", "Cusco", "Arequipa", "Trujillo", "Chiclayo"],
  "Republica Dominicana": ["Santo Domingo", "Santiago", "Puerto Plata", "La Romana", "San Pedro"]
};

function App() {
  const [paises, setPaises] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [paisSeleccionado, setPaisSeleccionado] = useState('');
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState('');
  const [cargando, setCargando] = useState(false);
  const [usandoBackend, setUsandoBackend] = useState(true);

  useEffect(() => {
    const cargarPaises = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/paises');
        if (!response.ok) throw new Error('Backend no disponible');
        const data = await response.json();
        setPaises(data);
        setUsandoBackend(true);
        console.log('Usando backend');
      } catch (error) {
        console.log('Usando datos locales');
        setPaises(paisesData);
        setUsandoBackend(false);
      }
    };
    cargarPaises();
  }, []);

  useEffect(() => {
    if (!paisSeleccionado) {
      setCiudades([]);
      setCiudadSeleccionada('');
      return;
    }

    const cargarCiudades = async () => {
      setCargando(true);
      
      if (usandoBackend) {
        try {
          const response = await fetch(`http://localhost:5000/api/ciudades?pais=${paisSeleccionado}`);
          if (!response.ok) throw new Error('Error en backend');
          const data = await response.json();
          setCiudades(data);
        } catch (error) {
          console.log('Usando datos locales para ciudades');
          const ciudadesPais = ciudadesData[paisSeleccionado] || [];
          setCiudades(ciudadesPais);
        }
      } else {
        setTimeout(() => {
          const ciudadesPais = ciudadesData[paisSeleccionado] || [];
          setCiudades(ciudadesPais);
          setCargando(false);
        }, 300);
      }
      
      setCiudadSeleccionada('');
      setCargando(false);
    };
    
    cargarCiudades();
  }, [paisSeleccionado, usandoBackend]);

  const manejarCambioPais = (e) => {
    setPaisSeleccionado(e.target.value);
  };

  const manejarCambioCiudad = (e) => {
    setCiudadSeleccionada(e.target.value);
  };

  const codigosBanderas = {
    'Mexico': 'mx',
    'España': 'es',
    'Colombia': 'co',
    'Argentina': 'ar',
    'Chile': 'cl',
    'Peru': 'pe',
    'Republica Dominicana': 'do'
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
        <h1>Selectores Dependientes</h1>
        <p>Selecciona un pais y luego una ciudad</p>
        
        {!usandoBackend && (
          <p style={{ color: '#f39c12', fontSize: '14px' }}>
            Modo sin backend
          </p>
        )}

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
          <h2>Manejo de imagenes</h2>
          <div className="imagenes-grid">
            
            <div className="imagen-item">
              <img 
                src="/logo192.png" 
                alt="Desde public" 
                style={{ width: '80px', height: '80px' }}
                onError={(e) => {
                  e.target.onerror = null;
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
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://cdn.jsdelivr.net/npm/simple-icons@v3/icons/react.svg';
                }}
              />
              <p>Imagen desde URL externa</p>
            </div>

            <div className="imagen-item">
              <img 
                src="https://flagcdn.com/mx.svg" 
                alt="Bandera Mexico" 
                style={{ width: '80px', height: '60px', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://cdn.jsdelivr.net/npm/simple-icons@v3/icons/react.svg';
                }}
              />
              <p>Bandera desde URL</p>
            </div>

          </div>
          <p style={{ marginTop: '15px', fontSize: '14px', color: '#aaa' }}>
            Las imagenes pueden venir de public, src, o URLs externas
          </p>
        </div>
      </header>
    </div>
  );
}

export default App;