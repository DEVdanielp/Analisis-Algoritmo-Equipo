import { useRutas } from './hooks/useRutas';
import { SelectorPanel } from './components/SelectorPanel';
import { MapaGrafo } from './components/MapaGrafo';
import { ResultadoRutas } from './components/ResultadoRutas';
import { TablaClinicas } from './components/TablaClinicas';

export default function App() {
  const s = useRutas();

  return (
    <div className="app">
      <header className="cabecera">
        <h1>Rutas a clínicas · Medellín</h1>
        <p>Dijkstra, A*, DFS con backtracking y BFS sobre un grafo de barrios y clínicas.</p>
      </header>

      <main className="contenido">
        <section className="columna-izq">
          <SelectorPanel
            barrios={s.grafo.barrios()}
            clinicas={s.grafo.clinicas()}
            origen={s.origen}
            clinica={s.clinica}
            onOrigen={s.setOrigen}
            onClinica={s.setClinica}
            onCalcular={s.calcular}
            onLimpiar={s.limpiar}
            error={s.error}
          />
          <MapaGrafo grafo={s.grafo} resultado={s.resultado} visibles={s.visibles} origen={s.origen} clinica={s.clinica} />
        </section>

        <section className="columna-der">
          {s.resultado ? (
            <>
              <ResultadoRutas grafo={s.grafo} resultado={s.resultado} visibles={s.visibles} onAlternar={s.alternar} />
              <TablaClinicas grafo={s.grafo} resultado={s.resultado} />
            </>
          ) : (
            <div className="panel vacio">
              <h3>¿Cómo funciona?</h3>
              <ol>
                <li>Elige el barrio desde donde sales.</li>
                <li>Opcional: elige una clínica específica.</li>
                <li>Pulsa «Calcular rutas» para ver la ruta más corta, la más óptima y la más larga.</li>
              </ol>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
