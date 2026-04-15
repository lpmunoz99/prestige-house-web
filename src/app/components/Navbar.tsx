import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Servicios", href: "#servicios" },
  { label: "Propiedades", href: "#propiedades" },
  { label: "Contacto", href: "#contacto" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-[#0a0a0a] shadow-[0_2px_30px_rgba(0,0,0,0.6)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => handleNav("#inicio")}
            className="flex items-center gap-3 group"
          >
            <img src="/logo.png" alt="Prestige House" className="h-12 w-12 object-contain" />
            <div className="hidden sm:block">
              <p
                className="text-[#C9A84C] tracking-[0.25em] uppercase"
                style={{ fontFamily: "Playfair Display, serif", fontSize: "0.7rem" }}
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
          </button>

          {/* Desktop Links */}
          <ul className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleNav(link.href)}
                  className="text-white/80 hover:text-[#C9A84C] transition-colors duration-300 tracking-widest uppercase relative group"
                  style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.7rem", fontWeight: 500 }}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#C9A84C] transition-all duration-300 group-hover:w-full" />
                </button>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-2">
            <Phone className="text-[#C9A84C]" size={14} />
            <a
              href="tel:+50252026514"
              className="text-[#C9A84C] tracking-wider"
              style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.75rem" }}
            >
              +502 5202-6514
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-white p-2"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#0a0a0a] flex flex-col items-center justify-center transition-all duration-500 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleNav(link.href)}
                className="text-white hover:text-[#C9A84C] transition-colors duration-300 tracking-widest uppercase"
                style={{ fontFamily: "Playfair Display, serif", fontSize: "1.5rem" }}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex items-center gap-2">
          <Phone className="text-[#C9A84C]" size={16} />
          <a
            href="tel:+50252026514"
            className="text-[#C9A84C]"
            style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.85rem" }}
          >
            +502 5202-6514
          </a>
        </div>
      </div>
    </>
  );
}
