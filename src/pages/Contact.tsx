import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import SiteFooter from '../components/Site/SiteFooter';

const Contact = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        '.aria-contact-intro > *',
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.08, delay: 0.1 }
      );
    },
    { scope: pageRef }
  );

  return (
    <div className="aria-contact-page" ref={pageRef}>
      <section className="aria-section aria-page-head aria-contact-intro">
        <span className="aria-label aria-label--lit">( Contact — Open to work )</span>
        <p className="aria-manifesto-text" style={{ marginTop: '24px', maxWidth: '1100px' }}>
          Entry-level backend / AI role or a contract that needs APIs which don't fall over —{' '}
          <em>I'm in.</em> Usually reply within a day.
        </p>
      </section>
      <SiteFooter />
    </div>
  );
};

export default Contact;
