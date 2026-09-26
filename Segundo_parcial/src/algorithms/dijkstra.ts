import type { Graph } from '../graph/Graph';
import { PriorityQueue } from './PriorityQueue';
import { type CriterioPeso, pesoArista, puedeExpandir } from './utils';

export interface ResultadoDijkstra {
  distancias: Map<string, number>;
  previo: Map<string, string | null>;
  nodosExplorados: number;
}

/**
 * Dijkstra desde un origen hacia TODOS los nodos.
 * Complejidad: O((V + E) log V) con montículo binario.
 * Se usa para la RUTA MÁS CORTA (criterio 'distancia') y para el ranking de clínicas.
 */
export function dijkstra(g: Graph, origen: string, criterio: CriterioPeso = 'distancia'): ResultadoDijkstra {
  const distancias = new Map<string, number>();
  const previo = new Map<string, string | null>();
  const visitados = new Set<string>();
  const cola = new PriorityQueue<string>();

  for (const n of g.todosLosNodos()) distancias.set(n.id, Infinity);
  distancias.set(origen, 0);
  previo.set(origen, null);
  cola.insertar(origen, 0);

  while (!cola.estaVacia()) {
    const { valor: u } = cola.extraer()!;
    if (visitados.has(u)) continue; // entrada obsoleta en la cola
    visitados.add(u);
    if (!puedeExpandir(g, u, origen)) continue;

    for (const v of g.vecinos(u)) {
      const nueva = distancias.get(u)! + pesoArista(v, criterio);
      if (nueva < distancias.get(v.id)!) {
        distancias.set(v.id, nueva);
        previo.set(v.id, u);
        cola.insertar(v.id, nueva);
      }
    }
  }

  return { distancias, previo, nodosExplorados: visitados.size };
}
