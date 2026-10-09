export default function App() {
  return (
    <main className="contenedor">
      <header className="encabezado">
        <span className="etiqueta">Examen 3 · Análisis de Algoritmos</span>
        <h1>Planificador de Estudio con Programación Dinámica</h1>
        <p>
          Faltan pocas horas para el parcial y no alcanza el tiempo para estudiar todo. Cada tema toma
          cierto número de horas y aporta cierta cantidad de puntos. ¿Qué temas estudiar para obtener el
          máximo puntaje sin pasarse del tiempo disponible?
        </p>
      </header>

      <section className="tarjeta">
        <h2>Planteamiento</h2>
        <p>
          Este es un problema de optimización con restricción: elegir un subconjunto de temas cuya suma de
          horas no supere <code>H</code> y cuya suma de puntos sea máxima. Corresponde al clásico
          problema de la <strong>Mochila 0/1</strong>.
        </p>
      </section>
    </main>
  );
}
