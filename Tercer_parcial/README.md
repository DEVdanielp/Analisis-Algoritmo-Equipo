# Planificador de Estudio con Programación Dinámica

**Examen 3 – Análisis de Algoritmos · Opción 1 (Desarrollo)**

Aplicación web en **React + Vite** que resuelve un problema de planificación de estudio usando el algoritmo de la **Mochila 0/1 (0/1 Knapsack)** con Programación Dinámica.

## 👥 Integrantes

| Integrante | Aporte |
|---|---|
| Persona 1 | Estructura del proyecto (React + Vite), estilos base, planteamiento del problema |
| Persona 2 | Algoritmo de Programación Dinámica, pruebas automáticas, explicación de estados / recurrencia / casos base |
| Persona 3 | Interfaz interactiva: formulario, visualización de la tabla DP, resultados y verificación |

## 📌 El problema

Es la semana de parciales y un estudiante solo tiene **H horas libres** antes del examen. Hay varios temas que podría estudiar; cada tema:

- toma un número de **horas** en estudiarse (el *peso*), y
- aporta una cantidad de **puntos** en el examen (el *valor*).

Un tema se estudia completo o no se estudia (no sirve estudiarlo a medias). **¿Qué temas debe estudiar para obtener el máximo puntaje posible sin pasarse de las horas disponibles?**

### Datos del ejemplo (H = 12 horas)

| # | Tema | Horas | Puntos |
|---|---|---|---|
| 1 | Programación dinámica | 6 | 30 |
| 2 | Grafos (BFS / DFS) | 4 | 18 |
| 3 | Ordenamiento | 2 | 8 |
| 4 | Notación Big-O | 3 | 14 |
| 5 | Divide y vencerás | 5 | 20 |
| 6 | Algoritmos voraces | 4 | 16 |

## ▶️ Cómo ejecutar

Requisitos: Node.js 18 o superior.

```bash
npm install
npm run dev      # abre http://localhost:5173
npm test         # ejecuta las pruebas del algoritmo
npm run build    # genera la versión de producción
```
