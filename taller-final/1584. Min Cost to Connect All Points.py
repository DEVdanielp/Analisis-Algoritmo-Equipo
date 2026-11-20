#Ejercicio 4
class Solution:
    def minCostConnectPoints(self, points: list[list[int]]) -> int:
        n = len(points)
        INF = float('inf')
        dist = [INF] * n      
        dist[0] = 0             
        en_arbol = [False] * n
        total = 0

        for _ in range(n):
            u = -1
            for i in range(n):
                if not en_arbol[i] and (u == -1 or dist[i] < dist[u]):
                    u = i

            en_arbol[u] = True
            total += dist[u]

            xu, yu = points[u]
            for v in range(n):
                if not en_arbol[v]:
                    d = abs(xu - points[v][0]) + abs(yu - points[v][1])
                    if d < dist[v]:
                        dist[v] = d

        return total