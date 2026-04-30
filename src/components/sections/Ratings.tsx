import { motion, Variants } from "framer-motion";
import { useState, useEffect } from "react";

type Review = {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  phone?: string;
  timestamp?: number;
};

const defaultReviews: Review[] = [
  {
    id: "def-1",
    name: "Ramesh K.",
    role: "Fleet Owner, Tamil Nadu",
    text: "Sudhakar Anna repainted three of my lorries. The work is clean, the colours stay sharp even after monsoon. Highway respect guaranteed.",
    rating: 5,
  },
  {
    id: "def-2",
    name: "Suresh M.",
    role: "Owner-Driver",
    text: "Best name board work in the region. Lettering is so crisp people stop on the road to take photos. Fully worth it.",
    rating: 5,
  },
  {
    id: "def-3",
    name: "Vinod P.",
    role: "Transport Co.",
    text: "Premium finish lasted years without fading. Professional team, fair pricing and delivery on time.",
    rating: 5,
  },
];

function Star({ delay = 0 }: { delay?: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, type: "spring", stiffness: 200 }}
      className="pulse-glow inline-block text-primary"
      style={{ animationDelay: `${delay}s`, fontSize: "clamp(2.5rem, 6vw, 4.5rem)", color: "var(--yellow)", textShadow: "0 0 30px var(--yellow)" }}
    >
      ★
    </motion.span>
  );
}

export function Ratings() {
  const [reviewsList, setReviewsList] = useState<Review[]>(defaultReviews);
  const [showAll, setShowAll] = useState(false);
  
  const [formName, setFormName] = useState("");
  const [formLorry, setFormLorry] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formRating, setFormRating] = useState(5);
  const [formMessage, setFormMessage] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("sp-reviews");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setReviewsList([...parsed, ...defaultReviews]);
      } catch (e) {}
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formLorry || !formMessage || !formPhone) return;

    const newReview: Review = {
      id: Date.now().toString(),
      name: formName,
      role: formLorry,
      phone: formPhone,
      text: formMessage,
      rating: formRating,
      timestamp: Date.now(),
    };

    const customReviews = reviewsList.filter(r => !r.id.startsWith("def-"));
    const updated = [newReview, ...customReviews];
    localStorage.setItem("sp-reviews", JSON.stringify(updated));
    setReviewsList([newReview, ...reviewsList]);

    setFormName("");
    setFormLorry("");
    setFormPhone("");
    setFormRating(5);
    setFormMessage("");
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40, rotateX: 10 },
    visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const avgRating = (reviewsList.reduce((acc, r) => acc + r.rating, 0) / reviewsList.length).toFixed(1);
  const totalBase = 240 + reviewsList.length - 3;
  const displayedReviews = showAll ? reviewsList : reviewsList.slice(0, 4);

  return (
    <section id="ratings" className="relative py-32 px-6 md:px-12">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-14"
        >
          <div className="text-xs uppercase tracking-[0.4em] text-primary mb-3">03 — Reviews</div>
          <h2 className="font-display text-5xl md:text-7xl text-fire mb-8">Loved On The Highway</h2>

          <div className="flex justify-center gap-2 md:gap-4 mb-4">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} delay={i * 0.15} />
            ))}
          </div>
          <div className="font-display text-4xl md:text-6xl text-foreground">
            {avgRating} <span className="text-muted-foreground text-2xl md:text-4xl">/ 5</span>
          </div>
          <div className="text-sm uppercase tracking-[0.3em] text-muted-foreground mt-2">
            Based on {totalBase}+ verified jobs
          </div>
        </motion.div>

        {/* Feedback Form */}
        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit} 
          className="glass rounded-2xl p-7 max-w-3xl mx-auto mb-20 text-left relative z-10"
        >
          <h3 className="font-display text-2xl text-fire mb-6 text-center tracking-wider">Leave Your Feedback</h3>
          <div className="grid sm:grid-cols-2 gap-5 mb-5">
            <input value={formName} onChange={e => setFormName(e.target.value)} required placeholder="Owner Name" className="w-full bg-black/20 border border-border rounded-xl p-4 text-foreground focus:border-primary transition outline-none" />
            <input value={formLorry} onChange={e => setFormLorry(e.target.value)} required placeholder="Lorry Name" className="w-full bg-black/20 border border-border rounded-xl p-4 text-foreground focus:border-primary transition outline-none" />
          </div>
          <div className="grid sm:grid-cols-2 gap-5 mb-5">
            <input type="number" value={formPhone} onChange={e => setFormPhone(e.target.value)} required placeholder="Phone Number (Private)" className="w-full bg-black/20 border border-border rounded-xl p-4 text-foreground focus:border-primary transition outline-none" />
            <div className="flex items-center justify-between gap-3 bg-black/20 border border-border rounded-xl p-4">
              <span className="text-sm text-muted-foreground uppercase tracking-wider">Rating:</span>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button type="button" key={star} onClick={() => setFormRating(star)} className="text-2xl transition" style={{ color: star <= formRating ? "var(--yellow)" : "rgba(255,255,255,0.15)", textShadow: star <= formRating ? "0 0 12px var(--yellow)" : "none" }}>★</button>
                ))}
              </div>
            </div>
          </div>
          <textarea value={formMessage} onChange={e => setFormMessage(e.target.value)} required placeholder="Your feedback message..." rows={3} className="w-full bg-black/20 border border-border rounded-xl p-4 text-foreground focus:border-primary transition outline-none mb-6 resize-none" />
          
          <button type="submit" className="w-full lift-btn inline-flex items-center justify-center py-4 rounded-xl font-display tracking-[0.2em] uppercase text-lg" style={{ background: "var(--gradient-fire)", color: "#0B0F19" }}>
            Submit Feedback
          </button>
        </motion.form>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-3 gap-6 text-left"
        >
          {displayedReviews.map((r) => (
            <motion.div
              variants={cardVariants}
              key={r.id}
              className="glass rounded-2xl p-7 tilt-card"
              style={{ perspective: "1000px" }}
            >
              <div className="flex gap-0.5 mb-4 text-primary text-lg" style={{ color: "var(--yellow)", textShadow: "0 0 12px var(--yellow)" }}>
                {Array.from({ length: r.rating }).map((_, i) => <span key={`star-full-${i}`}>★</span>)}
                {Array.from({ length: 5 - r.rating }).map((_, i) => <span key={`star-empty-${i}`} className="opacity-20">★</span>)}
              </div>
              <p className="text-foreground/85 leading-relaxed mb-6 text-[15px]">"{r.text}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-border mt-auto">
                <div
                  className="h-10 w-10 rounded-full grid place-items-center font-display text-lg shrink-0"
                  style={{ background: "var(--gradient-fire)", color: "#0B0F19" }}
                >
                  {r.name[0]?.toUpperCase()}
                </div>
                <div className="overflow-hidden">
                  <div className="font-display tracking-wider truncate">{r.name}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-widest truncate">{r.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {reviewsList.length > 4 && !showAll && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <button
              onClick={() => setShowAll(true)}
              className="lift-btn inline-flex items-center justify-center px-8 py-3 rounded-xl font-display tracking-[0.2em] uppercase text-sm glass"
              style={{ color: "var(--yellow)", border: "1px solid oklch(0.74 0.20 50 / 40%)" }}
            >
              See All Feedback ↓
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
