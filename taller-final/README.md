| Integrante | Usuario de git | Ejercicios |
| --- | --- | --- |
| Samuel Castaño Herrera | `samuelcherrera` | 215, 179, 743 |
| Manu | `ManuelitaG` | 1584, 72, 300 |
| Dani | `DEVdanielp` | 134, 79 |


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