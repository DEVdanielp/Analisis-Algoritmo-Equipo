import { useState } from 'react'
import { useTasks } from '../context/TasksContext.jsx'
import TaskCard from './TaskCard.jsx'
// TODO(Samuel): importa tu hook cuando esté listo:
// import { useInsertionSort } from '../hooks/useInsertionSort.js'

/**
 * FormularioTarea.jsx — TODO(Samuel): Fase 2 · Algoritmo
 *
 * El formulario y sus campos ya están armados. Lo que falta:
 *   1. Implementar hooks/useInsertionSort.js
 *   2. Usarlo aquí (o dentro de useTasks) para insertar la tarea nueva
 *      ya en su posición ordenada, y mostrar en qué lugar quedó.
 */
export default function FormularioTarea() {
  const { tasks, agregarTarea } = useTasks()
  const [form, setForm] = useState({ titulo: '', prioridad: 'Media', fecha: '', precio: '' })

  const handleChange = (campo) => (event) => {
    setForm((prev) => ({ ...prev, [campo]: event.target.value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!form.titulo || !form.fecha) return

    agregarTarea({
      id: crypto.randomUUID(),
      titulo: form.titulo,
      prioridad: form.prioridad,
      fecha: form.fecha,
      precio: Number(form.precio) || 0,
    })

    // TODO(Samuel): con useInsertionSort ya conectado, mostrá acá en qué
    // posición quedó insertada la tarea (feedback visual para el usuario).
    setForm({ titulo: '', prioridad: 'Media', fecha: '', precio: '' })
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
          Agregar tarea
        </button>
      </form>

      <div className="placeholder" style={{ marginTop: 18 }}>
        TODO(Samuel): esta lista se muestra tal como está en memoria, sin ordenar.
        Reemplazala por el resultado de <code>useInsertionSort</code>.
      </div>

      <div className="task-list">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  )
}
