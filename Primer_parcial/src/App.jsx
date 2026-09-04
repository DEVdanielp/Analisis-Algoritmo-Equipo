import { useState } from 'react'
import Toolbar from './components/Toolbar.jsx'
import FormularioTarea from './components/FormularioTarea.jsx'
import TableroPrioridad from './components/TableroPrioridad.jsx'
import TareasSinOrdenar from './components/TareasSinOrdenar.jsx'

/**
 * App.jsx — infraestructura compartida (nadie necesita editar este archivo).
 *
 * Solo arma la navegación entre las 3 vistas, y
 * renderiza el componente de quien corresponda. Cada pestaña importa su
 * propio componente, así que development de las 3 partes puede avanzar
 * en paralelo sin tocar los mismos archivos.
 */

const TABS = [
  { id: 'general', label: 'Lista general', owner: 'Manuela · Merge Sort', Component: Toolbar },
  { id: 'agregar', label: 'Agregar tarea', owner: 'Samuel · Insertion Sort', Component: FormularioTarea },
  { id: 'sin-ordenar', label: 'Sin ordenar', owner: 'Daniel · Counting Sort', Component: TareasSinOrdenar },
  { id: 'prioridad', label: 'Tablero por prioridad', owner: 'Daniel · Counting Sort', Component: TableroPrioridad },
]

export default function App() {
  const [activeTab, setActiveTab] = useState(TABS[0].id)
  const active = TABS.find((tab) => tab.id === activeTab)
  const ActiveComponent = active.Component

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>
          Tri<span className="accent">Order</span>
        </h1>
        <p>Gestor de tareas ordenado en memoria — sin backend, sin Array.prototype.sort.</p>
      </header>

      <nav className="tabs" role="tablist" aria-label="Vistas de TriOrder">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={tab.id === activeTab}
            className={`tab ${tab.id === activeTab ? 'is-active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <p className="tab-owner">{active.owner}</p>

      <main className="app-main">
        <ActiveComponent />
      </main>
    </div>
  )
}
