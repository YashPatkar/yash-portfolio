const ContactSection = () => {
  return (
    <>
      {/* Hero — REACH / OUT. */}
      <section className="border-b-4 border-[var(--color-jet)] flex flex-col justify-center px-4 md:px-12 py-20 bg-[var(--color-butter)]">
        <div className="w-full max-w-screen-2xl mx-auto">
          <h1 className="text-h-xl text-[var(--color-jet)] leading-[0.8] mb-8">
            REACH<br />OUT.
          </h1>
          <p className="text-body-lg text-[var(--color-jet)] max-w-2xl mb-12 font-bold uppercase">
            Available for backend-focused product work, integrations, and reliability improvements. Let's build something indestructible.
          </p>
          <a
            href="/resume.pdf"
            download="Yash_Patkar_Resume.pdf"
            className="brutal-btn brutal-shadow text-base md:text-lg !px-8 md:!px-12 !py-4 md:!py-5 inline-flex"
          >
            DOWNLOAD_RESUME
            <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>

      {/* Contact details grid — Email / Base / Social */}
      <section className="grid grid-cols-1 md:grid-cols-3 brutal-border-b bg-[var(--color-butter)]">
        <div className="p-8 brutal-border-r-0 md:brutal-border-r border-b-4 md:border-b-0 border-[var(--color-jet)] flex flex-col gap-4">
          <span className="text-4xl font-headline leading-none" aria-hidden="true">@</span>
          <h3 className="text-h-md text-[var(--color-jet)]">EMAIL</h3>
          <a
            className="text-body-lg text-[var(--color-jet)] underline font-black break-all hover:text-[var(--color-paper)] transition-colors"
            href="mailto:yash.patkar2004@gmail.com"
          >
            YASH.PATKAR2004@GMAIL.COM
          </a>
        </div>

        <div className="p-8 brutal-border-r-0 md:brutal-border-r border-b-4 md:border-b-0 border-[var(--color-jet)] flex flex-col gap-4">
          <span className="text-4xl font-headline leading-none" aria-hidden="true">◎</span>
          <h3 className="text-h-md text-[var(--color-jet)]">BASE</h3>
          <p className="text-body-lg text-[var(--color-jet)] font-black uppercase">
            Mumbai, India [19.0760° N, 72.8777° E]
          </p>
        </div>

        <div className="p-8 flex flex-col gap-4">
          <span className="text-4xl font-headline leading-none" aria-hidden="true">⟨⟩</span>
          <h3 className="text-h-md text-[var(--color-jet)]">SOCIAL</h3>
          <div className="flex flex-col gap-2">
            <a
              href="https://github.com/yashpatkar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-body-lg text-[var(--color-jet)] font-black uppercase flex items-center gap-2 hover:translate-x-2 transition-transform"
            >
              GITHUB_ [01]
            </a>
            <a
              href="https://www.linkedin.com/in/yash-patkar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-body-lg text-[var(--color-jet)] font-black uppercase flex items-center gap-2 hover:translate-x-2 transition-transform"
            >
              LINKEDIN_ [02]
            </a>
            <a
              href="mailto:yash.patkar2004@gmail.com"
              className="text-body-lg text-[var(--color-jet)] font-black uppercase flex items-center gap-2 hover:translate-x-2 transition-transform"
            >
              EMAIL_ [03]
            </a>
          </div>
        </div>
      </section>

      {/* Map / coordinates panel */}
      <section className="h-96 w-full brutal-border-b relative overflow-hidden bg-[var(--color-jet)]">
        {/* Stylized circuit grid */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'linear-gradient(var(--color-butter) 1px, transparent 1px), linear-gradient(90deg, var(--color-butter) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        {/* Pulsing dot — Mumbai */}
        <div className="absolute left-[68%] top-[58%] -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="absolute inset-0 w-4 h-4 rounded-full bg-[var(--color-butter)] animate-ping opacity-75" />
            <div className="relative w-4 h-4 rounded-full bg-[var(--color-butter)] border-2 border-[var(--color-paper)]" />
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="bg-[var(--color-butter)] brutal-border p-6 max-w-sm">
            <p className="text-label-mono text-[var(--color-jet)]">
              CURRENT_COORDINATES: MUMBAI_SECTOR_CENTRAL
            </p>
            <p className="text-body-lg text-[var(--color-jet)] mt-2 font-bold uppercase">
              Ready for onsite workshops or remote deep-dives across all timezones.
            </p>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="w-full bg-[var(--color-jet)] py-4 brutal-border-b overflow-hidden whitespace-nowrap">
        <div className="marquee-track">
          {Array.from({ length: 2 }).map((_, dup) => (
            <div key={dup} className="flex shrink-0 items-center">
              {[
                'OPEN FOR NEW PROJECTS 2025',
                '•',
                'BACKEND ARCHITECTURE',
                '•',
                'REACH OUT NOW',
                '•',
              ].map((txt, i) => (
                <span
                  key={`${dup}-${i}`}
                  className="text-[var(--color-butter)] font-headline text-[clamp(24px,4vw,48px)] mx-6 md:mx-8 uppercase"
                >
                  {txt}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ContactSection;
