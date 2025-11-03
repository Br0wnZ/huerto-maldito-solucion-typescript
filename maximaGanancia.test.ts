import { maximaGanancia, CalculadorGananciaMaxima } from "./maximaGanancia";

/**
 * Suite de tests para la función maximaGanancia
 * Tests sin frameworks - TypeScript puro
 */
class TestRunner {
  private testsPassed: number = 0;
  private testsFailed: number = 0;
  private errors: string[] = [];

  /**
   * Ejecuta una prueba y registra el resultado
   */
  test(descripcion: string, testFn: () => void): void {
    try {
      testFn();
      console.log(`✓ ${descripcion}`);
      this.testsPassed++;
    } catch (error) {
      console.error(`✗ ${descripcion}`);
      const mensaje = error instanceof Error ? error.message : String(error);
      console.error(`  ${mensaje}`);
      this.testsFailed++;
      this.errors.push(`${descripcion}: ${mensaje}`);
    }
  }

  /**
   * Aserción de igualdad
   */
  assertEqual(actual: any, esperado: any, mensaje?: string): void {
    if (actual !== esperado) {
      throw new Error(
        mensaje ||
          `Se esperaba ${esperado}, pero se obtuvo ${actual}`
      );
    }
  }

  /**
   * Aserción de que debe lanzar error
   */
  assertThrows(fn: () => void, mensaje?: string): void {
    try {
      fn();
      throw new Error(mensaje || "Se esperaba que lanzara un error");
    } catch (error) {
      if (error instanceof Error && error.message.includes("Se esperaba que")) {
        throw error;
      }
      // El error esperado fue lanzado
    }
  }

  /**
   * Genera reporte final
   */
  generarReporte(): void {
    console.log("\n" + "=".repeat(60));
    console.log(`Tests Pasados: ${this.testsPassed}`);
    console.log(`Tests Fallidos: ${this.testsFailed}`);
    console.log("=".repeat(60));

    if (this.testsFailed > 0) {
      console.error("\nErrores encontrados:");
      this.errors.forEach((error) => console.error(`  - ${error}`));
      process.exit(1);
    }
  }
}

// Crear instancia del test runner
const runner = new TestRunner();

console.log("🌱 Iniciando tests de La Cosecha de Calabazas Malditas 🌱\n");

// ============================================
// TESTS BÁSICOS - CASOS DEL ENUNCIADO
// ============================================
console.log("📝 Casos de ejemplo del enunciado:");

runner.test(
  "Caso 1: Array con todos números positivos [1, 2, 3, 4]",
  () => {
    const resultado = maximaGanancia([1, 2, 3, 4]);
    runner.assertEqual(resultado, 10, "Debería ser 10");
  }
);

runner.test(
  "Caso 2: Array con todos números negativos [-1, -2, -3, -4]",
  () => {
    const resultado = maximaGanancia([-1, -2, -3, -4]);
    runner.assertEqual(resultado, -1, "Debería ser -1 (la calabaza menos maldita)");
  }
);

runner.test(
  "Caso 3: Array con números mixtos [8, 1, -100, 2, 5]",
  () => {
    const resultado = maximaGanancia([8, 1, -100, 2, 5]);
    runner.assertEqual(resultado, 9, "Debería ser 9 (suma de [8, 1])");
  }
);

// ============================================
// TESTS DEL ENUNCIADO - COSECHA DE CALABAZAS MALDITAS
// ============================================
console.log("\n🎃 Casos específicos de la cosecha de calabazas malditas:");

runner.test(
  "Cosecha de calabazas malditas (caso original) [2, -5, 8, -2, 4, -10, 3, 1]",
  () => {
    const resultado = maximaGanancia([2, -5, 8, -2, 4, -10, 3, 1]);
    runner.assertEqual(resultado, 10, "Debería ser 10 (suma de [8, -2, 4])");
  }
);

// ============================================
// TESTS DE CASOS EXTREMOS
// ============================================
console.log("\n⚠️  Casos extremos:");

runner.test(
  "Array con un solo elemento positivo [5]",
  () => {
    const resultado = maximaGanancia([5]);
    runner.assertEqual(resultado, 5, "Debería retornar el elemento único");
  }
);

runner.test(
  "Array con un solo elemento negativo [-5]",
  () => {
    const resultado = maximaGanancia([-5]);
    runner.assertEqual(resultado, -5, "Debería retornar el elemento único");
  }
);

runner.test(
  "Array con ceros [0, 0, 0]",
  () => {
    const resultado = maximaGanancia([0, 0, 0]);
    runner.assertEqual(resultado, 0, "Debería retornar 0");
  }
);

runner.test(
  "Array con un cero y negativos [0, -5, -3]",
  () => {
    const resultado = maximaGanancia([0, -5, -3]);
    runner.assertEqual(resultado, 0, "Debería retornar 0");
  }
);

// ============================================
// TESTS DE COMPORTAMIENTO DEL ALGORITMO
// ============================================
console.log("\n🔍 Pruebas del algoritmo Kadane:");

runner.test(
  "Sub-array en el medio [1, -3, 2, 3, -1, 4]",
  () => {
    const resultado = maximaGanancia([1, -3, 2, 3, -1, 4]);
    runner.assertEqual(resultado, 8, "Debería ser 8 (suma de [2, 3, -1, 4])");
  }
);

runner.test(
  "Sub-array al inicio [-2, -3, 5, 1, -2]",
  () => {
    const resultado = maximaGanancia([-2, -3, 5, 1, -2]);
    runner.assertEqual(resultado, 6, "Debería ser 6 (suma de [5, 1])");
  }
);

runner.test(
  "Sub-array al final [1, -1, -1, 5, 4]",
  () => {
    const resultado = maximaGanancia([1, -1, -1, 5, 4]);
    runner.assertEqual(resultado, 9, "Debería ser 9 (suma de [5, 4])");
  }
);

runner.test(
  "Todo el array es la respuesta [1, 2, 3, 4, 5]",
  () => {
    const resultado = maximaGanancia([1, 2, 3, 4, 5]);
    runner.assertEqual(resultado, 15, "Debería ser 15");
  }
);

runner.test(
  "Un elemento en el medio [3, -2, 5, -2, 3]",
  () => {
    const resultado = maximaGanancia([3, -2, 5, -2, 3]);
    runner.assertEqual(resultado, 7, "Debería ser 7 (suma de [3, -2, 5, -2, 3])");
  }
);

// ============================================
// TESTS DE VALIDACIÓN
// ============================================
console.log("\n🛡️  Pruebas de validación:");

runner.test(
  "Array vacío debería lanzar error",
  () => {
    runner.assertThrows(
      () => maximaGanancia([]),
      "Debería lanzar error para array vacío"
    );
  }
);

// ============================================
// TESTS DE NÚMEROS GRANDES
// ============================================
console.log("\n📊 Pruebas con números grandes:");

runner.test(
  "Array con números muy grandes [1000000, -500000, 2000000]",
  () => {
    const resultado = maximaGanancia([1000000, -500000, 2000000]);
    runner.assertEqual(resultado, 2500000, "Debería manejar números grandes");
  }
);

runner.test(
  "Array con números muy negativos [-1000, -2000, -500]",
  () => {
    const resultado = maximaGanancia([-1000, -2000, -500]);
    runner.assertEqual(resultado, -500, "Debería ser -500 (el menos malo)");
  }
);

// ============================================
// TESTS DE PATRONES ESPECIALES
// ============================================
console.log("\n🎯 Patrones especiales:");

runner.test(
  "Patrón alternado [5, -5, 5, -5, 5]",
  () => {
    const resultado = maximaGanancia([5, -5, 5, -5, 5]);
    runner.assertEqual(resultado, 5, "Debería retornar 5");
  }
);

runner.test(
  "Muchos negativos con un positivo [-10, -20, 15, -30, -50]",
  () => {
    const resultado = maximaGanancia([-10, -20, 15, -30, -50]);
    runner.assertEqual(resultado, 15, "Debería retornar 15");
  }
);

runner.test(
  "Dos picos [1, -2, 5, -2, 3]",
  () => {
    const resultado = maximaGanancia([1, -2, 5, -2, 3]);
    runner.assertEqual(resultado, 6, "Debería retornar 6 (suma de [5, -2, 3])");
  }
);

// ============================================
// TESTS DE CASOS REALES
// ============================================
console.log("\n🌾 Escenarios realistas de cosecha de calabazas:");

runner.test(
  "Buen inicio, mal final [10, 5, -20]",
  () => {
    const resultado = maximaGanancia([10, 5, -20]);
    runner.assertEqual(resultado, 15, "Debería retornar 15");
  }
);

runner.test(
  "Mal inicio, buen final [-20, 5, 10]",
  () => {
    const resultado = maximaGanancia([-20, 5, 10]);
    runner.assertEqual(resultado, 15, "Debería retornar 15");
  }
);

runner.test(
  "Calabazas deliciosas rodeadas de malditas [2, -1, 10, 5, 8, -2, 3]",
  () => {
    const resultado = maximaGanancia([2, -1, 10, 5, 8, -2, 3]);
    runner.assertEqual(resultado, 25, "Debería retornar 25 (suma de todo el array)");
  }
);

// ============================================
// TEST DE LA CLASE DIRECTAMENTE
// ============================================
console.log("\n🧪 Tests de la clase CalculadorGananciaMaxima:");

runner.test(
  "Usar la clase directamente",
  () => {
    const calculador = new CalculadorGananciaMaxima();
    const resultado = calculador.calcular([5, -3, 5]);
    runner.assertEqual(resultado, 7, "Debería funcionar usando la clase");
  }
);

// ============================================
// GENERAR REPORTE FINAL
// ============================================
runner.generarReporte();
