import { useReducer } from 'react'
import { mockTasks } from '../data/mockTasks.js'
import { porFecha } from '../utils/comparators.js'
import { useInsertionSort } from './useInsertionSort.js'

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
 * Las tareas se mantienen ordenadas por fecha para que las vistas puedan
 * reutilizar el estado sin volver a ordenar toda la lista.
 */

function tasksReducer(state, action) {
  switch (action.type) {
    case 'AGREGAR':
      return useInsertionSort(state, action.payload, porFecha)

    case 'EDITAR':
      {
        const tarea = state.find((task) => task.id === action.payload.id)
        if (!tarea) return state

        const actualizada = { ...tarea, ...action.payload }
        const restantes = state.filter((task) => task.id !== tarea.id)
        return useInsertionSort(restantes, actualizada, porFecha)
      }

    case 'ELIMINAR':
      return state.filter((task) => task.id !== action.payload.id)

    default:
      return state
  }
}

const initialTasks = mockTasks.reduce(
  (orderedTasks, task) => useInsertionSort(orderedTasks, task, porFecha),
  [],
)

export function useTasksState() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks)

  const agregarTarea = (tarea) => dispatch({ type: 'AGREGAR', payload: tarea })
  const editarTarea = (id, cambios) => dispatch({ type: 'EDITAR', payload: { id, ...cambios } })
  const eliminarTarea = (id) => dispatch({ type: 'ELIMINAR', payload: { id } })

  return { tasks, agregarTarea, editarTarea, eliminarTarea }
}
