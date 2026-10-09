import { useState } from 'react';

/**
 * Muestra la tabla dp[i][h] completa.
 * - Verde: celdas del camino de reconstrucción.
 * - Al pasar el mouse sobre una celda se explica qué subproblema representa
 *   y cómo se calculó con la recurrencia.
 */
export default function TablaDP({ temas, resultado }) {
  const { tabla, decision, camino } = resultado;
  const [celda, setCelda] = useState(null);
  const enCamino = new Set(camino.map(([i, h]) => `${i}-${h}`));
  const H = tabla[0].length - 1;

  const explicar = (i, h) => {
    if (i === 0) return `dp[0][${h}] = 0 → caso base: sin temas no hay puntos.`;
    if (h === 0) return `dp[${i}][0] = 0 → caso base: sin horas no se estudia nada.`;
    const t = temas[i - 1];
    const sin = tabla[i - 1][h];
    if (t.horas > h) {
      return `"${t.nombre}" necesita ${t.horas}h y solo hay ${h}h → no cabe. dp[${i}][${h}] = dp[${i - 1}][${h}] = ${sin}`;
    }
    const con = tabla[i - 1][h - t.horas] + t.puntos;
    return `dp[${i}][${h}] = max( no estudiar = dp[${i - 1}][${h}] = ${sin} ,  estudiar = dp[${i - 1}][${h - t.horas}] + ${t.puntos} = ${con} ) = ${tabla[i][h]}  → ${decision[i][h] ? 'SE ESTUDIA' : 'no se estudia'}`;
  };

  return (
    <section className="tarjeta">
      <h2>2. Tabla de Programación Dinámica</h2>
      <p className="nota">
        Fila <span className="mono">i</span> = primeros i temas · Columna <span className="mono">h</span> = horas
        disponibles. Pasa el mouse sobre una celda para ver la recurrencia aplicada.
      </p>

      <div className="tabla-scroll">
        <table className="tabla-dp">
          <thead>
            <tr>
              <th className="esquina">i \ h</th>
              {Array.from({ length: H + 1 }, (_, h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tabla.map((fila, i) => (
              <tr key={i}>
                <th className="cabecera-fila" title={i === 0 ? 'Sin temas' : temas[i - 1].nombre}>
                  {i === 0 ? '0 · ∅' : `${i} · ${temas[i - 1].nombre}`}
                </th>
                {fila.map((valor, h) => {
                  const clases = [
                    i === 0 || h === 0 ? 'base' : '',
                    enCamino.has(`${i}-${h}`) ? 'camino' : '',
                    decision[i][h] ? 'tomado' : '',
                    celda && celda[0] === i && celda[1] === h ? 'activa' : '',
                  ].join(' ');
                  return (
                    <td key={h} className={clases} onMouseEnter={() => setCelda([i, h])}>
                      {valor}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="explicacion mono">{celda ? explicar(celda[0], celda[1]) : 'Selecciona una celda…'}</div>

      <div className="leyenda">
        <span><i className="muestra base" /> Caso base</span>
        <span><i className="muestra tomado" /> Se decidió estudiar el tema</span>
        <span><i className="muestra camino" /> Camino de reconstrucción</span>
      </div>
    </section>
  );
}
