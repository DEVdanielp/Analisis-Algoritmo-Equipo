import type { Arista, Nodo, Vecino } from '../types';
import { BARRIOS } from '../data/barrios';
import { CLINICAS } from '../data/clinicas';
import { CONEXIONES } from '../data/conexiones';

/**
 * Grafo no dirigido y ponderado representado con lista de adyacencia.
 * Espacio O(V + E); obtener vecinos es O(grado).
 */
export class Graph {
  private nodos = new Map<string, Nodo>();
  private adyacencia = new Map<string, Vecino[]>();
  private aristas: Arista[] = [];

  agregarNodo(nodo: Nodo): void {
    if (this.nodos.has(nodo.id)) throw new Error(`Nodo duplicado: ${nodo.id}`);
    this.nodos.set(nodo.id, nodo);
    this.adyacencia.set(nodo.id, []);
  }

  agregarArista(a: Arista): void {
    if (!this.nodos.has(a.origen) || !this.nodos.has(a.destino)) {
      throw new Error(`Arista con nodo inexistente: ${a.origen} - ${a.destino}`);
    }
    this.aristas.push(a);
    this.adyacencia.get(a.origen)!.push({ id: a.destino, distanciaKm: a.distanciaKm, factorTrafico: a.factorTrafico });
    this.adyacencia.get(a.destino)!.push({ id: a.origen, distanciaKm: a.distanciaKm, factorTrafico: a.factorTrafico });
  }

  vecinos(id: string): Vecino[] {
    return this.adyacencia.get(id) ?? [];
  }

  nodo(id: string): Nodo {
    const n = this.nodos.get(id);
    if (!n) throw new Error(`Nodo no encontrado: ${id}`);
    return n;
  }

  tieneNodo(id: string): boolean {
    return this.nodos.has(id);
  }

  todosLosNodos(): Nodo[] {
    return [...this.nodos.values()];
  }

  barrios(): Nodo[] {
    return this.todosLosNodos().filter((n) => n.tipo === 'barrio');
  }

  clinicas(): Nodo[] {
    return this.todosLosNodos().filter((n) => n.tipo === 'clinica');
  }

  esClinica(id: string): boolean {
    return this.nodos.get(id)?.tipo === 'clinica';
  }

  todasLasAristas(): Arista[] {
    return [...this.aristas];
  }

  /** Busca la arista entre dos nodos (en cualquier sentido). */
  arista(a: string, b: string): Vecino | undefined {
    return this.vecinos(a).find((v) => v.id === b);
  }
}

/** Construye el grafo de Medellín con los datos del proyecto. */
export function crearGrafoMedellin(): Graph {
  const g = new Graph();
  [...BARRIOS, ...CLINICAS].forEach((n) => g.agregarNodo(n));
  CONEXIONES.forEach((a) => g.agregarArista(a));
  return g;
}
