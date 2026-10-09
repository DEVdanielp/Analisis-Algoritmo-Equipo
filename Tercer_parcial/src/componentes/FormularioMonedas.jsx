import { useState } from 'react';
import { ESCENARIOS } from '../algoritmo/datosEjemplo.js';

const MAX_MONTO = 100000;

export default function FormularioMonedas({ monedas, setMonedas, monto, setMonto, escenarioId, setEscenarioId }) {
  const [nueva, setNueva] = useState('');

  const cargarEscenario = (id) => {
    const e = ESCENARIOS.find((x) => x.id === id);
    setEscenarioId(id);
    setMonedas(e.monedas);
    setMonto(e.monto);
  };

  const agregarMoneda = () => {
    const valor = Math.floor(Number(nueva));
    if (valor > 0 && !monedas.includes(valor) && monedas.length < 8) {
      setMonedas([...monedas, valor].sort((a, b) => a - b));
      setEscenarioId(null);
    }
    setNueva('');
  };

  const quitarMoneda = (c) => {
    setMonedas(monedas.filter((x) => x !== c));
    setEscenarioId(null);
  };

  const escenario = ESCENARIOS.find((e) => e.id === escenarioId);

  return (
    <section className="tarjeta">
      <h2>1. Datos del problema</h2>

      <div className="escenarios">
        {ESCENARIOS.map((e) => (
          <button
            key={e.id}
            className={e.id === escenarioId ? 'chip activo' : 'chip'}
            onClick={() => cargarEscenario(e.id)}
          >
            {e.nombre}
          </button>
        ))}
      </div>
      {escenario && <p className="nota">{escenario.descripcion}</p>}

      <h3>Monedas disponibles en la máquina</h3>
      <div className="monedero">
        {monedas.map((c) => (
          <span key={c} className="moneda-editable">
            <span className="moneda">{formatear(c)}</span>
            <button className="boton-icono" onClick={() => quitarMoneda(c)} aria-label={`Quitar moneda de ${c}`}>
              ✕
            </button>
          </span>
        ))}
        {monedas.length === 0 && <span className="nota">No hay monedas: agrega al menos una.</span>}
      </div>

      <div className="fila-campos">
        <input
          type="number"
          min="1"
          placeholder="Nueva moneda"
          value={nueva}
          onChange={(e) => setNueva(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && agregarMoneda()}
        />
        <button onClick={agregarMoneda} disabled={monedas.length >= 8}>+ Agregar moneda</button>
      </div>

      <h3>Vuelto a entregar (V)</h3>
      <div className="fila-campos">
        <span className="mono">$</span>
        <input
          type="number"
          min="0"
          max={MAX_MONTO}
          value={monto}
          onChange={(e) => {
            setMonto(Math.min(MAX_MONTO, Math.max(0, Math.floor(Number(e.target.value) || 0))));
            setEscenarioId(null);
          }}
        />
      </div>
    </section>
  );
}

export function formatear(valor) {
  return '$' + valor.toLocaleString('es-CO');
}
