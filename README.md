# Lab 2 - Hooks y Fetch API

## Descripción

Este laboratorio demuestra el uso de **React Hooks** (`useState` y un hook personalizado `useFetch`) con la **Fetch API** para consumir datos de una API REST pública.

Se ha desarrollado un **Buscador de Pokémon** que utiliza la [PokéAPI](https://pokeapi.co/) como fuente de datos.

---

## Estructura del Proyecto

```
Lab 2/
├── useFetch.js              # Hook personalizado para hacer fetch
├── PokemonSearch.js         # Componente principal (usa useState y useFetch)
├── PokemonSearch.css        # Estilos del componente
├── App.js                   # Componente raíz de la aplicación
├── App.css                  # Estilos globales
├── index.js                 # Punto de entrada de React
├── index.html               # HTML base
├── package.json             # Dependencias del proyecto
├── vite.config.js           # Configuración de Vite
└── README.md                # Este archivo
```

---

## Hooks Utilizados

### 1. **useState**
```javascript
const [pokemonName, setPokemonName] = useState('pikachu');
```
- Maneja el estado del nombre/ID del Pokémon a buscar
- Se actualiza cuando el usuario escribe en el input

### 2. **useFetch** (Hook personalizado)
```javascript
const { data, loading, error } = useFetch(url);
```
- Hook personalizado que realiza llamadas a una API
- Maneja automáticamente:
  - Estados de carga (`loading`)
  - Datos recibidos (`data`)
  - Errores (`error`)
- Se actualiza automáticamente cuando la URL cambia

---

## Características del Componente PokemonSearch

**Búsqueda de Pokémon**: Busca por nombre o número de Pokédex

**Información Detallada**:
- Nombre, ID, peso, altura
- Tipos y habilidades
- Estadísticas visuales (HP, Ataque, Defensa, etc.)

**Interfaz Atractiva**:
- Diseño gradiente con colores modernos
- Imágenes oficiales del Pokémon
- Barras de estadísticas animadas
- Responsive design (funciona en móvil)

**Manejo de Errores**: Muestra mensajes claros si el Pokémon no existe

---

## API Utilizada: PokéAPI

**URL Base**: `https://pokeapi.co/api/v2/`

### Ejemplo de endpoint usado:
```
GET https://pokeapi.co/api/v2/pokemon/{name-or-id}
```

**Ventajas**:
- Gratuita (sin autenticación requerida)
- Datos completos de Pokémon
- Múltiples formatos de respuesta
- Bien documentada

---

## Cómo Ejecutar

### 1. **Instalar dependencias**
```bash
npm install
```

### 2. **Ejecutar en modo desarrollo**
```bash
npm run dev
```

La aplicación se abrirá automáticamente en `http://localhost:3000`

### 3. **Compilar para producción**
```bash
npm run build
```

---

## Ejemplo de Uso

```javascript
// Hook personalizado useFetch
const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error ${response.status}`);
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

// Uso en componente
const PokemonSearch = () => {
  const [pokemonName, setPokemonName] = useState('pikachu');
  const { data, loading, error } = useFetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
  );

  // ... render
};
```

---

## Conceptos Clave Demostrados

| Concepto | Descripción |
|----------|-------------|
| **useState** | Manejo de estado local en componentes funcionales |
| **useEffect** | Efectos secundarios (llamadas a API) |
| **Custom Hooks** | Crear lógica reutilizable |
| **Fetch API** | Realizar peticiones HTTP |
| **Async/Await** | Manejo de asincronía |
| **Error Handling** | Control de errores en peticiones |
| **Loading States** | Indicadores de carga |

---

## Alternativas de APIs Sugeridas

Pueda usar cualquiera de estas APIs públicas para adaptar el proyecto:

1. **PokéAPI** (usado en este proyecto)
   - https://pokeapi.co/

2. **Giphy API** (sugerida en el Lab)
   - https://developers.giphy.com/dashboard

3. **JSONPlaceholder** (para práctica)
   - https://jsonplaceholder.typicode.com/

4. **Open Weather API**
   - https://openweathermap.org/api

---

## Autor
**Lab 2 - Desarrollo con React Hooks y Fetch API**

---

## Licencia
Libre para uso educativo
