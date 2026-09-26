import type { Graph } from '../graph/Graph';
import type { ResultadoRutas } from '../types';

interface Props {
  grafo: Graph;
  resultado: ResultadoRutas;
}

/** Ranking de todas las clínicas por distancia mínima desde el barrio (Dijkstra + BFS). */
export function TablaClinicas({ grafo, resultado }: Props) {
  return (
    <div className="panel">
      <h3>Clínicas desde {grafo.nodo(resultado.origenId).nombre}</h3>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Clínica</th>
            <th className="num">Distancia mínima</th>
            <th className="num">Tramos</th>
          </tr>
        </thead>
        <tbody>
          {resultado.ranking.map((f, i) => (
            <tr key={f.clinicaId} className={f.clinicaId === resultado.clinicaSeleccionada ? 'resaltada' : ''}>
              <td>{i + 1}</td>
              <td>{grafo.nodo(f.clinicaId).nombre}</td>
              <td className="num">{f.distanciaKm.toFixed(1)} km</td>
              <td className="num">{f.saltos}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
