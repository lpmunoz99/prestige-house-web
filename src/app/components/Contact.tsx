import { useState } from "react";
import { Phone, Mail, MapPin, Send, CheckCircle } from "lucide-react";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <section id="contacto" className="bg-[#111111] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-10 bg-[#C9A84C]" />
            <p
              className="text-[#C9A84C] tracking-[0.3em] uppercase"
              style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.65rem", fontWeight: 500 }}
            >
              Contáctenos
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
            Hablemos de su Propiedad
          </h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <p
                className="text-white/60 mb-8"
                style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.1rem", lineHeight: 1.8 }}
              >
                Estamos listos para asesorarle en cada paso del proceso.
                Nuestro equipo de expertos está disponible para atender
                todas sus consultas.
              </p>
            </div>

            {[
              {
                icon: Phone,
                label: "Teléfono",
                value: "+502 3914-4422",
                sub: "Lun - Vie, 9am - 6pm",
              },
              {
                icon: Mail,
                label: "Correo Electrónico",
                value: "prestigehousegt@gmail.com",
                sub: "Respondemos en 24 horas",
              },
              {
                icon: MapPin,
                label: "Oficina",
                value: "Zona 10, Guatemala City",
                sub: "Blvd. Los Próceres 20-10",
              },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full border border-[#C9A84C]/40 flex items-center justify-center shrink-0 group-hover:bg-[#C9A84C]/10 transition-colors duration-300">
                  <item.icon className="text-[#C9A84C]" size={16} />
                </div>
                <div>
                  <p
                    className="text-white/40 mb-0.5"
                    style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase" }}
                  >
                    {item.label}
                  </p>
                  <p
                    className="text-white"
                    style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.05rem" }}
                  >
                    {item.value}
                  </p>
                  <p
                    className="text-white/40"
                    style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.6rem" }}
                  >
                    {item.sub}
                  </p>
                </div>
              </div>
            ))}

            {/* Decorative line */}
            <div className="pt-4">
              <div className="h-px bg-gradient-to-r from-[#C9A84C] to-transparent" />
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 border border-[#C9A84C]/20 bg-[#C9A84C]/5">
                <CheckCircle className="text-[#C9A84C] mb-4" size={48} />
                <h3
                  className="text-white mb-2"
                  style={{ fontFamily: "Playfair Display, serif", fontSize: "1.5rem" }}
                >
                  ¡Mensaje Enviado!
                </h3>
                <p
                  className="text-white/50"
                  style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.05rem" }}
                >
                  Un asesor se pondrá en contacto con usted a la brevedad posible.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", message: "" }); }}
                  className="mt-6 px-6 py-2 border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-black transition-all duration-300"
                  style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase" }}
                >
                  Nuevo Mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      className="block text-white/50 mb-2"
                      style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase" }}
                    >
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-[#0a0a0a] border border-white/10 focus:border-[#C9A84C] text-white px-4 py-3 outline-none transition-colors duration-300 placeholder:text-white/20"
                      style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1rem" }}
                      placeholder="Su nombre"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-white/50 mb-2"
                      style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase" }}
                    >
                      Correo Electrónico *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-[#0a0a0a] border border-white/10 focus:border-[#C9A84C] text-white px-4 py-3 outline-none transition-colors duration-300 placeholder:text-white/20"
                      style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1rem" }}
                      placeholder="su@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="block text-white/50 mb-2"
                    style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase" }}
                  >
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-[#0a0a0a] border border-white/10 focus:border-[#C9A84C] text-white px-4 py-3 outline-none transition-colors duration-300 placeholder:text-white/20"
                    style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1rem" }}
                    placeholder="+502 0000-0000"
                  />
                </div>

                <div>
                  <label
                    className="block text-white/50 mb-2"
                    style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase" }}
                  >
                    Mensaje *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-[#0a0a0a] border border-white/10 focus:border-[#C9A84C] text-white px-4 py-3 outline-none transition-colors duration-300 placeholder:text-white/20 resize-none"
                    style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1rem" }}
                    placeholder="Cuéntenos sobre la propiedad que busca..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-[#C9A84C] text-black hover:bg-[#D4BF6A] transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-60"
                  style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase" }}
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send size={14} />
                      Enviar Mensaje
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
