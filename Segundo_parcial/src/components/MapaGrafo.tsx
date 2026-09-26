import type { Graph } from '../graph/Graph';
import type { ResultadoRutas, TipoRuta } from '../types';
import { META_RUTA } from './estilosRuta';

interface Props {
  grafo: Graph;
  resultado: ResultadoRutas | null;
  visibles: Record<TipoRuta, boolean>;
  origen: string;
  clinica: string;
}

const ANCHO = 640;
const ALTO = 720;
const MARGEN = 50;

/** Proyección lineal lat/lng → coordenadas SVG (suficiente a escala de ciudad). */
function crearProyeccion(grafo: Graph) {
  const nodos = grafo.todosLosNodos();
  const lats = nodos.map((n) => n.lat);
  const lngs = nodos.map((n) => n.lng);
  const [minLat, maxLat, minLng, maxLng] = [Math.min(...lats), Math.max(...lats), Math.min(...lngs), Math.max(...lngs)];
  const escala = Math.min((ANCHO - 2 * MARGEN) / (maxLng - minLng), (ALTO - 2 * MARGEN) / (maxLat - minLat));
  return (id: string) => {
    const n = grafo.nodo(id);
    return { x: MARGEN + (n.lng - minLng) * escala, y: ALTO - MARGEN - (n.lat - minLat) * escala };
  };
}

// Orden de dibujo: la larga debajo, la óptima encima.
const CAPAS: { tipo: TipoRuta; ancho: number; guion?: string }[] = [
  { tipo: 'larga', ancho: 12 },
  { tipo: 'corta', ancho: 7 },
  { tipo: 'optima', ancho: 3.5, guion: '8 5' },
];

export function MapaGrafo({ grafo, resultado, visibles, origen, clinica }: Props) {
  const p = crearProyeccion(grafo);
  const enRuta = new Set<string>();
  CAPAS.forEach(({ tipo }) => {
    const r = resultado?.[tipo];
    if (r && visibles[tipo]) r.camino.forEach((id) => enRuta.add(id));
  });

  return (
    <div className="panel mapa">
      <svg viewBox={`0 0 ${ANCHO} ${ALTO}`} role="img" aria-label="Grafo de barrios y clínicas de Medellín">
        {/* Aristas base con su distancia */}
        {grafo.todasLasAristas().map((a) => {
          const A = p(a.origen);
          const B = p(a.destino);
          return (
            <g key={`${a.origen}-${a.destino}`} className="arista">
              <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} strokeWidth={1 + (a.factorTrafico - 1) * 3} />
              <text x={(A.x + B.x) / 2} y={(A.y + B.y) / 2 - 3} className="peso">
                {a.distanciaKm}
              </text>
              <title>
                {grafo.nodo(a.origen).nombre} ↔ {grafo.nodo(a.destino).nombre}: {a.distanciaKm} km · tráfico ×
                {a.factorTrafico}
              </title>
            </g>
          );
        })}

        {/* Rutas calculadas */}
        {resultado &&
          CAPAS.map(({ tipo, ancho, guion }) => {
            const r = resultado[tipo];
            if (!r || !visibles[tipo]) return null;
            const puntos = r.camino.map((id) => {
              const { x, y } = p(id);
              return `${x},${y}`;
            });
            return (
              <polyline
                key={tipo}
                points={puntos.join(' ')}
                fill="none"
                stroke={META_RUTA[tipo].color}
                strokeWidth={ancho}
                strokeDasharray={guion}
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={tipo === 'larga' ? 0.45 : 0.9}
              />
            );
          })}

        {/* Nodos */}
        {grafo.todosLosNodos().map((n) => {
          const { x, y } = p(n.id);
          const esOrigen = n.id === origen;
          const esDestino = n.id === clinica;
          const clase = ['nodo', n.tipo, enRuta.has(n.id) ? 'activo' : '', esOrigen ? 'origen' : '', esDestino ? 'destino' : '']
            .filter(Boolean)
            .join(' ');
          return (
            <g key={n.id} className={clase} transform={`translate(${x},${y})`}>
              {n.tipo === 'clinica' ? <rect x={-8} y={-8} width={16} height={16} rx={3} /> : <circle r={esOrigen ? 9 : 6} />}
              {n.tipo === 'clinica' && (
                <text className="cruz" y={4}>
                  +
                </text>
              )}
              <text
                className="etiqueta"
                x={n.tipo === 'clinica' ? 0 : 11}
                y={n.tipo === 'clinica' ? 22 : 4}
                textAnchor={n.tipo === 'clinica' ? 'middle' : 'start'}
              >
                {n.nombre.replace(' (Centro)', '')}
              </text>
              <title>
                {n.nombre} — {n.detalle}
              </title>
            </g>
          );
        })}
      </svg>
      <div className="leyenda">
        <span>
          <i className="punto barrio" /> Barrio
        </span>
        <span>
          <i className="punto clinica" /> Clínica
        </span>
        <span>Grosor de vía = tráfico · número = km</span>
      </div>
    </div>
  );
}
