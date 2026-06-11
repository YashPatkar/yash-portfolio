const ArchitectSection = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-12 bg-[var(--color-paper)] brutal-border-b">
      <div className="md:col-span-6 brutal-border-r-0 md:brutal-border-r p-8 md:p-16">
        <div className="w-full aspect-[4/5] brutal-border bg-[var(--color-jet)] relative overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
          {/* Visual placeholder — circuit grid + LED dot */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                'linear-gradient(var(--color-butter) 1px, transparent 1px), linear-gradient(90deg, var(--color-butter) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-headline text-[var(--color-butter)] text-[clamp(56px,9vw,140px)] leading-none rotate-[-4deg]">
              THE
              <br />
              ARCHITECT
            </span>
          </div>
          <div className="absolute bottom-6 left-6 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[var(--color-greenneon)] animate-pulse" />
            <span className="text-label-mono text-[var(--color-butter)]">SYSTEM_ONLINE</span>
          </div>
        </div>
      </div>

      <div className="md:col-span-6 p-8 md:p-16 flex flex-col justify-center">
        <span className="text-label-mono opacity-60 mb-4">01_BIOGRAPHY</span>
        <h3 className="text-h-md mb-8">THE ARCHITECT</h3>
        <p className="text-body-lg mb-6">
          I don't just write code; I design systems that endure. I work at the intersection of efficiency and security — replacing bloated monolithic architectures with lean, event-driven services backed by REST APIs, RAG pipelines, and Redis-powered caching layers.
        </p>
        <p className="text-body-lg mb-8">
          My philosophy is simple: if a system cannot be explained on a single whiteboard, it is too complex to be reliable.
        </p>
        <a
          href="/resume.pdf"
          download="Yash_Patkar_Resume.pdf"
          className="brutal-btn self-start brutal-shadow"
        >
          READ_FULL_MANIFESTO ↗
        </a>
      </div>
    </section>
  );
};

export default ArchitectSection;
