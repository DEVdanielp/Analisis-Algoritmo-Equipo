/**
 * Problema de la Mochila 0/1 aplicado a la planificación de estudio.
 *
 * Cada tema tiene:
 *   - horas  (peso):  tiempo que toma estudiarlo
 *   - puntos (valor): puntos que aporta en el examen
 * Disponemos de H horas en total. Cada tema se estudia completo o no se estudia (0/1).
 *
 * ESTADO:
 *   dp[i][h] = máximo de puntos que se pueden asegurar usando solo los
 *              primeros i temas y como máximo h horas.
 *
 * CASOS BASE:
 *   dp[0][h] = 0   para todo h  (sin temas no hay puntos)
 *   dp[i][0] = 0   para todo i  (sin horas no se estudia nada)
 *
 * RECURRENCIA (para el tema i con horas_i y puntos_i):
 *   si horas_i > h:  dp[i][h] = dp[i-1][h]                       (no cabe)
 *   si no:           dp[i][h] = max( dp[i-1][h],                 (no lo estudio)
 *                                    dp[i-1][h - horas_i] + puntos_i )  (lo estudio)
 *
 * RESPUESTA: dp[n][H]
 * COMPLEJIDAD: O(n · H) en tiempo y espacio.
 */
export function resolverMochila(temas, horasDisponibles) {
  const n = temas.length;
  const H = Math.max(0, Math.floor(horasDisponibles));

  // Casos base: toda la tabla arranca en 0 (fila i = 0 y columna h = 0).
  const tabla = Array.from({ length: n + 1 }, () => Array(H + 1).fill(0));
  // Guarda qué decisión se tomó en cada celda, útil para explicar el resultado.
  const decision = Array.from({ length: n + 1 }, () => Array(H + 1).fill(false));

  for (let i = 1; i <= n; i++) {
    const { horas, puntos } = temas[i - 1];
    for (let h = 0; h <= H; h++) {
      const sinTomar = tabla[i - 1][h];
      tabla[i][h] = sinTomar;
      if (horas <= h) {
        const tomando = tabla[i - 1][h - horas] + puntos;
        if (tomando > sinTomar) {
          tabla[i][h] = tomando;
          decision[i][h] = true;
        }
      }
    }
  }

  // Reconstrucción: recorremos la tabla desde dp[n][H] hacia atrás.
  const seleccion = [];
  const camino = []; // celdas [i, h] visitadas, para resaltarlas en la interfaz
  let h = H;
  for (let i = n; i > 0; i--) {
    camino.push([i, h]);
    if (decision[i][h]) {
      seleccion.push(i - 1);
      h -= temas[i - 1].horas;
    }
  }
  camino.push([0, h]);
  seleccion.reverse();

  const horasUsadas = seleccion.reduce((acc, idx) => acc + temas[idx].horas, 0);

  return {
    tabla,
    decision,
    camino,
    seleccion,
    puntosMaximos: tabla[n][H],
    horasUsadas,
    subproblemas: n * (H + 1),
  };
}

/**
 * Solución por fuerza bruta (2^n combinaciones).
 * Se usa solo para comparar y demostrar por qué la Programación Dinámica es eficiente.
 */
export function fuerzaBruta(temas, horasDisponibles) {
  const n = temas.length;
  let mejor = 0;
  let mejorMascara = 0;
  const total = 2 ** n;

  for (let mascara = 0; mascara < total; mascara++) {
    let horas = 0;
    let puntos = 0;
    for (let i = 0; i < n; i++) {
      if (mascara & (1 << i)) {
        horas += temas[i].horas;
        puntos += temas[i].puntos;
      }
    }
    if (horas <= horasDisponibles && puntos > mejor) {
      mejor = puntos;
      mejorMascara = mascara;
    }
  }

  const seleccion = [];
  for (let i = 0; i < n; i++) if (mejorMascara & (1 << i)) seleccion.push(i);
  return { puntosMaximos: mejor, seleccion, combinaciones: total };
}
