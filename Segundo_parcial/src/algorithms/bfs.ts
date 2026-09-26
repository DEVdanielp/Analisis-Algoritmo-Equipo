import type { Graph } from '../graph/Graph';
import { puedeExpandir } from './utils';

/**
 * BFS (búsqueda en anchura): número mínimo de tramos (saltos) desde el
 * origen hasta cada nodo, ignorando los pesos. O(V + E).
 * Se usa para validar conectividad y mostrar "cantidad de tramos" en el ranking.
 */
export function bfsSaltos(g: Graph, origen: string): Map<string, number> {
  const saltos = new Map<string, number>([[origen, 0]]);
  const cola: string[] = [origen];
  let i = 0;
  while (i < cola.length) {
    const u = cola[i++];
    if (!puedeExpandir(g, u, origen)) continue;
    for (const v of g.vecinos(u)) {
      if (!saltos.has(v.id)) {
        saltos.set(v.id, saltos.get(u)! + 1);
        cola.push(v.id);
      }
    }
  }
  return saltos;
}
