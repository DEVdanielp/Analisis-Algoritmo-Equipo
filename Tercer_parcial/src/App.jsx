import { cambioMinimo, cambioVoraz } from './algoritmo/cambio.js';
import { ESCENARIOS } from './algoritmo/datosEjemplo.js';
import Explicacion from './componentes/Explicacion.jsx';

const texto = (r) => (r.posible ? `${r.cantidad} monedas (${r.monedasUsadas.join(' + ')})` : 'sin solución');

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

      <Explicacion />

      <section className="tarjeta">
        <h2>Resultados de los escenarios de ejemplo</h2>
        {ESCENARIOS.map((e) => (
          <p key={e.id}>
            <strong>{e.nombre}</strong> — vuelto {e.monto} con monedas [{e.monedas.join(', ')}]
            <br />
            DP: {texto(cambioMinimo(e.monedas, e.monto))} · Voraz: {texto(cambioVoraz(e.monedas, e.monto))}
          </p>
        ))}
      </section>
    </main>
  );
}
