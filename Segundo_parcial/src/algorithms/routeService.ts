import type { Graph } from '../graph/Graph';
import { minutosDesdeCosto } from '../graph/geo';
import type { ResultadoRutas, Ruta, TipoRuta } from '../types';
import { aStar } from './aStar';
import { bfsSaltos } from './bfs';
import { dijkstra } from './dijkstra';
import { rutaMasLarga } from './longestPath';
import { medirCamino, reconstruirCamino, redondear } from './utils';

function construirRuta(
  g: Graph,
  tipo: TipoRuta,
  algoritmo: string,
  camino: string[],
  nodosExplorados: number,
  aproximada = false,
): Ruta {
  const { distanciaKm, costoPonderado } = medirCamino(g, camino);
  return {
    tipo,
    algoritmo,
    camino,
    distanciaKm,
    costoPonderado,
    tiempoMin: minutosDesdeCosto(costoPonderado),
    nodosExplorados,
    clinicaId: camino[camino.length - 1],
    aproximada,
  };
}

/**
 * Orquesta los algoritmos y devuelve las tres rutas:
 *  - corta  → Dijkstra por distancia.
 *  - larga  → DFS con backtracking (camino simple más largo).
 *  - optima → A* por costo ponderado (distancia × tráfico).
 * Si no se elige clínica, cada criterio se evalúa contra TODAS las clínicas
 * y se queda con la mejor según ese criterio.
 */
export function calcularRutas(g: Graph, origenId: string, clinicaId: string | null): ResultadoRutas {
  if (!g.tieneNodo(origenId) || g.esClinica(origenId)) throw new Error('El origen debe ser un barrio válido');
  if (clinicaId && !g.esClinica(clinicaId)) throw new Error('La clínica seleccionada no existe');

  const objetivos = clinicaId ? [clinicaId] : g.clinicas().map((c) => c.id);

  // 1) Ruta más corta — Dijkstra
  const dj = dijkstra(g, origenId, 'distancia');
  const saltos = bfsSaltos(g, origenId);
  const alcanzables = objetivos.filter((c) => Number.isFinite(dj.distancias.get(c)));
  const destinoCorto = alcanzables.sort((a, b) => dj.distancias.get(a)! - dj.distancias.get(b)!)[0];
  const corta = destinoCorto
    ? construirRuta(g, 'corta', 'Dijkstra', reconstruirCamino(dj.previo, destinoCorto), dj.nodosExplorados)
    : null;

  // 2) Ruta más larga — DFS + backtracking
  const rl = rutaMasLarga(g, origenId, new Set(objetivos));
  let larga: Ruta | null = null;
  for (const { camino } of rl.mejores.values()) {
    const r = construirRuta(g, 'larga', 'DFS + Backtracking', camino, rl.nodosExplorados, rl.truncado);
    if (!larga || r.distanciaKm > larga.distanciaKm) larga = r;
  }

  // 3) Ruta óptima — A* por costo ponderado
  let optima: Ruta | null = null;
  let exploradosAStar = 0;
  for (const c of objetivos) {
    const r = aStar(g, origenId, c);
    exploradosAStar += r.nodosExplorados;
    if (r.camino && (!optima || r.costo < optima.costoPonderado)) {
      optima = construirRuta(g, 'optima', 'A* (distancia × tráfico)', r.camino, 0);
    }
  }
  if (optima) optima.nodosExplorados = exploradosAStar;

  const ranking = g
    .clinicas()
    .map((c) => ({
      clinicaId: c.id,
      distanciaKm: redondear(dj.distancias.get(c.id) ?? Infinity),
      saltos: saltos.get(c.id) ?? Infinity,
    }))
    .sort((a, b) => a.distanciaKm - b.distanciaKm);

  return { origenId, clinicaSeleccionada: clinicaId, corta, larga, optima, ranking };
}
