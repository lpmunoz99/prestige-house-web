import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { Bed, Bath, Maximize2, MapPin, ChevronDown, MessageCircle, ArrowRight } from "lucide-react";
import { properties, buildWhatsAppUrl, VENTA_ZONAS, RENTA_ZONAS, type ListingType, type Property } from "../data/properties";

export function Properties() {
  const [activeTab, setActiveTab] = useState<ListingType>("venta");
  const [selectedZona, setSelectedZona] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState<string>("Todos");
  const [zonaDropdownOpen, setZonaDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const types = ["Todos", "Casa", "Apartamento"];
  const zonas = activeTab === "venta" ? VENTA_ZONAS : RENTA_ZONAS;

  // Reset filters when tab changes
  const handleTabChange = (tab: ListingType) => {
    setActiveTab(tab);
    setSelectedZona(null);
    setSelectedType("Todos");
    setZonaDropdownOpen(false);
  };

  const filtered = useMemo(() => {
    return properties.filter(p => {
      const listingMatch = p.listingType === activeTab;
      const zonaMatch = selectedZona === null || p.zona === selectedZona;
      const typeMatch = selectedType === "Todos" || p.type === selectedType;
      return listingMatch && zonaMatch && typeMatch;
    });
  }, [activeTab, selectedZona, selectedType]);

  return (
    <section id="propiedades" className="bg-[#0a0a0a] py-24 px-6">
      <div className="max-w-7xl mx-auto">

        {/* ── Section Header ─────────────────────────────────── */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-10 bg-[#C9A84C]" />
            <p className="text-[#C9A84C] tracking-[0.3em] uppercase"
              style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.65rem", fontWeight: 500 }}>
              Catálogo
            </p>
            <div className="h-px w-10 bg-[#C9A84C]" />
          </div>
          <h2 className="text-white mb-4"
            style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 600 }}>
            Propiedades Disponibles
          </h2>
          <p className="text-white/50 max-w-lg mx-auto"
            style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.05rem", lineHeight: 1.7 }}>
            Explore nuestra selección exclusiva en las mejores zonas de Guatemala City.
          </p>
        </div>

        {/* ── Venta / Renta Tabs ─────────────────────────────── */}
        <div className="flex justify-center mb-10">
          <div className="flex border border-white/10">
            {(["venta", "renta"] as ListingType[]).map(tab => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`px-10 py-3 tracking-widest uppercase transition-all duration-300 relative ${
                  activeTab === tab
                    ? "bg-[#C9A84C] text-black"
                    : "text-white/50 hover:text-[#C9A84C] hover:bg-white/5"
                }`}
                style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.68rem", fontWeight: 600 }}
              >
                {tab === "venta" ? "En Venta" : "En Renta"}
              </button>
            ))}
          </div>
        </div>

        {/* ── Filters ────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
          {/* Type pills */}
          <div className="flex flex-wrap gap-2">
            {types.map(t => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`px-5 py-2 tracking-widest uppercase transition-all duration-300 border ${
                  selectedType === t
                    ? "bg-[#C9A84C] text-black border-[#C9A84C]"
                    : "border-white/20 text-white/60 hover:border-[#C9A84C]/50 hover:text-[#C9A84C]"
                }`}
                style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.62rem", fontWeight: 500 }}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Zona dropdown */}
          <div className="sm:ml-auto relative">
            <button
              onClick={() => setZonaDropdownOpen(!zonaDropdownOpen)}
              className="flex items-center gap-3 px-5 py-2 border border-white/20 text-white/60 hover:border-[#C9A84C]/50 hover:text-[#C9A84C] transition-all duration-300 min-w-[165px] justify-between"
              style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.68rem" }}
            >
              <span className="flex items-center gap-2">
                <MapPin size={13} className="text-[#C9A84C]" />
                {selectedZona === null ? "Filtrar por Zona" : `Zona ${selectedZona}`}
              </span>
              <ChevronDown size={14} className={`transition-transform duration-300 ${zonaDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {zonaDropdownOpen && (
              <div className="absolute top-full mt-1 left-0 right-0 bg-[#111111] border border-white/10 z-20 shadow-xl">
                <button
                  onClick={() => { setSelectedZona(null); setZonaDropdownOpen(false); }}
                  className={`w-full text-left px-4 py-3 transition-colors duration-200 ${
                    selectedZona === null ? "text-[#C9A84C] bg-[#C9A84C]/10" : "text-white/60 hover:text-[#C9A84C] hover:bg-white/5"
                  }`}
                  style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.68rem" }}
                >
                  Todas las Zonas
                </button>
                {zonas.map(z => (
                  <button
                    key={z}
                    onClick={() => { setSelectedZona(z); setZonaDropdownOpen(false); }}
                    className={`w-full text-left px-4 py-3 transition-colors duration-200 ${
                      selectedZona === z ? "text-[#C9A84C] bg-[#C9A84C]/10" : "text-white/60 hover:text-[#C9A84C] hover:bg-white/5"
                    }`}
                    style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.68rem" }}
                  >
                    Zona {z}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Result count */}
        {(selectedZona !== null || selectedType !== "Todos") && (
          <div className="flex items-center gap-3 mb-6">
            <p className="text-white/40" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.65rem" }}>
              {filtered.length} propiedad{filtered.length !== 1 ? "es" : ""} encontrada{filtered.length !== 1 ? "s" : ""}
            </p>
            <button
              onClick={() => { setSelectedZona(null); setSelectedType("Todos"); }}
              className="text-[#C9A84C] hover:underline"
              style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.65rem" }}
            >
              Limpiar filtros
            </button>
          </div>
        )}

        {/* ── Grid ───────────────────────────────────────────── */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-white/30" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.2rem" }}>
              No se encontraron propiedades con los filtros seleccionados.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(property => (
              <PropertyCard
                key={property.id}
                property={property}
                onDetail={() => navigate(`/propiedad/${property.id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Property Card (no carousel — single image) ───────────────────────────────
function PropertyCard({
  property,
  onDetail,
}: {
  property: Property;
  onDetail: () => void;
}) {
  const isRenta = property.listingType === "renta";

  return (
    <div className="group relative bg-[#111111] border border-white/5 hover:border-[#C9A84C]/30 transition-all duration-500 flex flex-col">

      {/* Image */}
      <div className="relative overflow-hidden h-56 cursor-pointer" onClick={onDetail}>
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Listing type badge */}
        <div className={`absolute top-4 left-4 px-3 py-1 ${isRenta ? "bg-blue-600" : "bg-[#C9A84C]"}`}>
          <p className={`${isRenta ? "text-white" : "text-black"}`}
            style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.52rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase" }}>
            {isRenta ? "En Renta" : "En Venta"}
          </p>
        </div>

        {/* Tag badge */}
        {property.tag && (
          <div className="absolute top-4 right-4 bg-black/70 border border-[#C9A84C]/50 px-3 py-1">
            <p className="text-[#C9A84C]"
              style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.52rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" }}>
              {property.tag}
            </p>
          </div>
        )}

        {/* Photo count hint */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/60 px-2 py-1">
          <div className="w-1 h-1 rounded-full bg-[#C9A84C]" />
          <p className="text-white/60" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.52rem" }}>
            {property.images.length} fotos
          </p>
        </div>

        {/* Type & zona bottom left */}
        <div className="absolute bottom-3 left-3">
          <p className="text-white/60" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.55rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            {property.type} · Zona {property.zona}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3
          className="text-white mb-1 group-hover:text-[#C9A84C] transition-colors duration-300 cursor-pointer"
          style={{ fontFamily: "Playfair Display, serif", fontSize: "1.15rem" }}
          onClick={onDetail}
        >
          {property.title}
        </h3>

        <div className="flex items-start gap-1.5 mb-4">
          <MapPin size={11} className="text-[#C9A84C] mt-0.5 shrink-0" />
          <p className="text-white/40" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.62rem", lineHeight: 1.5 }}>
            {property.address}
          </p>
        </div>

        <p className="text-[#C9A84C] mb-5"
          style={{ fontFamily: "Playfair Display, serif", fontSize: "1.3rem", fontWeight: 600 }}>
          {property.price}
        </p>

        {/* Details row */}
        <div className="flex items-center gap-5 pt-4 border-t border-white/8 mb-5">
          {property.beds > 0 && (
            <div className="flex items-center gap-1.5">
              <Bed size={13} className="text-[#C9A84C]" />
              <p className="text-white/60" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.65rem" }}>
                {property.beds} hab.
              </p>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <Bath size={13} className="text-[#C9A84C]" />
            <p className="text-white/60" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.65rem" }}>
              {property.baths} baños
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <Maximize2 size={13} className="text-[#C9A84C]" />
            <p className="text-white/60" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.65rem" }}>
              {property.area} m²
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-auto">
          <a
            href={buildWhatsAppUrl(property)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white transition-colors duration-300 shrink-0"
            style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}
          >
            <MessageCircle size={13} />
            WhatsApp
          </a>

          <button
            onClick={onDetail}
            className="flex-1 flex items-center justify-center gap-2 py-3 border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-black transition-all duration-300"
            style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" }}
          >
            Ver Detalles
            <ArrowRight size={12} />
          </button>
        </div>
      </div>

      {/* Gold bottom line */}
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#C9A84C] to-[#F0D080] group-hover:w-full transition-all duration-500" />
    </div>
  );
}