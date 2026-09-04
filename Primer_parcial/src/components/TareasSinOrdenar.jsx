import { useTasks } from '../context/TasksContext.jsx'
import TaskCard from './TaskCard.jsx'

/**
 * TareasSinOrdenar.jsx — Fase 2 · Algoritmo (Daniel)
 *
 * Muestra las tareas tal como llegan, sin ordenar por prioridad — el
 * "problema" que resuelve useCountingSort, en su propia pestaña
 * (contraste con "Tablero por prioridad").
 */
export default function TareasSinOrdenar() {
  const { tasks } = useTasks()

  return (
    <div className="panel">
      <p className="placeholder">
        Problema: así llegan las {tasks.length} tareas, sin ordenar por prioridad.
      </p>
      <div className="task-list">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  )
}
