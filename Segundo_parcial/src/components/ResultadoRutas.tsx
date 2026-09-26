import type { Graph } from '../graph/Graph';
import type { ResultadoRutas as TResultado, TipoRuta } from '../types';
import { META_RUTA, ORDEN_RUTAS } from './estilosRuta';

interface Props {
  grafo: Graph;
  resultado: TResultado;
  visibles: Record<TipoRuta, boolean>;
  onAlternar: (t: TipoRuta) => void;
}

export function ResultadoRutas({ grafo, resultado, visibles, onAlternar }: Props) {
  return (
    <div className="tarjetas">
      {ORDEN_RUTAS.map((tipo) => {
        const r = resultado[tipo];
        const meta = META_RUTA[tipo];
        return (
          <article key={tipo} className={`panel tarjeta ${visibles[tipo] ? '' : 'apagada'}`} style={{ borderTopColor: meta.color }}>
            <header>
              <h3>{meta.titulo}</h3>
              <label className="interruptor" title="Mostrar en el mapa">
                <input type="checkbox" checked={visibles[tipo]} onChange={() => onAlternar(tipo)} />
                Ver
              </label>
            </header>
            <p className="desc">{meta.descripcion}</p>
            {!r ? (
              <p>No hay ruta disponible.</p>
            ) : (
              <>
                <p className="destino">→ {grafo.nodo(r.clinicaId).nombre}</p>
                <dl className="metricas">
                  <div>
                    <dt>Distancia</dt>
                    <dd>{r.distanciaKm.toFixed(1)} km</dd>
                  </div>
                  <div>
                    <dt>Costo ponderado</dt>
                    <dd>{r.costoPonderado.toFixed(2)}</dd>
                  </div>
                  <div>
                    <dt>Tiempo est.</dt>
                    <dd>{r.tiempoMin} min</dd>
                  </div>
                  <div>
                    <dt>Tramos</dt>
                    <dd>{r.camino.length - 1}</dd>
                  </div>
                </dl>
                <ol className="camino">
                  {r.camino.map((id) => (
                    <li key={id}>{grafo.nodo(id).nombre}</li>
                  ))}
                </ol>
                <p className="algoritmo">
                  {r.algoritmo} · {r.nodosExplorados.toLocaleString('es-CO')} nodos explorados
                  {r.aproximada && ' · resultado aproximado'}
                </p>
              </>
            )}
          </article>
        );
      })}
    </div>
  );
}
