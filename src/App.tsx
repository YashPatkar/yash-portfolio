import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import SmoothScrollProvider from './components/Layout/SmoothScrollProvider';
import SiteShell from './components/Site/SiteShell';
import Home from './pages/Home';
import Works from './pages/Works';
import About from './pages/About';
import Contact from './pages/Contact';

// Standalone demo experience — renders outside the main site chrome
const AriaLanding = lazy(() => import('./pages/aria/AriaLanding'));

const App = () => {
  const { pathname } = useLocation();

  if (pathname.startsWith('/aria')) {
    return (
      <Suspense fallback={null}>
        <AriaLanding />
      </Suspense>
    );
  }

  return (
    <SmoothScrollProvider>
      <SiteShell>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/works" element={<Works />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </SiteShell>
    </SmoothScrollProvider>
  );
};

export default App;
