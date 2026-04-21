import { ChevronDown } from "lucide-react";

const heroImage = "https://images.unsplash.com/photo-1706855203772-c249b75fe016?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjBob3VzZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc3NjAxMDk1NXww&ixlib=rb-4.1.0&q=80&w=1080";

export function Hero() {
  const handleScroll = () => {
    const el = document.querySelector("#nosotros");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-24 pb-12 lg:pt-0 lg:pb-0"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Luxury property"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      </div>

      {/* Gold top border */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto mt-8 lg:mt-0">

        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-12 bg-[#C9A84C]" />
          <p
            className="text-[#C9A84C] tracking-[0.4em] uppercase"
            style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.75rem", fontWeight: 500 }}
          >
            Inmobiliaria de Prestigio
          </p>
          <div className="h-px w-12 bg-[#C9A84C]" />
        </div>

        {/* Main Heading */}
        <h1
          className="text-white mb-4"
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
            fontWeight: 600,
            lineHeight: 1.1,
            letterSpacing: "-0.01em",
          }}
        >
          Encuentra tu{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #C9A84C, #F0D080, #B8952A)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Hogar Ideal
          </span>
        </h1>

        <p
          className="text-white/70 max-w-xl mx-auto mb-10"
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
            fontWeight: 300,
            lineHeight: 1.7,
          }}
        >
          Propiedades exclusivas de lujo en Guatemala. Asesoría personalizada
          para hacer realidad la inversión inmobiliaria de sus sueños.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => {
              const el = document.querySelector("#propiedades");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-10 py-4 bg-[#C9A84C] text-black hover:bg-[#D4BF6A] transition-all duration-300 tracking-widest uppercase relative overflow-hidden group"
            style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.7rem", fontWeight: 600 }}
          >
            <span className="relative z-10">Ver Propiedades</span>
            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
          </button>

          <button
            onClick={() => {
              const el = document.querySelector("#contacto");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-10 py-4 border border-[#C9A84C]/60 text-[#C9A84C] hover:bg-[#C9A84C]/10 transition-all duration-300 tracking-widest uppercase"
            style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.7rem", fontWeight: 500 }}
          >
            Contáctenos
          </button>
        </div>

        {/* Stats */}
        <div className="mt-12 flex justify-center gap-12 sm:gap-20 max-w-lg mx-auto">
          {[
            { value: "3+", label: "Años de experiencia" },
            { value: "98%", label: "Clientes satisfechos" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p
                className="text-[#C9A84C]"
                style={{ fontFamily: "Playfair Display, serif", fontSize: "1.8rem", fontWeight: 600 }}
              >
                {stat.value}
              </p>
              <p
                className="text-white/50 mt-1"
                style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.6rem", letterSpacing: "0.1em" }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={handleScroll}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#C9A84C] animate-bounce"
      >
        <ChevronDown size={28} />
      </button>

      {/* Bottom gold line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A84C]/50 to-transparent" />
    </section>
  );
}