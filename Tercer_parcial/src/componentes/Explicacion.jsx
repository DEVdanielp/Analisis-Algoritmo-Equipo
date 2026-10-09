export default function Explicacion() {
  return (
    <section className="tarjeta">
      <h2>Algoritmo: Cambio de Monedas con Programación Dinámica</h2>

      <h3>Estado (subproblema)</h3>
      <div className="formula">dp[v] = mínimo número de monedas para formar exactamente el valor v</div>

      <h3>Casos base</h3>
      <div className="formula">{`dp[0] = 0     → un vuelto de $0 no necesita monedas
dp[v] = ∞     → valor inicial para v > 0 (aún no se sabe formar)`}</div>

      <h3>Relación de recurrencia</h3>
      <div className="formula">{`dp[v] = min( dp[v - c] + 1 )    para cada moneda c ≤ v

"Si la última moneda que entrego es c, lo que falta (v - c)
 ya está resuelto de forma óptima en la tabla."`}</div>

      <h3>Respuesta y complejidad</h3>
      <div className="formula">{`Respuesta: dp[V]   (si es ∞ → el vuelto es imposible)
Tiempo: O(V · m)    Espacio: O(V)      m = número de denominaciones
Fuerza bruta (recursión sin memoria): exponencial`}</div>
    </section>
  );
}
