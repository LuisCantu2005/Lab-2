# Lab 2 - Guía Rápida de Uso 📋

## ¿Qué se entrega?

✅ **Componente principal**: `PokemonSearch.js`
- Utiliza **useState** para el estado de búsqueda
- Utiliza **useFetch** (hook personalizado) para obtener datos de la API
- Interface atractiva con estilos CSS

✅ **Hook personalizado**: `useFetch.js`
- Hace llamadas a APIs REST
- Maneja estados: loading, datos, errores
- Reutilizable en cualquier componente

✅ **Documentación completa**: 
- `README.md` - Guía general del proyecto
- `DOCUMENTACION.md` - Explicación detallada de conceptos

---

## Instalación y Ejecución

### Paso 1: Instalar dependencias
```bash
npm install
```

### Paso 2: Ejecutar el proyecto
```bash
npm run dev
```

La aplicación se abrirá automáticamente en `http://localhost:3000`

---

## Estructura del Proyecto

```
Lab 2/
│
├── 📄 useFetch.js                    ← Hook personalizado (ENTREGA)
├── 📄 PokemonSearch.js               ← Componente principal (ENTREGA)
├── 📄 PokemonSearch.css              ← Estilos
├── 📄 GiphySearch.js                 ← Alternativa con Giphy
├── 📄 GiphySearch.css
│
├── 📄 App.js                         ← Componente raíz
├── 📄 App.css
├── 📄 index.js                       ← Punto de entrada React
├── 📄 index.html                     ← HTML base
│
├── 📄 vite.config.js                 ← Config Vite
├── 📄 package.json                   ← Dependencias
│
├── 📚 README.md                      ← Documentación general
├── 📚 DOCUMENTACION.md               ← Documentación detallada
├── 📚 GUIA_RAPIDA.md                 ← Este archivo
├── 📄 .gitignore
```

---

## Los 2 Hooks Utilizados

### 1️⃣ useState
```javascript
const [pokemonName, setPokemonName] = useState('pikachu');
```
**Propósito**: Guardar el nombre del Pokémon que el usuario busca

### 2️⃣ useFetch (personalizado)
```javascript
const { data, loading, error } = useFetch(
  `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
);
```
**Propósito**: Obtener datos del Pokémon de la API

---

## API Utilizada

### PokéAPI
- 🔗 https://pokeapi.co/api/v2/
- ✅ **Gratis, sin autenticación**
- 📊 Datos completos de todos los Pokémon
- 📝 Muy bien documentada

### Ejemplo de petición:
```javascript
// Por nombre
fetch('https://pokeapi.co/api/v2/pokemon/pikachu')

// Por ID
fetch('https://pokeapi.co/api/v2/pokemon/25')
```

---

## Características del Componente PokemonSearch

|  Característica | Descripción |
|---|---|
| 🔍 **Búsqueda** | Busca Pokémon por nombre o ID |
| 📸 **Imagen** | Muestra la imagen oficial del Pokémon |
| 📊 **Estadísticas** | Grafo de HP, Ataque, Defensa, etc. |
| ℹ️ **Información** | Peso, altura, tipos, habilidades |
| ⚡ **Estado de carga** | Indicador visual mientras carga |
| ⚠️ **Manejo de errores** | Mensajes claros de error |
| 📱 **Responsive** | Funciona en desktop y móvil |

---

## Cómo funciona el flujo

```
┌─────────────────────┐
│ Usuario escribe en  │
│ el input: "pikachu" │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│ setPokemonName      │
│ actualiza estado    │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│ Componente          │
│ re-renderiza        │
└──────────┬──────────┘
           ↓
┌─────────────────────┐          ┌──────────────────┐
│ URL de useFetch     │          │ setLoading(true) │
│ cambia              │ ────────→ │ "Cargando..."    │
└──────────┬──────────┘          └──────────────────┘
           ↓
┌─────────────────────┐
│ useEffect se        │
│ ejecuta             │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│ fetch() a           │
│ PokéAPI             │
└──────────┬──────────┘
           ↓
┌─────────────────────┐          ┌──────────────────┐
│ Respuesta JSON      │          │ setData(response)│
│ recibida            │ ────────→ │ Mostrar datos    │
└──────────┬──────────┘          └──────────────────┘
           ↓
┌─────────────────────┐          ┌──────────────────┐
│ setParsing          │          │ setLoading(false)│
│ completado          │ ────────→ │ Ocultar "Cargando"
└─────────────────────┘          └──────────────────┘
```

---

## Alternativa: Usar Giphy API

Si deseas adaptar el código para usar Giphy:

1. **Ir a**: https://developers.giphy.com/dashboard
2. **Crear aplicación** y obtener API Key
3. **Usar el componente**: `GiphySearch.js`
4. **Reemplazar**: `'YOUR_API_KEY'` con tu clave real

```javascript
const GIPHY_API_KEY = 'tu_clave_aqui';

const url = `https://api.giphy.com/v1/gifs/search?q=${query}&api_key=${GIPHY_API_KEY}`;
const { data, loading, error } = useFetch(url);
```

---

## Conceptos Clave Aprendidos ✓

- ✅ **useState** - Manejo de estado en componentes funcionales
- ✅ **useEffect** - Efectos secundarios y ciclo de vida
- ✅ **Custom Hooks** - Crear hooks reutilizables
- ✅ **Fetch API** - Hacer peticiones HTTP
- ✅ **async/await** - Manejar asincronía
- ✅ **Error handling** - Control de errores
- ✅ **Loading states** - Estados de carga
- ✅ **Conditional rendering** - Renderizado condicional

---

## Comandos Útiles

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Compilar para producción
npm run build

# Ver vista previa de la build
npm run preview
```

---

## Contacto y Ayuda

Si tienes dudas sobre:
- ¿Cómo funcionan los Hooks? → Ver `DOCUMENTACION.md`
- ¿Cómo usar la API? → Ver `README.md`
- ¿Cómo correr el proyecto? → Ver esta sección "Instalación y Ejecución"

---

**¡El proyecto está listo para usar! 🚀**
