| Integrante | Usuario de git | Ejercicios |
| --- | --- | --- |
| Samuel Castaño Herrera | `samuelcherrera` | 215, 179, 743 |
| Manuela Gomez Chaparro | `ManuelitaG` | 1584, 72, 300 |
| Daniel Palacios Viveros | `DEVdanielp` | 134, 79 |


## 215. Kth Largest Element in an Array

Enlace al problema: [215. Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/)  
Solución: [`215-Kth-Largest-Element-in-an-Array.py`](215-Kth-Largest-Element-in-an-Array.py)  
Autor: Samuel Castaño Herrera (`samuelcherrera`)  
Familia: heap (min-heap de tamaño `k`)  
Idea: Se recorre `nums` manteniendo un min-heap de máximo `k` elementos; si el elemento actual es mayor que la raíz, se reemplaza la raíz y se reordena para conservar los `k` mayores, quedando el k-ésimo mayor en la raíz.  
Complejidad: Con un heap de tamaño `k`, el tiempo es `O(n log k)` (donde `n` es la longitud de `nums`) y el espacio extra es `O(k)`. Un sort completo sería `O(n log n)` y no corresponde a esta solución.  
Evidencia (Accepted): [215-Kth-Largest-Element-in-an-Array.png](evidencias/215-Kth-Largest-Element-in-an-Array.png)


## 179. Largest Number

Enlace al problema: [179. Largest Number](https://leetcode.com/problems/largest-number/)  
Solución: [`179-Largest-Number.py`](179-Largest-Number.py)  
Autor: Samuel Castaño Herrera (`samuelcherrera`)  
Familia: ordenamiento (la clave)  
Clave: Concatenación de cadenas (`a + b` frente a `b + a`, donde `a` va antes que `b` si `a + b > b + a`; no es orden numérico descendente)  
Idea: Se convierten los enteros no negativos a cadena, se ordenan según si `a + b > b + a` para maximizar la concatenación, se unen y, si el resultado empieza con `"0"` (como en `[0, 0]`), se retorna `"0"`.  
Complejidad: El sort domina con `O(n log n)` comparaciones (donde `n` es la longitud de `nums`), cada una lineal en la longitud de las cadenas, y `O(n)` de espacio para las cadenas y la salida.  
Evidencia (Accepted): [179-Largest-Number.png](evidencias/179-Largest-Number.png)

## 743. Network Delay Time

Enlace al problema: [743. Network Delay Time](https://leetcode.com/problems/network-delay-time/)  
Solución: [`743-Network-Delay-Time.py`](743-Network-Delay-Time.py)  
Autor: Samuel Castaño Herrera (`samuelcherrera`)  
Familia: grafos (Dijkstra)  
Modelo: Grafo dirigido y ponderado con pesos no negativos (`u -> v` con peso `w`, origen en el nodo `k`)  
Idea: Se ejecuta Dijkstra desde el nodo `k` usando un min-heap por tiempo acumulado para hallar la mínima distancia desde `k` a cada nodo; la respuesta es el mayor tiempo finito entre los `n` nodos (porque hay que esperar al que más tarda) o `-1` si algún nodo no es alcanzable  
Complejidad: Con `n` nodos y `m = times.length`, Dijkstra con heap es `O((n + m) log n)` en tiempo y `O(n + m)` en espacio  
Evidencia (Accepted): [743-Network-Delay-Time.png](evidencias/743-Network-Delay-Time.png)

## 1584. Min Cost to Connect All Points

Enlace al problema: [1584. Min Cost to Connect All Points](https://leetcode.com/problems/min-cost-to-connect-all-points/)\
Solución: [`1584. Min Cost to Connect All Points.py`](1584.%20Min%20Cost%20to%20Connect%20All%20Points.py)\
Autor: Manuela Gomez Chaparro (`ManuelitaG`)\
Familia: grafos (árbol de recubrimiento mínimo, Prim)\
Modelo: Grafo completo no dirigido y ponderado: cada punto es un vértice y entre cada pareja hay una arista con peso igual a la distancia de Manhattan `|x₁ - x₂| + |y₁ - y₂|`\
Idea: Se usa Prim sobre la matriz densa sin construir la lista de aristas. Se mantiene `dist[v]` = costo mínimo para unir el punto `v` al árbol; en cada paso se agrega el punto fuera del árbol con menor `dist`, se suma ese costo y se actualiza `dist` de los puntos restantes. No es un camino más corto entre dos puntos: se minimiza la suma de las aristas del árbol que conecta a todos\
Complejidad: Con `n = points.length`, Prim con arreglo es `Θ(n²)` en tiempo (hay `Θ(n²)` aristas posibles y cada una se evalúa una vez) y `Θ(n)` en espacio. Kruskal quedaría en `O(n² log n)` por el ordenamiento de las aristas\
Evidencia (Accepted): [1584. Min Cost to Connect All Points.png](evidencias/1584.%20Min%20Cost%20to%20Connect%20All%20Points.png)

## 72. Edit Distance

Enlace al problema: [72. Edit Distance](https://leetcode.com/problems/edit-distance/)\
Solución: [`72. Edit Distance.py`](72.%20Edit%20Distance.py)\
Autor: Nombre Apellido (`usuario`)\
Familia: programación dinámica (tabla de Wagner–Fischer)\
Estado: `dp[i][j]` = mínimo de ediciones para convertir `word1[0..i)` en `word2[0..j)`\
Base: `dp[i][0] = i` (borrar `i` letras) y `dp[0][j] = j` (insertar `j` letras)\
Recurrencia: si `word1[i-1] == word2[j-1]`, `dp[i][j] = dp[i-1][j-1]`; si no, `dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])` (borrar, insertar, sustituir)\
Idea: Se llena la tabla fila por fila y la respuesta es `dp[n][m]`. Un greedy que cambia la primera letra distinta no sirve porque no mira el resto de la cadena; la tabla considera todas las combinaciones de operaciones sobre los prefijos\
Complejidad: Con `n = word1.length` y `m = word2.length`, `Θ(n · m)` en tiempo y `Θ(n · m)` en espacio (`Θ(min(n, m))` si se comprime a dos filas)\
Evidencia (Accepted): [72. Edit Distance.png](evidencias/72.%20Edit%20Distance.png)

## 300. Longest Increasing Subsequence

Enlace al problema: [300. Longest Increasing Subsequence](https://leetcode.com/problems/longest-increasing-subsequence/)\
Solución: [`300. Longest Increasing Subsequence.py`](300.%20Longest%20Increasing%20Subsequence.py)\
Autor: Nombre Apellido (`usuario`)\
Familia: programación dinámica\
Estado: `dp[i]` = longitud de la subsecuencia estrictamente creciente más larga que termina en el índice `i`\
Base: `dp[i] = 1` (el elemento solo)\
Recurrencia: `dp[i] = max(dp[i], 1 + dp[j])` para todo `j < i` con `nums[j] < nums[i]`\
Idea: Para cada índice se revisan todos los anteriores y se extiende la mejor subsecuencia que termina en un valor menor. La respuesta es `max(dp)` y no `dp[n-1]`, porque la LIS más larga puede no terminar en el último elemento. No se ordena el arreglo porque eso destruye el orden de los índices\
Complejidad: Con `n = nums.length`, `Θ(n²)` en tiempo y `Θ(n)` en espacio\
Evidencia (Accepted): [300. Longest Increasing Subsequence.png](evidencias/300.%20Longest%20Increasing%20Subsequence.png)
