import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import gsap from "gsap";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [, setLocation] = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animar menu com GSAP
  useEffect(() => {
    if (menuRef.current) {
      if (menuOpen) {
        gsap.fromTo(
          menuRef.current,
          {
            opacity: 0,
            scale: 0.8,
            y: -10,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "back.out",
          }
        );
      }
    }
  }, [menuOpen]);

  const handleReserve = () => {
    setLocation("/reserva");
    setMenuOpen(false);
  };

  const handleFuncionarioArea = () => {
    setLocation("/admin");
    setMenuOpen(false);
  };

  return (
    <nav
      className={`gsap-nav fixed top-0 w-full z-[100] h-[72px] transition-all duration-400 ease-in-out ${
        scrolled ? "bg-[#FFF8EF] border-b border-black/10 shadow-sm" : "bg-transparent"
      }`}
      data-testid="navbar"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-28 h-full flex items-center justify-between">
        {/* Logo */}
        <div className="flex-none">
          <a
            href="/"
            className="flex items-center gap-2 font-display font-bold text-xl md:text-2xl text-[#222020] tracking-wider hover:text-[#EF9B1B] transition-colors duration-300"
            data-testid="link-logo"
          >
            <span className="inline-block hover:scale-110 transition-transform duration-300">☀</span>
            <span>PORTO DO SOL</span>
          </a>
        </div>

        {/* Links - Desktop */}
        <div className="hidden md:flex items-center gap-10">
          {["Início", "Quartos", "Sobre", "Contato"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="relative font-body font-medium text-[0.85rem] uppercase tracking-[0.08em] text-[#222020] hover:text-[#EF9B1B] transition-colors duration-250 group"
              data-testid={`link-nav-${item.toLowerCase()}`}
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#EF9B1B] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
            </a>
          ))}
        </div>

        {/* CTA & Menu */}
        <div className="flex-none flex items-center gap-3 relative">
          {/* Reserve Button */}
          <button
            onClick={handleReserve}
            className={`font-body font-medium text-[0.9rem] uppercase tracking-[0.1em] px-6 py-3 rounded-full transition-all duration-300 ease-out flex items-center gap-2 group ${
              scrolled
                ? "bg-[#EF9B1B] text-white border-none hover:bg-[#C47D0E] hover:-translate-y-1 hover:shadow-lg"
                : "bg-transparent text-[#EF9B1B] border-[1.5px] border-[#EF9B1B] hover:bg-[#EF9B1B] hover:text-white hover:-translate-y-1 hover:shadow-lg"
            }`}
            data-testid="button-reserve-nav"
          >
            Reserve Já
            <span className="inline-block group-hover:translate-x-1 transition-transform duration-300 -rotate-45">
              →
            </span>
          </button>

          {/* Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`p-2 rounded-lg transition-all duration-300 relative ${
              scrolled
                ? "text-[#222020] hover:bg-black/5 hover:text-[#EF9B1B]"
                : "text-[#EF9B1B] hover:bg-white/10"
            }`}
            data-testid="button-menu-mobile"
          >
            {menuOpen ? (
              <X size={24} className="transition-transform duration-300 rotate-90" />
            ) : (
              <Menu size={24} className="transition-transform duration-300" />
            )}
          </button>

          {/* Menu Balloon */}
          {menuOpen && (
            <div
              ref={menuRef}
              className="absolute top-full right-0 mt-3 bg-[#FFF8EF] rounded-2xl shadow-xl z-50 border border-[#EF9B1B]/20 p-2 min-w-[200px]"
              data-testid="mobile-menu"
            >
              {/* Seta do balão */}
              <div className="absolute -top-2 right-4 w-4 h-4 bg-[#FFF8EF] border-t border-r border-[#EF9B1B]/20 transform rotate-45" />

              {/* Botão Área do Funcionário */}
              <button
                onClick={handleFuncionarioArea}
                className="w-full text-left font-body font-medium text-[0.85rem] uppercase tracking-[0.08em] px-4 py-3 rounded-lg text-[#222020] hover:text-[#EF9B1B] hover:bg-white/40 transition-all duration-250 group relative flex items-center gap-3"
                data-testid="button-funcionario-area"
              >
                <span className="text-lg group-hover:scale-110 transition-transform duration-300">👤</span>
                <span className="group-hover:translate-x-1 transition-transform duration-250">
                  Área do Funcionário
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
