# Máquina de Vueltos con Programación Dinámica

**Examen 3 – Análisis de Algoritmos · Opción 1 (Desarrollo)**

Aplicación web en **React + Vite** que calcula cómo debe entregar el vuelto una máquina expendedora usando la **menor cantidad de monedas posible**. Usa el algoritmo de **Cambio de Monedas (Coin Change)** con Programación Dinámica y lo compara con el método voraz.

## 👥 Integrantes

| Integrante | Aporte |
|---|---|
| Persona 1 | Estructura del proyecto (React + Vite), estilos base, planteamiento del problema |
| Persona 2 | Algoritmo de Programación Dinámica, método voraz, fuerza bruta, pruebas y explicación de estados / recurrencia / casos base |
| Persona 3 | Interfaz interactiva: escenarios y monedero, visualización de la tabla DP, comparación de resultados |

## 📌 El problema

La máquina expendedora de la cafetería de la universidad debe devolver vueltos. Para no quedarse sin monedas rápido, debe entregar **la menor cantidad de monedas posible**, y solo puede usar las denominaciones que tenga disponibles en ese momento.

Lo normal sería hacerlo "a ojo": entregar siempre la moneda más grande que quepa (**método voraz**). Pero eso no siempre funciona:

> La máquina **se quedó sin monedas de $50 y $100**. Solo tiene monedas de **$200, $500 y $1.000**.
> Un estudiante compra un producto de **$3.400** y paga con **$5.000**: el vuelto es **$1.600**.
>
> - **Voraz:** entrega $1.000, luego $500 (van $1.500)… y faltan $100 que no puede formar. **No encuentra solución.**
> - **Correcto:** $1.000 + $200 + $200 + $200 = **4 monedas.**

**¿Cómo encontrar siempre la cantidad mínima de monedas, o saber con certeza que el vuelto es imposible?**

## ▶️ Cómo ejecutar

Requisitos: Node.js 18 o superior.

```bash
npm install
npm run dev      # abre http://localhost:5173
npm test         # ejecuta las pruebas del algoritmo
npm run build    # genera la versión de producción
```
