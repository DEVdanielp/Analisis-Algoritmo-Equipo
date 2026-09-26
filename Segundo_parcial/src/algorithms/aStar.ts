import type { Graph } from '../graph/Graph';
import { haversineKm } from '../graph/geo';
import { PriorityQueue } from './PriorityQueue';
import { pesoArista, puedeExpandir, reconstruirCamino } from './utils';

export interface ResultadoAStar {
  camino: string[] | null;
  costo: number;
  nodosExplorados: number;
}

/**
 * A* (A estrella) entre origen y destino minimizando el COSTO PONDERADO
 * (distancia × factor de tráfico). Se usa para la RUTA ÓPTIMA.
 *
 * Heurística h(n) = distancia en línea recta (Haversine) hasta el destino.
 * Es admisible porque toda arista mide ≥ su línea recta (factor vial ≥ 1)
 * y el factor de tráfico mínimo es 1.0, así que nunca sobreestima.
 * f(n) = g(n) + h(n).
 */
export function aStar(g: Graph, origen: string, destino: string): ResultadoAStar {
  const meta = g.nodo(destino);
  const h = (id: string) => haversineKm(g.nodo(id), meta);

  const gCosto = new Map<string, number>([[origen, 0]]);
  const previo = new Map<string, string | null>([[origen, null]]);
  const cerrados = new Set<string>();
  const abiertos = new PriorityQueue<string>();
  abiertos.insertar(origen, h(origen));

  while (!abiertos.estaVacia()) {
    const { valor: u } = abiertos.extraer()!;
    if (cerrados.has(u)) continue;
    cerrados.add(u);

    if (u === destino) {
      return { camino: reconstruirCamino(previo, destino), costo: gCosto.get(u)!, nodosExplorados: cerrados.size };
    }
    if (!puedeExpandir(g, u, origen)) continue;

    for (const v of g.vecinos(u)) {
      if (cerrados.has(v.id)) continue;
      const tentativo = gCosto.get(u)! + pesoArista(v, 'ponderado');
      if (tentativo < (gCosto.get(v.id) ?? Infinity)) {
        gCosto.set(v.id, tentativo);
        previo.set(v.id, u);
        abiertos.insertar(v.id, tentativo + h(v.id));
      }
    }
  }
  return { camino: null, costo: Infinity, nodosExplorados: cerrados.size };
}
