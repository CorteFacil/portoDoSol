import heroImage from "@/assets/hero.png";

export function HeroSection() {
  const headline = "HOTEL PORTO DO SOL".split(" ");

  return (
    <section
      id="início"
      className="gsap-hero-section relative min-h-screen w-full bg-[#FFF8EF] flex flex-col justify-between overflow-hidden pt-[clamp(5rem,10vw,8rem)]"
      data-testid="section-hero"
    >
      <div className="max-w-[1400px] mx-auto w-full px-6 md:px-12 lg:px-28 z-10">

        {/* Eyebrow */}
        <span className="gsap-hero-eyebrow font-body font-medium text-[0.75rem] uppercase tracking-[0.12em] text-[#EF9B1B] mb-10 block">
          Guarapari, ES, Brasil
        </span>

        {/* 2×2 Grid — same column widths across both rows */}
        <div className="hidden md:grid grid-cols-[auto_1fr] gap-x-16">

          {/* Row 1, Col 1 — Title (left, large, 1 line) */}
          <div className="pb-10 border-b border-[#222020]/10 flex items-end">
            <h1
              className="font-display font-black text-[#EF9B1B] leading-none tracking-[-0.02em] uppercase whitespace-nowrap"
              style={{ fontSize: "clamp(2.5rem, 4.2vw, 4.8rem)" }}
            >
              {headline.map((word, i) => (
                <span key={i} className="gsap-hero-h1-word inline-block mr-[0.25em] last:mr-0">
                  {word}
                </span>
              ))}
            </h1>
          </div>

          {/* Row 1, Col 2 — Short description (right) */}
          <div className="pb-10 border-b border-[#222020]/10 flex items-end">
            <div className="gsap-hero-desc-1">
              <p className="font-body font-light text-[1.05rem] text-[#222020] leading-[1.7]">
                Desfrute de conforto com o som das ondas. Uma estrutura de lazer completa espera por você.
              </p>
            </div>
          </div>

          {/* Row 2, Col 1 — Long description (left) */}
          <div className="pt-10">
            <div className="gsap-hero-desc-2">
              <p className="font-body font-light text-[1.05rem] text-[#222020] leading-[1.7] max-w-lg">
                A poucos passos do mar de Guarapari, o Porto do Sol oferece conforto, elegância e a essência do litoral capixaba, onde cada amanhecer é uma experiência inesquecível.
              </p>
            </div>
          </div>

          {/* Row 2, Col 2 — Script subtitle (right, same column as description above) */}
          <div className="pt-10 flex items-start">
            <span
              className="gsap-hero-script font-script text-[#EF9B1B] tracking-[0.01em] leading-[1.3]"
              style={{ fontSize: "clamp(1.6rem, 2.8vw, 3rem)" }}
            >
              Um paraíso sob o azul do céu
            </span>
          </div>
        </div>

        {/* Mobile fallback — stacked */}
        <div className="flex flex-col gap-8 md:hidden">
          <h1
            className="font-display font-black text-[#EF9B1B] leading-none tracking-[-0.02em] uppercase"
            style={{ fontSize: "clamp(2.2rem, 8vw, 3.5rem)" }}
          >
            {headline.map((word, i) => (
              <span key={i} className="gsap-hero-h1-word inline-block mr-[0.2em] last:mr-0">{word}</span>
            ))}
          </h1>
          <p className="font-body font-light text-[1rem] text-[#222020] leading-[1.7]">
            Desfrute de conforto com o som das ondas. Uma estrutura de lazer completa espera por você.
          </p>
          <span className="gsap-hero-script font-script text-[#EF9B1B] text-[2rem] leading-[1.3]">
            Um paraíso sob o azul do céu
          </span>
          <p className="font-body font-light text-[0.95rem] text-[#222020] leading-[1.7]">
            A poucos passos do mar de Guarapari, o Porto do Sol oferece conforto, elegância e a essência do litoral capixaba, onde cada amanhecer é uma experiência inesquecível.
          </p>
        </div>

      </div>

      {/* Hero image with layered wave mask */}
      <div className="relative w-full h-[50vh] md:h-[55vh] mt-14 overflow-hidden">
        <div className="absolute top-0 left-0 w-full z-10 overflow-hidden leading-[0]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 160"
            preserveAspectRatio="none"
            className="relative block w-[calc(100%+1.3px)] h-[100px] md:h-[150px]"
          >
            <path d="M0,80 C120,120 240,40 360,70 C480,100 600,20 720,60 C840,100 960,30 1080,65 C1200,100 1320,40 1440,75 L1440,0 L0,0 Z" fill="#FFF8EF" opacity="0.5" />
            <path d="M0,60 C80,100 200,20 320,55 C440,90 560,10 680,50 C800,90 920,15 1040,55 C1160,95 1300,25 1440,60 L1440,0 L0,0 Z" fill="#FFF8EF" opacity="0.75" />
            <path d="M0,40 C90,80 210,10 330,45 C450,80 570,5 690,40 C810,75 930,10 1060,45 C1180,80 1310,20 1440,50 L1440,0 L0,0 Z" fill="#FFF8EF" />
          </svg>
        </div>
        <img
          src={heroImage}
          alt="Aerial view of Hotel Porto Do Sol"
          className="gsap-hero-image gsap-hero-image-parallax absolute inset-0 w-full h-[130%] object-cover origin-center"
          style={{ top: "-15%" }}
          loading="eager"
        />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#222020]/30 to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
