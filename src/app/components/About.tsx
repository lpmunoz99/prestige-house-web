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
      <section id="nosotros" className="bg-[#0a0a0a] py-16 lg:py-24 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Image Side */}
          <div className="relative order-2 lg:order-1">
            <div className="relative overflow-hidden">
              <img
                src={aboutImage}
                alt="Propiedades de lujo"
                className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent" />
            </div>
            
            <div className="absolute -top-3 -left-3 w-16 h-16 sm:w-32 sm:h-32 border-t-2 border-l-2 border-[#C9A84C]" />
            <div className="absolute -bottom-3 -right-3 w-16 h-16 sm:w-32 sm:h-32 border-b-2 border-r-2 border-[#C9A84C]" />
            
            <div className="absolute bottom-8 -right-6 bg-[#C9A84C] p-6 hidden lg:block shadow-xl">
              <p className="text-black font-bold text-3xl" style={{ fontFamily: "Playfair Display, serif", lineHeight: 1 }}>
                10+
              </p>
              <p className="text-black/80 mt-1 uppercase text-[0.6rem] tracking-[0.15em]" style={{ fontFamily: "Montserrat, sans-serif" }}>
                Años de<br />Experiencia
              </p>
            </div>
          </div>

          {/* Text Side */}
          <div className="order-1 lg:order-2">
            <div className="flex items-center gap-4 mb-4 sm:mb-6">
              <div className="h-px w-10 bg-[#C9A84C]" />
              <p className="text-[#C9A84C] tracking-[0.3em] uppercase text-[0.65rem] font-medium" style={{ fontFamily: "Montserrat, sans-serif" }}>
                Quiénes Somos
              </p>
            </div>

            <h2 className="text-white mb-6" style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 600, lineHeight: 1.2 }}>
              La Excelencia en <span style={{ color: "#C9A84C" }}>Bienes Raíces</span> desde 2014
            </h2>

            <p className="text-white/60 mb-6" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.1rem", lineHeight: 1.8 }}>
              En Prestige House nos dedicamos a conectar a nuestros clientes con
              las propiedades más exclusivas de Guatemala.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-6 lg:gap-8">
              <div>
                <p className="text-[#C9A84C] text-3xl sm:text-4xl font-semibold" style={{ fontFamily: "Playfair Display, serif" }}>
                  500+
                </p>
                <p className="text-white/50 uppercase text-[0.55rem] sm:text-[0.65rem] tracking-[0.1em]" style={{ fontFamily: "Montserrat, sans-serif" }}>
                  Propiedades Vendidas
                </p>
              </div>
              <div>
                <p className="text-[#C9A84C] text-3xl sm:text-4xl font-semibold" style={{ fontFamily: "Playfair Display, serif" }}>
                  150+
                </p>
                <p className="text-white/50 uppercase text-[0.55rem] sm:text-[0.65rem] tracking-[0.1em]" style={{ fontFamily: "Montserrat, sans-serif" }}>
                  Clientes Activos
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="servicios" className="bg-[#111111] py-16 lg:py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-white text-3xl sm:text-4xl font-semibold" style={{ fontFamily: "Playfair Display, serif" }}>
              Todo lo que Necesita
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s) => (
              <div key={s.title} className="group p-6 sm:p-8 border border-white/10 hover:border-[#C9A84C]/50 transition-all duration-500 hover:bg-[#C9A84C]/5">
                <div className="w-12 h-12 rounded-full border border-[#C9A84C]/40 flex items-center justify-center mb-6">
                  <s.icon className="text-[#C9A84C]" size={20} />
                </div>
                <h3 className="text-white mb-3 text-lg" style={{ fontFamily: "Playfair Display, serif" }}>
                  {s.title}
                </h3>
                <p className="text-white/50 text-sm" style={{ fontFamily: "Cormorant Garamond, serif", lineHeight: 1.7 }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}