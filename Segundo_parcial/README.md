# Rutas a Clínicas · Medellín

Sistema web (React + Vite + TypeScript) que calcula rutas desde los **barrios de Medellín** hacia **clínicas y hospitales** de la ciudad usando varios algoritmos de grafos.

## 1. Descripción del problema

Ante una urgencia, una persona o una ambulancia necesita saber **a qué clínica ir y por dónde**. La ciudad puede verse como un **grafo ponderado**:

- **Nodos:** 19 barrios (uno por comuna, más algunos del Centro) y 7 clínicas/hospitales.
- **Aristas:** 43 conexiones viales no dirigidas entre nodos vecinos.
- **Pesos de cada arista:**
  - `distanciaKm`: distancia vial estimada (Haversine entre coordenadas × 1.35 de sinuosidad urbana).
  - `factorTrafico`: congestión de la vía, de 1.0 (libre) a 2.0 (muy congestionada).

El sistema debe:

1. Permitir escoger el **barrio de origen** (obligatorio).
2. Permitir escoger la **clínica destino** (opcional).
3. Entregar tres rutas:
   - **Más corta**: menor distancia total en km.
   - **Más larga**: el camino simple (sin repetir barrios) de mayor distancia. Sirve como referencia del peor caso y para comparar algoritmos.
   - **Más óptima**: menor **costo ponderado** = Σ (distancia × factor de tráfico). Es la que en la práctica llega más rápido.
4. Si **no hay clínica seleccionada**, evaluar todas las clínicas y escoger, para cada criterio, la que mejor lo cumple.

## 2. Solución

### 2.1 Modelo del grafo
`Graph` (en `src/graph/Graph.ts`) usa una **lista de adyacencia** (`Map<string, Vecino[]>`): memoria O(V + E) y vecinos en O(grado). Las clínicas son **nodos terminales**: una ruta llega a ellas pero no pasa a través de ellas.

### 2.2 Algoritmos

| Ruta / función | Algoritmo | Peso usado | Complejidad |
|---|---|---|---|
| Más corta | **Dijkstra** con montículo binario | `distanciaKm` | O((V + E) log V) |
| Más óptima | **A\*** con heurística Haversine | `distanciaKm × factorTrafico` | O((V + E) log V) peor caso, explora menos nodos |
| Más larga | **DFS + backtracking** | `distanciaKm` | O(V!) peor caso (problema NP-difícil) |
| Ranking / tramos | **BFS** | sin peso (saltos) | O(V + E) |

- **Dijkstra** calcula la distancia mínima del barrio a *todos* los nodos en una sola pasada; con eso se obtiene la ruta más corta y el ranking de clínicas.
- **A\*** usa `f(n) = g(n) + h(n)`, donde `h(n)` es la distancia en línea recta hasta la clínica. La heurística es **admisible** (nunca sobreestima) porque toda vía mide al menos su línea recta y el tráfico mínimo es 1.0; por eso A\* garantiza la ruta de menor costo explorando menos nodos que Dijkstra.
- **Ruta más larga:** el camino simple más largo es NP-difícil, así que no hay un "Dijkstra al revés" (invertir pesos crea ciclos negativos). Se exploran todos los caminos simples con DFS, marcando y desmarcando nodos (backtracking). Con 26 nodos toma milisegundos; hay un límite de seguridad de 2.000.000 expansiones y, si se alcanza, la ruta se marca como *aproximada*.
- **BFS** cuenta el número mínimo de tramos hasta cada clínica y confirma que todas son alcanzables.
- **`PriorityQueue`** es un min-heap propio usado por Dijkstra y A\*.

### 2.3 Ejemplo
Desde **La Candelaria** hacia **Clínica Las Américas**:

| Ruta | Camino | Distancia | Costo ponderado | Tiempo est. |
|---|---|---|---|---|
| Corta (Dijkstra) | Candelaria → Guayabal → Las Américas | 8.3 km | 13.59 | 27 min |
| Óptima (A\*) | Candelaria → Estadio → Laureles → Belén → Las Américas | 8.4 km | 11.64 | 23 min |
| Larga (DFS) | 18 tramos, pasa por 18 barrios | 50.6 km | 71.15 | 142 min |

La óptima mide 100 m más, pero evita la vía congestionada Candelaria–Guayabal (tráfico ×1.8) y llega unos 4 minutos antes.

### 2.4 Interfaz
- Selectores de barrio y clínica (opcional).
- Mapa SVG del grafo proyectado desde lat/lng: el grosor de cada vía indica el tráfico y el número indica los km. Las tres rutas se dibujan en colores distintos y se pueden ocultar o mostrar.
- Tarjetas con distancia, costo ponderado, tiempo estimado (30 km/h base), tramos, camino completo, algoritmo usado y nodos explorados.
- Tabla con todas las clínicas ordenadas por distancia mínima.

## 3. Estructura y aporte por desarrollador

```
rutas-clinicas-medellin/
├── package.json, vite.config.ts, tsconfig*.json, index.html   ← Dev 1
├── README.md                                                  ← Dev 1
└── src/
    ├── types/index.ts            ← Dev 1  Tipos compartidos (contrato entre capas)
    ├── data/                     ← Dev 1  barrios.ts, clinicas.ts, conexiones.ts
    ├── graph/                    ← Dev 1  Graph.ts (lista de adyacencia), geo.ts (Haversine)
    ├── algorithms/               ← Dev 2  PriorityQueue, dijkstra, aStar, longestPath, bfs, routeService
    │   └── __tests__/            ← Dev 2  Pruebas con Vitest (23 casos)
    ├── hooks/useRutas.ts         ← Dev 3  Estado de la app
    ├── components/               ← Dev 3  SelectorPanel, MapaGrafo, ResultadoRutas, TablaClinicas
    ├── App.tsx, main.tsx         ← Dev 3
    └── index.css                 ← Dev 3
```

| Entregable | Responsable | Contenido |
|---|---|---|
| `dev1-modelo-datos.zip` | Desarrollador 1 · Datos y grafo | Configuración Vite/TS, tipos, datos de Medellín, clase `Graph`, utilidades geográficas, README |
| `dev2-algoritmos.zip` | Desarrollador 2 · Algoritmos | Cola de prioridad, Dijkstra, A\*, DFS con backtracking, BFS, servicio de rutas y pruebas |
| `dev3-interfaz.zip` | Desarrollador 3 · Interfaz | Hook de estado, componentes React, mapa SVG y estilos |

## 4. Cómo ejecutar

Los tres zip comparten la misma estructura de carpetas. Descomprímelos **en la misma carpeta**:

```bash
mkdir rutas-clinicas-medellin && cd rutas-clinicas-medellin
unzip ../dev1-modelo-datos.zip
unzip ../dev2-algoritmos.zip
unzip ../dev3-interfaz.zip

npm install
npm run dev      # abre http://localhost:5173
npm test         # ejecuta las pruebas de algoritmos
npm run build    # compila para producción
```

Requisitos: Node.js 18 o superior.

## 5. Supuestos y límites
- Las coordenadas son aproximadas (centroides de comuna o barrio) y las distancias son estimadas, no de un servicio de mapas real.
- El factor de tráfico es fijo por vía; en una versión futura podría variar por hora del día.
- El grafo es no dirigido (no modela vías de un solo sentido).
