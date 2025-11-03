import { performance } from "perf_hooks";
import { maximaGanancia } from "./maximaGanancia";

/**
 * Clase para realizar benchmarking de la función maximaGanancia
 */
class BenchmarkRunner {
  private iteraciones = 10000;

  /**
   * Genera un array aleatorio de números
   */
  private generarArrayAleatorio(size: number, min: number, max: number): number[] {
    return Array.from({ length: size }, () =>
      Math.floor(Math.random() * (max - min + 1)) + min
    );
  }

  /**
   * Ejecuta un benchmark para un caso específico
   */
  private ejecutarBenchmark(
    nombre: string,
    parcelas: number[],
    iteraciones: number = this.iteraciones
  ): void {
    for (let i = 0; i < 100; i++) {
      maximaGanancia([...parcelas]);
    }

    const inicio = performance.now();
    for (let i = 0; i < iteraciones; i++) {
      maximaGanancia([...parcelas]);
    }
    const fin = performance.now();

    const tiempoTotal = fin - inicio;
    const tiempoPromedio = tiempoTotal / iteraciones;
    const operacionesPorSegundo = Math.floor(1000 / tiempoPromedio);

    console.log(`\n📊 ${nombre}`);
    console.log(`   Tamaño del array: ${parcelas.length}`);
    console.log(`   Iteraciones: ${iteraciones.toLocaleString()}`);
    console.log(`   Tiempo total: ${tiempoTotal.toFixed(2)} ms`);
    console.log(`   Tiempo promedio: ${tiempoPromedio.toFixed(4)} ms`);
    console.log(`   Operaciones/seg: ${operacionesPorSegundo.toLocaleString()}`);
    console.log(`   Resultado: ${maximaGanancia(parcelas)}`);
  }

  /**
   * Ejecuta la suite completa de benchmarks
   */
  public ejecutar(): void {
    console.log("🎯 BENCHMARKS - Algoritmo de Kadane (Máxima Ganancia)");
    console.log("=".repeat(60));

    // Caso 1: Array pequeño (10 elementos)
    this.ejecutarBenchmark(
      "Array pequeño (10 elementos)",
      this.generarArrayAleatorio(10, -50, 50)
    );

    // Caso 2: Array mediano (100 elementos)
    this.ejecutarBenchmark(
      "Array mediano (100 elementos)",
      this.generarArrayAleatorio(100, -100, 100)
    );

    // Caso 3: Array grande (1,000 elementos)
    this.ejecutarBenchmark(
      "Array grande (1,000 elementos)",
      this.generarArrayAleatorio(1000, -500, 500)
    );

    // Caso 4: Array muy grande (10,000 elementos)
    this.ejecutarBenchmark(
      "Array muy grande (10,000 elementos)",
      this.generarArrayAleatorio(10000, -1000, 1000),
      1000 // Menos iteraciones para arrays grandes
    );

    // Caso 5: Array extremo (100,000 elementos)
    this.ejecutarBenchmark(
      "Array extremo (100,000 elementos)",
      this.generarArrayAleatorio(100000, -10000, 10000),
      100 // Muy pocas iteraciones para arrays extremos
    );

    // Casos específicos del enunciado
    console.log("\n" + "=".repeat(60));
    console.log("🎃 CASOS ESPECÍFICOS DEL ENUNCIADO");
    console.log("=".repeat(60));

    this.ejecutarBenchmark(
      "Caso del huerto maldito",
      [2, -5, 8, -2, 4, -10, 3, 1]
    );

    this.ejecutarBenchmark(
      "Caso con todos positivos",
      [1, 2, 3, 4]
    );

    this.ejecutarBenchmark(
      "Caso con todos negativos",
      [-1, -2, -3, -4]
    );

    this.ejecutarBenchmark(
      "Caso con zona maldita",
      [8, 1, -100, 2, 5]
    );

    // Casos extremos
    console.log("\n" + "=".repeat(60));
    console.log("⚠️  CASOS EXTREMOS");
    console.log("=".repeat(60));

    this.ejecutarBenchmark(
      "Best case: Todos positivos (1,000 elementos)",
      Array.from({ length: 1000 }, (_, i) => i + 1)
    );

    this.ejecutarBenchmark(
      "Worst case: Todos negativos (1,000 elementos)",
      Array.from({ length: 1000 }, (_, i) => -(i + 1))
    );

    this.ejecutarBenchmark(
      "Patrón alternado (1,000 elementos)",
      Array.from({ length: 1000 }, (_, i) => (i % 2 === 0 ? 10 : -5))
    );

    console.log("\n" + "=".repeat(60));
    console.log("📈 ANÁLISIS DE COMPLEJIDAD");
    console.log("=".repeat(60));
    console.log("✅ Complejidad temporal: O(n) - Lineal");
    console.log("✅ Complejidad espacial: O(1) - Constante");
    console.log("✅ Una sola pasada por el array");
    console.log("✅ Sin recursión ni estructuras auxiliares");
    console.log("=".repeat(60));
  }
}

const runner = new BenchmarkRunner();
runner.ejecutar();
