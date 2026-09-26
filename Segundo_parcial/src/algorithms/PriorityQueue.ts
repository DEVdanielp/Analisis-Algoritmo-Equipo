/**
 * Cola de prioridad mínima implementada con un montículo binario (min-heap).
 * insertar y extraer: O(log n).
 */
export class PriorityQueue<T> {
  private heap: { valor: T; prioridad: number }[] = [];

  get tamano(): number {
    return this.heap.length;
  }

  estaVacia(): boolean {
    return this.heap.length === 0;
  }

  insertar(valor: T, prioridad: number): void {
    this.heap.push({ valor, prioridad });
    this.subir(this.heap.length - 1);
  }

  extraer(): { valor: T; prioridad: number } | undefined {
    if (this.heap.length === 0) return undefined;
    const tope = this.heap[0];
    const ultimo = this.heap.pop()!;
    if (this.heap.length > 0) {
      this.heap[0] = ultimo;
      this.bajar(0);
    }
    return tope;
  }

  private subir(i: number): void {
    while (i > 0) {
      const padre = (i - 1) >> 1;
      if (this.heap[padre].prioridad <= this.heap[i].prioridad) break;
      [this.heap[padre], this.heap[i]] = [this.heap[i], this.heap[padre]];
      i = padre;
    }
  }

  private bajar(i: number): void {
    const n = this.heap.length;
    for (;;) {
      const izq = 2 * i + 1;
      const der = izq + 1;
      let menor = i;
      if (izq < n && this.heap[izq].prioridad < this.heap[menor].prioridad) menor = izq;
      if (der < n && this.heap[der].prioridad < this.heap[menor].prioridad) menor = der;
      if (menor === i) break;
      [this.heap[menor], this.heap[i]] = [this.heap[i], this.heap[menor]];
      i = menor;
    }
  }
}
