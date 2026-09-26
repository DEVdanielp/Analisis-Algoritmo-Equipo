import type { Graph } from '../graph/Graph';
import { puedeExpandir } from './utils';

export interface ResultadoRutaLarga {
  /** Mejor camino encontrado por cada clínica objetivo. */
  mejores: Map<string, { camino: string[]; distanciaKm: number }>;
  nodosExplorados: number;
  /** true si se alcanzó el límite de exploración (resultado aproximado). */
  truncado: boolean;
}

/**
 * RUTA MÁS LARGA: camino SIMPLE (sin repetir nodos) de mayor distancia.
 *
 * El problema del camino más largo es NP-difícil en grafos generales, así
 * que no existe un algoritmo tipo Dijkstra para él. Se resuelve con
 * DFS + BACKTRACKING: se exploran todos los caminos simples marcando y
 * desmarcando nodos visitados. Complejidad peor caso O(V!), aceptable para
 * un grafo de ~26 nodos. Se incluye un límite de seguridad de expansiones.
 */
export function rutaMasLarga(
  g: Graph,
  origen: string,
  objetivos: Set<string>,
  limiteExpansiones = 2_000_000,
): ResultadoRutaLarga {
  const mejores = new Map<string, { camino: string[]; distanciaKm: number }>();
  const visitado = new Set<string>([origen]);
  const camino: string[] = [origen];
  let expansiones = 0;
  let truncado = false;

  const dfs = (u: string, acumulado: number): void => {
    if (truncado) return;
    if (++expansiones > limiteExpansiones) {
      truncado = true;
      return;
    }
    if (objetivos.has(u)) {
      const actual = mejores.get(u);
      if (!actual || acumulado > actual.distanciaKm) {
        mejores.set(u, { camino: [...camino], distanciaKm: acumulado });
      }
    }
    if (!puedeExpandir(g, u, origen)) return; // la clínica es terminal

    for (const v of g.vecinos(u)) {
      if (visitado.has(v.id)) continue;
      visitado.add(v.id); // elegir
      camino.push(v.id);
      dfs(v.id, acumulado + v.distanciaKm); // explorar
      camino.pop(); // deshacer (backtracking)
      visitado.delete(v.id);
    }
  };

  dfs(origen, 0);
  return { mejores, nodosExplorados: expansiones, truncado };
}
