import { Link } from 'react-router-dom';
import CONTACT from '../data/resume';
import type { ProjectEntry } from '../data/resume';

interface CardProps {
  project: ProjectEntry;
  index: number;
}

const ProjectCard = ({ project, index }: CardProps) => {
  const reverse = index % 2 === 1;
  const tags =
    project.tags ||
    project.tech.split(',').slice(0, 3).map((t) => t.trim().toUpperCase());

  return (
    <article className="group relative bg-[var(--color-butter)] hover:bg-[var(--color-jet)] transition-colors duration-200 brutal-border-b last:border-b-0 overflow-hidden">
      <div
        className={`max-w-screen-2xl mx-auto px-4 md:px-8 py-12 md:py-20 flex flex-col md:flex-row gap-8 items-center ${
          reverse ? 'md:flex-row-reverse' : ''
        }`}
      >
        <div className="flex-1 order-2 md:order-none">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-label-mono text-[var(--color-jet)] group-hover:text-[var(--color-butter)] border-2 border-[var(--color-jet)] group-hover:border-[var(--color-butter)] px-3 py-1 transition-colors">
              {project.year || '2025'}
            </span>
            <span className="text-label-mono text-[var(--color-jet)] group-hover:text-[var(--color-butter)] transition-colors">
              {project.category || project.hook.toUpperCase()}
            </span>
          </div>
          <h2 className="text-h-lg text-[var(--color-jet)] group-hover:text-[var(--color-butter)] mb-6 transition-colors">
            {project.name.toUpperCase()}
          </h2>
          <p className="text-body-lg text-[var(--color-jet)] group-hover:text-[var(--color-butter)] max-w-xl mb-8 transition-colors">
            {project.desc}
          </p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="border-2 border-[var(--color-jet)] group-hover:border-[var(--color-butter)] px-3 py-1 text-label-mono text-[var(--color-jet)] group-hover:text-[var(--color-butter)] transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-8 brutal-btn brutal-btn--inverse"
            >
              OPEN_REPO ↗
            </a>
          )}
        </div>

        <div className="w-full md:w-1/2 h-[300px] md:h-[480px] brutal-border overflow-hidden order-1 md:order-none">
          {project.image ? (
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
            />
          ) : (
            <div className="w-full h-full bg-[var(--color-jet)] flex items-center justify-center p-6 text-center">
              <span className="font-headline text-[var(--color-butter)] text-[clamp(40px,6vw,96px)] leading-[0.85]">
                {project.name.toUpperCase()}
              </span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

interface Props {
  limit?: number;
}

const ProjectsSection = ({ limit }: Props) => {
  const projects = limit ? CONTACT.projects.slice(0, limit) : CONTACT.projects;
  const isLimited = !!limit;

  return (
    <>
      {/* Hero — only render full hero on /works (no limit) */}
      {!isLimited && (
        <section className="w-full bg-[var(--color-butter)] brutal-border-b px-4 md:px-8 py-16 md:py-24">
          <div className="max-w-screen-2xl mx-auto">
            <h1 className="text-h-xl text-[var(--color-jet)] break-words">ALL WORKS.</h1>
            <div className="mt-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
              <p className="text-body-lg text-[var(--color-jet)] max-w-2xl uppercase font-bold">
                A curated selection of industrial-grade backend architectures and full-stack systems built for scale and performance.
              </p>
              <div className="bg-[var(--color-jet)] text-[var(--color-butter)] p-4 brutal-border text-label-mono">
                TOTAL_DEPLOYMENTS: {CONTACT.projects.length.toString().padStart(2, '0')}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Projects list */}
      <section
        id="works"
        className="w-full bg-[var(--color-butter)]"
      >
        {isLimited && (
          <div className="max-w-screen-2xl mx-auto px-4 md:px-8 pt-16 md:pt-24 pb-8 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            <div>
              <span className="text-label-mono">/ SELECTED WORK</span>
              <h2 className="text-h-xl mt-3">
                ALL <span className="font-script lowercase">works.</span>
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/works" className="brutal-btn">
                VIEW_ALL ↗
              </Link>
              <a href="mailto:yash.patkar2004@gmail.com" className="brutal-btn brutal-btn--inverse">
                START_A_PROJECT ↗
              </a>
            </div>
          </div>
        )}

        <div className="brutal-border-t">
          {projects.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}

          {/* "MORE SOON" placeholder */}
          {!isLimited && (
            <article className="bg-[var(--color-butter)] brutal-border-b">
              <div className="max-w-screen-2xl mx-auto px-4 md:px-8 py-24 flex flex-col items-center justify-center text-center">
                <h2 className="text-h-xl text-[var(--color-jet)] opacity-20 select-none italic mb-4">
                  MORE SOON
                </h2>
                <div className="w-full h-1 bg-[var(--color-jet)]" />
                <p className="text-label-mono text-[var(--color-jet)] mt-4 tracking-[0.5em]">
                  SYSTEM_UPDATING_IN_PROGRESS
                </p>
              </div>
            </article>
          )}
        </div>

        {/* Marquee */}
        {!isLimited && (
          <div className="bg-[var(--color-jet)] py-4 overflow-hidden whitespace-nowrap brutal-border-b">
            <div className="marquee-track">
              {Array.from({ length: 2 }).map((_, dup) => (
                <div key={dup} className="flex shrink-0">
                  {[
                    'OPEN FOR COLLABORATION',
                    'HIRE THE ARCHITECT',
                    'SCALABLE SYSTEMS ONLY',
                  ].map((txt) => (
                    <span
                      key={`${dup}-${txt}`}
                      className="text-[var(--color-butter)] font-headline text-[clamp(28px,4vw,56px)] px-10"
                    >
                      {txt} //
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default ProjectsSection;
