/**
 * TaskCard.jsx — infraestructura compartida (ya implementada).
 *
 * Presentación de una tarea individual. Las 3 vistas (Toolbar, Formulario,
 * Tablero) pueden reutilizar este componente en vez de duplicar el markup.
 */
export default function TaskCard({ task }) {
  const prioridadClase = task.prioridad.toLowerCase()

  return (
    <div className="task-card">
      <div>
        <div className="title">{task.titulo}</div>
        <div className="meta">
          {new Date(task.fecha).toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' })}
          {' · '}
          ${task.precio.toLocaleString('es-CO')}
        </div>
      </div>
      <span className={`priority-pill ${prioridadClase}`}>{task.prioridad}</span>
    </div>
  )
}
