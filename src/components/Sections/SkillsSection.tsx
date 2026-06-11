import { useRef } from 'react';
import { Link } from 'react-router-dom';
import CONTACT from '../data/resume';
import Magnetic from '../Animations/Magnetic';
import SplitText from '../Animations/SplitText';

interface Props {
  brief?: boolean;
}

const ICONS: Record<string, string> = {
  Languages: '⌘',
  Backend: '◇',
  Databases: '◈',
  Frontend: '◉',
  'DevOps & Tools': '☁',
  'Backend Concepts': '⚙',
  'AI / LLM': '✦',
};

// Visual "proficiency" per category — purely decorative meter
const LEVELS: Record<string, number> = {
  Languages: 88,
  Backend: 95,
  Databases: 84,
  Frontend: 78,
  'DevOps & Tools': 72,
  'Backend Concepts': 90,
  'AI / LLM': 80,
};

const SkillCard = ({ group, i, dark }: { group: { cat: string; items: string }; i: number; dark: boolean }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const items = group.items.split(',').map((s) => s.trim());
  const level = LEVELS[group.cat] ?? 80;

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={`tilt-card bento ${dark ? 'bento--dark' : ''} p-6 md:p-8 border-2 border-[var(--color-butter)]`}
      data-cursor="view"
      data-cursor-label={group.cat.toUpperCase()}
    >
      <div className="flex justify-between items-start mb-4">
        <span className="text-label-mono opacity-70">{String(i + 1).padStart(2, '0')}</span>
        <span className="text-3xl md:text-4xl leading-none font-headline">
          {ICONS[group.cat] || '◆'}
        </span>
      </div>
      <h3 className="text-h-md">{group.cat.toUpperCase()}</h3>

      {/* Proficiency bar */}
      <div className="mt-4 flex items-center gap-3">
        <div className="flex-1 h-1 bg-current/20 relative overflow-hidden">
          <span
            className="absolute inset-y-0 left-0 bg-current"
            style={{ width: `${level}%` }}
          />
        </div>
        <span className="text-label-mono">{level}</span>
      </div>

      <ul className="mt-5 flex flex-wrap gap-2">
        {items.map((item) => (
          <li
            key={item}
            className="chip"
            data-cursor="view"
          >
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const SkillsSection = ({ brief = false }: Props) => {
  const groups = brief ? CONTACT.skills.details.slice(0, 4) : CONTACT.skills.details;

  return (
    <section
      data-hint="HOVER"
      className="relative bg-[var(--color-jet)] text-[var(--color-butter)] py-20 md:py-28 px-4 md:px-8 brutal-border-b overflow-hidden"
    >
      {/* Floating tag in corner */}
      <div className="absolute top-6 right-6 hidden md:block">
        <span className="text-label-mono opacity-60">[ STACK · CURATED ]</span>
      </div>

      <div className="max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 mb-12 md:mb-16 gap-6">
          <div className="md:col-span-8">
            <span className="text-label-mono opacity-70">/ 02 · ARSENAL</span>
            <SplitText
              as="h2"
              text="TECHNICAL ARSENAL."
              className="text-h-lg mt-3"
            />
            <p className="text-body-lg text-[var(--color-paper)]/70 mt-6 max-w-xl">
              {CONTACT.skills.hook} A curated stack of tools for scale, security, and absolute reliability.
            </p>
          </div>
          {brief && (
            <div className="md:col-span-4 flex md:justify-end items-end">
              <Magnetic strength={0.4}>
                <Link
                  to="/about"
                  className="brutal-btn brutal-btn--inverse"
                  data-cursor="view"
                  data-cursor-label="MORE"
                  data-magnetic
                >
                  VIEW_FULL_STACK ↗
                </Link>
              </Magnetic>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-2 border-[var(--color-butter)]">
          {groups.map((group, i) => {
            const dark = i % 4 === 0 || i % 4 === 3;
            return <SkillCard key={group.cat} group={group} i={i} dark={dark} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
