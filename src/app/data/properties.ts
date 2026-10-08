export type ListingType = "venta" | "renta";
export type PropertyStatus = "disponible" | "rentado" | "vendido";

export interface Offer {
  type: ListingType;
  price: string;
  furnished?: boolean; // true = amueblado, false = sin muebles, omitido = no aplica / no especificado
  status?: PropertyStatus;
  priceDetails?: {
    reserva?: string;
    enganche?: string;
  };
}

export interface Property {
  code: string;
  title: string;
  type: string;
  offers: Offer[];
  address: string;
  zona: number;
  location?: {
    department: string;
    municipality: string;
    sector?: string;
  };
  beds?: number | string; // texto libre para proyectos con varias tipologías ("1, 2 y 3")
  baths?: number | string;
  area?: number;
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

/** Genera las rutas `${folder}_1.webp` ... `${folder}_N.webp` dentro de /properties-img/folder/ */
const gallery = (folder: string, count = 8) =>
  Array.from({ length: count }, (_, i) => `${BASE_PATH}/${folder}/${folder}_${i + 1}.webp`);

export function getOffer(property: Property, type: ListingType): Offer | undefined {
  return property.offers.find(o => o.type === type);
}

export function isOfferUnavailable(offer: Offer) {
  return offer.status === "rentado" || offer.status === "vendido";
}

export function furnishedLabel(offer: Offer) {
  if (offer.furnished === undefined) return null;
  return offer.furnished ? "Amueblado" : "Sin muebles";
}

export function hasValue(v: number | string | undefined): v is number | string {
  return v !== undefined && v !== 0 && v !== "";
}

export function buildWhatsAppUrl(property: Property, offer: Offer) {
  const action = offer.type === "venta" ? "comprar" : "rentar";
  const furnished = furnishedLabel(offer);
  const text = encodeURIComponent(
    `Hola, estoy interesado/a en *${action}* la propiedad *${property.title}* (Ref. ${property.code}).\n📍 ${property.address}\n💰 ${offer.price}${furnished ? ` (${furnished})` : ""}\n¿Podría darme más información?`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

export const properties: Property[] = [
  {
    code: "AV-001",
    title: "Apartamento en Vista Hermosa I",
    type: "Apartamento",
    offers: [{ type: "venta", price: "$ 401,262.16" }],
    address: "Zona 15, Guatemala City",
    zona: 15,
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
    images: gallery("apt-901"),
    video: {
      webm: `${BASE_PATH}/apt-901/alvento_final.webm`,
      mp4: `${BASE_PATH}/apt-901/alvento_final.mp4`,
    },
  },
  {
    code: "AV-002",
    title: "Penthouse de Lujo para Estrenar",
    type: "Apartamento",
    offers: [{ type: "venta", price: "$ 434,215.02" }],
    address: "Zona 15, Guatemala City",
    zona: 15,
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
    images: gallery("ph-zona15", 7),
  },
  // AV-003 reemplazado: mismo edificio que 602 pero apartamento 802
  {
    code: "AV-003",
    title: "Apartamento en Venta en Vista Hermosa 1, Apto. 802",
    type: "Apartamento",
    offers: [{ type: "venta", price: "$ 395,405.87" }],
    address: "Zona 15, Guatemala City",
    zona: 15,
    beds: 3,
    baths: 3.5,
    area: 172.74,
    tag: "Promoción Especial",
    description: "Excelente oportunidad de inversión. Apartamento en venta ubicado en 8vo nivel con acabados de lujo. El precio ya incluye impuestos.",
    features: [
      "Sala - Comedor", "Cocina cerrada", "Balcón con vistas",
      "Baño de visitas", "Lavandería", "Cuarto de servicio completo",
      "Habitación Master con walk-in closet", "2 Habitaciones secundarias con baño",
      "2 Parqueos individuales", "Terraza y Churrasqueras", "Parque Infantil y Pet Friendly"
    ],
    images: gallery("renta802-z15"),
  },
  {
    code: "AR-001",
    title: "Apartamento en renta Zona 15",
    type: "Apartamento",
    offers: [{ type: "renta", price: "$ 1,650 / mes", status: "rentado" }],
    address: "Zona 15, Guatemala City",
    zona: 15,
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
    images: gallery("renta602-z15"),
  },
  // Nueva: Apartamento 802 en renta
  {
    code: "AR-004",
    title: "Apartamento en Renta en Nivel alto en Vista Hermosa 1, Zona 15",
    type: "Apartamento",
    offers: [{ type: "renta", price: "$ 1,700 / mes" }],
    address: "Zona 15, Guatemala City",
    zona: 15,
    beds: 3,
    baths: 3.5,
    area: 172.74,
    tag: "Mantenimiento Incluido",
    description: "Apartamento en renta ubicado en 8vo nivel. Ya incluye lámparas, cuota de mantenimiento e IVA.",
    features: [
      "Incluye Lámparas", "Sala - Comedor", "Cocina cerrada", "Balcón",
      "Baño de visitas", "Lavandería", "Cuarto de servicio completo",
      "Habitación Master con walk-in closet", "2 Habitaciones secundarias con baño",
      "2 Parqueos individuales", "Terraza y Churrasqueras", "Parque Infantil y Pet Friendly"
    ],
    images: gallery("renta802-z15"),
  },
  {
    code: "AR-002",
    title: "Apartamento en Renta Zona 5 — Apto. 506",
    type: "Apartamento",
    offers: [{ type: "renta", price: "Q. 7,100 / mes" }],
    address: "Zona 5, Guatemala City",
    zona: 5,
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
      "Lavandería", "2 Parqueos para vehículo",
      "Parque con bellos jardines", "Juego de ajedrez gigante",
      "Canasta de Basketball", "Social Area", "Social Kitchen",
      "Gimnasio", "Roof Top",
    ],
    images: gallery("renta506-z5"),
  },
  {
    code: "AR-003",
    title: "Apartamento en Renta Zona 2 — Apto. 801",
    type: "Apartamento",
    offers: [{ type: "renta", price: "Q. 5,300 / mes" }],
    address: "Ciudad Nueva, Zona 2, Guatemala City",
    zona: 2,
    beds: 3,
    baths: 2,
    area: 103.11,
    tag: "IVA y Mantenimiento Incluido",
    description: "Tu apartamento en zona residencial de Zona 2, Ciudad Nueva. Nivel alto, 8vo. Nivel, Apto. 801. Con 78.11m² habitables y 25m² de 2 parqueos. Precio incluye IVA y mantenimiento.",
    features: [
      "Habitación Master con baño completo",
      "2 Habitaciones secundarias con baño compartido",
      "Sala", "Comedor", "Cocina",
      "Lavandería", "2 Parqueos",
      "Lobby", "Kitchen Spot", "Teen Lounge",
      "Kids Club", "Chill Bar", "Social Area",
    ],
    images: gallery("renta801-z2"),
  },
  // Nueva: Apartamento 307 en venta Zona 2
  {
    code: "AV-005",
    title: "Magnífica oportunidad de inversión en Zona 2 — Apto. 307",
    type: "Apartamento",
    offers: [{ type: "venta", price: "Q. 1,150,000.00" }],
    address: "Ciudad Nueva, Zona 2, Guatemala City",
    zona: 2,
    beds: 3,
    baths: 1,
    area: 90.30,
    tag: "Oportunidad de Inversión",
    description: "Magnífica oportunidad de inversión en Zona 2. Apartamento en venta en Nivel 3, Apto. 307. Con 62.80m² habitables, 2.5m² de balcón y 25m² de 2 parqueos para un total de 90.30m².",
    features: [
      "3 Habitaciones", "Sala", "Comedor",
      "Balcón", "Cocina",
      "1 Baño completo", "Lavandería",
      "2 Parqueos",
      "Lobby", "Kitchen Spot", "Teen Lounge",
      "Kids Club", "Chill Bar", "Social Area",
    ],
    images: gallery("venta307-z2"),
  },
  {
    code: "AV-004",
    title: "Tu Apartamento frente al Mar",
    type: "Apartamento",
    offers: [{
      type: "venta",
      price: "Q. 1,804,372.00",
      priceDetails: { reserva: "Q. 27,100.00", enganche: "20%" },
    }],
    address: "Chulamar, Puerto de San José, Escuintla",
    zona: 0,
    location: {
      department: "Escuintla",
      municipality: "San José",
      sector: "Chulamar",
    },
    beds: 2,
    baths: 2,
    area: 111.25,
    tag: "Frente al Mar",
    description: "Un desarrollo exclusivo frente al mar, diseñado para el descanso, la inversión y la vida en comunidad, con acceso directo a la playa mediante un puente privado. Apartamento de 83.25m² habitables + 28.99m² de 2 parqueos tándem.",
    features: [
      "Sala", "Comedor con acceso a balcón con vistas al mar",
      "Cocina con top de cuarzo y gabinetes",
      "2 Habitaciones", "2 Baños completos",
      "2 Parqueos Tándem",
      "Sky Lounge con vista al océano",
      "Piscina tipo laguna",
      "Club de playa con Tiki Bar y fire pits",
      "Muelle para pesca y dock para kayaks y paddleboards",
      "Canchas deportivas (fútbol, tenis, pickleball)",
      "Área de juegos para niños y mascotas",
      "Jacuzzi",
    ],
    images: gallery("apt-chulamar"),
  },

  // ───────────── Batch octubre 2026 (propiedades con varias ofertas) ─────────────
  {
    code: "AP-001",
    title: "Así se Vive a otro Nivel en Zona 14",
    type: "Apartamento",
    offers: [
      { type: "venta", price: "$ 650,000", furnished: false },
      { type: "renta", price: "$ 2,500 + IVA / mes", furnished: false },
    ],
    address: "Zona 14, Guatemala City",
    zona: 14,
    beds: 2,
    baths: 2.5,
    area: 154.13,
    tag: "Amenidades de Lujo",
    description: "Apartamento en 6to. nivel con 154.13m² habitables, 2 habitaciones con baño completo, amplia terraza y cocina totalmente equipada. Incluye habitación de servicio completa y 2 parqueos.",
    features: [
      "6to. Nivel", "2 Habitaciones con baño completo", "Amplia Terraza",
      "Sala", "Comedor", "Cocina totalmente equipada",
      "Baño de Visitas", "Lavandería", "Habitación de Servicio completa",
      "2 Parqueos",
      "Motor Lobby con doble altura", "Lap Pool", "Luxury Spa con Sauna seco y húmedo",
      "Gimnasio totalmente equipado", "Salón de Yoga", "Chef's Kitchen",
      "Zen Garden", "Kid's Playroom",
    ],
    images: gallery("ap-z14-6to", 17),
  },
  {
    code: "AP-002",
    title: "¿Buscas lujo y exclusividad en Zona 14?",
    type: "Apartamento",
    offers: [
      { type: "venta", price: "$ 1,200,000", furnished: false },
      { type: "renta", price: "$ 5,500 + IVA / mes", furnished: true },
    ],
    address: "Zona 14, Guatemala City",
    zona: 14,
    beds: 3,
    baths: 3.5,
    area: 225,
    tag: "Lujo y Exclusividad",
    description: "Apartamento en 5to. nivel con 225m² habitables, 3 habitaciones con baño completo, amplia terraza y 2 salas (principal y familiar). Incluye habitación de servicio completa y 3 parqueos. En renta se entrega amueblado.",
    features: [
      "5to. Nivel", "3 Habitaciones con baño completo", "Amplia Terraza",
      "2 Salas (Principal y Familiar)", "Comedor", "Cocina totalmente equipada",
      "Baño de Visitas", "Lavandería", "Habitación de Servicio completa",
      "3 Parqueos",
      "Motor Lobby con doble altura", "Lap Pool", "Luxury Spa con Sauna seco y húmedo",
      "Gimnasio totalmente equipado", "Salón de Yoga", "Chef's Kitchen",
      "Zen Garden", "Kid's Playroom",
    ],
    images: gallery("ap-z14-5to", 12),
  },
  {
    code: "AP-003",
    title: "Apartamento en Sector Residencial de Zona 10",
    type: "Apartamento",
    offers: [
      { type: "venta", price: "$ 400,000", furnished: false },
      { type: "renta", price: "$ 2,000 / mes", furnished: true },
    ],
    address: "Sector Residencial, Zona 10, Guatemala City",
    zona: 10,
    beds: 3,
    baths: 2.5,
    area: 198.75,
    tag: "2 Garitas de Seguridad",
    description: "Apartamento en 2do. nivel con 198.75m², dentro de 2 garitas de seguridad en uno de los sectores más exclusivos de la zona. En renta se entrega amueblado.",
    features: [
      "2do. Nivel", "2 Salas (Principal y Familiar)", "Comedor",
      "Cocina totalmente equipada", "3 Habitaciones",
      "2 Baños completos", "Baño de Visitas",
      "2 Parqueos", "Lavandería", "Habitación de Servicio completa",
      "Dentro de 2 garitas de seguridad",
    ],
    images: gallery("ap-z10-residencial"),
  },
  {
    code: "AP-004",
    title: "Tu Inversión en Zona 10 — Zona Corporativa",
    type: "Apartamento",
    offers: [
      { type: "venta", price: "$ 175,000", furnished: false },
      { type: "renta", price: "$ 1,300 / mes", furnished: true },
    ],
    address: "Zona Corporativa, Zona 10, Guatemala City",
    zona: 10,
    beds: 1,
    baths: 1,
    tag: "Tu Inversión en Zona 10",
    description: "Apartamento en 8vo. nivel en la zona corporativa de Zona 10, con amplia habitación, baño completo, walk-in clóset y balcón con vistas espectaculares. Incluye 1 parqueo y 1 bodega. En renta se entrega amueblado.",
    features: [
      "8vo. Nivel", "1 Amplia Habitación con baño completo y Walk-in Clóset",
      "Balcón con vistas espectaculares", "Sala", "Comedor",
      "Cocina con grifería de alta gama y gabinetes",
      "1 Parqueo", "1 Bodega",
      "Piscina", "Gimnasio totalmente equipado", "Área de Juegos para Niños",
      "Salón Social", "Co-Working", "Parqueo de Visitas",
    ],
    images: gallery("ap-z10-corporativa", 10),
  },
  {
    code: "AP-005",
    title: "Proyecto Premium en Planos en Zona 14",
    type: "Apartamento",
    offers: [{ type: "venta", price: "Desde $ 190,000" }],
    address: "Zona 14, Guatemala City",
    zona: 14,
    beds: "1, 2 y 3",
    tag: "En Planos",
    description: "Proyecto premium en planos en Zona 14, con apartamentos de 1, 2 y 3 habitaciones. Baños completos con grifería de alta gama y amenidades de primer nivel, incluyendo un parque de 1,200m².",
    features: [
      "Apartamentos de 1, 2 y 3 habitaciones", "Sala", "Comedor", "Cocina",
      "Baños completos con grifería de alta gama", "Lavandería", "Parqueos",
      "Infinity Pool", "Jacuzzi", "Sauna", "Fire Pits", "Gimnasio",
      "Chef's Kitchen", "Parque de 1,200m²", "Salón Social", "Co-Working",
    ],
    images: gallery("ap-z14-planos"),
  },
  {
    code: "OF-001",
    title: "Oficina Premium en Renta en Zona 10",
    type: "Oficina",
    offers: [{ type: "renta", price: "$ 3,000 / mes" }],
    address: "Zona 10, Guatemala City",
    zona: 10,
    baths: 2,
    area: 263.70,
    tag: "Proyecto Emblemático",
    description: "Oficina premium en el 7mo. nivel de uno de los proyectos más emblemáticos de la zona, con 263.70m² de ambientes abiertos y aire acondicionado central.",
    features: [
      "7mo. Nivel", "Ambientes abiertos", "Aire acondicionado central",
      "2 Baños", "3 Parqueos",
    ],
    images: gallery("of-z10-7mo", 6),
  },

  // ───────────── Batch octubre 2026 (2) ─────────────
  {
    code: "CA-001",
    title: "¿Buscas casa en venta en Iztapa?",
    type: "Casa",
    offers: [{ type: "venta", price: "$ 275,000" }],
    address: "Iztapa, Escuintla",
    zona: 0,
    location: {
      department: "Escuintla",
      municipality: "Iztapa",
    },
    beds: 4,
    baths: 3.5,
    area: 1867.741,
    tag: "Con Piscina",
    description: "Casa en venta en Iztapa con 1,867.741m², 4 habitaciones con aire acondicionado, piscina y bellos jardines. Cuenta con pozo propio, bomba de agua, fosa séptica y energía solar.",
    features: [
      "4 Habitaciones", "Aire acondicionado", "3.5 Baños",
      "Piscina", "Sala", "Comedor", "Cocina",
      "Parqueos para 4 vehículos", "Bellos Jardines",
      "Pozo propio", "Bomba de agua", "Fosa séptica", "Energía Solar",
      "Habitación de Servicio",
    ],
    images: gallery("ca-iztapa"),
  },
  {
    code: "AP-006",
    title: "Gran oportunidad de inversión a pasos de la Roosevelt",
    type: "Apartamento",
    offers: [{ type: "venta", price: "Q. 640,000" }],
    address: "Zona 2, Mixco, Guatemala",
    zona: 0,
    location: {
      department: "Guatemala",
      municipality: "Mixco",
      sector: "Zona 2, Mixco",
    },
    beds: 2,
    baths: 1,
    tag: "Oportunidad de Inversión",
    description: "Apartamento en venta en el 5to. nivel, en Zona 2 de Mixco, a pasos de la Calzada Roosevelt. Cuenta con 2 habitaciones con clósets, cocina con gabinetes, 1 baño completo y 1 parqueo.",
    features: [
      "5to. Nivel", "2 Habitaciones con clósets", "Sala", "Comedor",
      "Cocina con gabinetes", "1 Baño completo", "1 Parqueo para vehículo",
      "Amplio Salón Social", "Churrasqueras", "Fire Pits",
      "Pet Friendly", "Co-Working",
    ],
    images: gallery("ap-mixco-z2", 13),
  },
  {
    code: "AP-007",
    title: "Apartamento Amueblado en Zona 10",
    type: "Apartamento",
    offers: [
      { type: "venta", price: "$ 275,000", furnished: false },
      { type: "renta", price: "$ 1,700 / mes", furnished: true },
    ],
    address: "Zona 10, Guatemala City",
    zona: 10,
    beds: 3,
    baths: 2.5,
    area: 161.57,
    tag: "Amueblado",
    description: "Apartamento en Zona 10 con 161.57m² habitables, 3 habitaciones, 2 baños completos y baño de visitas. Incluye habitación de servicio y 2 parqueos individuales techados. En renta se entrega amueblado.",
    features: [
      "Sala", "Comedor", "Cocina", "3 Habitaciones",
      "2 Baños completos", "Baño de Visitas", "Lavandería",
      "Habitación de Servicio", "2 Parqueos individuales techados",
    ],
    images: gallery("ap-z10-amueblado", 10),
  },
  {
    code: "AP-008",
    title: "Magnífica oportunidad de inversión en Zona 14",
    type: "Apartamento",
    offers: [{ type: "venta", price: "$ 195,000" }],
    address: "Dentro de Garita, Zona 14, Guatemala City",
    zona: 14,
    beds: 2,
    baths: 1,
    area: 78.37,
    tag: "Dentro de Garita",
    description: "Apartamento en venta dentro de garita en Zona 14, con 78.37m² habitables. Sala-comedor con acceso a balcón, cocina con top de cuarzo y gabinetes, habitación máster con walk-in clóset y amplio balcón. Incluye 2 parqueos.",
    features: [
      "Sala - Comedor con acceso a balcón", "Cocina con top de cuarzo y gabinetes",
      "2 Habitaciones", "Habitación Máster con Walk-in Clóset",
      "Baño completo", "Amplio balcón", "2 Parqueos",
      "Lobby", "Co-Working", "Piscina", "Jardín tipo japonés",
    ],
    images: gallery("ap-z14-garita", 12),
  },
];

export const VENTA_ZONAS = [...new Set(
  properties.filter(p => getOffer(p, "venta")).map(p => p.zona)
)].sort((a, b) => a - b);

export const RENTA_ZONAS = [...new Set(
  properties.filter(p => getOffer(p, "renta")).map(p => p.zona)
)].sort((a, b) => a - b);
