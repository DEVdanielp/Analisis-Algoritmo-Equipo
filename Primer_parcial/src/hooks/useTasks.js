import { useReducer } from 'react'
import { mockTasks } from '../data/mockTasks.js'

/**
 * useTasks.js — TODO(Samuel): Fase 1 · Cimientos
 *
 * Hook central de estado, en memoria. Debe exponer:
 *   - tasks: Task[]
 *   - agregarTarea(tarea)
 *   - editarTarea(id, cambios)
 *   - eliminarTarea(id)
 *
 * Implementalo con useReducer (acciones AGREGAR / EDITAR / ELIMINAR).
 * Los tres casos de abajo son placeholders seguros: no rompen la app,
 * pero tampoco hacen nada todavía.
 *
 * Ojo: cuando termines hooks/useInsertionSort.js (también tuyo, en la
 * Fase 2), la acción AGREGAR es el lugar natural para usarlo — en vez
 * de un push() simple, inserta la tarea nueva ya en su posición
 * ordenada dentro de la lista.
 */

function tasksReducer(state, action) {
  switch (action.type) {
    case 'AGREGAR':
      // TODO(Samuel): insertar `action.payload` en `state`.
      console.warn('useTasks: AGREGAR sin implementar todavía')
      return state

    case 'EDITAR':
      // TODO(Samuel): reemplazar los campos de la tarea con id === action.payload.id
      console.warn('useTasks: EDITAR sin implementar todavía')
      return state

    case 'ELIMINAR':
      // TODO(Samuel): quitar la tarea con id === action.payload.id
      console.warn('useTasks: ELIMINAR sin implementar todavía')
      return state

    default:
      return state
  }
}

export function useTasksState() {
  const [tasks, dispatch] = useReducer(tasksReducer, mockTasks)

  const agregarTarea = (tarea) => dispatch({ type: 'AGREGAR', payload: tarea })
  const editarTarea = (id, cambios) => dispatch({ type: 'EDITAR', payload: { id, ...cambios } })
  const eliminarTarea = (id) => dispatch({ type: 'ELIMINAR', payload: { id } })

  return { tasks, agregarTarea, editarTarea, eliminarTarea }
}
