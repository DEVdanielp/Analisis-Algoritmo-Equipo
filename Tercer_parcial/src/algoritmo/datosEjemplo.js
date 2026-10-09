// Escenarios de ejemplo para la máquina de vueltos.
export const ESCENARIOS = [
  {
    id: 'sin-pequenas',
    nombre: 'Máquina sin monedas de $50 y $100',
    descripcion:
      'La máquina de la cafetería se quedó sin monedas pequeñas. Un estudiante compra un producto de $3.400 y paga con $5.000.',
    monedas: [200, 500, 1000],
    monto: 1600,
  },
  {
    id: 'colombia',
    nombre: 'Pesos colombianos completos',
    descripcion: 'Todas las monedas en circulación. Aquí el método voraz sí funciona bien.',
    monedas: [50, 100, 200, 500, 1000],
    monto: 2350,
  },
  {
    id: 'fichas',
    nombre: 'Fichas de arcade (1, 3, 4)',
    descripcion: 'Un sistema inventado de fichas donde el voraz entrega más fichas de las necesarias.',
    monedas: [1, 3, 4],
    monto: 6,
  },
  {
    id: 'imposible',
    nombre: 'Vuelto imposible',
    descripcion: 'Con solo monedas de $200 y $500 no existe forma de dar $300.',
    monedas: [200, 500],
    monto: 300,
  },
];

export const ESCENARIO_INICIAL = ESCENARIOS[0];
