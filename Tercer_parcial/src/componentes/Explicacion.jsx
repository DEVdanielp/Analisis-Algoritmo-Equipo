export default function Explicacion() {
  return (
    <section className="tarjeta">
      <h2>Algoritmo: Mochila 0/1 con Programación Dinámica</h2>

      <h3>Estado (subproblema)</h3>
      <div className="formula">dp[i][h] = máximo de puntos usando solo los primeros i temas con h horas</div>

      <h3>Casos base</h3>
      <div className="formula">{`dp[0][h] = 0   → sin temas no hay puntos
dp[i][0] = 0   → sin horas no se estudia nada`}</div>

      <h3>Relación de recurrencia</h3>
      <div className="formula">{`si horas_i > h:   dp[i][h] = dp[i-1][h]
si no:            dp[i][h] = max( dp[i-1][h],
                                  dp[i-1][h - horas_i] + puntos_i )`}</div>

      <h3>Respuesta y complejidad</h3>
      <div className="formula">{`Respuesta: dp[n][H]
Tiempo: O(n · H)     Espacio: O(n · H)
Fuerza bruta: O(2ⁿ · n)`}</div>
    </section>
  );
}
