/**
 * useMergeSort.js — Fase 2 · Algoritmo (Manuela)
 *
 * Ordenamiento general de la app. Ordena `items` según `compareFn`
 * usando Merge Sort implementado a mano — sin Array.prototype.sort —
 * dividiendo el arreglo recursivamente y combinando (merge) las
 * mitades ya ordenadas.
 *
 * Firma esperada:
 *   useMergeSort(items: Task[], compareFn: (a, b) => number): Task[]
 *
 * Estable: si compareFn devuelve 0 para dos tareas, conservan su orden
 * relativo original. Devuelve un arreglo NUEVO — no muta `items`.
 */

function merge(izquierda, derecha, compareFn) {
  const resultado = []
  let i = 0
  let j = 0

  while (i < izquierda.length && j < derecha.length) {
    if (compareFn(izquierda[i], derecha[j]) <= 0) {
      resultado.push(izquierda[i])
      i++
    } else {
      resultado.push(derecha[j])
      j++
    }
  }

  while (i < izquierda.length) {
    resultado.push(izquierda[i])
    i++
  }

  while (j < derecha.length) {
    resultado.push(derecha[j])
    j++
  }

  return resultado
}

function mergeSort(items, compareFn) {
  if (items.length <= 1) {
    return items
  }

  const medio = Math.floor(items.length / 2)
  const izquierda = mergeSort(items.slice(0, medio), compareFn)
  const derecha = mergeSort(items.slice(medio), compareFn)

  return merge(izquierda, derecha, compareFn)
}

export function useMergeSort(items, compareFn) {
  return mergeSort(items, compareFn)
}
