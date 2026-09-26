import type { TipoRuta } from '../types';

export const META_RUTA: Record<TipoRuta, { titulo: string; color: string; descripcion: string }> = {
  corta: { titulo: 'Ruta más corta', color: 'var(--c-corta)', descripcion: 'Menor distancia total en km.' },
  optima: {
    titulo: 'Ruta más óptima',
    color: 'var(--c-optima)',
    descripcion: 'Menor costo ponderado: distancia × tráfico de cada vía.',
  },
  larga: { titulo: 'Ruta más larga', color: 'var(--c-larga)', descripcion: 'Camino simple de mayor distancia (sin repetir barrios).' },
};

export const ORDEN_RUTAS: TipoRuta[] = ['corta', 'optima', 'larga'];
