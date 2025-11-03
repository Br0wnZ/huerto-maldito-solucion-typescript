# 🌱 La Cosecha de Calabazas Malditas - Solución TypeScript

## Descripción del Problema

Eres el administrador de un huerto de calabazas que será vendido por el precio total de las calabazas cosechadas. El problema es que:

- **Calabazas deliciosas** = puntos positivos (+)
- **Calabazas malvadas** = puntos negativos (-)
- **Restricción maldita**: Si empiezas a cosechar en una zona, debes cosechar todas las parcelas contiguas hasta que decidas parar

**Objetivo**: Encontrar el sub-array contiguo con la máxima suma de ganancias.

Este es el clásico problema de **"Maximum Subarray Problem"**, resuelto óptimamente con el **Algoritmo de Kadane**.

---

## Solución: Algoritmo de Kadane

### Descripción

El algoritmo de Kadane es una técnica de programación dinámica que encuentra la suma máxima de un sub-array contiguo en tiempo lineal O(n).

[Algoritmo de Kadane](https://dev.to/anscharivs/el-algoritmo-de-kadane-explicado-4e90)


### Idea Principal

En cada posición, decidimos:
- **Extender el sub-array actual**: Si `ganancia_acumulada + elemento_actual > elemento_actual`
- **Empezar uno nuevo**: Si es mejor empezar desde el elemento actual

```
Para cada elemento:
  gananciaLocal = máximo(elemento, gananciaLocal + elemento)
  gananciaGlobal = máximo(gananciaGlobal, gananciaLocal)
```

### Complejidad

- **Tiempo**: O(n) - Una sola pasada por el array
- **Espacio**: O(1) - Solo usa variables auxiliares

---

## Trade-offs y Decisiones de Diseño

### Complejidad Temporal: O(n)

El algoritmo de Kadane realiza una **única pasada** por el array:

```typescript
for (let i = 1; i < parcelas.length; i++) {
  gananciaMaximaLocal = Math.max(
    parcelas[i],
    gananciaMaximaLocal + parcelas[i]
  );
  gananciaMaximaGlobal = Math.max(gananciaMaximaGlobal, gananciaMaximaLocal);
}
```

**Decisión**: En cada iteración decidimos si:
- **Extender** el sub-array actual (si suma anterior + elemento > elemento)
- **Reiniciar** desde el elemento actual (si el elemento solo es mayor)

Esta decisión greedy local garantiza el óptimo global.

### Complejidad Espacial: O(1)

Solo utilizamos variables auxiliares constantes:
- `gananciaMaximaLocal`: Mejor suma terminando en la posición actual
- `gananciaMaximaGlobal`: Mejor suma encontrada hasta ahora

**No se requiere memoria adicional proporcional al tamaño del input.**

### Comparación con Otros Enfoques

| Algoritmo | Tiempo | Espacio | Nota |
|-----------|--------|---------|------|
| Fuerza bruta | O(n²) | O(1) | Intenta todas las combinaciones |
| Dividir y conquistar | O(n log n) | O(log n) | Recursivo |
| **Kadane** | **O(n)** | **O(1)** | **Óptimo** |

---

## Principios SOLID Aplicados

### 1. **S** - Single Responsibility Principle
```typescript
class CalculadorGananciaMaxima implements GananciaCalculator {
  calcular(parcelas: number[]): number { ... }
}
```
La clase tiene una única responsabilidad: calcular la ganancia máxima.

### 2. **O** - Open/Closed Principle
```typescript
interface GananciaCalculator {
  calcular(parcelas: number[]): number;
}
```
La clase está cerrada para modificación pero abierta para extensión mediante la interfaz.

### 3. **L** - Liskov Substitution Principle
```typescript
class CalculadorGananciaMaxima implements GananciaCalculator { ... }
```
Podemos reemplazar la implementación sin romper el contrato.

### 4. **I** - Interface Segregation Principle
```typescript
interface GananciaCalculator {
  calcular(parcelas: number[]): number;
}
```
Interfaz mínima y específica, no fuerza métodos innecesarios.

### 5. **D** - Dependency Inversion Principle
```typescript
function maximaGanancia(parcelas: number[]): number {
  const calculador = new CalculadorGananciaMaxima();
  return calculador.calcular(parcelas);
}
```
Depende de abstracciones (la interfaz), no de implementaciones concretas.

---

## Estructura del Proyecto

```
.
├── maximaGanancia.ts          # Implementación principal
├── maximaGanancia.test.ts     # Suite de tests exhaustiva
├── maximaGanancia.bench.ts    # Sistema de benchmarking
├── tsconfig.json              # Configuración de TypeScript
├── package.json               # Dependencias del proyecto
└── README.md                  # Este archivo
```

---

## Ejemplos de Uso

### Ejemplo 1: Todas las calabazas son deliciosas
```typescript
const resultado = maximaGanancia([1, 2, 3, 4]);
console.log(resultado); // 10 (cosechar todas: [1, 2, 3, 4])
```

### Ejemplo 2: Calabazas deliciosas y una zona maldita
```typescript
const resultado = maximaGanancia([8, 1, -100, 2, 5]);
console.log(resultado); // 9 (cosechar [8, 1] y evitar la zona maldita)
```

### Ejemplo 3: Array completamente negativo (todas las calabazas son malditas)
```typescript
const resultado = maximaGanancia([-1, -2, -3, -4]);
console.log(resultado); // -1 (la menos maldita)
```

### Ejemplo 4: Cosecha de calabazas malditas (caso original)
```typescript
const resultado = maximaGanancia([2, -5, 8, -2, 4, -10, 3, 1]);
console.log(resultado); // 10 (suma de [8, -2, 4])
```

---

## Instalación y Configuración

### Requisitos Previos
- Node.js 14+
- npm

### Instalación de Dependencias

```bash
# Instalar TypeScript y dependencias
npm install
```

---

## Ejecución del Proyecto

### ⚡ Opción 1: Ejecutar TypeScript directamente (SIN transpilar)

**Recomendado para desarrollo rápido:**

```bash
# Ejecutar tests directamente
npm run test:ts
```

### 🔨 Opción 2: Transpilar y ejecutar JavaScript

**Recomendado para producción:**

```bash
# Compilar TypeScript a JavaScript
npm run build

# Ejecutar tests desde JavaScript compilado
npm test
```

### 📋 Comparación de opciones

| Opción | Comando | Ventaja | Cuándo usar |
|--------|---------|---------|-------------|
| **ts-node** | `npm run test:ts` | ⚡ Más rápido, sin compilar | Desarrollo, pruebas rápidas |
| **tsc + node** | `npm test` | 📦 Genera archivos .js | Producción, distribución |

---

## Benchmarking

El proyecto incluye un sistema de benchmarking que mide el rendimiento de la función `maximaGanancia` con diferentes tamaños de arrays.

### Ejecutar Benchmarks

```bash
# Ejecutar benchmarks directamente con ts-node
npm run bench:ts

# O compilar y ejecutar
npm run bench
```

### Casos de Prueba

El benchmark incluye:

1. **Arrays de diferentes tamaños**:
   - Pequeño (10 elementos)
   - Mediano (100 elementos)
   - Grande (1,000 elementos)
   - Muy grande (10,000 elementos)
   - Extremo (100,000 elementos)

2. **Casos específicos del enunciado**:
   - Huerto maldito original
   - Todos positivos
   - Todos negativos
   - Con zona maldita

3. **Casos extremos**:
   - Best case: Todos positivos
   - Worst case: Todos negativos
   - Patrón alternado

### Ejemplo de Salida

```
🎯 BENCHMARKS - Algoritmo de Kadane (Máxima Ganancia)
============================================================

📊 Array pequeño (10 elementos)
   Tamaño del array: 10
   Iteraciones: 10,000
   Tiempo total: 45.23 ms
   Tiempo promedio: 0.0045 ms
   Operaciones/seg: 221,000
   Resultado: 85

📊 Array grande (1,000 elementos)
   Tamaño del array: 1,000
   Iteraciones: 10,000
   Tiempo total: 523.45 ms
   Tiempo promedio: 0.0523 ms
   Operaciones/seg: 19,100
   Resultado: 8542
```

### Complejidad Demostrada

Los benchmarks demuestran empíricamente que el algoritmo mantiene:
- **O(n)** complejidad temporal: El tiempo crece linealmente con el tamaño del array
- **O(1)** complejidad espacial: No hay uso adicional de memoria proporcional al input

---

## Tests

La suite de tests incluye **23 casos de prueba** exhaustivos que cubren:

### Categorías de Tests

✅ **Casos del enunciado** (3 tests)
- Arrays con números positivos
- Arrays completamente negativos
- Arrays con números mixtos

✅ **Casos extremos** (4 tests)
- Arrays de un solo elemento
- Arrays con ceros
- Validación de errores

✅ **Algoritmo Kadane** (5 tests)
- Sub-arrays en diferentes posiciones
- Todo el array como respuesta
- Patrones complejos

✅ **Validación** (1 test)
- Arrays vacíos

✅ **Números grandes** (2 tests)
- Números muy grandes
- Números muy negativos

✅ **Patrones especiales** (3 tests)
- Patrones alternados
- Múltiples negativos con positivos
- Dos picos

✅ **Escenarios realistas** (3 tests)
- Comienzos y finales variados
- Calabazas rodeadas de maldiciones

✅ **Pruebas de clase** (2 tests)
- Uso directo de la clase

### Resultado Esperado

Al ejecutar `npm run test:ts` o `npm test`, deberías ver:

```
🌱 Iniciando tests del Huerto Maldito 🌱

📝 Casos de ejemplo del enunciado:
✓ Caso 1: Array con todos números positivos [1, 2, 3, 4]
✓ Caso 2: Array con todos números negativos [-1, -2, -3, -4]
✓ Caso 3: Array con números mixtos [8, 1, -100, 2, 5]

🎃 Casos específicos del huerto maldito:
✓ Huerto maldito original [2, -5, 8, -2, 4, -10, 3, 1]

⚠️  Casos extremos:
✓ Array con un solo elemento positivo [5]
✓ Array con un solo elemento negativo [-5]
✓ Array con ceros [0, 0, 0]
✓ Array con un cero y negativos [0, -5, -3]

🔍 Pruebas del algoritmo Kadane:
✓ Sub-array en el medio [1, -3, 2, 3, -1, 4]
✓ Sub-array al inicio [-2, -3, 5, 1, -2]
✓ Sub-array al final [1, -1, -1, 5, 4]
✓ Todo el array es la respuesta [1, 2, 3, 4, 5]
✓ Un elemento en el medio [3, -2, 5, -2, 3]

🛡️  Pruebas de validación:
✓ Array vacío debería lanzar error

📊 Pruebas con números grandes:
✓ Array con números muy grandes [1000000, -500000, 2000000]
✓ Array con números muy negativos [-1000, -2000, -500]

🎯 Patrones especiales:
✓ Patrón alternado [5, -5, 5, -5, 5]
✓ Muchos negativos con un positivo [-10, -20, 15, -30, -50]
✓ Dos picos [1, -2, 5, -2, 3]

🌾 Escenarios de huerto realistas:
✓ Buen inicio, mal final [10, 5, -20]
✓ Mal inicio, buen final [-20, 5, 10]
✓ Calabazas deliciosas rodeadas de malditas [2, -1, 10, 5, 8, -2, 3]

🧪 Tests de la clase CalculadorGananciaMaxima:
✓ Usar la clase directamente

============================================================
Tests Pasados: 23
Tests Fallidos: 0
============================================================
```

---

## Casos de Uso de la Cosecha de Calabazas Malditas

1. **Maximizar ganancias de la cosecha**: Encontrar qué parcelas de calabazas cosechar para obtener el máximo beneficio
2. **Minimizar pérdidas por calabazas malditas**: Elegir estratégicamente qué zonas evitar cuando hay calabazas malditas
3. **Planificación de la cosecha**: Determinar la secuencia óptima de parcelas contiguas a cosechar
4. **Gestión de riesgo**: Decidir límites de exposición a zonas con calabazas malditas para no perder toda la ganancia

---

## 🚀 Posibles Mejoras Futuras

1. **Retornar el sub-array óptimo con índices**
   - Además de la ganancia máxima, retornar los índices de inicio y fin del sub-array óptimo
   - Útil para conocer exactamente qué parcelas cosechar

2. **Soporte para múltiples sub-arrays**
   - Encontrar los K mejores sub-arrays no solapados
   - Análisis de múltiples oportunidades de inversión

3. **Versión con límites de longitud**
   - Restricción: el sub-array debe tener entre una longitud mínima y máxima
   - Aplicaciones con restricciones de capacidad o tiempo

4. **Soporte para matrices 2D**
   - Extensión del algoritmo para encontrar la sub-matriz óptima
   - Complejidad O(n³) usando Kadane 1D en combinaciones de filas

5. **Sistema de caché para consultas repetidas**
   - Almacenar resultados de arrays ya procesados
   - Complejidad O(1) para consultas repetidas

---

### 💡 Nota sobre Extensibilidad

Gracias al diseño basado en **principios SOLID**, todas estas mejoras pueden implementarse sin modificar el código existente, utilizando:
- Herencia e interfaces para nuevas funcionalidades
- Composición para combinar comportamientos
- Inyección de dependencias para testing y configuración

---

## Autor

[Javier Moreno](https://github.com/Br0wnZ)

---

## Licencia

MIT
