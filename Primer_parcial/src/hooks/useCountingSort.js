import { PRIORIDADES, INDICE_PRIORIDAD } from '../utils/priorities.js'

/**
 * useCountingSort.js — TODO(Daniel): Fase 2 · Algoritmo
 *
 * Agrupa/ordena `items` por el campo `campo` (en esta app, siempre
 * 'prioridad'), aprovechando que PRIORIDADES tiene un rango fijo y
 * pequeño (Alta / Media / Baja) — el caso ideal para Counting Sort:
 * NO es un algoritmo por comparación, cuenta cuántos elementos caen
 * en cada valor posible.
 *
 * Firma esperada:
 *   useCountingSort(items: Task[], campo: string): Task[]
 *
 * Pasos (sin usar Array.prototype.sort):
 *   1. Crear un arreglo de conteo de tamaño PRIORIDADES.length, en ceros.
 *   2. Recorrer `items` una vez y, por cada uno, incrementar
 *      conteo[INDICE_PRIORIDAD[item[campo]]].
 *   3. Recorrer PRIORIDADES en orden y, para cada prioridad, agregar al
 *      resultado todas las tareas de `items` que tengan esa prioridad.
 *
 * Debe devolver un arreglo NUEVO — no mutar `items`.
 */
export function useCountingSort(items, campo) {
  // TODO(Daniel): reemplazar este placeholder por counting sort real.
  console.warn('useCountingSort: todavía no implementado — se devuelve la lista sin ordenar')
  return [...items]
}

/**
 * agruparPorPrioridad — pequeño helper ya implementado para que
 * TableroPrioridad.jsx tenga algo con qué armar las 3 columnas
 * mientras conectás useCountingSort. Una vez que el hook de arriba
 * funcione, TableroPrioridad puede usar directamente su resultado.
 */
export function agruparPorPrioridad(items) {
  return PRIORIDADES.reduce((grupos, prioridad) => {
    grupos[prioridad] = items.filter((item) => item.prioridad === prioridad)
    return grupos
  }, {})
}
