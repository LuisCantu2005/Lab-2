# Documentación Detallada - Hooks y Fetch API

## Tabla de contenidos
1. [Conceptos Fundamentales](#conceptos-fundamentales)
2. [Hook useState](#hook-usestate)
3. [Hook useFetch Personalizado](#hook-usefetch-personalizado)
4. [Implementación en Componentes](#implementación-en-componentes)
5. [APIs Disponibles](#apis-disponibles)
6. [Mejores Prácticas](#mejores-prácticas)

---

## Conceptos Fundamentales

### Qué son los Hooks
Los Hooks son funciones especiales en React que te permiten usar características de React en componentes funcionales. Los dos hooks principales usados en este lab son:

1. **useState**: Para manejar estado local
2. **useEffect**: Para efectos secundarios (llamadas a API)

### Qué es la Fetch API
La Fetch API es una interfaz moderna para hacer peticiones HTTP desde JavaScript. Reemplaza el uso de XMLHttpRequest y es más clara y poderosa.

```javascript
// Sintaxis básica
fetch(url)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));

// Con async/await
const data = await fetch(url).then(r => r.json());
```

---

## Hook useState

### Definición
El hook `useState` permite agregar estado local a componentes funcionales.

### Sintaxis
```javascript
const [state, setState] = useState(initialValue);
```

- `state`: Valor actual del estado
- `setState`: Función para actualizar el estado
- `initialValue`: Valor inicial del estado

### Ejemplo en PokemonSearch
```javascript
const [pokemonName, setPokemonName] = useState('pikachu');

// El usuario escribe en el input
const handleChange = (e) => {
  setPokemonName(e.target.value); // Actualiza el estado
};

// Usar en JSX
<input 
  value={pokemonName}
  onChange={handleChange}
  placeholder="Busca un Pokémon"
/>
```

### Puntos clave
- Cada llamada a `setState` causa un re-render
- El valor inicial solo se usa en el primer render
- `setState` es asincrónico (el estado no se actualiza inmediatamente)
- Puedes tener múltiples `useState` en un componente

---

## Hook useFetch Personalizado

### ¿Por qué crear un Hook personalizado?
React proporciona hooks básicos, pero a menudo necesitamos crear lógica reutilizable. Un hook personalizado es una función que usa otros hooks internamente.

### Implementación Completa
```javascript
import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);           // Datos de la API
  const [loading, setLoading] = useState(true);     // Estado de carga
  const [error, setError] = useState(null);         // Errores

  useEffect(() => {
    if (!url) return; // No hacer nada si no hay URL

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Realizar la petición
        const response = await fetch(url);
        
        // Verificar si la respuesta fue exitosa
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        // Parsear JSON
        const result = await response.json();
        setData(result);

      } catch (err) {
        // Capturar errores
        setError(err.message);
        setData(null);

      } finally {
        // Siempre se ejecuta al final
        setLoading(false);
      }
    };

    fetchData(); // Llamar la función asincrónica

  }, [url]); // Dependencia: se ejecuta cuando 'url' cambia

  return { data, loading, error };
};

export default useFetch;
```

### Flujo de Ejecución
```
1. Componente se monta
   ↓
2. useEffect se ejecuta (porque url está en las dependencias)
   ↓
3. setLoading(true) → re-render
   ↓
4. fetch() se ejecuta
   ↓
5. Respuesta se parsea
   ↓
6. setData(result) → re-render
   ↓
7. setLoading(false) → re-render
   ↓
8. Componente muestra los datos
```

### Estados del Hook
```javascript
// Cargando
{ data: null, loading: true, error: null }

// Éxito
{ data: {...}, loading: false, error: null }

// Error
{ data: null, loading: false, error: "Error message" }
```

---

## Implementación en Componentes

### Componente PokemonSearch

```javascript
import React, { useState } from 'react';
import useFetch from './useFetch';

const PokemonSearch = () => {
  // Hook 1: useState para el término de búsqueda
  const [pokemonName, setPokemonName] = useState('pikachu');

  // Hook 2: useFetch para obtener datos de la API
  const { data, loading, error } = useFetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
  );

  // Manejar cambios en el input
  const handleSearch = (e) => {
    e.preventDefault();
    // El useFetch se actualiza automáticamente
  };

  return (
    <div>
      {/* Input de búsqueda */}
      <input
        value={pokemonName}
        onChange={(e) => setPokemonName(e.target.value)}
        placeholder="Busca un Pokémon"
      />

      {/* Estados de la petición */}
      {loading && <p>Cargando...</p>}
      {error && <p>Error: {error}</p>}

      {/* Mostrar datos cuando estén listos */}
      {data && !loading && (
        <div>
          <h2>{data.name}</h2>
          <img src={data.sprites.front_default} alt={data.name} />
          <p>Peso: {data.weight}</p>
          <p>Altura: {data.height}</p>
        </div>
      )}
    </div>
  );
};
```

### Flujo Completo del Usuario
```
Usuario escribe "charizard" en el input
         ↓
setPokemonName("charizard")
         ↓
Componente re-renderiza
         ↓
URL de useFetch cambia
         ↓
useEffect se ejecuta
         ↓
setLoading(true) → "Cargando..."
         ↓
fetch de https://pokeapi.co/api/v2/pokemon/charizard
         ↓
Respuesta recibida
         ↓
setData(response) → Mostrar datos
         ↓
setLoading(false) → Ocultar "Cargando..."
```

---

## APIs Disponibles

### 1. PokéAPI (utilizada en este Lab)

**URL Base**: `https://pokeapi.co/api/v2/`

**Ventajas**:
- Sin autenticación requerida
- Datos completos
- Muy bien documentada
- Gratuita y sin límite de peticiones

**Ejemplo de Endpoints**:
```javascript
// Obtener Pokémon por nombre
GET https://pokeapi.co/api/v2/pokemon/pikachu

// Obtener Pokémon por ID
GET https://pokeapi.co/api/v2/pokemon/1

// Obtener tipo de Pokémon
GET https://pokeapi.co/api/v2/type/electric

// Obtener generación
GET https://pokeapi.co/api/v2/generation/1
```

**Respuesta Ejemplo**:
```json
{
  "id": 25,
  "name": "pikachu",
  "height": 4,
  "weight": 60,
  "sprites": {
    "front_default": "https://..."
  },
  "types": [
    { "type": { "name": "electric" } }
  ],
  "abilities": [
    { "ability": { "name": "static" } }
  ]
}
```

### 2. Giphy API (alternativa)

**Documentación**: https://developers.giphy.com/docs/api/

**Pasos para usar**:
1. Ir a https://developers.giphy.com/dashboard
2. Crear una cuenta (o iniciar sesión)
3. Crear una nueva aplicación
4. Obtener tu API Key
5. Usar en tus peticiones

**Ejemplo de uso**:
```javascript
const GIPHY_API_KEY = 'tu_clave_aqui';

const searchGifs = async (query) => {
  const url = `https://api.giphy.com/v1/gifs/search?q=${query}&api_key=${GIPHY_API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
```

**Ventajas**:
- Excelente para buscar GIFs
- Grandes datasets
- API RESTful clara
- Documentación excelente

**Desventajas**:
- Requiere API Key
- Tiene límites de rate limit en plan gratuito

### 3. Otros Ejemplos

**JSONPlaceholder** (Datos ficticios para pruebas)
```javascript
// Posts
GET https://jsonplaceholder.typicode.com/posts

// Usuarios
GET https://jsonplaceholder.typicode.com/users
```

**OpenWeatherMap** (Datos del clima)
```javascript
GET https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={key}
```

**GitHub API**
```javascript
GET https://api.github.com/users/{username}
```

---

## Mejores Prácticas

### 1. Validar URLs y Parámetros
```javascript
const useFetch = (url) => {
  useEffect(() => {
    if (!url || typeof url !== 'string') return;
    // ... resto del código
  }, [url]);
};
```

### 2. Implementar Timeout
```javascript
const fetchWithTimeout = async (url, timeout = 5000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};
```

### 3. Cancelar Peticiones en Limpieza
```javascript
const useFetch = (url) => {
  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const response = await fetch(url, { signal: controller.signal });
        // ...
      } catch (error) {
        if (error.name !== 'AbortError') {
          setError(error.message);
        }
      }
    };

    fetchData();

    return () => controller.abort(); // Limpiar al desmontar
  }, [url]);
};
```

### 4. Cachear Resultados
```javascript
const useFetch = (url) => {
  const [cache, setCache] = useState({});

  useEffect(() => {
    if (cache[url]) {
      setData(cache[url]);
      return;
    }
    // Fetch y guardar en cache
  }, [url, cache]);
};
```

### 5. Evitar Re-renders Innecesarios
```javascript
const MyComponent = React.memo(({ data }) => {
  return <div>{data}</div>;
});
```

---

## Resumen

| Concepto | Uso | Ejemplo |
|----------|-----|---------|
| **useState** | Manejar estado local | `const [value, setValue] = useState(initialValue)` |
| **useEffect** | Efectos secundarios | `useEffect(() => {...}, [dependencies])` |
| **useFetch** | Obtener datos de API | `const {data, loading, error} = useFetch(url)` |
| **fetch** | Hacer peticiones HTTP | `fetch(url).then(r => r.json())` |
| **async/await** | Manejar asincronía | `const data = await fetch(url)` |

---

**Felicidades! Ahora entiendes cómo usar Hooks y Fetch API en React.**
