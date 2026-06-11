import CONTACT from '../data/resume';
import SplitText from '../Animations/SplitText';

const AboutSection = () => {
  return (
    <>
      {/* Hero — 12-col split with V.04_STABLE corner */}
      <section className="grid grid-cols-1 md:grid-cols-12 brutal-border-b">
        <div className="md:col-span-8 p-8 md:p-16 brutal-border-r-0 md:brutal-border-r">
          <span className="text-label-mono opacity-70">/ 01 · ABOUT</span>
          <SplitText
            as="h1"
            text="I BUILD BACKEND SYSTEMS THAT STAY HONEST."
            className="text-h-xl mb-8 mt-4 block"
          />
          <div className="max-w-2xl">
            <p className="text-body-lg mb-6">
              Architecting resilient infrastructure where logic is law. My approach is rooted in industrial precision—eliminating technical debt through rigid structural integrity and high-performance engineering.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="chip" data-cursor="view">
                <span>STABILITY_FIRST</span>
              </span>
              <span className="chip" data-cursor="view">
                <span>ZERO_LATENCY_MINDSET</span>
              </span>
              <span className="chip" data-cursor="view">
                <span>SHIP_TO_LEARN</span>
              </span>
            </div>
          </div>
        </div>

        <div className="md:col-span-4 bg-[var(--color-jet)] flex items-center justify-center p-8 min-h-[300px] relative overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'linear-gradient(var(--color-butter) 1px, transparent 1px), linear-gradient(90deg, var(--color-butter) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />
          <div className="relative text-[var(--color-butter)] text-center">
            <div className="border-4 border-[var(--color-butter)] p-6 inline-block transform rotate-3">
              <span className="block font-headline text-[clamp(32px,4vw,48px)] leading-none">
                EST. {new Date().getFullYear() - 1}
              </span>
              <span className="block text-label-mono mt-2">V.04_STABLE</span>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee — values band */}
      <div className="w-full bg-[var(--color-jet)] py-3 brutal-border-b overflow-hidden whitespace-nowrap">
        <div className="marquee-track">
          {Array.from({ length: 2 }).map((_, dup) => (
            <div key={dup} className="flex shrink-0 items-center">
              {[
                'RELIABILITY',
                '✦',
                'OBSERVABILITY',
                '✦',
                'CLEAN INTERFACES',
                '✦',
                'NO ROLLBACK FRIDAY',
                '✦',
              ].map((txt, i) => (
                <span
                  key={`${dup}-${i}`}
                  className="text-[var(--color-butter)] font-headline text-[clamp(20px,3vw,36px)] mx-6 uppercase"
                >
                  {txt}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Bio grid — bento */}
      <section className="grid grid-cols-1 md:grid-cols-3 brutal-border-b bg-[var(--color-butter)]">
        <div className="p-8 brutal-border-r-0 md:brutal-border-r brutal-border-b md:border-b-0" data-cursor="view">
          <span className="text-label-mono opacity-70">/ EDUCATION</span>
          <p className="mt-3 font-headline text-2xl uppercase">{CONTACT.home.details.education}</p>
          <p className="mt-2 text-label-mono opacity-80">GPA: {CONTACT.home.details.gpa}</p>
        </div>
        <div className="p-8 brutal-border-r-0 md:brutal-border-r brutal-border-b md:border-b-0" data-cursor="view">
          <span className="text-label-mono opacity-70">/ LOCATION</span>
          <p className="mt-3 font-headline text-2xl uppercase">{CONTACT.home.details.address}</p>
        </div>
        <div className="p-8" data-cursor="view">
          <span className="text-label-mono opacity-70">/ ACHIEVEMENTS</span>
          <ul className="mt-3 space-y-2">
            {CONTACT.home.details.achievements.map((line) => (
              <li key={line} className="font-headline uppercase text-base flex gap-3">
                <span>×</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default AboutSection;
