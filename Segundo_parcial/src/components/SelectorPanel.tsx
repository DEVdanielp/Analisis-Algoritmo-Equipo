import type { Nodo } from '../types';

interface Props {
  barrios: Nodo[];
  clinicas: Nodo[];
  origen: string;
  clinica: string;
  onOrigen: (id: string) => void;
  onClinica: (id: string) => void;
  onCalcular: () => void;
  onLimpiar: () => void;
  error: string | null;
}

export function SelectorPanel({ barrios, clinicas, origen, clinica, onOrigen, onClinica, onCalcular, onLimpiar, error }: Props) {
  const porNombre = (a: Nodo, b: Nodo) => a.nombre.localeCompare(b.nombre, 'es');
  return (
    <form
      className="panel selector"
      onSubmit={(e) => {
        e.preventDefault();
        onCalcular();
      }}
    >
      <label>
        <span>Barrio de origen</span>
        <select value={origen} onChange={(e) => onOrigen(e.target.value)}>
          <option value="">— Selecciona un barrio —</option>
          {[...barrios].sort(porNombre).map((b) => (
            <option key={b.id} value={b.id}>
              {b.nombre} · {b.detalle}
            </option>
          ))}
        </select>
      </label>

      <label>
        <span>
          Clínica destino <em>(opcional)</em>
        </span>
        <select value={clinica} onChange={(e) => onClinica(e.target.value)}>
          <option value="">Cualquiera — buscar la mejor</option>
          {[...clinicas].sort(porNombre).map((c) => (
            <option key={c.id} value={c.id}>
              {c.nombre}
            </option>
          ))}
        </select>
      </label>

      <div className="acciones">
        <button type="submit" className="primario">
          Calcular rutas
        </button>
        <button type="button" onClick={onLimpiar}>
          Limpiar
        </button>
      </div>
      {error && <p className="error">{error}</p>}
      <p className="ayuda">
        Sin clínica seleccionada, el sistema compara todas las clínicas y elige, para cada criterio, la que mejor lo
        cumple.
      </p>
    </form>
  );
}
