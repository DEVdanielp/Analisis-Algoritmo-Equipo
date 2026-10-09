import { useState } from 'react';
import { mcdMonedas } from '../algoritmo/cambio.js';
import { formatear } from './FormularioMonedas.jsx';

const MAX_CELDAS = 240;

/**
 * Muestra el arreglo dp[v].
 * Solo se dibujan los múltiplos del MCD de las monedas: cualquier otro valor
 * es imposible de formar (dp = ∞), así que no aporta información.
 */
export default function TablaDP({ monedas, monto, resultado }) {
  const { dp, ultimaMoneda, camino } = resultado;
  const [seleccion, setSeleccion] = useState(null);

  const g = mcdMonedas(monedas);
  const valores = [];
  for (let v = 0; v <= monto; v += g) valores.push(v);
  const recortado = valores.length > MAX_CELDAS;
  const visibles = recortado ? valores.slice(-MAX_CELDAS) : valores;
  const enCamino = new Set(camino);

  const explicar = (v) => {
    if (v === 0) return ['dp[0] = 0 → caso base: un vuelto de $0 no necesita monedas.'];
    const lineas = monedas
      .slice()
      .sort((a, b) => a - b)
      .map((c) => {
        if (c > v) return `moneda ${formatear(c)}: no cabe (es mayor que ${formatear(v)})`;
        const previo = dp[v - c];
        return previo === Infinity
          ? `moneda ${formatear(c)}: dp[${v - c}] = ∞ → no sirve`
          : `moneda ${formatear(c)}: dp[${v - c}] + 1 = ${previo} + 1 = ${previo + 1}`;
      });
    lineas.push(
      dp[v] === Infinity
        ? `dp[${v}] = ∞ → no se puede formar ${formatear(v)}`
        : `dp[${v}] = mínimo = ${dp[v]}  (última moneda: ${formatear(ultimaMoneda[v])})`
    );
    return lineas;
  };

  return (
    <section className="tarjeta">
      <h2>2. Tabla de Programación Dinámica</h2>
      <p className="nota">
        Cada casilla es un subproblema <span className="mono">dp[v]</span>: arriba el valor del vuelto, abajo el
        mínimo de monedas. Se muestran los múltiplos de <strong>{formatear(g)}</strong> (el MCD de las monedas);
        cualquier otro valor es imposible. Pasa el mouse o toca una casilla para ver la recurrencia.
      </p>
      {recortado && (
        <p className="nota aviso">
          El vuelto es muy grande: se muestran solo las últimas {MAX_CELDAS} casillas de {valores.length}.
        </p>
      )}

      <div className="arreglo-dp">
        {visibles.map((v) => {
          const clases = [
            'celda',
            v === 0 ? 'base' : '',
            dp[v] === Infinity ? 'infinito' : '',
            enCamino.has(v) && resultado.posible ? 'camino' : '',
            v === monto ? 'objetivo' : '',
            seleccion === v ? 'activa' : '',
          ].join(' ');
          return (
            <button
              key={v}
              className={clases}
              onMouseEnter={() => setSeleccion(v)}
              onClick={() => setSeleccion(v)}
            >
              <span className="valor">{v.toLocaleString('es-CO')}</span>
              <span className="resultado">{dp[v] === Infinity ? '∞' : dp[v]}</span>
            </button>
          );
        })}
      </div>

      <div className="explicacion mono">
        {seleccion === null || seleccion > monto || seleccion % g !== 0
          ? 'Selecciona una casilla…'
          : explicar(seleccion).map((l, i) => <div key={i}>{l}</div>)}
      </div>

      <div className="leyenda">
        <span><i className="muestra base" /> Caso base</span>
        <span><i className="muestra infinito" /> Imposible (∞)</span>
        <span><i className="muestra camino" /> Camino de reconstrucción</span>
        <span><i className="muestra objetivo" /> Vuelto pedido</span>
      </div>
    </section>
  );
}
