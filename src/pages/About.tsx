import SiteManifesto from '../components/Site/SiteManifesto';
import SiteExperience from '../components/Site/SiteExperience';
import SiteSkills from '../components/Site/SiteSkills';
import SiteFooter from '../components/Site/SiteFooter';

const STATEMENT =
  'Backend & AI engineer from Mumbai. I turn fuzzy requirements into APIs, queues and ' +
  'retrieval pipelines that survive production — then make them *faster.* B.Sc. IT, ' +
  'D. G. Ruparel College. Currently hunting the next hard problem, preferably one ' +
  'involving *LLMs at scale.*';

const About = () => (
  <div className="aria-page-head">
    <SiteManifesto
      kicker="( About — Yash Patkar )"
      statement={STATEMENT}
      stats={[
        { value: '9.4', accent: '/10', label: 'GPA — B.Sc. IT (2022–2025)' },
        { value: '02', accent: '+', label: 'Internships — Kuvaka, Levaze' },
        { value: '02', accent: '×', label: 'Hackathon podiums' },
      ]}
    />
    <SiteExperience />
    <SiteSkills />
    <SiteFooter />
  </div>
);

export default About;
