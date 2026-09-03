import { PRIORIDADES, INDICE_PRIORIDAD } from '../utils/priorities.js'

/**
 * useCountingSort.js — Fase 2 · Algoritmo (Daniel)
 *
 * Ordena `items` por el campo `campo` (en esta app, siempre 'prioridad'),
 * aprovechando que PRIORIDADES tiene un rango fijo y pequeño
 * (Alta / Media / Baja) — el caso ideal para Counting Sort: NO es un
 * algoritmo por comparación, cuenta cuántos elementos caen en cada
 * valor posible.
 *
 * Firma: useCountingSort(items: Task[], campo: string): Task[]
 * Devuelve un arreglo NUEVO — no muta `items`.
 */
export function useCountingSort(items, campo) {
  const conteo = new Array(PRIORIDADES.length).fill(0)

  for (const item of items) {
    conteo[INDICE_PRIORIDAD[item[campo]]] += 1
  }

  const resultado = []
  for (const prioridad of PRIORIDADES) {
    for (const item of items) {
      if (item[campo] === prioridad) {
        resultado.push(item)
      }
    }
  }

  return resultado
}
