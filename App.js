import React from 'react';
import PokemonSearch from './PokemonSearch';
import './App.css';

/**
 * Componente App
 * Componente principal que integra el buscador de Pokémon
 */
function App() {
  return (
    <div className="app">
      <PokemonSearch />
    </div>
  );
}

export default App;
