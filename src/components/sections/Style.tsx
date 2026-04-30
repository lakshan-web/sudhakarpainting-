import { motion, Variants } from "framer-motion";

const badges = [
  { label: "Bold Colors", color: "var(--red)", anim: "float-slow", delay: "0s" },
  { label: "Clean Lettering", color: "var(--yellow)", anim: "float-mid", delay: "0.4s" },
  { label: "Traditional Art", color: "var(--orange)", anim: "float-fast", delay: "0.2s" },
  { label: "Modern Design", color: "var(--yellow)", anim: "float-slow", delay: "0.6s" },
  { label: "Hand Painted", color: "var(--red)", anim: "float-mid", delay: "0.1s" },
  { label: "Highway Ready", color: "var(--orange)", anim: "float-fast", delay: "0.5s" },
];

export function Style() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const badgeVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 12 } }
  };

  return (
    <section id="style" className="relative py-32 px-6 md:px-12 overflow-hidden">
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 20% 30%, oklch(0.74 0.20 50 / 30%), transparent 40%), radial-gradient(circle at 80% 70%, oklch(0.62 0.24 27 / 25%), transparent 45%)",
        }}
      />
      <div className="relative max-w-6xl mx-auto text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-xs uppercase tracking-[0.4em] text-primary mb-3">02 — Style Identity</div>
          <h2 className="font-display text-5xl md:text-7xl text-fire mb-4">
            Built On A Bold Identity
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground mb-16">
            Four pillars define every vehicle we touch. Old-school craftsmanship meets sharp, modern execution.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-wrap justify-center gap-5 md:gap-8" 
          style={{ perspective: "1000px" }}
        >
          {badges.map((b) => (
            <motion.div
              variants={badgeVariants}
              key={b.label}
              className={`${b.anim} relative`}
              style={{ animationDelay: b.delay }}
            >
              <div
                className="glass rounded-full px-7 py-4 font-display text-lg md:text-xl tracking-widest uppercase relative"
                style={{
                  boxShadow: `0 0 30px ${b.color}, 0 20px 50px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15)`,
                  border: `1px solid color-mix(in oklab, ${b.color} 50%, transparent)`,
                  color: b.color,
                }}
              >
                <span className="absolute -top-1 -left-1 h-2 w-2 rounded-full" style={{ background: b.color, boxShadow: `0 0 10px ${b.color}` }} />
                {b.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
