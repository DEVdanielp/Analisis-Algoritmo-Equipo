import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cambioMinimo, cambioVoraz, cambioFuerzaBruta } from '../src/algoritmo/cambio.js';
import { ESCENARIOS } from '../src/algoritmo/datosEjemplo.js';

const escenario = (id) => ESCENARIOS.find((e) => e.id === id);

test('caso base: vuelto de 0 necesita 0 monedas', () => {
  const r = cambioMinimo([200, 500], 0);
  assert.equal(r.cantidad, 0);
  assert.deepEqual(r.monedasUsadas, []);
});

test('vuelto imposible devuelve null', () => {
  const { monedas, monto } = escenario('imposible');
  assert.equal(cambioMinimo(monedas, monto).posible, false);
  assert.equal(cambioMinimo(monedas, monto).cantidad, null);
});

test('máquina sin monedas pequeñas: la DP encuentra 4 monedas y el voraz falla', () => {
  const { monedas, monto } = escenario('sin-pequenas');
  const dp = cambioMinimo(monedas, monto);
  assert.equal(dp.cantidad, 4);
  assert.deepEqual(dp.conteo, { 200: 3, 1000: 1 });
  assert.equal(cambioVoraz(monedas, monto).posible, false);
});

test('fichas 1, 3, 4: la DP usa 2 fichas y el voraz 3', () => {
  const { monedas, monto } = escenario('fichas');
  assert.equal(cambioMinimo(monedas, monto).cantidad, 2);
  assert.equal(cambioVoraz(monedas, monto).cantidad, 3);
});

test('pesos colombianos: DP y voraz coinciden (5 monedas para $2.350)', () => {
  const { monedas, monto } = escenario('colombia');
  assert.equal(cambioMinimo(monedas, monto).cantidad, 5);
  assert.equal(cambioVoraz(monedas, monto).cantidad, 5);
});

test('las monedas reconstruidas suman el monto', () => {
  for (const { monedas, monto } of ESCENARIOS) {
    const r = cambioMinimo(monedas, monto);
    if (r.posible) assert.equal(r.monedasUsadas.reduce((a, b) => a + b, 0), monto);
  }
});

test('la DP coincide con fuerza bruta en 200 casos aleatorios', () => {
  for (let k = 0; k < 200; k++) {
    const m = 1 + Math.floor(Math.random() * 3);
    const monedas = Array.from({ length: m }, () => 1 + Math.floor(Math.random() * 9));
    const monto = Math.floor(Math.random() * 22);
    assert.equal(cambioMinimo(monedas, monto).cantidad, cambioFuerzaBruta(monedas, monto).cantidad);
  }
});
