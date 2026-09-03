import { createContext, useContext } from 'react'
import { useTasksState } from '../hooks/useTasks.js'

/**
 * TasksContext.jsx — TODO(Samuel): Fase 1 · Cimientos
 *
 * El Provider y el hook de consumo `useTasks()` ya están armados — no
 * deberías necesitar tocar este archivo salvo que cambies la forma del
 * valor que expone `useTasksState()`. El trabajo real va en
 * hooks/useTasks.js.
 */

const TasksContext = createContext(null)

export function TasksProvider({ children }) {
  const value = useTasksState()
  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
}

export function useTasks() {
  const context = useContext(TasksContext)
  if (!context) {
    throw new Error('useTasks debe usarse dentro de <TasksProvider>')
  }
  return context
}
