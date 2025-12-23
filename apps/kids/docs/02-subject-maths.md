# Ejercicio de Matemáticas

Descripción del funcionamiento de los ejercicios de matemáticas.

## Interfaz

- **Operación matemática:** Muestra `num1 operador num2 =` en grande
- **Slots de respuesta:** 1 o 2 casillas según el resultado (respuestas de 1 o 2 dígitos)
- **Teclado numérico:** Números del 0 al 9, botón Borrar y botón Confirmar

## Funcionamiento

1. **Mostrar operación:** Se muestra una operación aleatoria (suma, resta o multiplicación)
2. **Introducir respuesta:** El usuario hace clic en los números para rellenar los slots
3. **Confirmar:** Cuando todos los slots están llenos, puede hacer clic en "Confirmar"
4. **Validación:**
   - ✅ **Correcto:** Mensaje de éxito → Nueva operación
   - ❌ **Incorrecto:** Mensaje de error → Reintentar la misma operación

## Operaciones Disponibles

Base de datos de 40 operaciones:
- 17 sumas
- 13 restas
- 10 multiplicaciones

Las operaciones se van usando sin repetir hasta agotarlas, luego se reinicia el pool.

## Personalización

El color seleccionado por el usuario se usa para:
- El botón "Confirmar"
- El mensaje de éxito "¡Correcto!"
