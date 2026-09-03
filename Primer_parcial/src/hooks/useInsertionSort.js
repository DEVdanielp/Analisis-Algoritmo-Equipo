/**
 * useInsertionSort.js — TODO(Samuel): Fase 2 · Algoritmo
 *
 * Debe insertar `nuevoItem` dentro de `items` (ya ordenado) en su
 * posición correcta según `compareFn`, SIN reordenar todo el arreglo
 * desde cero y SIN usar Array.prototype.sort.
 *
 * Firma esperada:
 *   useInsertionSort(items: Task[], nuevoItem: Task, compareFn: (a, b) => number): Task[]
 *
 * Debe devolver un arreglo NUEVO — no mutar `items`.
 *
 * Pista: recorré `items` de derecha a izquierda comparando con
 * `nuevoItem` y desplazá cada elemento mayor una posición, tal como
 * ordenarías una carta nueva dentro de una mano de cartas ya ordenada.
 */
export function useInsertionSort(items, nuevoItem, compareFn) {
  // TODO(Samuel): reemplazar este placeholder por la inserción real.
  console.warn('useInsertionSort: todavía no implementado — se agrega al final sin ordenar')
  return [...items, nuevoItem]
}
