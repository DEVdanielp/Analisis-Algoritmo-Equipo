# TriOrder


## Contexto del problema

Una empresa no cuenta con un sistema para ordenar y priorizar sus tareas, por lo que no se cumplen las métricas del equipo. Como respuesta, se proponen 3 formas de ordenar esas mismas tareas — cada una resuelta con un algoritmo de ordenamiento distinto — para comparar enfoques y cubrir cada vista de la app (lista general, alta de tareas y tablero por prioridad).

## Algoritmo usado

Algoritmos de ordenamiento, implementados a mano (sin `Array.prototype.sort`), uno por integrante:

- **Insertion Sort** — Samuel, inserta cada tarea nueva ya en su posición ordenada.
- **Merge Sort** — Manuela, ordena la lista general de tareas.
- **Counting Sort** — Daniel, ordena el tablero por prioridad (Alta / Media / Baja).


## Quién implementa qué

Cada archivo listado abajo tiene un comentario `TODO(Nombre)` al principio explicando exactamente qué hacer. **No edites archivos fuera de tu lista** — así evitamos conflictos de merge entre los tres.

### Manuela — Merge Sort

- `src/data/mockTasks.js` — completar hasta 8 tareas de ejemplo
- `src/hooks/useMergeSort.js` — el algoritmo
- `src/components/Toolbar.jsx` — ya conectado, solo depende del hook

### Samuel — Insertion Sort

- `src/hooks/useTasks.js` — estado central (agregar / editar / eliminar)
- `src/context/TasksContext.jsx` — normalmente no hace falta tocarlo
- `src/hooks/useInsertionSort.js` — el algoritmo
- `src/components/FormularioTarea.jsx` — ya conectado, solo depende del hook

### Daniel — Counting Sort

- `src/hooks/useCountingSort.js` — el algoritmo
- `src/components/TableroPrioridad.jsx` — ya conectado, solo depende del hook
- `src/components/TareasSinOrdenar.jsx` — pestaña "Sin ordenar", muestra el problema (tareas sin ordenar) antes del tablero
