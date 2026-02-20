import React, { useState } from 'react';
import useFetch from './useFetch';
import './PokemonSearch.css';

/**
 * Componente PokemonSearch
 * Utiliza 2 hooks:
 * 1. useState - para manejar el nombre/ID del Pokémon buscado
 * 2. useFetch - para obtener los datos del Pokémon de PokéAPI
 */
const PokemonSearch = () => {
  const [pokemonName, setPokemonName] = useState('pikachu');
  const { data, loading, error } = useFetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
  );

  const handleSearch = (e) => {
    e.preventDefault();
    // El useFetch se actualiza automáticamente cuando pokemonName cambia
  };

  return (
    <div className="pokemon-search-container">
      <h1>🔍 Buscador de Pokémon</h1>
      <p className="subtitle">Busca tu Pokémon favorito usando PokéAPI</p>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={pokemonName}
          onChange={(e) => setPokemonName(e.target.value)}
          placeholder="Ingresa el nombre o número del Pokémon"
          className="search-input"
        />
        <button type="submit" className="search-button">
          Buscar
        </button>
      </form>

      {loading && <p className="loading">⏳ Cargando...</p>}
      {error && <p className="error">❌ Error: {error}</p>}

      {data && !loading && (
        <div className="pokemon-card">
          <h2 className="pokemon-name">
            {data.name.charAt(0).toUpperCase() + data.name.slice(1)}
          </h2>
          <div className="pokemon-image-container">
            <img
              src={
                data.sprites?.other?.['official-artwork']?.front_default ||
                data.sprites?.front_default
              }
              alt={data.name}
              className="pokemon-image"
            />
          </div>

          <div className="pokemon-info">
            <div className="info-row">
              <span className="label">ID:</span>
              <span className="value">#{data.id}</span>
            </div>
            <div className="info-row">
              <span className="label">Peso:</span>
              <span className="value">{data.weight / 10} kg</span>
            </div>
            <div className="info-row">
              <span className="label">Altura:</span>
              <span className="value">{data.height / 10} m</span>
            </div>

            <div className="info-row">
              <span className="label">Tipos:</span>
              <span className="value">
                {data.types.map((t) => t.type.name).join(', ')}
              </span>
            </div>

            <div className="info-row">
              <span className="label">Habilidades:</span>
              <span className="value">
                {data.abilities.map((a) => a.ability.name).join(', ')}
              </span>
            </div>
          </div>

          {data.stats && (
            <div className="stats-section">
              <h3>Estadísticas</h3>
              <div className="stats-grid">
                {data.stats.map((stat) => (
                  <div key={stat.stat.name} className="stat-item">
                    <span className="stat-name">
                      {stat.stat.name.toUpperCase()}
                    </span>
                    <div className="stat-bar">
                      <div
                        className="stat-fill"
                        style={{
                          width: `${(stat.base_stat / 150) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <span className="stat-value">{stat.base_stat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PokemonSearch;
