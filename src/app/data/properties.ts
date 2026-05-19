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
  video?: {
    webm: string;
    mp4: string;
  };
  tag?: string;
  description: string;
  features: string[];
}

const BASE_PATH = "/properties-img";

export const WHATSAPP_NUMBER = "50239144422";

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
    title: "Apartamento en Vista Hermosa I",
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
    video: {
      webm: `${BASE_PATH}/apt-901/alvento_final.webm`,
      mp4: `${BASE_PATH}/apt-901/alvento_final.mp4`,
    },
  },
  // --- PROPIEDAD 2: PENTHOUSE ---
  {
    id: 2,
    title: "Penthouse de Lujo para Estrenar",
    type: "Apartamento",
    listingType: "venta",
    address: "Zona 15, Guatemala City",
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
    title: "Apartamento en renta Zona 15",
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
  // --- PROPIEDAD 4: APARTAMENTO VENTA NIVEL 6 (PROMOCIÓN) ---
  {
    id: 4,
    title: "Promoción Especial: Apartamento en venta en 6to. Nivel",
    type: "Apartamento",
    listingType: "venta",
    address: "Zona 15, Guatemala City",
    zona: 15,
    price: "$ 388,847.87",
    beds: 3,
    baths: 3.5,
    area: 172.74,
    tag: "Promoción Especial",
    description: "Excelente oportunidad de inversión. Apartamento en venta ubicado en 6to nivel con acabados de lujo. El precio ya incluye impuestos.",
    features: [
      "Sala - Comedor", "Cocina cerrada", "Balcón con vistas",
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
  // --- PROPIEDAD 5: APARTAMENTO RENTA ZONA 5 #506 ---
  {
    id: 5,
    title: "Apartamento en Renta Zona 5 — Apto. 506",
    type: "Apartamento",
    listingType: "renta",
    address: "Zona 5, Guatemala City",
    zona: 5,
    price: "Q. 7,100 / mes",
    beds: 3,
    baths: 2,
    area: 112.75,
    tag: "IVA y Mantenimiento Incluido",
    description: "¿Te imaginas vivir en la zona más céntrica de Zona 5? Apartamento en renta en 5to. Nivel #506 con 86.03m² habitables + 1.72m² de balcón y 25m² de 2 parqueos. Precio incluye IVA y mantenimiento.",
    features: [
      "Habitación Master con amplio baño completo",
      "2 Habitaciones secundarias con baño compartido",
      "Sala", "Comedor", "Cocina",
      "Balcón con bellas vistas",
      "Lavandería",
      "2 Parqueos para vehículo",
      "Parque con bellos jardines",
      "Juego de ajedrez gigante",
      "Canasta de Basketball",
      "Social Area", "Social Kitchen",
      "Gimnasio", "Roof Top",
    ],
    images: [
      `${BASE_PATH}/renta506-z5/renta506-z5_1.jpeg`,
      `${BASE_PATH}/renta506-z5/renta506-z5_2.jpeg`,
      `${BASE_PATH}/renta506-z5/renta506-z5_3.jpeg`,
      `${BASE_PATH}/renta506-z5/renta506-z5_4.jpeg`,
      `${BASE_PATH}/renta506-z5/renta506-z5_5.jpeg`,
      `${BASE_PATH}/renta506-z5/renta506-z5_6.jpeg`,
      `${BASE_PATH}/renta506-z5/renta506-z5_7.jpeg`,
      `${BASE_PATH}/renta506-z5/renta506-z5_8.jpeg`,
    ],
  },
  // --- PROPIEDAD 6: APARTAMENTO RENTA ZONA 2 #801 ---
  {
    id: 6,
    title: "Apartamento en Renta Zona 2 — Apto. 801",
    type: "Apartamento",
    listingType: "renta",
    address: "Ciudad Nueva, Zona 2, Guatemala City",
    zona: 2,
    price: "Q. 5,300 / mes",
    beds: 3,
    baths: 2,
    area: 103.11,
    tag: "IVA y Mantenimiento Incluido",
    description: "Tu apartamento en zona residencial de Zona 2, Ciudad Nueva. Nivel alto, 8vo. Nivel, Apto. 801. Con 78.11m² habitables y 25m² de 2 parqueos. Precio incluye IVA y mantenimiento.",
    features: [
      "Habitación Master con baño completo",
      "2 Habitaciones secundarias con baño compartido",
      "Sala", "Comedor", "Cocina",
      "Lavandería",
      "2 Parqueos",
      "Lobby",
      "Kitchen Spot",
      "Teen Lounge",
      "Kids Club",
      "Chill Bar",
      "Social Area",
    ],
    images: [
      `${BASE_PATH}/renta801-z2/renta801-z2_1.jpeg`,
      `${BASE_PATH}/renta801-z2/renta801-z2_2.jpeg`,
      `${BASE_PATH}/renta801-z2/renta801-z2_3.jpeg`,
      `${BASE_PATH}/renta801-z2/renta801-z2_4.jpeg`,
      `${BASE_PATH}/renta801-z2/renta801-z2_5.jpeg`,
      `${BASE_PATH}/renta801-z2/renta801-z2_6.jpeg`,
      `${BASE_PATH}/renta801-z2/renta801-z2_7.jpeg`,
      `${BASE_PATH}/renta801-z2/renta801-z2_8.jpeg`,
    ],
  },
];

export const VENTA_ZONAS = [...new Set(
  properties.filter(p => p.listingType === "venta").map(p => p.zona)
)].sort((a, b) => a - b);

export const RENTA_ZONAS = [...new Set(
  properties.filter(p => p.listingType === "renta").map(p => p.zona)
)].sort((a, b) => a - b);