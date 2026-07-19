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

  useEffect(() => {
    setPaises(paisesData);
  }, []);

  useEffect(() => {
    if (!paisSeleccionado) {
      setCiudades([]);
      setCiudadSeleccionada('');
      return;
    }

    setCargando(true);
    setTimeout(() => {
      const ciudadesPais = ciudadesData[paisSeleccionado] || [];
      setCiudades(ciudadesPais);
      setCiudadSeleccionada('');
      setCargando(false);
    }, 300);
  }, [paisSeleccionado]);

  const manejarCambioPais = (e) => {
    setPaisSeleccionado(e.target.value);
  };

  const manejarCambioCiudad = (e) => {
    setCiudadSeleccionada(e.target.value);
  };

  const carpetasPaises = {
    'Mexico': 'mexico',
    'España': 'espana',
    'Colombia': 'colombia',
    'Argentina': 'argentina',
    'Chile': 'chile',
    'Peru': 'peru',
    'Republica Dominicana': 'republica-dominicana'
  };

  const archivosBanderas = {
    'Mexico': 'mexico.png',
    'España': 'espana.png',
    'Colombia': 'colombia.png',
    'Argentina': 'argentina.png',
    'Chile': 'chile.png',
    'Peru': 'peru.png',
    'Republica Dominicana': 'republica-dominicana.png'
  };

  const archivosCiudades = {
    'Ciudad de Mexico': 'ciudad-de-mexico.jpg',
    'Guadalajara': 'guadalajara.jpg',
    'Monterrey': 'monterrey.jpg',
    'Puebla': 'puebla.jpg',
    'Cancun': 'cancun.jpg',
    'Madrid': 'madrid.jpg',
    'Barcelona': 'barcelona.jpg',
    'Sevilla': 'sevilla.jpg',
    'Valencia': 'valencia.jpg',
    'Bilbao': 'bilbao.jpg',
    'Bogota': 'bogota.jpg',
    'Medellin': 'medellin.jpg',
    'Cali': 'cali.jpg',
    'Barranquilla': 'barranquilla.jpg',
    'Cartagena': 'cartagena.jpg',
    'Buenos Aires': 'buenos-aires.jpg',
    'Cordoba': 'cordoba.jpg',
    'Mendoza': 'mendoza.jpg',
    'Rosario': 'rosario.jpg',
    'La Plata': 'la-plata.jpg',
    'Santiago': 'santiago.jpg',
    'Valparaiso': 'valparaiso.jpg',
    'Concepcion': 'concepcion.jpg',
    'La Serena': 'la-serena.jpg',
    'Antofagasta': 'antofagasta.jpg',
    'Lima': 'lima.jpg',
    'Cusco': 'cusco.jpg',
    'Arequipa': 'arequipa.jpg',
    'Trujillo': 'trujillo.jpg',
    'Chiclayo': 'chiclayo.jpg',
    'Santo Domingo': 'santo-domingo.jpg',
    'Puerto Plata': 'puerto-plata.jpg',
    'La Romana': 'la-romana.jpg',
    'San Pedro': 'san-pedro.jpg'
  };

  const obtenerBandera = (pais) => {
    const archivo = archivosBanderas[pais];
    if (archivo) {
      return `${process.env.PUBLIC_URL}/imagenes/${archivo}`;
    }
    return null;
  };

  const obtenerImagenCiudad = (pais, ciudad) => {
    const carpeta = carpetasPaises[pais];
    const archivo = archivosCiudades[ciudad];
    if (carpeta && archivo) {
      return `${process.env.PUBLIC_URL}/imagenes/ciudades/${carpeta}/${archivo}`;
    }
    return null;
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Proyecto React - Manejo de Imagenes y Selects</h1>

        <div className="seccion-imagenes">
          <h2>1. Imagenes desde carpetas</h2>
          <div className="imagenes-grid">
            <div className="imagen-item">
              <img 
                src={`${process.env.PUBLIC_URL}/imagenes/mexico.png`}
                alt="Bandera Mexico"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://flagcdn.com/mx.svg';
                }}
              />
              <p>Imagen desde public/imagenes/</p>
            </div>
            <div className="imagen-item">
              <img 
                src="https://reactjs.org/logo-og.png" 
                alt="Logo React"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://cdn.jsdelivr.net/npm/simple-icons@v3/icons/react.svg';
                }}
              />
              <p>Imagen desde URL externa</p>
            </div>
          </div>
        </div>

        <div className="seccion-selects">
          <h2>2. Select Dependiente</h2>
          <div className="selects-container">
            <div className="select-group">
              <label>Pais:</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {paisSeleccionado && (
                  <img 
                    src={obtenerBandera(paisSeleccionado)} 
                    alt={paisSeleccionado}
                    style={{ width: '40px', height: '30px', objectFit: 'cover', border: '1px solid #ddd', borderRadius: '4px' }}
                  />
                )}
                <select value={paisSeleccionado} onChange={manejarCambioPais}>
                  <option value="">-- Selecciona un Pais --</option>
                  {paises.map((pais) => (
                    <option key={pais} value={pais}>
                      {pais}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="select-group">
              <label>Ciudad:</label>
              <select 
                value={ciudadSeleccionada} 
                onChange={manejarCambioCiudad}
                disabled={ciudades.length === 0}
              >
                <option value="">
                  {paisSeleccionado ? '-- Selecciona una Ciudad --' : 'Primero elige un Pais'}
                </option>
                {ciudades.map((ciudad) => (
                  <option key={ciudad} value={ciudad}>
                    {ciudad}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {cargando && <p className="cargando">Cargando ciudades...</p>}

          {ciudadSeleccionada && (
            <div className="resultado">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', marginBottom: '15px' }}>
                {paisSeleccionado && (
                  <img 
                    src={obtenerBandera(paisSeleccionado)} 
                    alt={paisSeleccionado}
                    style={{ width: '50px', height: '35px', objectFit: 'cover', border: '1px solid #ddd', borderRadius: '4px' }}
                  />
                )}
                <img 
                  src={obtenerImagenCiudad(paisSeleccionado, ciudadSeleccionada)} 
                  alt={ciudadSeleccionada}
                  style={{ 
                    width: '200px', 
                    height: '150px', 
                    objectFit: 'cover', 
                    borderRadius: '8px',
                    border: '2px solid #ddd'
                  }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                  }}
                />
              </div>
              <p>Has seleccionado: <strong>{ciudadSeleccionada}</strong> en el pais <strong>{paisSeleccionado}</strong></p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;