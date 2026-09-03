/**
 * comparators.js — infraestructura compartida (ya implementada).
 *
 * Funciones comparadoras reutilizables: reciben dos tareas (a, b) y
 * devuelven un número negativo, cero o positivo, tal como espera
 * cualquier algoritmo de ordenamiento por comparación.
 *
 * Manuela las usa en useMergeSort.js / Toolbar.jsx, y Samuel puede
 * reutilizar `porFecha` (o el criterio que definan) en useInsertionSort.js.
 */

export const porFecha = (a, b) => new Date(a.fecha) - new Date(b.fecha)

export const porNombre = (a, b) => a.titulo.localeCompare(b.titulo, 'es', { sensitivity: 'base' })

export const porPrecio = (a, b) => a.precio - b.precio

/** Mapa de criterio -> función comparadora, para alimentar un <select>. */
export const COMPARADORES = {
  fecha: { label: 'Fecha', fn: porFecha },
  nombre: { label: 'Nombre', fn: porNombre },
  precio: { label: 'Precio', fn: porPrecio },
}
