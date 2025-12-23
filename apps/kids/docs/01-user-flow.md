# User Flow - Aplicación de Matemáticas para Niños

Aplicación educativa para practicar matemáticas dirigida a estudiantes de primaria.

## Flujo de Navegación

```
1. / (Selección de Idioma)
   ↓
2. /color (Selección de Color Favorito)
   ↓
3. /course (Selección de Curso Escolar)
   ↓
4. /subject (Selección de Materia)
   ↓
5. /exercise (Ejercicios de Matemáticas)
```

---

## 1. Selección de Idioma (/)

**Opciones disponibles:**
- 🇪🇸 Español
- 🇬🇧 Inglés
- 🇩🇪 Alemán

**Navegación:** `/ → /color?lang={idioma}`

---

## 2. Selección de Color Favorito (/color)

**Opciones disponibles:**
- Rojo
- Azul
- Verde
- Amarillo
- Morado
- Naranja
- Rosa
- Turquesa

**Navegación:** `/color → /course?lang={idioma}&color={color}`

---

## 3. Selección de Curso Escolar (/course)

**Cursos disponibles:**
- ✅ Segundo de Primaria (activo)
- 🔒 Primero de Primaria (desactivado)
- 🔒 Tercero de Primaria (desactivado)
- 🔒 Cuarto de Primaria (desactivado)
- 🔒 Quinto de Primaria (desactivado)
- 🔒 Sexto de Primaria (desactivado)

**Navegación:** `/course → /subject?lang={idioma}&color={color}&course=2`

---

## 4. Selección de Materia (/subject)

**Materias disponibles:**
- ✅ Matemáticas (activa)
- 🔒 Lengua (desactivada)
- 🔒 Ciencias Naturales (desactivada)
- 🔒 Ciencias Sociales (desactivada)
- 🔒 Inglés (desactivada)
- 🔒 Educación Física (desactivada)

**Navegación:** `/subject → /exercise?lang={idioma}&color={color}&course=2&subject=math`

---

## 5. Ejercicios de Matemáticas (/exercise)

Ver [02-subject-maths.md](./02-subject-maths.md) para detalles del ejercicio de matemáticas.

---

## Parámetros de URL

| Parámetro | Descripción | Ejemplo |
|-----------|-------------|---------|
| `lang` | Idioma seleccionado | `es`, `en`, `de` |
| `color` | Color favorito | `red`, `blue`, `green` |
| `course` | Curso escolar | `1`, `2`, `3`, `4`, `5`, `6` |
| `subject` | Materia | `math`, `language`, `science` |

---
