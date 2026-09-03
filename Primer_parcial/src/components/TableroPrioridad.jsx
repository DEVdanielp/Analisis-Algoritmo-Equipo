import { useTasks } from '../context/TasksContext.jsx'
import { useCountingSort, agruparPorPrioridad } from '../hooks/useCountingSort.js'
import { PRIORIDADES } from '../utils/priorities.js'
import TaskCard from './TaskCard.jsx'

/**
 * TableroPrioridad.jsx — TODO(Daniel): Fase 2 · Algoritmo
 *
 * Vista tipo Kanban con 3 columnas (Alta / Media / Baja). Por ahora
 * agrupa las tareas con el helper `agruparPorPrioridad` (ya
 * implementado) para que el tablero se vea completo desde el día uno.
 *
 * Una vez que implementes hooks/useCountingSort.js de verdad, cambiá
 * la línea de abajo para usar su resultado en vez del helper —
 * la diferencia es que tu hook además deja las tareas ordenadas
 * dentro de cada columna, no solo agrupadas.
 */
export default function TableroPrioridad() {
  const { tasks } = useTasks()

  // TODO(Daniel): reemplazar por: const ordenadas = useCountingSort(tasks, 'prioridad')
  const grupos = agruparPorPrioridad(tasks)

  return (
    <div className="panel">
      <div className="board">
        {PRIORIDADES.map((prioridad) => (
          <div className="board-column" key={prioridad}>
            <h3>{prioridad}</h3>
            {grupos[prioridad].length === 0 && (
              <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Sin tareas</p>
            )}
            <div className="task-list">
              {grupos[prioridad].map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
