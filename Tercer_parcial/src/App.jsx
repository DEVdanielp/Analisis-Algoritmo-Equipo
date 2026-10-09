import { useMemo, useState } from 'react';
import { cambioMinimo, cambioVoraz, cambioFuerzaBruta } from './algoritmo/cambio.js';
import { ESCENARIO_INICIAL } from './algoritmo/datosEjemplo.js';
import Explicacion from './componentes/Explicacion.jsx';
import FormularioMonedas from './componentes/FormularioMonedas.jsx';
import TablaDP from './componentes/TablaDP.jsx';
import Resultados from './componentes/Resultados.jsx';
import './componentes/componentes.css';

// La fuerza bruta es exponencial: la detenemos al llegar a este número de llamadas.
const LIMITE_FUERZA_BRUTA = 2_000_000;

export default function App() {
  const [monedas, setMonedas] = useState(ESCENARIO_INICIAL.monedas);
  const [monto, setMonto] = useState(ESCENARIO_INICIAL.monto);
  const [escenarioId, setEscenarioId] = useState(ESCENARIO_INICIAL.id);

  // Se recalcula cada vez que cambian las monedas o el vuelto.
  const dp = useMemo(() => cambioMinimo(monedas, monto), [monedas, monto]);
  const voraz = useMemo(() => cambioVoraz(monedas, monto), [monedas, monto]);
  const bruta = useMemo(() => {
    // Con vueltos enormes la recursión sería demasiado profunda: ni siquiera la intentamos.
    const profundidad = monto / Math.min(...monedas);
    if (profundidad > 2000) return { llamadas: LIMITE_FUERZA_BRUTA, excedido: true };
    return cambioFuerzaBruta(monedas, monto, LIMITE_FUERZA_BRUTA);
  }, [monedas, monto]);

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
      <FormularioMonedas
        monedas={monedas}
        setMonedas={setMonedas}
        monto={monto}
        setMonto={setMonto}
        escenarioId={escenarioId}
        setEscenarioId={setEscenarioId}
      />
      <TablaDP monedas={monedas} monto={monto} resultado={dp} />
      <Resultados monto={monto} dp={dp} voraz={voraz} bruta={bruta} />
    </main>
  );
}
