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


## 🧠 Algoritmo: Cambio de Monedas con Programación Dinámica

Una solución recursiva ingenua prueba todas las formas de armar el vuelto: para cada moneda posible vuelve a resolver lo que falta, y así sucesivamente. Esto repite el mismo cálculo una y otra vez y crece de forma **exponencial**. El problema cumple las dos propiedades de la Programación Dinámica:

1. **Subestructura óptima:** si la forma óptima de dar *v* termina con una moneda *c*, entonces el resto (*v − c*) también debe estar dado de forma óptima.
2. **Subproblemas superpuestos:** para dar $1.600 hay que saber dar $1.400, $1.100 y $600; para dar $1.400 hay que saber dar $1.200, $900 y $400… Los mismos valores aparecen muchas veces. Se calculan **una sola vez** y se guardan en una tabla.

### Estado (subproblema)

```
dp[v] = mínimo número de monedas para formar exactamente el valor v
        (∞ si v no se puede formar)
```

La tabla es un arreglo de `V + 1` posiciones (de 0 hasta el vuelto pedido).

### Casos base

```
dp[0] = 0    → un vuelto de $0 no necesita monedas
dp[v] = ∞    → valor inicial para todo v > 0 (todavía no sabemos formarlo)
```

### Relación de recurrencia

```
dp[v] = min( dp[v - c] + 1 )     para cada moneda c con c ≤ v
```

Se prueba cada moneda como **la última que se entrega**: si se entrega *c*, lo que falta (*v − c*) ya está resuelto de forma óptima en la tabla, y se suma 1 por la moneda *c*. Se queda el mínimo.

**Respuesta:** `dp[V]`. Si es ∞, el vuelto es imposible con esas monedas.

### Reconstrucción de la solución

Para cada `v` se guarda `ultimaMoneda[v]`, la moneda que dio el mínimo. Partiendo de `V` se resta esa moneda, luego la del nuevo valor, y así hasta llegar a 0:

```
1600 →(−200)→ 1400 →(−200)→ 1200 →(−200)→ 1000 →(−1000)→ 0
```

### Complejidad

| Enfoque | Tiempo | Espacio | ¿Óptimo? |
|---|---|---|---|
| Voraz | O(V / c_min + m log m) | O(1) | ❌ No siempre |
| Fuerza bruta (recursión sin memoria) | Exponencial | O(V) | ✅ |
| **Programación Dinámica** | **O(V · m)** | **O(V)** | ✅ |

*m* = número de denominaciones.

## 🎥 Video de sustentación

👉 **[Ver video de sustentación](PEGAR_AQUI_EL_ENLACE_DEL_VIDEO)**

