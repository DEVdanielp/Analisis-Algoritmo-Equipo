import { useState } from 'react'
import { useMergeSort } from '../hooks/useMergeSort.js'
import { useInsertionSort } from '../hooks/useInsertionSort.js'
import { useCountingSort } from '../hooks/useCountingSort.js'
import { porFecha } from '../utils/comparators.js'
import { PRIORIDADES } from '../utils/priorities.js'

/**
 * Benchmark.jsx — TODO(Manuela): Fase 3 · Integración
 *
 * Panel de comparación de rendimiento entre los 3 algoritmos. Ya está
 * armada la generación de datos y la medición con performance.now();
 * los resultados solo van a ser reales una vez que useMergeSort,
 * useInsertionSort y useCountingSort estén implementados de verdad.
 *
 * TODO: una vez que los tres hooks funcionen, revisá si el resultado
 * te sorprende para algún tamaño de datos y agregá una nota corta acá
 * abajo explicando por qué (por ejemplo: para N chico, insertion sort
 * puede ganarle a merge sort).
 */

function generarTareasAleatorias(n) {
  return Array.from({ length: n }, (_, i) => ({
    id: `bench-${i}`,
    titulo: `Tarea de prueba ${i}`,
    prioridad: PRIORIDADES[Math.floor(Math.random() * PRIORIDADES.length)],
    fecha: new Date(Date.now() + Math.random() * 1e10).toISOString().slice(0, 10),
    precio: Math.floor(Math.random() * 100000),
  }))
}

const TAMANOS = [100, 1000, 5000]

export default function Benchmark() {
  const [resultados, setResultados] = useState(null)
  const [corriendo, setCorriendo] = useState(false)

  const correrBenchmark = () => {
    setCorriendo(true)

    const filas = TAMANOS.map((n) => {
      const datos = generarTareasAleatorias(n)

      const t0 = performance.now()
      useMergeSort(datos, porFecha)
      const t1 = performance.now()

      let acumulado = []
      for (const item of datos) {
        acumulado = useInsertionSort(acumulado, item, porFecha)
      }
      const t2 = performance.now()

      useCountingSort(datos, 'prioridad')
      const t3 = performance.now()

      return {
        n,
        merge: (t1 - t0).toFixed(2),
        insertion: (t2 - t1).toFixed(2),
        counting: (t3 - t2).toFixed(2),
      }
    })

    setResultados(filas)
    setCorriendo(false)
  }

  return (
    <div className="panel">
      <p style={{ marginTop: 0, color: 'var(--text-muted)', fontSize: 14 }}>
        Genera datos aleatorios y mide cuánto tarda cada algoritmo en ordenarlos.
      </p>
      <button className="primary" onClick={correrBenchmark} disabled={corriendo}>
        {corriendo ? 'Corriendo…' : 'Ejecutar benchmark'}
      </button>

      {!resultados && (
        <div className="placeholder" style={{ marginTop: 16 }}>
          Todavía no corriste el benchmark — o los 3 hooks siguen sin implementar,
          así que los tiempos no van a decir mucho.
        </div>
      )}

      {resultados && (
        <table style={{ width: '100%', marginTop: 18, borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border)' }}>
              <th style={{ padding: '8px 6px' }}>N</th>
              <th style={{ padding: '8px 6px' }}>Merge Sort (ms)</th>
              <th style={{ padding: '8px 6px' }}>Insertion Sort (ms)</th>
              <th style={{ padding: '8px 6px' }}>Counting Sort (ms)</th>
            </tr>
          </thead>
          <tbody>
            {resultados.map((fila) => (
              <tr key={fila.n} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '8px 6px' }}>{fila.n}</td>
                <td style={{ padding: '8px 6px' }}>{fila.merge}</td>
                <td style={{ padding: '8px 6px' }}>{fila.insertion}</td>
                <td style={{ padding: '8px 6px' }}>{fila.counting}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
