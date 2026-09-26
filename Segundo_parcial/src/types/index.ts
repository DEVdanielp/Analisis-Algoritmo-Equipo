/** Tipos compartidos por todo el sistema. */

export type TipoNodo = 'barrio' | 'clinica';

export interface Nodo {
  id: string;
  nombre: string;
  tipo: TipoNodo;
  /** Comuna (barrios) o nivel de atención (clínicas). */
  detalle: string;
  lat: number;
  lng: number;
}

/** Conexión vial no dirigida entre dos nodos. */
export interface Arista {
  origen: string;
  destino: string;
  /** Distancia vial en kilómetros. */
  distanciaKm: number;
  /** Congestión de la vía: 1.0 = libre, 2.0 = muy congestionada. */
  factorTrafico: number;
}

/** Vecino dentro de la lista de adyacencia. */
export interface Vecino {
  id: string;
  distanciaKm: number;
  factorTrafico: number;
}

export type TipoRuta = 'corta' | 'larga' | 'optima';

export interface Ruta {
  tipo: TipoRuta;
  algoritmo: string;
  /** Secuencia de ids desde el barrio origen hasta la clínica. */
  camino: string[];
  distanciaKm: number;
  /** Costo ponderado = Σ distancia × factorTrafico. */
  costoPonderado: number;
  /** Tiempo estimado en minutos (velocidad base urbana). */
  tiempoMin: number;
  /** Nodos explorados por el algoritmo (para comparar eficiencia). */
  nodosExplorados: number;
  clinicaId: string;
  /** true si la búsqueda se detuvo por el límite de exploración. */
  aproximada?: boolean;
}

export interface ResultadoRutas {
  origenId: string;
  clinicaSeleccionada: string | null;
  corta: Ruta | null;
  larga: Ruta | null;
  optima: Ruta | null;
  /** Ranking de todas las clínicas por distancia mínima (Dijkstra). */
  ranking: { clinicaId: string; distanciaKm: number; saltos: number }[];
}
