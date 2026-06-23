export function Footer() {
  return (
    <footer className="bg-[#222020] text-white pt-16 pb-8 px-6 md:px-12 lg:px-28 w-full" data-testid="footer">
      <div className="max-w-[1400px] mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center md:items-start mb-16 text-center md:text-left">
          {/* Logo */}
          <div className="flex justify-center md:justify-start">
            <a href="/" className="flex items-center gap-2 font-display font-bold text-xl md:text-2xl text-white tracking-wider">
              <span className="text-[#EF9B1B]">☀</span>
              <span>PORTO DO SOL</span>
            </a>
          </div>

          {/* Nav Links */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            {["Início", "Quartos", "Sobre", "Contato"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="font-body text-[0.875rem] text-white/70 hover:text-[#EF9B1B] transition-colors duration-200"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Legal / Social */}
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
