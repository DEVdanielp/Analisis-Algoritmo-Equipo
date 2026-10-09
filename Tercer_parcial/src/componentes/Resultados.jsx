import { formatear } from './FormularioMonedas.jsx';

function Monedas({ conteo }) {
  const entradas = Object.entries(conteo).sort((a, b) => b[0] - a[0]);
  return (
    <div className="monedero">
      {entradas.map(([c, n]) =>
        Array.from({ length: n }, (_, k) => (
          <span key={`${c}-${k}`} className="moneda">{formatear(Number(c))}</span>
        ))
      )}
    </div>
  );
}

function Columna({ titulo, subtitulo, r, monto, mejor }) {
  return (
    <div className={`columna-resultado ${mejor ? 'mejor' : ''} ${r.posible ? '' : 'fallo'}`}>
      <h3>{titulo}</h3>
      <p className="nota">{subtitulo}</p>
      {r.posible ? (
        <>
          <strong className="cantidad">{r.cantidad} {r.cantidad === 1 ? 'moneda' : 'monedas'}</strong>
          <Monedas conteo={r.conteo} />
        </>
      ) : (
        <>
          <strong className="cantidad">Sin solución</strong>
          {r.monedasUsadas && r.monedasUsadas.length > 0 && (
            <>
              <Monedas conteo={r.conteo} />
              <p className="nota">
                Entregó {formatear(monto - r.restante)} y se quedó atascado: faltan {formatear(r.restante)} que ya no
                puede formar.
              </p>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default function Resultados({ monto, dp, voraz, bruta }) {
  const vorazPeor = dp.posible && (!voraz.posible || voraz.cantidad > dp.cantidad);

  let conclusion;
  if (!dp.posible) conclusion = `No existe ninguna combinación de estas monedas que sume ${formatear(monto)}.`;
  else if (!voraz.posible) conclusion = 'El método voraz no encontró solución, pero la Programación Dinámica sí.';
  else if (vorazPeor) conclusion = `El método voraz usa ${voraz.cantidad - dp.cantidad} moneda(s) de más.`;
  else conclusion = 'Ambos métodos coinciden: con este sistema de monedas el voraz también es óptimo.';

  return (
    <section className="tarjeta">
      <h2>3. Resultados para un vuelto de {formatear(monto)}</h2>

      <div className="comparacion">
        <Columna
          titulo="Programación Dinámica"
          subtitulo="Revisa todos los subproblemas dp[0..V]"
          r={dp}
          monto={monto}
          mejor={vorazPeor}
        />
        <Columna
          titulo="Método voraz"
          subtitulo="Siempre toma la moneda más grande que quepa"
          r={voraz}
          monto={monto}
          mejor={false}
        />
      </div>

      <p className={vorazPeor ? 'conclusion destacada' : 'conclusion'}>{conclusion}</p>

      <div className="metricas">
        <div className="metrica">
          <span>Subproblemas DP (casillas)</span>
          <strong>{(monto + 1).toLocaleString('es-CO')}</strong>
        </div>
        <div className="metrica">
          <span>Operaciones DP (V+1)·m</span>
          <strong>{dp.subproblemas.toLocaleString('es-CO')}</strong>
        </div>
        <div className="metrica">
          <span>Llamadas fuerza bruta</span>
          <strong>{bruta.excedido ? `> ${bruta.llamadas.toLocaleString('es-CO')}` : bruta.llamadas.toLocaleString('es-CO')}</strong>
        </div>
      </div>
    </section>
  );
}
