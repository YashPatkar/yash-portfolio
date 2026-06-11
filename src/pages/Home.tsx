import SiteHero from '../components/Site/SiteHero';
import SiteMarquee from '../components/Site/SiteMarquee';
import SiteWorks from '../components/Site/SiteWorks';
import SiteManifesto from '../components/Site/SiteManifesto';
import SiteCapabilities from '../components/Site/SiteCapabilities';
import SiteFooter from '../components/Site/SiteFooter';

const STATEMENT =
  'I build backend systems people never notice — because they *just work.* Clean APIs, ' +
  'tight schemas, RAG pipelines that answer in milliseconds. Reliability is the feature — ' +
  'everything else is *decoration.*';

const Home = () => (
  <>
    <SiteHero />
    <SiteMarquee />
    <SiteWorks />
    <SiteManifesto
      id="about"
      kicker="( About — Philosophy )"
      statement={STATEMENT}
      stats={[
        { value: '9.4', accent: '/10', label: 'GPA — B.Sc. IT, Mumbai' },
        { value: '3', accent: '×', label: 'Faster RAG processing per PDF' },
        { value: '01', accent: 'st', label: 'Place — DotTech Hackathon' },
      ]}
    />
    <SiteCapabilities />
    <SiteFooter />
  </>
);

export default Home;
