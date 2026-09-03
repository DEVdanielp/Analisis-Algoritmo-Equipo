import { useTasks } from '../context/TasksContext.jsx'
import { useCountingSort } from '../hooks/useCountingSort.js'
import { PRIORIDADES } from '../utils/priorities.js'
import TaskCard from './TaskCard.jsx'

export default function TableroPrioridad() {
  const { tasks } = useTasks()

  const ordenadas = useCountingSort(tasks, 'prioridad')
  const grupos = PRIORIDADES.reduce((acc, prioridad) => {
    acc[prioridad] = ordenadas.filter((task) => task.prioridad === prioridad)
    return acc
  }, {})

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
