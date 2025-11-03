/**
 * Interfaz que define el contrato para calcular la ganancia máxima
 */
interface GananciaCalculator {
  calcular(parcelas: number[]): number;
}

/**
 * Clase que implementa el algoritmo de Kadane para encontrar
 * la máxima ganancia en la cosecha de calabazas
 * (suma máxima de un sub-array contiguo)
 */
class CalculadorGananciaMaxima implements GananciaCalculator {
  /**
   * Calcula la ganancia máxima posible en la cosecha
   * @param parcelas - Array de números que representan calabazas deliciosas (+) y malditas (-)
   * @returns La suma máxima de un sub-array contiguo (ganancia máxima de la cosecha)
   * @throws Error si el array está vacío
   */
  calcular(parcelas: number[]): number {
    this.validar(parcelas);

    let gananciaMaximaGlobal = parcelas[0];
    let gananciaMaximaLocal = parcelas[0];

    for (let i = 1; i < parcelas.length; i++) {
      // En cada posición, decidimos: ¿Extendemos el sub-array actual o iniciamos uno nuevo?
      gananciaMaximaLocal = Math.max(
        parcelas[i],
        gananciaMaximaLocal + parcelas[i]
      );

      // Actualizamos la ganancia máxima global si hemos encontrado algo mejor
      gananciaMaximaGlobal = Math.max(
        gananciaMaximaGlobal,
        gananciaMaximaLocal
      );
    }

    return gananciaMaximaGlobal;
  }

  /**
   * Valida que el input sea válido
   * @param parcelas - Array a validar
   * @throws Error si el array está vacío
   */
  private validar(parcelas: number[]): void {
    if (!Array.isArray(parcelas) || parcelas.length === 0) {
      throw new Error("El array de parcelas no puede estar vacío");
    }
  }
}

/**
 * Función principal para calcular la ganancia máxima en la cosecha de calabazas
 * @param parcelas - Array de números que representan calabazas deliciosas (+) y malditas (-)
 * @returns La ganancia máxima posible en la cosecha
 */
export function maximaGanancia(parcelas: number[]): number {
  const calculador = new CalculadorGananciaMaxima();
  return calculador.calcular(parcelas);
}

export { CalculadorGananciaMaxima, GananciaCalculator };
