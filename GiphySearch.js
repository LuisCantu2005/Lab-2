import React, { useState } from 'react';
import useFetch from './useFetch';
import './GiphySearch.css';

/**
 * Componente GiphySearch (Alternativa)
 * Utiliza 2 hooks:
 * 1. useState - para manejar el término de búsqueda
 * 2. useFetch - para obtener GIFs de Giphy API
 * 
 * NOTA: Para usar esta API, necesitas una clave API de Giphy:
 * 1. Ir a https://developers.giphy.com/dashboard
 * 2. Crear una aplicación y obtener la API Key
 * 3. Reemplazar 'YOUR_API_KEY' con tu clave real
 */
const GiphySearch = () => {
  const [searchTerm, setSearchTerm] = useState('funny cats');
  const [showResults, setShowResults] = useState(false);

  // IMPORTANTE: Reemplaza 'YOUR_API_KEY' con tu clave real de Giphy
  const GIPHY_API_KEY = 'YOUR_API_KEY';
  const { data, loading, error } = useFetch(
    showResults
      ? `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${GIPHY_API_KEY}&limit=10`
      : null
  );

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setShowResults(true);
    }
  };

  return (
    <div className="giphy-search-container">
      <h1>🎬 Buscador de GIFs</h1>
      <p className="subtitle">Busca GIFs usando Giphy API</p>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Busca un GIF (ej: funny cats, dancing, etc)"
          className="search-input"
        />
        <button type="submit" className="search-button">
          Buscar
        </button>
      </form>

      {loading && <p className="loading">⏳ Cargando GIFs...</p>}
      {error && <p className="error">❌ Error: {error}</p>}

      {data?.data && !loading && (
        <div>
          <p className="results-count">
            Se encontraron {data.data.length} GIFs
          </p>
          <div className="gifs-grid">
            {data.data.map((gif) => (
              <div key={gif.id} className="gif-card">
                <a
                  href={gif.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gif-link"
                >
                  <img
                    src={gif.images.fixed_height.url}
                    alt={gif.title}
                    className="gif-image"
                  />
                  <p className="gif-title">{gif.title || 'Sin título'}</p>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {!showResults && (
        <div className="info-box">
          <h3>⚙️ Configuración Requerida</h3>
          <ol>
            <li>Ve a <a href="https://developers.giphy.com/dashboard" target="_blank" rel="noopener noreferrer">Giphy Dashboard</a></li>
            <li>Crear una nueva aplicación</li>
            <li>Copiar tu API Key</li>
            <li>Reemplazar 'YOUR_API_KEY' en este archivo</li>
          </ol>
        </div>
      )}
    </div>
  );
};

export default GiphySearch;
