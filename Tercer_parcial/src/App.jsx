export default function App() {
  return (
    <main className="contenedor">
      <header className="encabezado">
        <span className="etiqueta">Examen 3 · Análisis de Algoritmos</span>
        <h1>Máquina de Vueltos con Programación Dinámica</h1>
        <p>
          Una máquina expendedora debe devolver el vuelto usando la menor cantidad de monedas posible, con
          las denominaciones que tenga disponibles. ¿Qué monedas debe entregar? ¿Y qué pasa cuando se queda
          sin monedas pequeñas?
        </p>
      </header>

      <section className="tarjeta">
        <h2>Planteamiento</h2>
        <p>
          La máquina se quedó sin monedas de $50 y $100: solo tiene <code>$200</code>, <code>$500</code> y{' '}
          <code>$1.000</code>. Hay que devolver <strong>$1.600</strong>.
        </p>
        <p>
          Si entrega siempre la moneda más grande (método voraz) da $1.000 + $500 y le faltan $100 que no puede
          formar. Pero sí existe una solución: $1.000 + $200 + $200 + $200 = <strong>4 monedas</strong>.
          Necesitamos un algoritmo que siempre encuentre el mínimo: el problema del <strong>Cambio de Monedas</strong>.
        </p>
      </section>
    </main>
  );
}
