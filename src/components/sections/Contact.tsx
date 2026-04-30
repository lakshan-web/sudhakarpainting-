export function Contact() {
  return (
    <section id="contact" className="relative py-32 px-6 md:px-12 overflow-hidden">
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.74 0.20 50 / 35%), transparent 60%)",
        }}
      />
      <div className="relative max-w-4xl mx-auto text-center">
        <div className="text-xs uppercase tracking-[0.4em] text-primary mb-3">04 — Get In Touch</div>
        <h2 className="font-display text-5xl md:text-8xl text-fire leading-[0.9] mb-6">
          Ready To Paint
          <br />
          Your Lorry?
        </h2>
        <p className="max-w-xl mx-auto text-muted-foreground mb-12 text-lg">
          Walk in, drop a photo on WhatsApp, or call us directly. Free consultation and on-the-spot quote.
        </p>

        <div className="flex flex-col sm:flex-row gap-5 justify-center" style={{ perspective: "1000px" }}>
          <a
            href="tel:+919842812555"
            className="lift-btn group relative inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl font-display text-xl tracking-[0.2em] uppercase"
            style={{
              background: "var(--gradient-fire)",
              color: "#0B0F19",
              boxShadow: "0 20px 50px -10px var(--orange), 0 0 40px oklch(0.86 0.19 92 / 50%), inset 0 1px 0 rgba(255,255,255,0.4)",
            }}
          >
            <span className="text-2xl">📞</span> Call Now
          </a>

          <a
            href="https://wa.me/919842812555?text=Hi%2C%20I%20saw%20your%20portfolio%20and%20want%20to%20contact%20you"
            target="_blank"
            rel="noreferrer"
            className="lift-btn group relative inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl font-display text-xl tracking-[0.2em] uppercase glass"
            style={{
              border: "1px solid oklch(0.74 0.20 50 / 60%)",
              boxShadow: "0 20px 50px -10px rgba(0,0,0,0.6), 0 0 40px oklch(0.74 0.20 50 / 35%)",
              color: "var(--yellow)",
            }}
          >
            <span className="text-2xl">💬</span> WhatsApp Now
          </a>
        </div>

        <div className="mt-20 grid sm:grid-cols-3 gap-6 text-left">
          {[
            { k: "Workshop Location", v: "Google Map Direction", link: "https://maps.app.goo.gl/Qnu4kQ9K6AP4AYgY7?g_st=ic" },
            { k: "Hours", v: "Open 24 × 7" },
            { k: "Instagram Profile", v: "See Instagram Page", link: "https://www.instagram.com/sudhagarpainting?igsh=b3V3ZHM1d2Y5d3A=" },
          ].map((item) => {
            const innerContent = (
              <>
                <div className="text-[10px] uppercase tracking-[0.3em] text-primary mb-1">{item.k}</div>
                <div className="text-foreground/90">{item.v}</div>
              </>
            );
            return item.link ? (
              <a key={item.k} href={item.link} target="_blank" rel="noreferrer" className="glass rounded-xl p-5 block">
                {innerContent}
              </a>
            ) : (
              <div key={item.k} className="glass rounded-xl p-5">
                {innerContent}
              </div>
            );
          })}
        </div>
      </div>

      <footer className="relative max-w-7xl mx-auto mt-24 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">
        <div className="font-display text-fire text-base">SUDHAKAR PAINTING</div>
        <div>© {new Date().getFullYear()} · Crafting identity on wheels</div>
      </footer>
    </section>
  );
}
