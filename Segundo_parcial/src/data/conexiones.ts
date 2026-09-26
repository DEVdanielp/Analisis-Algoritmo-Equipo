import type { Arista } from '../types';
import { BARRIOS } from './barrios';
import { CLINICAS } from './clinicas';
import { distanciaVialKm } from '../graph/geo';

/**
 * Conexiones viales principales: [nodoA, nodoB, factorTrafico].
 * La distancia se calcula a partir de las coordenadas (Haversine × factor vial),
 * así el dato no se desincroniza si se ajusta una coordenada.
 */
const TRAMOS: [string, string, number][] = [
  // Nororiente
  ['popular', 'santa-cruz', 1.3],
  ['popular', 'manrique', 1.4],
  ['santa-cruz', 'aranjuez', 1.5],
  ['manrique', 'aranjuez', 1.3],
  ['manrique', 'villa-hermosa', 1.2],
  ['aranjuez', 'prado', 1.6],
  // Noroccidente
  ['santa-cruz', 'castilla', 1.4],
  ['castilla', 'doce-octubre', 1.3],
  ['doce-octubre', 'robledo', 1.2],
  ['castilla', 'robledo', 1.5],
  ['robledo', 'estadio', 1.4],
  // Centro
  ['prado', 'candelaria', 1.9],
  ['prado', 'boston', 1.5],
  ['boston', 'candelaria', 1.8],
  ['villa-hermosa', 'boston', 1.4],
  ['buenos-aires', 'boston', 1.5],
  ['buenos-aires', 'candelaria', 1.7],
  ['candelaria', 'estadio', 1.6],
  // Occidente
  ['estadio', 'laureles', 1.2],
  ['laureles', 'la-america', 1.1],
  ['la-america', 'san-javier', 1.3],
  ['san-javier', 'robledo', 1.4],
  ['laureles', 'belen', 1.3],
  ['la-america', 'belen', 1.2],
  // Sur
  ['belen', 'guayabal', 1.4],
  ['guayabal', 'poblado', 1.7],
  ['buenos-aires', 'poblado', 1.6],
  ['candelaria', 'guayabal', 1.8],
  // Acceso a clínicas
  ['aranjuez', 'h-pablo-tobon', 1.3],
  ['castilla', 'h-pablo-tobon', 1.2],
  ['robledo', 'h-pablo-tobon', 1.3],
  ['prado', 'h-san-vicente', 1.4],
  ['aranjuez', 'h-san-vicente', 1.5],
  ['candelaria', 'c-soma', 1.8],
  ['boston', 'c-soma', 1.6],
  ['candelaria', 'h-general', 1.7],
  ['guayabal', 'h-general', 1.3],
  ['buenos-aires', 'h-general', 1.4],
  ['belen', 'c-las-americas', 1.2],
  ['guayabal', 'c-las-americas', 1.3],
  ['poblado', 'c-medellin', 1.3],
  ['poblado', 'c-las-vegas', 1.5],
  ['guayabal', 'c-las-vegas', 1.4],
];

const NODOS = new Map([...BARRIOS, ...CLINICAS].map((n) => [n.id, n]));

export const CONEXIONES: Arista[] = TRAMOS.map(([a, b, trafico]) => {
  const na = NODOS.get(a);
  const nb = NODOS.get(b);
  if (!na || !nb) throw new Error(`Conexión inválida: ${a} - ${b}`);
  return { origen: a, destino: b, distanciaKm: distanciaVialKm(na, nb), factorTrafico: trafico };
});
