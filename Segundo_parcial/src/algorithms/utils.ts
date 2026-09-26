import type { Graph } from '../graph/Graph';
import type { Vecino } from '../types';

/** Peso de una arista según el criterio elegido. */
export type CriterioPeso = 'distancia' | 'ponderado';

export function pesoArista(v: Vecino, criterio: CriterioPeso): number {
  return criterio === 'distancia' ? v.distanciaKm : v.distanciaKm * v.factorTrafico;
}

/** Reconstruye el camino recorriendo el mapa de predecesores hacia atrás. */
export function reconstruirCamino(previo: Map<string, string | null>, destino: string): string[] {
  const camino: string[] = [];
  let actual: string | null | undefined = destino;
  while (actual != null) {
    camino.unshift(actual);
    actual = previo.get(actual);
  }
  return camino;
}

/** Suma distancia y costo ponderado de un camino ya calculado. */
export function medirCamino(g: Graph, camino: string[]): { distanciaKm: number; costoPonderado: number } {
  let distanciaKm = 0;
  let costoPonderado = 0;
  for (let i = 0; i < camino.length - 1; i++) {
    const a = g.arista(camino[i], camino[i + 1]);
    if (!a) throw new Error(`No hay conexión entre ${camino[i]} y ${camino[i + 1]}`);
    distanciaKm += a.distanciaKm;
    costoPonderado += a.distanciaKm * a.factorTrafico;
  }
  return { distanciaKm: redondear(distanciaKm), costoPonderado: redondear(costoPonderado) };
}

export const redondear = (x: number, dec = 2) => Math.round(x * 10 ** dec) / 10 ** dec;

/**
 * Las clínicas son nodos terminales: una ruta llega a ellas pero no las
 * atraviesa (una ambulancia no "pasa por" otro hospital para seguir de largo).
 */
export function puedeExpandir(g: Graph, id: string, origen: string): boolean {
  return id === origen || !g.esClinica(id);
}
