/**
 * mockTasks.js — Fase 1 · Cimientos (Manuela)
 *
 * @typedef {Object} Task
 * @property {string} id
 * @property {string} titulo
 * @property {'Alta'|'Media'|'Baja'} prioridad
 * @property {string} fecha    - formato ISO, ej. '2026-09-10'
 * @property {number} precio
 *
 * 8 tareas de ejemplo con prioridad, fecha y precio variados, para que
 * las 3 vistas (y sus algoritmos de ordenamiento) tengan sentido al probarlas.
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
  {
    id: 't4',
    titulo: 'Pagar servicio de hosting',
    prioridad: 'Alta',
    fecha: '2026-09-05',
    precio: 12000,
  },
  {
    id: 't5',
    titulo: 'Actualizar documentación del proyecto',
    prioridad: 'Baja',
    fecha: '2026-09-20',
    precio: 0,
  },
  {
    id: 't6',
    titulo: 'Coordinar reunión con el cliente',
    prioridad: 'Alta',
    fecha: '2026-09-08',
    precio: 0,
  },
  {
    id: 't7',
    titulo: 'Renovar licencia de software',
    prioridad: 'Media',
    fecha: '2026-09-15',
    precio: 89990,
  },
  {
    id: 't8',
    titulo: 'Organizar archivos del repositorio',
    prioridad: 'Baja',
    fecha: '2026-09-11',
    precio: 0,
  },
]
