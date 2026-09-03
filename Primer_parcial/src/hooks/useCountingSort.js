import { PRIORIDADES, INDICE_PRIORIDAD } from '../utils/priorities.js'

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
