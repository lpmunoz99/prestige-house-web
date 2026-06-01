# Prestige House — Documentación del Sistema de Propiedades

## Índice
1. [Estructura del proyecto](#estructura)
2. [Cómo agregar una propiedad](#agregar-propiedad)
3. [Cómo marcar una propiedad como vendida o rentada](#cambiar-status)
4. [Referencia completa de campos](#referencia-campos)
5. [Sistema de códigos](#sistema-codigos)
6. [Propiedades fuera de Guatemala City](#propiedades-exterior)
7. [Imágenes y videos](#imagenes-videos)
8. [Cómo funciona el filtro de zonas](#filtro-zonas)
9. [Cómo funciona la navegación entre páginas](#navegacion)

---

## 1. Estructura del proyecto {#estructura}

```
PRESTIGE HOUSE/
├── public/
│   ├── properties-img/        ← Carpetas de imágenes por propiedad
│   │   ├── apt-901/
│   │   ├── ph-zona15/
│   │   ├── renta602-z15/
│   │   └── ...
│   ├── logo.png
│   ├── robots.txt
│   └── sitemap.xml
│
└── src/
    ├── app/
    │   ├── components/
    │   │   ├── About.tsx
    │   │   ├── Contact.tsx
    │   │   ├── Footer.tsx
    │   │   ├── Hero.tsx
    │   │   ├── Navbar.tsx
    │   │   └── Properties.tsx   ← Grilla de cards (no tocar normalmente)
    │   ├── data/
    │   │   └── properties.ts    ← ⭐ AQUÍ se gestionan todas las propiedades
    │   ├── pages/
    │   │   ├── Home.tsx
    │   │   └── PropertyDetail.tsx  ← Página de detalle (no tocar normalmente)
    │   └── App.tsx
    ├── routes.tsx               ← Rutas de navegación (no tocar normalmente)
    └── main.tsx
```

**Regla de oro:** el 99% de los cambios se hacen únicamente en `src/app/data/properties.ts`.

---

## 2. Cómo agregar una propiedad {#agregar-propiedad}

Abre `src/app/data/properties.ts` y agrega un nuevo objeto al array `properties`.

### Plantilla base (propiedad en Guatemala City)

```ts
{
  code: "AV-005",                          // Código único — ver sistema de códigos abajo
  title: "Nombre de la propiedad",
  type: "Apartamento",                     // "Apartamento" | "Casa" | "Local"
  listingType: "venta",                    // "venta" | "renta"
  address: "Zona 10, Guatemala City",
  zona: 10,                                // Número de zona (para el filtro)
  price: "$ 250,000.00",
  beds: 3,
  baths: 2,
  area: 120.00,                            // Metros cuadrados totales
  tag: "Nuevo",                            // Etiqueta opcional (ej: "Promoción", "Para Estrenar")
  description: "Descripción de la propiedad...",
  features: [
    "Sala - Comedor",
    "Cocina equipada",
    "2 Parqueos",
    // ...más características
  ],
  images: [
    `/properties-img/nombre-carpeta/nombre-carpeta_1.jpeg`,
    `/properties-img/nombre-carpeta/nombre-carpeta_2.jpeg`,
    `/properties-img/nombre-carpeta/nombre-carpeta_3.jpeg`,
    `/properties-img/nombre-carpeta/nombre-carpeta_4.jpeg`,
    `/properties-img/nombre-carpeta/nombre-carpeta_5.jpeg`,
    `/properties-img/nombre-carpeta/nombre-carpeta_6.jpeg`,
    `/properties-img/nombre-carpeta/nombre-carpeta_7.jpeg`,
    `/properties-img/nombre-carpeta/nombre-carpeta_8.jpeg`,
  ],
},
```

### Plantilla con precio especial (reserva y enganche)

```ts
{
  code: "AV-005",
  // ...campos normales...
  price: "Q. 1,500,000.00",
  priceDetails: {
    reserva: "Q. 25,000.00",
    enganche: "20%",
  },
  // ...resto de campos...
},
```

### Plantilla con video

```ts
{
  code: "AV-005",
  // ...campos normales...
  images: [ /* 8 imágenes */ ],
  video: {
    webm: `/properties-img/nombre-carpeta/video.webm`,
    mp4: `/properties-img/nombre-carpeta/video.mp4`,
  },
},
```

> Al pasar el mouse sobre la card, el video se reproduce automáticamente. En la página de detalle aparece como primera miniatura con ícono de play.

---

## 3. Cómo marcar una propiedad como vendida o rentada {#cambiar-status}

Abre `src/app/data/properties.ts`, encuentra la propiedad por su `code` y agrega **una sola línea**:

### Marcar como rentada

```ts
{
  code: "AR-001",
  status: "rentado",    // ← agregar esta línea
  title: "Apartamento en renta Zona 15",
  // ...resto sin cambios
},
```

### Marcar como vendida

```ts
{
  code: "AV-001",
  status: "vendido",    // ← agregar esta línea
  title: "Apartamento en Vista Hermosa I",
  // ...resto sin cambios
},
```

### Volver a disponible

Simplemente elimina la línea `status` o cámbiala a `"disponible"`.

### ¿Qué cambia visualmente?

| Elemento | Disponible | Rentado / Vendido |
|----------|-----------|-------------------|
| Imagen en card | Color normal | Escala de grises |
| Sello | Ninguno | "Ya Rentado" / "Ya Vendido" rotado sobre la imagen |
| Precio | Dorado | Tachado |
| Botones | WhatsApp + Ver Detalles | Mensaje de estado |
| Página de detalle | Botones de contacto | Mensaje + WhatsApp para consultas similares |

---

## 4. Referencia completa de campos {#referencia-campos}

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `code` | `string` | ✅ | Identificador único. Se usa en la URL y en el mensaje de WhatsApp |
| `status` | `"disponible" \| "rentado" \| "vendido"` | ❌ | Si se omite, se asume disponible |
| `title` | `string` | ✅ | Nombre de la propiedad |
| `type` | `string` | ✅ | `"Apartamento"`, `"Casa"` o `"Local"` |
| `listingType` | `"venta" \| "renta"` | ✅ | Define en qué tab aparece |
| `address` | `string` | ✅ | Dirección completa |
| `zona` | `number` | ✅ | Número de zona. Usar `0` para propiedades fuera de la capital |
| `location` | `objeto` | ❌ | Solo para propiedades fuera de Guatemala City |
| `price` | `string` | ✅ | Texto libre: `"$ 250,000"`, `"Q. 5,300 / mes"`, etc. |
| `priceDetails` | `objeto` | ❌ | Para mostrar reserva y/o enganche debajo del precio |
| `beds` | `number` | ✅ | Habitaciones. Usar `0` si no aplica (ej: locales) |
| `baths` | `number` | ✅ | Baños. Acepta decimales: `2.5` = 2 baños + 1 medio baño |
| `area` | `number` | ✅ | Metros cuadrados totales |
| `images` | `string[]` | ✅ | Rutas de las 8 imágenes |
| `video` | `objeto` | ❌ | Objeto con rutas `.webm` y `.mp4` |
| `tag` | `string` | ❌ | Etiqueta dorada visible en la card: `"Promoción Especial"`, `"Para Estrenar"`, `"Frente al Mar"`, etc. |
| `description` | `string` | ✅ | Descripción larga de la propiedad |
| `features` | `string[]` | ✅ | Lista de características (sala, cocina, parqueos, amenidades, etc.) |

---

## 5. Sistema de códigos {#sistema-codigos}

El `code` es el identificador único de cada propiedad. Se muestra en las cards, en la página de detalle, en la URL y en el mensaje de WhatsApp.

### Formato

```
[PREFIJO]-[NÚMERO CORRELATIVO DE 3 DÍGITOS]
```

### Prefijos por tipo

| Prefijo | Significado |
|---------|-------------|
| `AV` | Apartamento en Venta |
| `AR` | Apartamento en Renta |
| `CV` | Casa en Venta |
| `CR` | Casa en Renta |
| `LV` | Local en Venta |
| `LR` | Local en Renta |

### Ejemplos

```
AV-001, AV-002, AV-003...   → Apartamentos en venta
AR-001, AR-002, AR-003...   → Apartamentos en renta
CV-001...                   → Casas en venta
```

### URLs generadas

```
/propiedad/AV-001
/propiedad/AR-002
/propiedad/CV-001
```

> ⚠️ El `code` debe ser **único**. Si dos propiedades tienen el mismo código, solo una se mostrará correctamente.

---

## 6. Propiedades fuera de Guatemala City {#propiedades-exterior}

Para propiedades en otros departamentos (Escuintla, Antigua, etc.), usar `zona: 0` y agregar el campo `location`:

```ts
{
  code: "AV-004",
  title: "Tu Apartamento frente al Mar",
  listingType: "venta",
  address: "Chulamar, Puerto de San José, Escuintla",
  zona: 0,                                 // ← 0 indica que está fuera de la capital
  location: {
    department: "Escuintla",               // Departamento
    municipality: "San José",              // Municipio
    sector: "Chulamar",                    // Sector o colonia (opcional)
  },
  // ...resto de campos
},
```

### Efecto en la UI

- En la card aparece `Apartamento · Chulamar, Escuintla` en lugar de `Apartamento · Zona X`
- La propiedad **no aparece** en el filtro de zonas (ya que `zona: 0` se excluye del dropdown)
- Sí aparece en el grid al seleccionar "Todas las Zonas"

---

## 7. Imágenes y videos {#imagenes-videos}

### Estructura de carpetas

Cada propiedad tiene su propia carpeta dentro de `public/properties-img/`:

```
public/
  properties-img/
    apt-901/
      apt-901_1.jpeg
      apt-901_2.jpeg
      apt-901_3.jpeg
      apt-901_4.jpeg
      apt-901_5.jpeg
      apt-901_6.jpeg
      apt-901_7.jpeg
      apt-901_8.jpeg
      alvento_final.webm    ← video (opcional)
      alvento_final.mp4     ← video (opcional)
    renta602-z15/
      renta602-z15_1.jpeg
      ...
      renta602-z15_8.jpeg
```

### Convención de nombres de archivos

```
[nombre-carpeta]_[número].jpeg
```

Todas las propiedades deben tener exactamente **8 imágenes** (`_1` al `_8`).

### Convención de nombre de carpeta

```
Ejemplos:
  apt-901        → apartamento 901
  ph-zona15      → penthouse zona 15
  renta602-z15   → apartamento en renta 602, zona 15
  renta506-z5    → apartamento en renta 506, zona 5
  apt-chulamar   → apartamento en Chulamar
```

### Videos

- Se necesitan dos formatos: `.webm` (Chrome/Firefox) y `.mp4` (Safari)
- En la **card**: se reproduce automáticamente al pasar el mouse, sin controles
- En la **página de detalle**: aparece como primera miniatura con ícono de play y tiene controles completos

---

## 8. Cómo funciona el filtro de zonas {#filtro-zonas}

El filtro de zonas se genera **automáticamente** a partir de las propiedades existentes. No hay que configurarlo manualmente.

- Muestra solo las zonas del tab activo (Venta o Renta)
- Excluye `zona: 0` (propiedades fuera de la capital)
- Al cambiar de tab, el filtro y la zona seleccionada se resetean automáticamente
- "Todas las Zonas" muestra todas las propiedades del tab, incluyendo las de exterior

---

## 9. Cómo funciona la navegación entre páginas {#navegacion}

### URLs

```
/                    → Página principal con todas las secciones
/propiedad/AV-001    → Detalle de la propiedad AV-001
/propiedad/AR-002    → Detalle de la propiedad AR-002
```

### Flujo

```
Home → click "Ver Detalles" en una card
     → navega a /propiedad/[code]
     → PropertyDetail busca en el array: properties.find(p => p.code === code)
     → Si no la encuentra → muestra "Propiedad no encontrada"
     → Si la encuentra   → muestra el detalle completo
```

### Mensaje de WhatsApp automático

Al hacer clic en cualquier botón de WhatsApp, se genera automáticamente:

```
Hola, estoy interesado/a en *comprar* la propiedad *Apartamento en Vista Hermosa I* (Ref. AV-001).
📍 Zona 15, Guatemala City
💰 $ 401,262.16
¿Podría darme más información?
```

El texto cambia entre "comprar" y "rentar" según el `listingType` de la propiedad. El número de WhatsApp se configura en `properties.ts` en la constante `WHATSAPP_NUMBER`.

---

## Resumen rápido de tareas comunes

### ✅ Agregar una propiedad nueva
1. Crear carpeta en `public/properties-img/nombre-carpeta/`
2. Subir las 8 imágenes con el formato `nombre-carpeta_1.jpeg` ... `_8.jpeg`
3. Abrir `src/app/data/properties.ts`
4. Copiar el bloque de una propiedad existente y pegarlo al final del array `properties`
5. Editar todos los campos: `code`, `title`, `address`, `zona`, `price`, `beds`, `baths`, `area`, `description`, `features`, `images`
6. Guardar — la propiedad aparece automáticamente en el filtro y en el grid

### ✅ Marcar como rentada o vendida
1. Abrir `src/app/data/properties.ts`
2. Buscar la propiedad por su `code` (Ctrl+F)
3. Agregar `status: "rentado"` o `status: "vendido"` en la segunda línea del objeto
4. Guardar

### ✅ Cambiar el precio
1. Abrir `src/app/data/properties.ts`
2. Buscar la propiedad por su `code` (Ctrl+F)
3. Editar el campo `price`
4. Guardar

### ✅ Cambiar imágenes
1. Subir las nuevas imágenes a `public/properties-img/nombre-carpeta/`
2. Si los nombres de archivo son los mismos, los cambios se ven al recargar
3. Si cambian los nombres, actualizar el array `images` en `properties.ts`

### ✅ Cambiar número de WhatsApp
1. Abrir `src/app/data/properties.ts`
2. Buscar la constante `WHATSAPP_NUMBER` al inicio del archivo
3. Cambiar el número (formato sin espacios ni guiones: `502XXXXXXXX`)
4. Guardar
