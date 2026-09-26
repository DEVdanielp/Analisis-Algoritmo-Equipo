# Rutas a Clínicas · Medellín

Sistema web (React + Vite + TypeScript) que calcula rutas desde los **barrios de Medellín** hacia **clínicas y hospitales** de la ciudad usando varios algoritmos de grafos.

## 1. Descripción del problema

Ante una urgencia, una persona o una ambulancia necesita saber **a qué clínica ir y por dónde**. La ciudad puede verse como un **grafo ponderado**:

- **Nodos:** 19 barrios (uno por comuna, más algunos del Centro) y 7 clínicas/hospitales.
- **Aristas:** 43 conexiones viales no dirigidas entre nodos vecinos.
- **Pesos de cada arista:**
  - `distanciaKm`: distancia vial estimada (Haversine entre coordenadas × 1.35 de sinuosidad urbana).
  - `factorTrafico`: congestión de la vía, de 1.0 (libre) a 2.0 (muy congestionada).

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

## 3. Cómo ejecutar

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