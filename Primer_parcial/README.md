# TriOrder

Gestor de tareas en React con 3 algoritmos de ordenamiento implementados a mano, uno por integrante. Sin backend — todo el estado vive en memoria, a través de hooks. (Plan completo del equipo: ver el documento publicado aparte.)

## Arrancar el proyecto

```bash
npm install
npm run dev
```

Abre en `http://localhost:5173`. El proyecto corre desde el primer momento, aunque nadie haya tocado su parte todavía — cada pieza sin implementar muestra un aviso en consola y un resultado "sin ordenar" en vez de romper la app.

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

### Ya implementado (infraestructura compartida — no es de nadie en particular)

- `src/App.jsx`, `src/main.jsx`, `src/index.css`
- `src/components/TaskCard.jsx`
- `src/utils/comparators.js`, `src/utils/priorities.js`

## Orden sugerido

1. **Cimientos** (los tres en paralelo): modelo de datos, `useTasks`, layout — sin esto, nada más funciona.
2. **Algoritmos** (los tres en paralelo, cada uno en su rama): implementar el hook propio y ver la vista correspondiente cobrar vida.
3. **Integración**: pruebas de casos borde (vacío, 1 elemento, duplicados, ya ordenado, orden inverso), pulido y demo.

## Regla del proyecto

Ningún hook de ordenamiento puede usar `Array.prototype.sort`. Los tres se implementan a mano.
