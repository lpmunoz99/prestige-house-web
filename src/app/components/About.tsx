import { Shield, Star, Key, TrendingUp } from "lucide-react";

const aboutImage = "https://content.r9cdn.net/rimg/dimg/5b/19/50967fdb-city-43889-158b09eaf11.jpg?crop=true&width=1020&height=498";

const services = [
  {
    icon: Key,
    title: "Compra y Venta",
    desc: "Asesoría experta en la compra y venta de propiedades residenciales y comerciales.",
  },
  {
    icon: TrendingUp,
    title: "Inversión Inmobiliaria",
    desc: "Identificamos las mejores oportunidades de inversión para maximizar su rendimiento.",
  },
  {
    icon: Shield,
    title: "Gestión Legal",
    desc: "Acompañamiento completo en todos los procesos legales y notariales.",
  },
  {
    icon: Star,
    title: "Servicio Premium",
    desc: "Atención personalizada y exclusiva para cada uno de nuestros clientes.",
  },
];

export function About() {
  return (
    <>
      {/* About Section */}
      <section id="nosotros" className="bg-[#0a0a0a] py-24 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="relative overflow-hidden">
              <img
                src={aboutImage}
                alt="Propiedades de lujo"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent" />
            </div>
            {/* Gold accent border */}
            <div className="absolute -top-4 -left-4 w-32 h-32 border-t-2 border-l-2 border-[#C9A84C]" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border-b-2 border-r-2 border-[#C9A84C]" />
            {/* Badge */}
            <div className="absolute bottom-8 -right-6 bg-[#C9A84C] p-6 hidden lg:block">
              <p
                className="text-black"
                style={{ fontFamily: "Playfair Display, serif", fontSize: "2rem", fontWeight: 700, lineHeight: 1 }}
              >
                10+
              </p>
              <p
                className="text-black/80 mt-1"
                style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase" }}
              >
                Años de<br />Experiencia
              </p>
            </div>
          </div>

          {/* Text Side */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-10 bg-[#C9A84C]" />
              <p
                className="text-[#C9A84C] tracking-[0.3em] uppercase"
                style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.65rem", fontWeight: 500 }}
              >
                Quiénes Somos
              </p>
            </div>

            <h2
              className="text-white mb-6"
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: 600,
                lineHeight: 1.2,
              }}
            >
              La Excelencia en{" "}
              <span style={{ color: "#C9A84C" }}>Bienes Raíces</span>{" "}
              desde 2014
            </h2>

            <p
              className="text-white/60 mb-6"
              style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.1rem", lineHeight: 1.8 }}
            >
              En Prestige House nos dedicamos a conectar a nuestros clientes con
              las propiedades más exclusivas de Guatemala. Nuestra filosofía se basa
              en la confianza, la transparencia y el compromiso absoluto con cada
              familia e inversor que nos elige.
            </p>

            <p
              className="text-white/60"
              style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.1rem", lineHeight: 1.8 }}
            >
              Con un equipo de asesores altamente capacitados y una red de contactos
              en las zonas más privilegiadas de la ciudad, garantizamos una
              experiencia inmobiliaria de primer nivel.
            </p>

            <div className="mt-8 flex gap-8">
              <div>
                <p
                  className="text-[#C9A84C]"
                  style={{ fontFamily: "Playfair Display, serif", fontSize: "2rem", fontWeight: 600 }}
                >
                  500+
                </p>
                <p
                  className="text-white/50"
                  style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase" }}
                >
                  Propiedades Vendidas
                </p>
              </div>
              <div className="w-px bg-white/10" />
              <div>
                <p
                  className="text-[#C9A84C]"
                  style={{ fontFamily: "Playfair Display, serif", fontSize: "2rem", fontWeight: 600 }}
                >
                  150+
                </p>
                <p
                  className="text-white/50"
                  style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase" }}
                >
                  Clientes Activos
                </p>
              </div>
              <div className="w-px bg-white/10" />
              <div>
                <p
                  className="text-[#C9A84C]"
                  style={{ fontFamily: "Playfair Display, serif", fontSize: "2rem", fontWeight: 600 }}
                >
                  16
                </p>
                <p
                  className="text-white/50"
                  style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase" }}
                >
                  Zonas Cubiertas
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="bg-[#111111] py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-10 bg-[#C9A84C]" />
              <p
                className="text-[#C9A84C] tracking-[0.3em] uppercase"
                style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.65rem", fontWeight: 500 }}
              >
                Nuestros Servicios
              </p>
              <div className="h-px w-10 bg-[#C9A84C]" />
            </div>
            <h2
              className="text-white"
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                fontWeight: 600,
              }}
            >
              Todo lo que Necesita
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s) => (
              <div
                key={s.title}
                className="group p-8 border border-white/10 hover:border-[#C9A84C]/50 transition-all duration-500 hover:bg-[#C9A84C]/5"
              >
                <div className="w-12 h-12 rounded-full border border-[#C9A84C]/40 flex items-center justify-center mb-6 group-hover:bg-[#C9A84C]/10 transition-colors duration-300">
                  <s.icon className="text-[#C9A84C]" size={20} />
                </div>
                <h3
                  className="text-white mb-3"
                  style={{ fontFamily: "Playfair Display, serif", fontSize: "1.1rem" }}
                >
                  {s.title}
                </h3>
                <p
                  className="text-white/50"
                  style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1rem", lineHeight: 1.7 }}
                >
                  {s.desc}
                </p>
                <div className="mt-6 h-px w-0 bg-[#C9A84C] group-hover:w-full transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
