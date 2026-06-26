import { useLocation } from "wouter";
import logoFooter from '@/assets/logoFooter.svg';

export function Footer() {
  const [currentPath, setLocation] = useLocation();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: string) => {
    e.preventDefault();
    const targetId = item.toLowerCase();

    const scrollToSection = () => {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else if (targetId === 'início' || targetId === 'inicio') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    if (currentPath !== '/') {
      setLocation('/');
      setTimeout(scrollToSection, 150);
    } else {
      scrollToSection();
    }
  };

  return (
    <footer className="bg-[#222020] text-white pt-16 pb-8 px-6 md:px-10 lg:px-12 w-full" data-testid="footer">
      <div className="max-w-[80vw] mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center mb-16 text-center md:text-left">
          
          <div className="flex justify-center md:justify-start">
            <a 
              href="/" 
              onClick={(e) => { e.preventDefault(); setLocation('/'); window.scrollTo(0,0); }}
              className="flex items-center hover:opacity-80 transition-opacity duration-300 cursor-pointer"
            >
              <img src={logoFooter} alt="Logo Porto do Sol" className="h-24 md:h-32 w-auto object-contain" />
            </a>
          </div>

          {/* Nav Links corrigidos com onClick inteligente */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            {["Início", "Quartos", "Sobre", "Contato"].map((item) => (
              <a
                key={item}
                href={`/#${item.toLowerCase()}`}
                onClick={(e) => handleNavClick(e, item)}
                className="font-body text-[0.875rem] text-white/70 hover:text-[#EF9B1B] transition-colors duration-200 cursor-pointer"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center md:justify-end gap-6 font-body text-[0.8rem] text-white/50">
            <a href="#" className="hover:text-white transition-colors">Termos</a>
            <span className="hidden md:inline">•</span>
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            <span className="hidden md:inline">•</span>
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center">
          <p className="font-body font-light text-[0.8rem] text-white/40">
            © 2026 Hotel Porto Do Sol. Todos os direitos reservados.
          </p>
        </div>

      </div>
    </footer>
  );
}