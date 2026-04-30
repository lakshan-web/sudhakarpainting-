import { motion, useMotionValue, useSpring, useTransform, Variants } from "framer-motion";
import lorryImg from "@/assets/lorry.png";

const FallingPaintBackground = () => {
  const drips = Array.from({ length: 25 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    width: Math.random() * 2 + 1 + "px",
    height: Math.random() * 30 + 15 + "vh",
    delay: Math.random() * 5,
    duration: Math.random() * 5 + 7,
    color: ["#F5C518", "#E65100", "#D32F2F"][Math.floor(Math.random() * 3)]
  }));

  return (
    <div className="absolute -inset-x-20 -inset-y-40 overflow-hidden pointer-events-none opacity-[0.15] -z-20">
      {drips.map((drip) => (
        <motion.div
          key={drip.id}
          className="absolute top-0 rounded-full"
          style={{
            left: drip.left,
            width: drip.width,
            height: drip.height,
            background: `linear-gradient(to bottom, transparent, ${drip.color}, transparent)`,
            boxShadow: `0 0 15px ${drip.color}`,
          }}
          initial={{ y: "-100%", opacity: 0 }}
          animate={{ y: "150vh", opacity: [0, 1, 1, 0] }}
          transition={{
            duration: drip.duration,
            repeat: Infinity,
            delay: drip.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};


export function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);
  const translateX = useTransform(smoothX, [-0.5, 0.5], [-30, 30]);
  const translateY = useTransform(smoothY, [-0.5, 0.5], [-20, 20]);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1, ease: [0.2, 0.8, 0.2, 1] } }
  };

  return (
    <section
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative min-h-screen w-full overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 50% 45%, rgba(255,120,30,0.22) 0%, rgba(11,11,11,0.85) 45%, #000 100%)",
      }}
    >
      <FallingPaintBackground />

      {/* Top nav */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-6 md:px-12 py-6"
      >
        <div className="font-display text-xl tracking-widest text-fire">SP • WORKSHOP</div>
        <div className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          <a href="#works" className="hover:text-primary transition">Works</a>
          <a href="#style" className="hover:text-primary transition">Style</a>
          <a href="#ratings" className="hover:text-primary transition">Reviews</a>
          <a href="#contact" className="hover:text-primary transition">Contact</a>
        </div>
      </motion.nav>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center pt-24 pb-12 pointer-events-none"
      >
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-[10px] uppercase tracking-[0.4em] text-primary mb-6 pointer-events-auto">
          <span className="h-1.5 w-1.5 rounded-full bg-primary glow-yellow" />
          Established Workshop · India
        </motion.div>

        {/* Lorry stage */}
        <motion.div
          variants={itemVariants}
          className="relative w-full max-w-2xl aspect-[3/2] [perspective:1200px]"
        >
          {/* Soft orange radial glow behind lorry */}
          <div className="absolute inset-0 -z-10 rounded-full blur-3xl opacity-70"
               style={{ background: "radial-gradient(circle, rgba(255,140,40,0.55) 0%, rgba(255,90,20,0.15) 45%, transparent 70%)" }} />

          {/* Lorry */}
          <motion.div
            style={{ rotateX, rotateY, x: translateX, y: translateY, transformStyle: "preserve-3d" }}
            className="relative w-full h-full will-change-transform pointer-events-auto"
          >
            <img
              src={lorryImg}
              alt="Sudhakar Painting custom hand-painted Indian lorry"
              className="absolute inset-0 w-full h-full object-contain float-slow drop-shadow-[0_30px_50px_rgba(0,0,0,0.7)]"
            />
            {/* Headlight pulse glows */}
            <div className="light-pulse absolute left-[18%] bottom-[28%] h-10 w-24 rounded-full bg-[#ffd27a] blur-2xl opacity-80 mix-blend-screen" />
            <div className="light-pulse absolute left-[26%] bottom-[24%] h-6 w-16 rounded-full bg-[#fff1c2] blur-xl opacity-90 mix-blend-screen" style={{ animationDelay: "0.4s" }} />
          </motion.div>

          {/* Ground shadow */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-2 h-6 w-3/5 rounded-[50%] bg-black/80 blur-2xl" />
        </motion.div>

        {/* Headline */}
        <motion.h1 variants={itemVariants} className="mt-4 font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] text-fire drop-shadow-[0_0_30px_rgba(255,140,40,0.45)]">
          SUDHAKAR
          <br />
          PAINTING
        </motion.h1>
        <motion.p variants={itemVariants} className="mt-3 text-sm md:text-lg font-display tracking-[0.3em] text-foreground/90">
          CRAFTING IDENTITY ON WHEELS
        </motion.p>
        <motion.div variants={itemVariants} className="mt-3 text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
          Scroll to explore ↓
        </motion.div>
      </motion.div>
    </section>
  );
}

