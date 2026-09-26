import type { Nodo } from '../types';

/** Clínicas y hospitales de referencia en Medellín (coordenadas aproximadas). */
export const CLINICAS: Nodo[] = [
  { id: 'h-pablo-tobon', nombre: 'Hospital Pablo Tobón Uribe', tipo: 'clinica', detalle: 'Alta complejidad', lat: 6.2800, lng: -75.5810 },
  { id: 'h-san-vicente', nombre: 'Hospital San Vicente Fundación', tipo: 'clinica', detalle: 'Alta complejidad', lat: 6.2640, lng: -75.5645 },
  { id: 'h-general', nombre: 'Hospital General de Medellín', tipo: 'clinica', detalle: 'Alta complejidad', lat: 6.2310, lng: -75.5740 },
  { id: 'c-soma', nombre: 'Clínica Soma', tipo: 'clinica', detalle: 'Mediana complejidad', lat: 6.2525, lng: -75.5765 },
  { id: 'c-las-americas', nombre: 'Clínica Las Américas', tipo: 'clinica', detalle: 'Alta complejidad', lat: 6.2230, lng: -75.6015 },
  { id: 'c-medellin', nombre: 'Clínica Medellín El Poblado', tipo: 'clinica', detalle: 'Alta complejidad', lat: 6.2060, lng: -75.5710 },
  { id: 'c-las-vegas', nombre: 'Clínica Las Vegas', tipo: 'clinica', detalle: 'Mediana complejidad', lat: 6.2005, lng: -75.5775 },
];
