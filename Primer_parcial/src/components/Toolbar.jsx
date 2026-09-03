import { useState } from 'react'
import { useTasks } from '../context/TasksContext.jsx'
import { useMergeSort } from '../hooks/useMergeSort.js'
import { COMPARADORES } from '../utils/comparators.js'
import TaskCard from './TaskCard.jsx'

/**
 * Toolbar.jsx — TODO(Manuela): Fase 2 · Algoritmo
 *
 * El selector de criterio y la conexión con useMergeSort ya están
 * armados — lo único que falta es implementar hooks/useMergeSort.js.
 * Cuando lo hagas, esta vista ordena sola.
 */
export default function Toolbar() {
  const { tasks } = useTasks()
  const [criterio, setCriterio] = useState('fecha')

  const compareFn = COMPARADORES[criterio].fn
  const tareasOrdenadas = useMergeSort(tasks, compareFn)

  return (
    <div className="panel">
      <div className="field" style={{ maxWidth: 220 }}>
        <label htmlFor="criterio">Ordenar por</label>
        <select id="criterio" value={criterio} onChange={(event) => setCriterio(event.target.value)}>
          {Object.entries(COMPARADORES).map(([key, { label }]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="task-list">
        {tareasOrdenadas.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  )
}
