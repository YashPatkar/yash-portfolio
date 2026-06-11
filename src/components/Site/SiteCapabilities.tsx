import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const CAPS: Array<{ name: string; desc: string; tags: string[] }> = [
  {
    name: 'Backend Engineering',
    desc: 'REST APIs that hold up in production — auth, rate limiting, background jobs and clean schema design.',
    tags: ['Django / DRF', 'FastAPI', 'Node.js', 'JWT'],
  },
  {
    name: 'AI & RAG Systems',
    desc: 'Retrieval pipelines with chunking, embeddings and vector search — LLM features that actually ship.',
    tags: ['RAG', 'LlamaIndex', 'Vector Search', 'LLM Integration'],
  },
  {
    name: 'Data & Performance',
    desc: 'Query optimization, caching and N+1 hunting — the difference between 2 seconds and 200 ms.',
    tags: ['PostgreSQL', 'Redis', 'MySQL', 'ORM'],
  },
  {
    name: 'DevOps & Delivery',
    desc: 'Dockerized deploys, version control discipline and monitoring — code that leaves the laptop.',
    tags: ['Docker', 'Git', 'Linux', 'Render / Vercel'],
  },
];

const SiteCapabilities = ({ title = 'What I' }: { title?: string }) => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        '.aria-cap',
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: '.aria-caps-list', start: 'top 85%', once: true },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section className="aria-section" ref={sectionRef}>
      <div className="aria-section-head">
        <h2 className="aria-section-title">
          {title} <em>do</em>
        </h2>
        <span className="aria-label">( Capabilities )</span>
      </div>

      <div className="aria-caps-list">
        {CAPS.map((cap, i) => (
          <div className="aria-cap" key={cap.name} data-cursor="link">
            <span className="aria-cap-num">({String(i + 1).padStart(2, '0')})</span>
            <h3 className="aria-cap-name">{cap.name}</h3>
            <div className="aria-cap-body">
              <p className="aria-cap-desc">{cap.desc}</p>
              <div className="aria-cap-tags">
                {cap.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SiteCapabilities;
