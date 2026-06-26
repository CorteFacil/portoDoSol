import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import contactImage from "@/assets/contact.png";

export function ContactSection() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Mensagem Enviada",
        description: "Entraremos em contato em breve para confirmar sua reserva.",
      });
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <section 
      id="contato"
      className="w-full bg-[#FFF8EF] py-[clamp(5rem,10vw,9rem)]"
      data-testid="section-contact"
    >
      <div className="max-w-[80vw] mx-auto px-6 md:px-10 lg:px-12">
        <div className="gsap-contact-container grid grid-cols-1 lg:grid-cols-2 rounded-[1.25rem] shadow-sm">
          
          <div className="gsap-contact-photo h-[300px] md:h-[400px] lg:h-auto w-full lg:rounded-l-[1.25rem] rounded-t-[1.25rem] lg:rounded-tr-none overflow-hidden relative">
            <img 
              src={contactImage} 
              alt="Piscina do hotel ao anoitecer" 
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          <div className="gsap-contact-form bg-white lg:rounded-r-[1.25rem] rounded-b-[1.25rem] lg:rounded-bl-none p-8 md:p-12 lg:p-16">
            <span className="font-body font-medium text-[0.75rem] uppercase tracking-[0.12em] text-[#EF9B1B] block mb-4">
              ENTRE EM CONTATO
            </span>
            <h2 className="font-display font-bold text-3xl md:text-[2rem] text-[#222020] mb-8">
              Fale Conosco
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6" data-testid="form-contact">
              <div>
                <input 
                  type="text" 
                  required
                  placeholder="Nome completo" 
                  className="w-full bg-transparent border-0 border-b-[1.5px] border-[#222020]/20 rounded-none px-0 py-3 font-body text-[#222020] placeholder:text-[#222020]/40 focus:ring-0 focus:border-[#EF9B1B] transition-colors duration-200 outline-none"
                  data-testid="input-name"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <input 
                    type="email" 
                    required
                    placeholder="E-mail" 
                    className="w-full bg-transparent border-0 border-b-[1.5px] border-[#222020]/20 rounded-none px-0 py-3 font-body text-[#222020] placeholder:text-[#222020]/40 focus:ring-0 focus:border-[#EF9B1B] transition-colors duration-200 outline-none"
                    data-testid="input-email"
                  />
                </div>
                <div>
                  <input 
                    type="tel" 
                    placeholder="Telefone" 
                    className="w-full bg-transparent border-0 border-b-[1.5px] border-[#222020]/20 rounded-none px-0 py-3 font-body text-[#222020] placeholder:text-[#222020]/40 focus:ring-0 focus:border-[#EF9B1B] transition-colors duration-200 outline-none"
                    data-testid="input-phone"
                  />
                </div>
              </div>

              <div>
                <textarea 
                  rows={4}
                  required
                  placeholder="Mensagem" 
                  className="w-full bg-transparent border-0 border-b-[1.5px] border-[#222020]/20 rounded-none px-0 py-3 font-body text-[#222020] placeholder:text-[#222020]/40 focus:ring-0 focus:border-[#EF9B1B] transition-colors duration-200 outline-none resize-none"
                  data-testid="input-message"
                />
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full mt-4 font-body font-medium text-[0.9rem] uppercase tracking-[0.1em] px-8 py-4 rounded-full bg-[#EF9B1B] text-white hover:bg-[#C47D0E] hover:-translate-y-[2px] shadow-[0_4px_20px_rgba(239,155,27,0.35)] transition-all duration-250 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:hover:translate-y-0"
                data-testid="button-submit-contact"
              >
                {loading ? "Enviando..." : "Enviar Mensagem"}
                {!loading && (
                  <span className="group-hover:translate-x-[3px] transition-transform duration-200 block -rotate-45">
                    →
                  </span>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
