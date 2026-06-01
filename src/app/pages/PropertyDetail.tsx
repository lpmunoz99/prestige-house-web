import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import {
  ArrowLeft, Bed, Bath, Maximize2, MapPin, MessageCircle,
  ChevronLeft, ChevronRight, Check, Phone, Home, Play
} from "lucide-react";
import { properties, buildWhatsAppUrl } from "../data/properties";

type MediaItem =
  | { type: "image"; url: string }
  | { type: "video"; webm: string; mp4: string; poster: string };

function Carousel({ media, title }: { media: MediaItem[]; title: string }) {
  const [current, setCurrent] = useState(0);
  const [thumbsStart, setThumbsStart] = useState(0);
  const VISIBLE_THUMBS = 5;

  const prev = () => setCurrent(c => (c === 0 ? media.length - 1 : c - 1));
  const next = () => setCurrent(c => (c === media.length - 1 ? 0 : c + 1));

  useEffect(() => {
    if (current < thumbsStart) setThumbsStart(current);
    else if (current >= thumbsStart + VISIBLE_THUMBS) setThumbsStart(current - VISIBLE_THUMBS + 1);
  }, [current, thumbsStart]);

  return (
    <div className="w-full">
      <div className="relative overflow-hidden w-full bg-black" style={{ height: "clamp(280px, 55vw, 580px)" }}>
        {media[current].type === "video" ? (
          <video
            key={media[current].webm}
            controls
            autoPlay
            muted
            loop
            playsInline
            poster={media[current].poster}
            className="w-full h-full object-cover transition-all duration-500"
          >
            <source src={media[current].webm} type="video/webm" />
            <source src={media[current].mp4} type="video/mp4" />
          </video>
        ) : (
          <img
            src={media[current].url}
            alt={`${title} - archivo ${current + 1}`}
            className="w-full h-full object-cover transition-all duration-500"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />

        {media.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 border border-[#C9A84C]/50 flex items-center justify-center hover:bg-[#C9A84C]/20 transition-all duration-300 z-10"
            >
              <ChevronLeft className="text-[#C9A84C]" size={20} />
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 border border-[#C9A84C]/50 flex items-center justify-center hover:bg-[#C9A84C]/20 transition-all duration-300 z-10"
            >
              <ChevronRight className="text-[#C9A84C]" size={20} />
            </button>
          </>
        )}

        <div className="absolute bottom-4 right-4 bg-black/70 border border-[#C9A84C]/30 px-3 py-1 z-10">
          <p className="text-white/70" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.65rem" }}>
            {current + 1} / {media.length}
          </p>
        </div>
      </div>

      {media.length > 1 && (
        <div className="flex gap-2 mt-3 overflow-hidden">
          {media.slice(thumbsStart, thumbsStart + VISIBLE_THUMBS).map((item, i) => {
            const actualIndex = thumbsStart + i;
            return (
              <button
                key={actualIndex}
                onClick={() => setCurrent(actualIndex)}
                className={`relative overflow-hidden flex-1 transition-all duration-300 ${
                  actualIndex === current ? "ring-2 ring-[#C9A84C] opacity-100" : "opacity-40 hover:opacity-70"
                }`}
                style={{ height: "72px" }}
              >
                <img
                  src={item.type === "video" ? item.poster : item.url}
                  alt={`thumb ${actualIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                {item.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <Play size={20} className="text-[#C9A84C] fill-[#C9A84C]" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function PropertyDetail() {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const property = properties.find(p => p.code === code);

  const allMedia: MediaItem[] = property ? [
    ...(property.video ? [{ type: "video" as const, ...property.video, poster: property.images[0] }] : []),
    ...property.images.map(url => ({ type: "image" as const, url }))
  ] : [];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [code]);

  if (!property) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center gap-6">
        <p className="text-white/50" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.3rem" }}>
          Propiedad no encontrada.
        </p>
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-[#C9A84C] hover:underline"
          style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.7rem" }}
        >
          <ArrowLeft size={14} /> Volver al inicio
        </button>
      </div>
    );
  }

  const isRenta = property.listingType === "renta";
  const isUnavailable = property.status === "rentado" || property.status === "vendido";
  const statusLabel = property.status === "rentado" ? "Rentado" : property.status === "vendido" ? "Vendido" : null;

  return (
    <div className="min-h-screen bg-[#0a0a0a]" style={{ fontFamily: "Montserrat, sans-serif" }}>
      <header className="sticky top-0 z-50 bg-[#0a0a0a] border-b border-[#C9A84C]/15 shadow-[0_2px_20px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/60 hover:text-[#C9A84C] transition-colors duration-300"
            style={{ fontSize: "0.7rem", letterSpacing: "0.1em" }}
          >
            <ArrowLeft size={16} />
            Regresar
          </button>
          <button onClick={() => navigate("/")} className="flex items-center gap-2">
            <img src="/logo.png" alt="Prestige House" className="h-9 w-9 object-contain" />
            <div className="hidden sm:block">
              <p className="text-[#C9A84C] tracking-[0.25em] uppercase" style={{ fontFamily: "Playfair Display, serif", fontSize: "0.65rem" }}>Prestige</p>
              <p className="text-white tracking-[0.3em] uppercase" style={{ fontSize: "0.55rem", fontWeight: 300 }}>House</p>
            </div>
          </button>
          <button
            onClick={() => navigate("/#propiedades")}
            className="flex items-center gap-2 text-white/60 hover:text-[#C9A84C] transition-colors duration-300"
            style={{ fontSize: "0.7rem", letterSpacing: "0.1em" }}
          >
            <Home size={15} />
            <span className="hidden sm:inline">Catálogo</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10 lg:py-16">
        <div className="flex items-center gap-2 mb-8">
          <button onClick={() => navigate("/")} className="text-white/30 hover:text-[#C9A84C] transition-colors" style={{ fontSize: "0.62rem" }}>Inicio</button>
          <span className="text-white/20" style={{ fontSize: "0.6rem" }}>/</span>
          <button onClick={() => navigate("/")} className="text-white/30 hover:text-[#C9A84C] transition-colors" style={{ fontSize: "0.62rem" }}>
            {isRenta ? "Renta" : "Venta"}
          </button>
          <span className="text-white/20" style={{ fontSize: "0.6rem" }}>/</span>
          <span className="text-[#C9A84C]" style={{ fontSize: "0.62rem" }}>{property.title}</span>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 xl:gap-14">
          {/* Carousel */}
          <div className="lg:col-span-3 relative">
            <Carousel media={allMedia} title={property.title} />
            {/* Status overlay on carousel */}
            {isUnavailable && statusLabel && (
              <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none" style={{ top: 0, bottom: "82px" }}>
                <p
                  className="text-white border-2 border-white/60 px-8 py-3 tracking-[0.3em] uppercase bg-black/50"
                  style={{ fontFamily: "Montserrat, sans-serif", fontSize: "1.1rem", fontWeight: 700, transform: "rotate(-15deg)" }}
                >
                  {statusLabel}
                </p>
              </div>
            )}
          </div>

          {/* Info panel */}
          <div className="lg:col-span-2 flex flex-col">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span
                className={`px-3 py-1 tracking-widest uppercase ${isRenta ? "bg-blue-900/60 text-blue-300 border border-blue-700/40" : "bg-[#C9A84C]/15 text-[#C9A84C] border border-[#C9A84C]/30"}`}
                style={{ fontSize: "0.58rem" }}
              >
                {isRenta ? "En Renta" : "En Venta"}
              </span>
              <span className="px-3 py-1 bg-white/5 text-white/50 border border-white/10" style={{ fontSize: "0.58rem" }}>
                {property.type}
              </span>
              {property.tag && (
                <span className="px-3 py-1 bg-[#C9A84C] text-black" style={{ fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" }}>
                  {property.tag}
                </span>
              )}
              {isUnavailable && statusLabel && (
                <span className="px-3 py-1 bg-white/10 text-white/50 border border-white/20 tracking-widest uppercase" style={{ fontSize: "0.58rem", fontWeight: 600 }}>
                  {statusLabel}
                </span>
              )}
              <span className="px-3 py-1 bg-white/5 text-white/40 border border-white/10" style={{ fontSize: "0.58rem", letterSpacing: "0.1em" }}>
                Ref. {property.code}
              </span>
            </div>

            <h1
              className="text-white mb-2"
              style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 600, lineHeight: 1.2 }}
            >
              {property.title}
            </h1>

            <div className="flex items-start gap-2 mb-5">
              <MapPin size={13} className="text-[#C9A84C] mt-0.5 shrink-0" />
              <p className="text-white/40" style={{ fontSize: "0.7rem", lineHeight: 1.6 }}>
                {property.address}
              </p>
            </div>

            <div className="bg-[#111111] border border-[#C9A84C]/20 px-5 py-4 mb-6">
              <p className="text-white/40 mb-1" style={{ fontSize: "0.58rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                {isRenta ? "Precio de renta" : "Precio de venta"}
              </p>
              <p
                className={isUnavailable ? "text-white/25 line-through" : "text-[#C9A84C]"}
                style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 600 }}
              >
                {property.price}
              </p>
              {property.priceDetails && !isUnavailable && (
                <div className="flex gap-4 mt-2 pt-2 border-t border-white/8">
                  {property.priceDetails.reserva && (
                    <p className="text-white/30" style={{ fontSize: "0.58rem" }}>
                      Reserva: <span className="text-white/50">{property.priceDetails.reserva}</span>
                    </p>
                  )}
                  {property.priceDetails.enganche && (
                    <p className="text-white/30" style={{ fontSize: "0.58rem" }}>
                      Enganche: <span className="text-white/50">{property.priceDetails.enganche}</span>
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6">
              {property.beds > 0 && (
                <div className="bg-[#111111] border border-white/8 p-3 text-center">
                  <Bed size={16} className="text-[#C9A84C] mx-auto mb-1" />
                  <p className="text-white" style={{ fontFamily: "Playfair Display, serif", fontSize: "1.1rem" }}>{property.beds}</p>
                  <p className="text-white/40" style={{ fontSize: "0.55rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>Habitaciones</p>
                </div>
              )}
              <div className="bg-[#111111] border border-white/8 p-3 text-center">
                <Bath size={16} className="text-[#C9A84C] mx-auto mb-1" />
                <p className="text-white" style={{ fontFamily: "Playfair Display, serif", fontSize: "1.1rem" }}>{property.baths}</p>
                <p className="text-white/40" style={{ fontSize: "0.55rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>Baños</p>
              </div>
              <div className="bg-[#111111] border border-white/8 p-3 text-center">
                <Maximize2 size={16} className="text-[#C9A84C] mx-auto mb-1" />
                <p className="text-white" style={{ fontFamily: "Playfair Display, serif", fontSize: "1.1rem" }}>{property.area}</p>
                <p className="text-white/40" style={{ fontSize: "0.55rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>m²</p>
              </div>
            </div>

            <p className="text-white/55 mb-6 leading-relaxed" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.05rem", lineHeight: 1.8 }}>
              {property.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 mt-auto">
              {isUnavailable ? (
                <div className="w-full py-4 flex items-center justify-center bg-white/5 border border-white/10">
                  <p className="text-white/40 tracking-widest uppercase" style={{ fontSize: "0.7rem" }}>
                    {statusLabel}
                  </p>
                </div>
              ) : (
                <>
                  <a
                    href={buildWhatsAppUrl(property)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white transition-colors duration-300"
                    style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase" }}
                  >
                    <MessageCircle size={16} />
                    Consultar por WhatsApp
                  </a>
                  <a
                    href="tel:+50239144422"
                    className="w-full py-4 flex items-center justify-center gap-3 border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-black transition-all duration-300"
                    style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase" }}
                  >
                    <Phone size={15} />
                    Llamar al asesor
                  </a>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-14 border-t border-white/8 pt-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px w-10 bg-[#C9A84C]" />
            <p className="text-[#C9A84C] tracking-[0.3em] uppercase" style={{ fontSize: "0.65rem", fontWeight: 500 }}>
              Características
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {property.features.map((f) => (
              <div key={f} className="flex items-center gap-3 bg-[#111111] border border-white/8 px-4 py-3">
                <Check size={13} className="text-[#C9A84C] shrink-0" />
                <p className="text-white/70" style={{ fontSize: "0.72rem" }}>{f}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact strip */}
        <div className="mt-14 bg-[#111111] border border-[#C9A84C]/20 p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-[#C9A84C] mb-1 tracking-widest uppercase" style={{ fontSize: "0.6rem", fontWeight: 500 }}>
              {isUnavailable ? "¿Busca algo similar?" : "¿Le interesa esta propiedad?"}
            </p>
            <p className="text-white" style={{ fontFamily: "Playfair Display, serif", fontSize: "1.3rem" }}>
              {isUnavailable
                ? "Contáctenos, tenemos más opciones para usted."
                : "Nuestros asesores están listos para ayudarle."}
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <a
              href={buildWhatsAppUrl(property)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white transition-colors duration-300"
              style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}
            >
              <MessageCircle size={14} /> WhatsApp
            </a>
            <a
              href="tel:+50239144422"
              className="flex items-center gap-2 px-6 py-3 border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-black transition-all duration-300"
              style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}
            >
              <Phone size={14} /> Llamar
            </a>
          </div>
        </div>
      </main>

      <footer className="border-t border-[#C9A84C]/10 mt-16 py-8 text-center">
        <p className="text-white/20" style={{ fontSize: "0.6rem", letterSpacing: "0.12em" }}>
          © 2026 Prestige House — Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
}