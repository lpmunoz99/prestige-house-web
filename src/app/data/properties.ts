export type ListingType = "venta" | "renta";

export interface Property {
  id: number;
  title: string;
  type: string;
  listingType: ListingType;
  address: string;
  zona: number;
  price: string;
  beds: number;
  baths: number;
  area: number;
  images: string[];
  tag?: string;
  description: string;
  features: string[];
}

const BASE_PATH = "/properties-img";

export const WHATSAPP_NUMBER = "50252026514";

export function buildWhatsAppUrl(property: Property) {
  const action = property.listingType === "venta" ? "comprar" : "rentar";
  const text = encodeURIComponent(
    `Hola, estoy interesado/a en *${action}* la propiedad *${property.title}*.\n📍 ${property.address}\n💰 ${property.price}\n¿Podría darme más información?`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

export const properties: Property[] = [
  // --- PROPIEDAD 1: APARTAMENTO 901 ---
  {
    id: 1,
    title: "Apartamento Vista Quince - Nivel 901",
    type: "Apartamento",
    listingType: "venta",
    address: "Zona 15, Guatemala City",
    zona: 15,
    price: "$ 401,262.16",
    beds: 3,
    baths: 3.5,
    area: 172.74,
    tag: "Promoción Especial",
    description: "Ubicado en nivel alto con vistas espectaculares. Incluye 1 año de Membresía gratis en Vista Quince Hotel. El precio ya incluye impuestos.",
    features: [
      "Sala - Comedor", "Cocina cerrada con ventilación", "Amplio balcón con vistas", 
      "Baño de visitas", "Lavandería", "Cuarto de servicio con baño", 
      "Habitación master con walk-in closet", "2 Habitaciones secundarias con baño privado", 
      "2 Parqueos individuales", "Terraza y Churrasqueras", "Parque Pet Friendly"
    ],
    images: [
      `${BASE_PATH}/apt-901/apt-901_1.jpeg`, `${BASE_PATH}/apt-901/apt-901_2.jpeg`,
      `${BASE_PATH}/apt-901/apt-901_3.jpeg`, `${BASE_PATH}/apt-901/apt-901_4.jpeg`,
      `${BASE_PATH}/apt-901/apt-901_5.jpeg`, `${BASE_PATH}/apt-901/apt-901_6.jpeg`,
      `${BASE_PATH}/apt-901/apt-901_7.jpeg`, `${BASE_PATH}/apt-901/apt-901_8.jpeg`,
    ],
  },
  // --- PROPIEDAD 2: PENTHOUSE ---
  {
    id: 2,
    title: "Penthouse de Lujo para Estrenar",
    type: "Apartamento",
    listingType: "venta",
    address: "Zona 15 (Nivel 14), Guatemala City",
    zona: 15,
    price: "$ 434,215.02",
    beds: 3,
    baths: 3.5,
    area: 174.04,
    tag: "Para Estrenar",
    description: "Exclusivo Penthouse en Nivel 14 con acabados de madera natural en cocina, pisos y techos. Incluye 1 año de membresía en Vista Quince Hotel e impuestos.",
    features: [
      "Acabados en madera natural", "Baño de Visitas", "Sala - Comedor", 
      "Balcón con vistas espectaculares", "Cocina Cerrada", "Lavandería", 
      "Cuarto de servicio con baño completo", "Dormitorio principal con walk-in closet", 
      "Dormitorio secundario con walk-in closet y baño", "Dormitorio secundario con closet y baño", 
      "2 Parqueos individuales", "Terraza, Juegos Infantiles y Pet Friendly"
    ],
    images: [
      `${BASE_PATH}/ph-zona15/ph-zona15_1.jpeg`, `${BASE_PATH}/ph-zona15/ph-zona15_2.jpeg`,
      `${BASE_PATH}/ph-zona15/ph-zona15_3.jpeg`, `${BASE_PATH}/ph-zona15/ph-zona15_4.jpeg`,
      `${BASE_PATH}/ph-zona15/ph-zona15_5.jpeg`, `${BASE_PATH}/ph-zona15/ph-zona15_6.jpeg`,
      `${BASE_PATH}/ph-zona15/ph-zona15_7.jpeg`,
    ],
  },
  // --- PROPIEDAD 3: APARTAMENTO RENTA NIVEL 6 ---
  {
    id: 3,
    title: "Apartamento Nivel 6 - Zona 15",
    type: "Apartamento",
    listingType: "renta",
    address: "Zona 15, Guatemala City",
    zona: 15,
    price: "$ 1,650 / mes",
    beds: 3,
    baths: 3.5,
    area: 172.74,
    tag: "Mantenimiento Incluido",
    description: "Apartamento en renta ubicado en 6to nivel. Ya incluye lámparas, cuota de mantenimiento e IVA.",
    features: [
      "Incluye Lámparas", "Sala - Comedor", "Cocina cerrada", "Balcón", 
      "Baño de visitas", "Lavandería", "Cuarto de servicio completo", 
      "Habitación Master con walk-in closet", "2 Habitaciones secundarias con baño", 
      "2 Parqueos individuales", "Terraza y Churrasqueras", "Parque Infantil y Pet Friendly"
    ],
    images: [
      `${BASE_PATH}/rentanv6-z15/rentanv6-z15_1.jpeg`, `${BASE_PATH}/rentanv6-z15/rentanv6-z15_2.jpeg`,
      `${BASE_PATH}/rentanv6-z15/rentanv6-z15_3.jpeg`, `${BASE_PATH}/rentanv6-z15/rentanv6-z15_4.jpeg`,
      `${BASE_PATH}/rentanv6-z15/rentanv6-z15_5.jpeg`, `${BASE_PATH}/rentanv6-z15/rentanv6-z15_6.jpeg`,
      `${BASE_PATH}/rentanv6-z15/rentanv6-z15_7.jpeg`, `${BASE_PATH}/rentanv6-z15/rentanv6-z15_8.jpeg`,
    ],
  },
];

export const VENTA_ZONAS = [...new Set(
  properties.filter(p => p.listingType === "venta").map(p => p.zona)
)].sort((a, b) => a - b);

export const RENTA_ZONAS = [...new Set(
  properties.filter(p => p.listingType === "renta").map(p => p.zona)
)].sort((a, b) => a - b);