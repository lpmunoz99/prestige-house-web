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

const IMG = {
  villaPool:     "https://images.unsplash.com/photo-1694967832949-09984640b143?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB2aWxsYSUyMHN3aW1taW5nJTIwcG9vbHxlbnwxfHx8fDE3NzYwNTQ0OTh8MA&ixlib=rb-4.1.0&q=80&w=1200",
  penthouse:     "https://images.unsplash.com/photo-1691936932068-e82aeea4f0ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwcGVudGhvdXNlJTIwYXBhcnRtZW50JTIwbGl2aW5nJTIwcm9vbXxlbnwxfHx8fDE3NzYwNTQ0OTd8MA&ixlib=rb-4.1.0&q=80&w=1200",
  aptFacade:     "https://images.unsplash.com/photo-1696743297474-d674b8e3d82a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBidWlsZGluZyUyMGZhY2FkZXxlbnwxfHx8fDE3NzYwNTQ1MDJ8MA&ixlib=rb-4.1.0&q=80&w=1200",
  bedroom:       "https://images.unsplash.com/photo-1640109478916-f445f8f19b11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob21lJTIwaW50ZXJpb3IlMjBiZWRyb29tfGVufDF8fHx8MTc3NjA1NDUwM3ww&ixlib=rb-4.1.0&q=80&w=1200",
  gardenTerrace: "https://images.unsplash.com/photo-1623625434531-d130448273c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBob3VzZSUyMGdhcmRlbiUyMHRlcnJhY2V8ZW58MXx8fHwxNzc2MDU0NTAzfDA&ixlib=rb-4.1.0&q=80&w=1200",
  townhouse:     "https://images.unsplash.com/photo-1661023942503-26253b7ec085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB0b3duaG91c2UlMjB1cmJhbiUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NzYwNTQ1MDh8MA&ixlib=rb-4.1.0&q=80&w=1200",
  modernHouse:   "https://images.unsplash.com/photo-1706855203772-c249b75fe016?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjBob3VzZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc3NjAxMDk1NXww&ixlib=rb-4.1.0&q=80&w=1200",
  aerial:        "https://images.unsplash.com/photo-1769207926973-f228026b996b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByZWFsJTIwZXN0YXRlJTIwYWVyaWFsJTIwdmlldyUyMHJlc2lkZW50aWFsfGVufDF8fHx8MTc3NjA1NDUwOHww&ixlib=rb-4.1.0&q=80&w=1200",
  kitchen:       "https://images.unsplash.com/photo-1639751787355-bbc3ed1fd639?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3VzZSUyMGtpdGNoZW4lMjBtb2Rlcm4lMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzYwNTUxNjl8MA&ixlib=rb-4.1.0&q=80&w=1200",
  bathroom:      "https://images.unsplash.com/photo-1658760046471-896cbc719c9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiYXRocm9vbSUyMG1hcmJsZSUyMGRlc2lnbnxlbnwxfHx8fDE3NzYwNTUxNjl8MA&ixlib=rb-4.1.0&q=80&w=1200",
  livingRoom:    "https://images.unsplash.com/photo-1760072513442-9872656c1b07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob21lJTIwb3BlbiUyMGxpdmluZyUyMHJvb20lMjBkZXNpZ258ZW58MXx8fHwxNzc2MDU1MTY5fDA&ixlib=rb-4.1.0&q=80&w=1200",
  poolTerrace:   "https://images.unsplash.com/photo-1763479142678-8e29f4edb538?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwb29sJTIwdGVycmFjZSUyMG91dGRvb3IlMjBob3VzZXxlbnwxfHx8fDE3NzYwNTUxNzJ8MA&ixlib=rb-4.1.0&q=80&w=1200",
  cityView:      "https://images.unsplash.com/photo-1760421130636-68b0c386f09a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjByb29mdG9wJTIwY2l0eSUyMHZpZXclMjBuaWdodHxlbnwxfHx8fDE3NzYwNTUxNzN8MA&ixlib=rb-4.1.0&q=80&w=1200",
  dining:        "https://images.unsplash.com/photo-1771218829838-f30edb7e0263?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwZGluaW5nJTIwcm9vbSUyMGNoYW5kZWxpZXIlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzYwNTUxNzN8MA&ixlib=rb-4.1.0&q=80&w=1200",
};

export const WHATSAPP_NUMBER = "50252026514";

export function buildWhatsAppUrl(property: Property) {
  const action = property.listingType === "venta" ? "comprar" : "rentar";
  const text = encodeURIComponent(
    `Hola, estoy interesado/a en *${action}* la propiedad *${property.title}*.\n📍 ${property.address}\n💰 ${property.price}\n¿Podría darme más información?`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

export const properties: Property[] = [
  // ── VENTA ────────────────────────────────────────────────────────────────────
  {
    id: 1,
    title: "Casa Vista Hermosa",
    type: "Casa",
    listingType: "venta",
    address: "19 Calle 15-42, Colonia Vista Hermosa, Zona 15, Guatemala City",
    zona: 15,
    price: "Q 3,250,000",
    beds: 4,
    baths: 3,
    area: 380,
    images: [IMG.villaPool, IMG.poolTerrace, IMG.kitchen, IMG.bathroom],
    tag: "Destacada",
    description:
      "Espectacular residencia ubicada en una de las colonias más exclusivas de la ciudad. Esta propiedad combina diseño moderno con los más altos estándares de construcción. Cuenta con amplios espacios interiores y exteriores, perfectos para el disfrute familiar.",
    features: ["Piscina privada", "Jardín amplio", "Garaje para 3 vehículos", "Cuarto de servicio", "Sistema de seguridad", "Cocina equipada", "Área de BBQ", "Bodega"],
  },
  {
    id: 2,
    title: "Penthouse Las Majadas",
    type: "Apartamento",
    listingType: "venta",
    address: "Blvd. Los Próceres 20-30, Torre Majadas, Zona 10, Guatemala City",
    zona: 10,
    price: "Q 2,800,000",
    beds: 3,
    baths: 3,
    area: 290,
    images: [IMG.penthouse, IMG.cityView, IMG.bathroom, IMG.kitchen],
    tag: "Nuevo",
    description:
      "Exclusivo penthouse en el corazón de la Zona 10 con vistas panorámicas de la ciudad. Acabados de lujo europeos, techos de doble altura y una terraza privada que lo convierte en una joya única en el mercado inmobiliario capitalino.",
    features: ["Terraza privada 80m²", "Vista panorámica 360°", "Acabados de importación", "2 parqueos techados", "Lobby con conserje 24/7", "Gimnasio en edificio", "Elevador privado", "Bodega privada"],
  },
  {
    id: 3,
    title: "Apartamento Mariscal",
    type: "Apartamento",
    listingType: "venta",
    address: "5ta Avenida 11-02, Colonia Mariscal, Zona 11, Guatemala City",
    zona: 11,
    price: "Q 1,450,000",
    beds: 3,
    baths: 2,
    area: 165,
    images: [IMG.aptFacade, IMG.livingRoom, IMG.bathroom, IMG.kitchen],
    description:
      "Moderno apartamento en la tranquila Colonia Mariscal, ideal para familias jóvenes o como inversión. El edificio cuenta con áreas comunes de primer nivel y excelente ubicación con acceso rápido a centros comerciales y colegios.",
    features: ["Área social equipada", "Parqueo para 2 vehículos", "Sistema de intercomunicación", "Cuarto de lavandería", "Cocina abierta", "Closets empotrados", "Vigilancia 24/7"],
  },
  {
    id: 4,
    title: "Residencia San Isidro",
    type: "Casa",
    listingType: "venta",
    address: "Calle del Bosque 8-16, Condominio San Isidro, Zona 10, Guatemala City",
    zona: 10,
    price: "Q 4,500,000",
    beds: 5,
    baths: 4,
    area: 520,
    images: [IMG.bedroom, IMG.kitchen, IMG.dining, IMG.poolTerrace],
    tag: "Premium",
    description:
      "La residencia más imponente del exclusivo condominio San Isidro. Con 520 m² de construcción sobre un terreno de 800 m², esta propiedad ofrece el máximo nivel de lujo y privacidad. Perfecta para familias que buscan lo mejor en calidad de vida.",
    features: ["Piscina climatizada", "Sala de cine", "Estudio privado", "5 suites con baño propio", "Comedor formal", "Cocina gourmet", "Garaje para 4 vehículos", "Cuartos de servicio", "Jardín tropical"],
  },
  {
    id: 5,
    title: "Villa Jardines del Sur",
    type: "Casa",
    listingType: "venta",
    address: "3ra Calle 5-18, Jardines del Sur, Zona 13, Guatemala City",
    zona: 13,
    price: "Q 1,200,000",
    beds: 3,
    baths: 2,
    area: 210,
    images: [IMG.gardenTerrace, IMG.livingRoom, IMG.kitchen, IMG.bathroom],
    description:
      "Acogedora casa familiar en la calmada Zona 13, cercana al aeropuerto y a grandes avenidas de acceso. Su amplio jardín y terraza hacen de esta propiedad el hogar ideal para quienes buscan tranquilidad sin alejarse de la ciudad.",
    features: ["Jardín frontal y trasero", "Terraza cubierta", "Cocina con isla", "Garaje para 2 vehículos", "Cuarto de servicio", "Área de lavandería"],
  },

  // ── RENTA ────────────────────────────────────────────────────────────────────
  {
    id: 6,
    title: "Apartamento Torre Murano",
    type: "Apartamento",
    listingType: "renta",
    address: "Ruta 6, 0-60, Torre Murano, Zona 4, Guatemala City",
    zona: 4,
    price: "Q 7,500 / mes",
    beds: 2,
    baths: 2,
    area: 120,
    images: [IMG.townhouse, IMG.livingRoom, IMG.bathroom, IMG.kitchen],
    description:
      "Moderno apartamento en alquiler en el vibrante corazón de la Zona 4, el epicentro cultural y gastronómico de Guatemala City. Ideal para profesionales o parejas que buscan vivir en un ambiente urbano y dinámico.",
    features: ["Amueblado completamente", "Gimnasio en edificio", "Área social", "1 parqueo incluido", "Vigilancia 24/7", "Balcón con vista urbana", "Lavadora/secadora incluida"],
  },
  {
    id: 7,
    title: "Apartamento Cayalá",
    type: "Apartamento",
    listingType: "renta",
    address: "Paseo Cayalá, Zona 16, Edificio Ámbar, Guatemala City",
    zona: 16,
    price: "Q 12,000 / mes",
    beds: 3,
    baths: 3,
    area: 210,
    images: [IMG.modernHouse, IMG.cityView, IMG.kitchen, IMG.bathroom],
    tag: "Nuevo",
    description:
      "Lujoso apartamento en renta dentro del exclusivo proyecto Cayalá. Rodeado de restaurantes, tiendas y áreas peatonales de primer nivel. Una experiencia de vida única dentro de una comunidad privada y segura en Zona 16.",
    features: ["Semi-amueblado", "2 parqueos techados", "Piscina comunitaria", "Área de juegos", "Bodega privada", "Acceso controlado", "Vista a jardines"],
  },
  {
    id: 8,
    title: "Casa Eureka",
    type: "Casa",
    listingType: "renta",
    address: "12 Calle 2-20, Colonia Eureka, Zona 4, Guatemala City",
    zona: 4,
    price: "Q 9,800 / mes",
    beds: 4,
    baths: 3,
    area: 280,
    images: [IMG.aerial, IMG.poolTerrace, IMG.dining, IMG.bedroom],
    description:
      "Amplia casa en renta en la tradicional Colonia Eureka, ideal para familias o uso corporativo. Con cuatro habitaciones y tres baños completos, ofrece el espacio y la comodidad que su familia necesita a un precio competitivo.",
    features: ["Jardín privado", "Patio trasero", "Cochera techada para 3", "Cuarto de servicio", "Comedor formal", "Sala familiar", "Cocina amplia"],
  },
  {
    id: 9,
    title: "Casa Vista Al Lago",
    type: "Casa",
    listingType: "renta",
    address: "Avenida Reforma 7-62, Zona 10, Guatemala City",
    zona: 10,
    price: "Q 18,500 / mes",
    beds: 5,
    baths: 4,
    area: 450,
    images: [IMG.villaPool, IMG.dining, IMG.bedroom, IMG.bathroom],
    tag: "Premium",
    description:
      "Excepcional residencia en renta sobre la Avenida Reforma. Una propiedad de representación con acabados de lujo, perfecta para ejecutivos expatriados o embajadas. Incluye personal de seguridad y mantenimiento de jardines.",
    features: ["Amueblada de lujo", "Piscina privada", "Seguridad privada 24/7", "Mantenimiento incluido", "Garaje para 4 vehículos", "Sala de reuniones", "Cocina gourmet equipada", "5 suites con baño propio"],
  },
];

export const VENTA_ZONAS = [...new Set(
  properties.filter(p => p.listingType === "venta").map(p => p.zona)
)].sort((a, b) => a - b);

export const RENTA_ZONAS = [...new Set(
  properties.filter(p => p.listingType === "renta").map(p => p.zona)
)].sort((a, b) => a - b);
