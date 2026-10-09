/**
 * Problema del Cambio de Monedas (Coin Change) con Programación Dinámica.
 *
 * Una máquina debe entregar un vuelto V usando la MENOR cantidad de monedas
 * posible. Hay una cantidad ilimitada de cada denominación disponible.
 *
 * ESTADO:
 *   dp[v] = mínimo número de monedas necesarias para formar exactamente el valor v.
 *           Si v no se puede formar, dp[v] = ∞.
 *
 * CASOS BASE:
 *   dp[0] = 0     → para dar un vuelto de 0 no se necesita ninguna moneda.
 *   dp[v] = ∞     → valor inicial de todo v > 0 (todavía no sabemos formarlo).
 *
 * RECURRENCIA:
 *   dp[v] = min( dp[v - c] + 1 )   para cada moneda c con c ≤ v
 *   "La última moneda que entrego es c; el resto (v - c) ya lo resolví de forma óptima."
 *
 * RESPUESTA: dp[V]   (si es ∞, el vuelto es imposible con esas monedas)
 * COMPLEJIDAD: O(V · m) en tiempo y O(V) en espacio (m = número de denominaciones).
 */
export function cambioMinimo(monedas, monto) {
  const V = Math.max(0, Math.floor(monto));
  const denominaciones = [...new Set(monedas.filter((c) => c > 0))].sort((a, b) => a - b);

  // Casos base
  const dp = Array(V + 1).fill(Infinity);
  dp[0] = 0;
  // ultimaMoneda[v] = moneda que dio el mínimo en dp[v] (sirve para reconstruir).
  const ultimaMoneda = Array(V + 1).fill(null);

  for (let v = 1; v <= V; v++) {
    for (const c of denominaciones) {
      if (c <= v && dp[v - c] + 1 < dp[v]) {
        dp[v] = dp[v - c] + 1;
        ultimaMoneda[v] = c;
      }
    }
  }

  // Reconstrucción: desde V vamos restando la moneda elegida hasta llegar a 0.
  const posible = dp[V] !== Infinity;
  const monedasUsadas = [];
  const camino = [V];
  if (posible) {
    let v = V;
    while (v > 0) {
      const c = ultimaMoneda[v];
      monedasUsadas.push(c);
      v -= c;
      camino.push(v);
    }
  }

  return {
    dp,
    ultimaMoneda,
    posible,
    cantidad: posible ? dp[V] : null,
    monedasUsadas,
    conteo: contar(monedasUsadas),
    camino,
    subproblemas: (V + 1) * denominaciones.length,
  };
}

/**
 * Método voraz (greedy): siempre toma la moneda más grande que quepa.
 * Es lo que haría una persona "a ojo". Es rápido, pero NO siempre es óptimo
 * y a veces ni siquiera encuentra solución.
 */
export function cambioVoraz(monedas, monto) {
  const denominaciones = [...new Set(monedas.filter((c) => c > 0))].sort((a, b) => b - a);
  let restante = Math.floor(monto);
  const monedasUsadas = [];
  for (const c of denominaciones) {
    while (c <= restante) {
      monedasUsadas.push(c);
      restante -= c;
    }
  }
  const posible = restante === 0;
  return {
    posible,
    cantidad: posible ? monedasUsadas.length : null,
    monedasUsadas,
    conteo: contar(monedasUsadas),
    restante,
  };
}

/**
 * Fuerza bruta recursiva SIN memoria: prueba todas las formas de armar el vuelto.
 * Se usa en las pruebas para verificar la DP y en la app para mostrar cuánto más trabajo hace.
 * Cuenta las llamadas para mostrar cuánto trabajo repite; se detiene si pasa del límite.
 */
export function cambioFuerzaBruta(monedas, monto, limite = Infinity) {
  let llamadas = 0;
  const resolver = (v) => {
    llamadas++;
    if (llamadas > limite) throw new Error('LIMITE');
    if (v === 0) return 0;
    let mejor = Infinity;
    for (const c of monedas) {
      if (c > 0 && c <= v) mejor = Math.min(mejor, resolver(v - c) + 1);
    }
    return mejor;
  };
  try {
    const r = resolver(monto);
    return { cantidad: r === Infinity ? null : r, llamadas, excedido: false };
  } catch (e) {
    if (e.message !== 'LIMITE') throw e;
    return { cantidad: null, llamadas: limite, excedido: true };
  }
}

/** Máximo común divisor de las monedas: los vueltos que no son múltiplos son imposibles. */
export function mcdMonedas(monedas) {
  const mcd = (a, b) => (b === 0 ? a : mcd(b, a % b));
  return monedas.filter((c) => c > 0).reduce((g, c) => mcd(g, c), 0) || 1;
}

function contar(lista) {
  const conteo = {};
  for (const c of lista) conteo[c] = (conteo[c] || 0) + 1;
  return conteo;
}
