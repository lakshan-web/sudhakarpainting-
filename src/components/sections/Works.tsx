import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";

const works = [
  {
    title: "Full Body Paint",
    desc: "Complete cabin-to-cargo transformation with weather-grade enamel and signature motifs.",
    tag: "Signature",
    grad: "linear-gradient(135deg,#E63946,#1B3A8A)",
  },
  {
    title: "Custom Name Board",
    desc: "Hand-lettered name plates with traditional flourishes and gold-leaf accents.",
    tag: "Lettering",
    grad: "linear-gradient(135deg,#F5C518,#F2671F)",
  },
  {
    title: "Premium Finish",
    desc: "Mirror-polish clear-coat with metallic flake and chrome detailing for road royalty.",
    tag: "Showroom",
    grad: "linear-gradient(135deg,#0B0F19,#F5C518)",
  },
  {
    title: "Cabin Murals",
    desc: "Devotional artwork, peacocks, lions and family portraits hand-painted on the cab.",
    tag: "Mural",
    grad: "linear-gradient(135deg,#F2671F,#E63946)",
  },
  {
    title: "Reflector Trim",
    desc: "Glow tape, LED accents and reflector strips for night-highway visibility.",
    tag: "Night",
    grad: "linear-gradient(135deg,#1B3A8A,#F5C518)",
  },
];

export function Works() {
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    loop: false,
    dragFree: true,
  });

  return (
    <section id="works" className="relative py-32 px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex items-end justify-between mb-12 flex-wrap gap-6"
        >
          <div>
            <div className="text-xs uppercase tracking-[0.4em] text-primary mb-3">01 — Portfolio</div>
            <h2 className="font-display text-5xl md:text-7xl text-fire">Our Works</h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            Every lorry that leaves our workshop carries a story. Here are a few of the rides we've reimagined.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="-mx-6 px-6"
        >
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6 pb-8 pt-4" style={{ perspective: "1400px" }}>
              {works.map((w, i) => (
                <article
                  key={w.title}
                  className="tilt-card flex-[0_0_85%] sm:flex-[0_0_380px] h-[480px] rounded-2xl overflow-hidden glass relative group"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <div
                    className="absolute inset-0 opacity-90 group-hover:opacity-100 transition"
                    style={{ background: w.grad }}
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_55%)]" />
                  {/* Decorative pattern */}
                  <div
                    className="absolute inset-0 opacity-25 mix-blend-overlay"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(45deg,#F5C518 0 12px,transparent 12px 24px)",
                    }}
                  />
                  <div className="relative h-full flex flex-col justify-between p-7 text-foreground">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-[0.3em] glass px-3 py-1 rounded-full">
                        {w.tag}
                      </span>
                      <span className="font-display text-3xl text-foreground/40">0{i + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-display text-3xl md:text-4xl mb-3 leading-tight drop-shadow-lg">
                        {w.title.toUpperCase()}
                      </h3>
                      <p className="text-sm text-foreground/85 leading-relaxed">{w.desc}</p>
                      <div className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-primary">
                        View detail <span aria-hidden>→</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
