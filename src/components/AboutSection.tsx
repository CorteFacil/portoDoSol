import timeline2018 from "@/assets/timeline-2018.png";
import timeline2022 from "@/assets/timeline-2022.png";
import timeline2026 from "@/assets/timeline-2026.png";

const timelineData = [
  {
    year: "2018",
    desc: "Consolidamos nossa história como o clássico ícone familiar sobre as pedras de Guarapari.",
    image: timeline2018,
    alt: "Hotel Porto Do Sol em 2018",
  },
  {
    year: "2022",
    desc: "Mantivemos nosso charme litorâneo único enquanto planejávamos o início da nossa maior modernização.",
    image: timeline2022,
    alt: "Hotel Porto Do Sol em 2022",
  },
  {
    year: "2026",
    desc: "Inauguramos uma nova era com a reabertura completa da nossa estrutura totalmente modernizada.",
    image: timeline2026,
    alt: "Hotel Porto Do Sol em 2026",
  },
];

export function AboutSection() {
  return (
    <section
      id="sobre"
      className="w-full bg-[#FFF8EF] py-[clamp(3rem,5vw,5rem)]"
      data-testid="section-about"
    >
      <div className="max-w-[80vw] mx-auto px-6 md:px-10 lg:px-12">

        {/* Section heading */}
        <div className="gsap-section-heading mb-12 md:mb-16">
          <span className="font-body font-medium text-[0.75rem] uppercase tracking-[0.12em] text-[#EF9B1B] block mb-4">
            SOBRE NÓS
          </span>
          <h2 className="font-display font-bold text-[clamp(1.5rem,3vw,2.5rem)] text-[#222020]">
            Nossa História
          </h2>
        </div>

        {/*
          Flat 3×2 grid with explicit placement.
          Pattern: text/image/text on row 1, image/text/image on row 2.
          grid-rows use equal fr so both rows share the same height.
        */}
        <div
          className="gsap-timeline-container hidden md:grid grid-cols-3 gap-6"
          style={{ gridTemplateRows: "1fr 1fr" }}
        >
          {/* ── Col 1 ── */}
          {/* Row 1 — text */}
          <div
            className="gsap-timeline-cell bg-[#FFF3E3] rounded-[1.25rem] p-8 flex flex-col justify-center items-start gap-4"
            style={{ gridColumn: 1, gridRow: 1 }}
          >
            <h3
              className="gsap-year-number font-display font-black text-[#EF9B1B] leading-none whitespace-nowrap"
              style={{ fontSize: "5.5rem", fontVariantNumeric: "lining-nums tabular-nums", fontFeatureSettings: '"lnum" 1, "tnum" 1' }}
              data-year={timelineData[0].year}
            >
              {timelineData[0].year}
            </h3>
            <p className="font-body text-[#222020] text-base leading-[1.7]">
              {timelineData[0].desc}
            </p>
          </div>
          {/* Row 2 — image */}
          <div
            className="gsap-timeline-cell rounded-[1.25rem] overflow-hidden"
            style={{ gridColumn: 1, gridRow: 2 }}
          >
            <img
              src={timelineData[0].image}
              alt={timelineData[0].alt}
              className="w-full h-full object-cover hover:scale-[1.04] transition-transform duration-500"
              loading="lazy"
            />
          </div>

          {/* ── Col 2 ── */}
          {/* Row 1 — image */}
          <div
            className="gsap-timeline-cell rounded-[1.25rem] overflow-hidden"
            style={{ gridColumn: 2, gridRow: 1 }}
          >
            <img
              src={timelineData[1].image}
              alt={timelineData[1].alt}
              className="w-full h-full object-cover hover:scale-[1.04] transition-transform duration-500"
              loading="lazy"
            />
          </div>
          {/* Row 2 — text */}
          <div
            className="gsap-timeline-cell bg-[#FFF3E3] rounded-[1.25rem] p-8 flex flex-col justify-center items-start gap-4"
            style={{ gridColumn: 2, gridRow: 2 }}
          >
            <h3
              className="gsap-year-number font-display font-black text-[#EF9B1B] leading-none whitespace-nowrap"
              style={{ fontSize: "5.5rem", fontVariantNumeric: "lining-nums tabular-nums", fontFeatureSettings: '"lnum" 1, "tnum" 1' }}
              data-year={timelineData[1].year}
            >
              {timelineData[1].year}
            </h3>
            <p className="font-body text-[#222020] text-base leading-[1.7]">
              {timelineData[1].desc}
            </p>
          </div>

          {/* ── Col 3 ── */}
          {/* Row 1 — text */}
          <div
            className="gsap-timeline-cell bg-[#FFF3E3] rounded-[1.25rem] p-8 flex flex-col justify-center items-start gap-4"
            style={{ gridColumn: 3, gridRow: 1 }}
          >
            <h3
              className="gsap-year-number font-display font-black text-[#EF9B1B] leading-none whitespace-nowrap"
              style={{ fontSize: "5.5rem", fontVariantNumeric: "lining-nums tabular-nums", fontFeatureSettings: '"lnum" 1, "tnum" 1' }}
              data-year={timelineData[2].year}
            >
              {timelineData[2].year}
            </h3>
            <p className="font-body text-[#222020] text-base leading-[1.7]">
              {timelineData[2].desc}
            </p>
          </div>
          {/* Row 2 — image */}
          <div
            className="gsap-timeline-cell rounded-[1.25rem] overflow-hidden"
            style={{ gridColumn: 3, gridRow: 2 }}
          >
            <img
              src={timelineData[2].image}
              alt={timelineData[2].alt}
              className="w-full h-full object-cover hover:scale-[1.04] transition-transform duration-500"
              loading="lazy"
            />
          </div>
        </div>

        {/* Mobile — stacked, chronological */}
        <div className="flex flex-col gap-6 md:hidden">
          {timelineData.map((item) => (
            <div key={item.year} className="flex flex-col gap-4">
              <div className="bg-[#FFF3E3] rounded-[1.25rem] p-6">
                <h3 className="font-display font-black text-[3rem] text-[#EF9B1B] leading-none mb-3">
                  {item.year}
                </h3>
                <p className="font-body text-[#222020] text-base leading-[1.7]">{item.desc}</p>
              </div>
              <div className="aspect-square rounded-[1.25rem] overflow-hidden">
                <img src={item.image} alt={item.alt} className="w-full h-full object-cover" loading="lazy" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
