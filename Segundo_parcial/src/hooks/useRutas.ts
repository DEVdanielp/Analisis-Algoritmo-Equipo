import { useMemo, useState } from 'react';
import { crearGrafoMedellin } from '../graph/Graph';
import { calcularRutas } from '../algorithms';
import type { ResultadoRutas, TipoRuta } from '../types';

/** Estado de la aplicación: selección del usuario + resultado de los algoritmos. */
export function useRutas() {
  const grafo = useMemo(() => crearGrafoMedellin(), []);
  const [origen, setOrigen] = useState<string>('');
  const [clinica, setClinica] = useState<string>(''); // '' = sin clínica (opcional)
  const [resultado, setResultado] = useState<ResultadoRutas | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [visibles, setVisibles] = useState<Record<TipoRuta, boolean>>({ corta: true, larga: true, optima: true });

  const calcular = () => {
    setError(null);
    if (!origen) {
      setError('Selecciona un barrio de origen.');
      return;
    }
    try {
      setResultado(calcularRutas(grafo, origen, clinica || null));
    } catch (e) {
      setResultado(null);
      setError(e instanceof Error ? e.message : 'Error inesperado');
    }
  };

  const limpiar = () => {
    setOrigen('');
    setClinica('');
    setResultado(null);
    setError(null);
  };

  const alternar = (t: TipoRuta) => setVisibles((v) => ({ ...v, [t]: !v[t] }));

  return { grafo, origen, setOrigen, clinica, setClinica, resultado, error, calcular, limpiar, visibles, alternar };
}
