import { useState } from 'react'
import { useTasks } from '../context/TasksContext.jsx'
import { useInsertionSort } from '../hooks/useInsertionSort.js'
import { porFecha } from '../utils/comparators.js'
import TaskCard from './TaskCard.jsx'

/**
 * FormularioTarea.jsx — TODO(Samuel): Fase 2 · Algoritmo
 *
 * Inserta cada tarea nueva por fecha y muestra la posición que ocupó.
 */
export default function FormularioTarea() {
  const { tasks, agregarTarea, editarTarea, eliminarTarea } = useTasks()
  const [form, setForm] = useState({ titulo: '', prioridad: 'Media', fecha: '', precio: '' })
  const [feedback, setFeedback] = useState('')
  const [tareaEnEdicion, setTareaEnEdicion] = useState(null)

  const handleChange = (campo) => (event) => {
    setForm((prev) => ({ ...prev, [campo]: event.target.value }))
  }

  const limpiarFormulario = () => {
    setForm({ titulo: '', prioridad: 'Media', fecha: '', precio: '' })
    setTareaEnEdicion(null)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!form.titulo || !form.fecha) return

    const tarea = {
      id: tareaEnEdicion?.id ?? crypto.randomUUID(),
      titulo: form.titulo,
      prioridad: form.prioridad,
      fecha: form.fecha,
      precio: Number(form.precio) || 0,
    }

    if (tareaEnEdicion) {
      editarTarea(tarea.id, tarea)
      setFeedback('Tarea editada correctamente.')
    } else {
      const tareasOrdenadas = useInsertionSort(tasks, tarea, porFecha)
      const posicion = tareasOrdenadas.findIndex((task) => task.id === tarea.id) + 1
      agregarTarea(tarea)
      setFeedback(`Tarea insertada en la posición ${posicion}.`)
    }

    limpiarFormulario()
  }

  const iniciarEdicion = (task) => {
    setTareaEnEdicion(task)
    setForm({
      titulo: task.titulo,
      prioridad: task.prioridad,
      fecha: task.fecha,
      precio: String(task.precio),
    })
    setFeedback('')
  }

  const handleDelete = (task) => {
    if (!window.confirm(`¿Eliminar la tarea "${task.titulo}"?`)) return

    eliminarTarea(task.id)
    if (tareaEnEdicion?.id === task.id) limpiarFormulario()
    setFeedback('Tarea eliminada correctamente.')
  }

  return (
    <div className="panel">
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titulo">Título</label>
          <input
            id="titulo"
            value={form.titulo}
            onChange={handleChange('titulo')}
            placeholder="Ej. Entregar informe"
          />
        </div>
        <div className="field">
          <label htmlFor="prioridad">Prioridad</label>
          <select id="prioridad" value={form.prioridad} onChange={handleChange('prioridad')}>
            <option>Alta</option>
            <option>Media</option>
            <option>Baja</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="fecha">Fecha</label>
          <input id="fecha" type="date" value={form.fecha} onChange={handleChange('fecha')} />
        </div>
        <div className="field">
          <label htmlFor="precio">Precio</label>
          <input
            id="precio"
            type="number"
            min="0"
            value={form.precio}
            onChange={handleChange('precio')}
            placeholder="0"
          />
        </div>
        <button className="primary" type="submit">
          {tareaEnEdicion ? 'Guardar cambios' : 'Agregar tarea'}
        </button>
        {tareaEnEdicion && (
          <button className="primary" type="button" onClick={limpiarFormulario}>
            Cancelar
          </button>
        )}
      </form>

      {feedback && <div className="placeholder" style={{ marginTop: 18 }}>{feedback}</div>}

      <div className="task-list">
        {tasks.map((task) => (
          <div key={task.id}>
            <TaskCard task={task} />
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              <button className="primary" type="button" onClick={() => iniciarEdicion(task)}>
                Editar
              </button>
              <button
                className="primary"
                style={{ background: 'var(--track-b)' }}
                type="button"
                onClick={() => handleDelete(task)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
