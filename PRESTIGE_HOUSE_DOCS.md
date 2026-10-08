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

> Cada propiedad tiene una lista de ofertas (`offers`) en vez de un solo tipo de listado: ver sección 2.

---

## 2. Cómo agregar una propiedad {#agregar-propiedad}

Abre `src/app/data/properties.ts` y agrega un nuevo objeto al final del array `properties`.

Cada propiedad es **una sola tarjeta** y puede tener una o varias **ofertas** (`offers`): venta, renta o ambas. Si el cliente la ofrece en venta y en renta, es UNA propiedad con 2 ofertas (no se duplica).

### Plantilla base

```ts
{
  code: "AP-006",                          // Código único — ver sistema de códigos abajo
  title: "Nombre de la propiedad",
  type: "Apartamento",                     // "Apartamento" | "Casa" | "Local" | "Oficina"
  offers: [
    { type: "venta", price: "$ 250,000", furnished: false },        // furnished: false = sin muebles
    { type: "renta", price: "$ 1,500 + IVA / mes", furnished: true }, // true = amueblado
  ],
  address: "Zona 10, Guatemala City",
  zona: 10,                                // Número de zona (para el filtro)
  beds: 3,
  baths: 2.5,                              // 2.5 = 2 baños completos + 1 de visitas
  area: 120.00,                            // m² totales
  tag: "Nuevo",                            // Etiqueta opcional
  description: "Descripción de la propiedad...",
  features: [
    "Sala", "Comedor", "Cocina equipada", "2 Parqueos",
    // ...más características y amenidades
  ],
  images: gallery("carpeta-propiedad"),    // genera carpeta-propiedad_1.webp ... _8.webp
},
```

- **Solo venta o solo renta:** deja una sola oferta dentro de `offers`.
- **`furnished`:** es opcional. Úsalo cuando el cliente especifique si es con o sin muebles. Si no aplica (ej. oficina), omítelo.
- **`gallery("carpeta")`:** genera las rutas de 8 imágenes. Si la propiedad tiene otra cantidad: `gallery("carpeta", 6)`.

### Oferta con reserva y enganche

```ts
offers: [{
  type: "venta",
  price: "Q. 1,500,000.00",
  priceDetails: { reserva: "Q. 25,000.00", enganche: "20%" },
}],
```

### Proyecto en planos / precio "desde"

Escribe el "desde" directamente en el precio, y usa texto en `beds` si hay varias tipologías. `baths` y `area` son opcionales: si se omiten, no se muestran.

```ts
offers: [{ type: "venta", price: "Desde $ 190,000" }],
beds: "1, 2 y 3",
```

### Con video

```ts
{
  // ...campos normales...
  images: gallery("nombre-carpeta"),
  video: {
    webm: `/properties-img/nombre-carpeta/video.webm`,
    mp4: `/properties-img/nombre-carpeta/video.mp4`,
  },
},
```

> Al pasar el mouse sobre la card, el video se reproduce automáticamente. En la página de detalle aparece como primera miniatura con ícono de play.

### Qué hace el sitio con propiedades de 2 ofertas

- Aparece en **ambas pestañas** (En Venta y En Renta), mostrando el precio de esa pestaña.
- La card indica "También en renta / venta".
- En el detalle hay un selector Venta / Renta; el botón de WhatsApp usa la oferta seleccionada ("comprar" o "rentar", con su precio).
- El enlace desde una card abre el detalle ya en la oferta de esa pestaña: `/propiedad/AP-001?oferta=renta`.

---

## 3. Cómo marcar una propiedad como vendida o rentada {#cambiar-status}

El `status` va **dentro de la oferta**, porque una propiedad puede estar rentada pero seguir en venta.

### Marcar como rentada

```ts
offers: [
  { type: "venta", price: "$ 650,000" },
  { type: "renta", price: "$ 2,500 / mes", status: "rentado" },   // ← agregar esta línea
],
```

### Marcar como vendida

```ts
offers: [{ type: "venta", price: "$ 401,262.16", status: "vendido" }],
```

### Volver a disponible

Elimina la línea `status` o cámbiala a `"disponible"`.

### ¿Qué cambia visualmente? (solo en la oferta afectada)

| Elemento | Disponible | Rentado / Vendido |
|----------|-----------|-------------------|
| Imagen en card | Color normal | Escala de grises |
| Sello | Ninguno | "Rentado" / "Vendido" rotado sobre la imagen |
| Precio | Dorado | Tachado |
| Botones | WhatsApp + Ver Detalles | Mensaje de estado |
| Página de detalle | Botones de contacto | Mensaje + WhatsApp para consultas similares |

---

## 4. Referencia completa de campos {#referencia-campos}

### Propiedad

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `code` | `string` | ✅ | Identificador único. Se usa en la URL y en el mensaje de WhatsApp |
| `title` | `string` | ✅ | Nombre de la propiedad |
| `type` | `string` | ✅ | `"Apartamento"`, `"Casa"`, `"Local"` u `"Oficina"`. Los botones de filtro se generan solos |
| `offers` | `Offer[]` | ✅ | Una o varias ofertas (ver abajo) |
| `address` | `string` | ✅ | Dirección completa |
| `zona` | `number` | ✅ | Número de zona. Usar `0` para propiedades fuera de la capital |
| `location` | `objeto` | ❌ | Solo para propiedades fuera de Guatemala City |
| `beds` | `number \| string` | ❌ | Habitaciones. Omitir o `0` si no aplica (oficinas, locales). Texto para proyectos: `"1, 2 y 3"` |
| `baths` | `number \| string` | ❌ | Baños. Acepta decimales: `2.5` = 2 completos + 1 medio/visitas |
| `area` | `number` | ❌ | Metros cuadrados. Si se omite, no se muestra |
| `images` | `string[]` | ✅ | Usar `gallery("carpeta")` |
| `video` | `objeto` | ❌ | Objeto con rutas `.webm` y `.mp4` |
| `tag` | `string` | ❌ | Etiqueta dorada visible en la card: `"Promoción Especial"`, `"Para Estrenar"`, `"En Planos"`, etc. |
| `description` | `string` | ✅ | Descripción larga de la propiedad |
| `features` | `string[]` | ✅ | Lista de características (sala, cocina, parqueos, amenidades, etc.) |

### Oferta (`offers[]`)

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `type` | `"venta" \| "renta"` | ✅ | Define en qué pestaña aparece |
| `price` | `string` | ✅ | Texto libre: `"$ 250,000"`, `"$ 2,500 + IVA / mes"`, `"Desde $ 190,000"` |
| `furnished` | `boolean` | ❌ | `true` = Amueblado, `false` = Sin muebles. Omitido = no se muestra |
| `status` | `"disponible" \| "rentado" \| "vendido"` | ❌ | Si se omite, se asume disponible |
| `priceDetails` | `objeto` | ❌ | Reserva y/o enganche debajo del precio |

---

## 5. Sistema de códigos {#sistema-codigos}

El `code` es el identificador único de cada propiedad. Se muestra en las cards, en la página de detalle, en la URL y en el mensaje de WhatsApp.

### Formato

```
[PREFIJO]-[NÚMERO CORRELATIVO DE 3 DÍGITOS]
```

### Prefijos

El prefijo identifica el **tipo de inmueble**, no si está en venta o renta (una misma propiedad puede estar en ambas).

| Prefijo | Significado |
|---------|-------------|
| `AP` | Apartamento (venta, renta o ambas) |
| `CA` | Casa |
| `LO` | Local |
| `OF` | Oficina |

**Códigos históricos:** las propiedades anteriores conservan su código para no romper enlaces ya compartidos: `AV-001…005` (apartamentos en venta) y `AR-001…004` (apartamentos en renta). Para propiedades nuevas se usa siempre el esquema de la tabla.

### URLs generadas

```
/propiedad/AP-001                 → abre en la primera oferta
/propiedad/AP-001?oferta=renta    → abre directamente en renta
/propiedad/AV-001
```

> ⚠️ El `code` debe ser **único**. Si dos propiedades tienen el mismo código, solo una se mostrará correctamente.

---

## 6. Propiedades fuera de Guatemala City {#propiedades-exterior}

Para propiedades en otros departamentos (Escuintla, Antigua, etc.), usar `zona: 0` y agregar el campo `location`:

```ts
{
  code: "AV-004",
  title: "Tu Apartamento frente al Mar",
  offers: [{ type: "venta", price: "Q. 1,804,372.00" }],
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
      apt-901_1.webp
      apt-901_2.webp
      apt-901_3.webp
      apt-901_4.webp
      apt-901_5.webp
      apt-901_6.webp
      apt-901_7.webp
      apt-901_8.webp
      alvento_final.webm    ← video (opcional)
      alvento_final.mp4     ← video (opcional)
    renta602-z15/
      renta602-z15_1.webp
      ...
      renta602-z15_8.webp
```

### Convención de nombres de archivos

```
[nombre-carpeta]_[número].webp
```

Cada propiedad lleva normalmente **8 imágenes** (`_1` al `_8`). `gallery("carpeta")` asume 8; si hay otra cantidad, `gallery("carpeta", 6)`. Si falta una imagen, el sitio muestra el logo en su lugar.

### Convención de nombre de carpeta

```
Ejemplos:
  apt-901             → apartamento 901
  ph-zona15           → penthouse zona 15
  renta602-z15        → apartamento 602, zona 15
  ap-z14-6to          → apartamento en zona 14, 6to nivel
  ap-z10-corporativa  → apartamento en zona corporativa, zona 10
  of-z10-7mo          → oficina en zona 10, 7mo nivel
```

### Optimización de imágenes (ahorra espacio)

- Exportar a **1280 px de lado largo** y calidad ~80. Cada imagen debe pesar menos de ~150 KB.
- Guardar las **fotos originales fuera del proyecto** (Drive de la empresa o disco externo). En el repo solo van las versiones optimizadas.
- **Todas las imágenes del sitio van en formato `.webp`** (calidad ~78, máx. 1280 px). Pesan ~40% menos que un JPEG equivalente. Si llegan fotos `.jpg`/`.jpeg`, convertirlas antes de subirlas (con Pillow: `im.thumbnail((1280,1280)); im.save(out, "WEBP", quality=78, method=6)`).

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

El texto cambia entre "comprar" y "rentar" según la oferta (`offers[].type`) que se esté viendo, e incluye "(Amueblado)" o "(Sin muebles)" si la oferta tiene `furnished`. El número de WhatsApp se configura en `properties.ts` en la constante `WHATSAPP_NUMBER`.

---

## Resumen rápido de tareas comunes

### ✅ Agregar una propiedad nueva
1. Crear carpeta en `public/properties-img/nombre-carpeta/`
2. Subir las 8 imágenes optimizadas con el formato `nombre-carpeta_1.webp` ... `_8.webp`
3. Abrir `src/app/data/properties.ts`
4. Copiar el bloque de una propiedad existente (ej. `AP-001`) y pegarlo al final del array `properties`
5. Editar `code`, `title`, `type`, `offers` (una por cada precio que dé el cliente), `address`, `zona`, `beds`, `baths`, `area`, `description`, `features` y `gallery("nombre-carpeta")`
6. Guardar — la propiedad aparece automáticamente en la(s) pestaña(s) y en el filtro de zonas
7. Regenerar el sitemap: `node scripts/generate-sitemap.mjs` (lee los códigos de `properties.ts` y reescribe `public/sitemap.xml`)

### ✅ Marcar como rentada o vendida
1. Abrir `src/app/data/properties.ts`
2. Buscar la propiedad por su `code` (Ctrl+F)
3. Agregar `status: "rentado"` o `status: "vendido"` dentro de la oferta correspondiente en `offers`
4. Guardar

### ✅ Cambiar el precio
1. Abrir `src/app/data/properties.ts`
2. Buscar la propiedad por su `code` (Ctrl+F)
3. Editar el campo `price` de la oferta (venta o renta)
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
