import { test } from 'node:test';
import assert from 'node:assert/strict';
import { resolverMochila, fuerzaBruta } from '../src/algoritmo/mochila.js';
import { TEMAS_EJEMPLO, HORAS_EJEMPLO } from '../src/algoritmo/datosEjemplo.js';

test('caso base: sin temas el resultado es 0', () => {
  const r = resolverMochila([], 10);
  assert.equal(r.puntosMaximos, 0);
  assert.deepEqual(r.seleccion, []);
});

test('caso base: sin horas disponibles el resultado es 0', () => {
  const r = resolverMochila(TEMAS_EJEMPLO, 0);
  assert.equal(r.puntosMaximos, 0);
  assert.deepEqual(r.seleccion, []);
});

test('un tema que no cabe no se selecciona', () => {
  const r = resolverMochila([{ nombre: 'A', horas: 5, puntos: 10 }], 4);
  assert.equal(r.puntosMaximos, 0);
});

test('escenario de ejemplo: 12 horas', () => {
  const r = resolverMochila(TEMAS_EJEMPLO, HORAS_EJEMPLO);
  assert.equal(r.puntosMaximos, 56);
  assert.deepEqual(r.seleccion, [0, 1, 2]);
  assert.ok(r.horasUsadas <= HORAS_EJEMPLO);
  const suma = r.seleccion.reduce((s, i) => s + TEMAS_EJEMPLO[i].puntos, 0);
  assert.equal(suma, r.puntosMaximos);
});

test('la DP coincide con fuerza bruta en 200 casos aleatorios', () => {
  for (let k = 0; k < 200; k++) {
    const n = 1 + Math.floor(Math.random() * 10);
    const temas = Array.from({ length: n }, (_, i) => ({
      nombre: `T${i}`,
      horas: 1 + Math.floor(Math.random() * 8),
      puntos: 1 + Math.floor(Math.random() * 30),
    }));
    const H = Math.floor(Math.random() * 25);
    assert.equal(resolverMochila(temas, H).puntosMaximos, fuerzaBruta(temas, H).puntosMaximos);
  }
});
