/**
 * mockTasks.js — TODO(Manuela): Fase 1 · Cimientos
 *
 * @typedef {Object} Task
 * @property {string} id
 * @property {string} titulo
 * @property {'Alta'|'Media'|'Baja'} prioridad
 * @property {string} fecha    - formato ISO, ej. '2026-09-10'
 * @property {number} precio
 *
 * Ya quedaron 3 tareas de ejemplo para que el proyecto arranque y se
 * pueda ver algo en pantalla. TODO: completar hasta tener al menos 8,
 * variando prioridad y fecha (necesitás datos variados para que el
 * benchmark y las 3 vistas tengan sentido al probarlas).
 */

/** @type {Task[]} */
export const mockTasks = [
  {
    id: 't1',
    titulo: 'Entregar informe de avance',
    prioridad: 'Alta',
    fecha: '2026-09-10',
    precio: 0,
  },
  {
    id: 't2',
    titulo: 'Comprar materiales de oficina',
    prioridad: 'Baja',
    fecha: '2026-09-18',
    precio: 45000,
  },
  {
    id: 't3',
    titulo: 'Revisar diseño de la app',
    prioridad: 'Media',
    fecha: '2026-09-12',
    precio: 0,
  },

  // TODO(Manuela): agregar al menos 5 tareas más acá.
]
