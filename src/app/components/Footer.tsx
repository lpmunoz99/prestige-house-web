import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";

const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Servicios", href: "#servicios" },
  { label: "Propiedades", href: "#propiedades" },
  { label: "Contacto", href: "#contacto" },
];

export function Footer() {
  const handleNav = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#050505] border-t border-[#C9A84C]/20">
      {/* Top gold line */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <img src="/logo.png" alt="Prestige House" className="h-28 w-28 object-contain" />
              <div>
                <p
                  className="text-[#C9A84C] tracking-[0.25em] uppercase"
                  style={{ fontFamily: "Playfair Display, serif", fontSize: "0.75rem" }}
                >
                  Prestige
                </p>
                <p
                  className="text-white tracking-[0.35em] uppercase"
                  style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.6rem", fontWeight: 300 }}
                >
                  House
                </p>
              </div>
            </div>
            <p
              className="text-white/40 mb-6"
              style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "0.95rem", lineHeight: 1.8 }}
            >
              La inmobiliaria de mayor prestigio en Guatemala, con más de 10 años
              conectando personas con propiedades exclusivas.
            </p>
            <div className="flex items-center gap-3">
              {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 rounded-full border border-[#C9A84C]/30 flex items-center justify-center hover:bg-[#C9A84C]/10 hover:border-[#C9A84C] transition-all duration-300"
                >
                  <Icon size={13} className="text-[#C9A84C]" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4
              className="text-[#C9A84C] mb-5 tracking-[0.2em] uppercase"
              style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.65rem", fontWeight: 600 }}
            >
              Navegación
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNav(link.href)}
                    className="text-white/40 hover:text-[#C9A84C] transition-colors duration-300 flex items-center gap-2 group"
                    style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.7rem" }}
                  >
                    <span className="h-px w-0 group-hover:w-4 bg-[#C9A84C] transition-all duration-300" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-[#C9A84C] mb-5 tracking-[0.2em] uppercase"
              style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.65rem", fontWeight: 600 }}
            >
              Contacto
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={13} className="text-[#C9A84C] mt-0.5 shrink-0" />
                <p
                  className="text-white/40"
                  style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.7rem", lineHeight: 1.6 }}
                >
                  +502 3914-4422
                </p>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={13} className="text-[#C9A84C] mt-0.5 shrink-0" />
                <p
                  className="text-white/40"
                  style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.7rem", lineHeight: 1.6 }}
                >
                  prestigehousegt@gmail.com
                </p>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={13} className="text-[#C9A84C] mt-0.5 shrink-0" />
                <p
                  className="text-white/40"
                  style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.7rem", lineHeight: 1.6 }}
                >
                  Blvd. Los Próceres 20-10<br />Zona 10, Guatemala City
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="text-white/20 text-center"
            style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.6rem", letterSpacing: "0.1em" }}
          >
            © 2026 Prestige House. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            {["Términos y Condiciones", "Política de Privacidad"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-white/20 hover:text-[#C9A84C] transition-colors duration-300"
                style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.6rem" }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
