/**
 * priorities.js — infraestructura compartida (ya implementada).
 *
 * Rango fijo y pequeño de prioridades: es justamente lo que hace que
 * Counting Sort tenga sentido para `useCountingSort.js` (Daniel) — en vez
 * de comparar elementos de a pares, se cuenta cuántas tareas caen en cada
 * uno de estos 3 valores conocidos de antemano.
 */

export const PRIORIDADES = ['Alta', 'Media', 'Baja']

/** Alta -> 0, Media -> 1, Baja -> 2. Útil como índice del arreglo de conteo. */
export const INDICE_PRIORIDAD = Object.fromEntries(
  PRIORIDADES.map((prioridad, indice) => [prioridad, indice]),
)
