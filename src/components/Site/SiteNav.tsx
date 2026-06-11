import { Link, NavLink } from 'react-router-dom';
import { useCityTime } from './siteState';

const LINKS: Array<[string, string]> = [
  ['Work', '/works'],
  ['About', '/about'],
  ['Contact', '/contact'],
];

const SiteNav = () => {
  const time = useCityTime('Asia/Kolkata');

  return (
    <header className="aria-nav aria-io">
      <Link className="aria-nav-logo" to="/" data-cursor="link">
        Y.Patkar<sup>®</sup>
      </Link>
      <nav className="aria-nav-links">
        {LINKS.map(([label, to]) => (
          <NavLink
            key={to}
            to={to}
            data-cursor="link"
            className={({ isActive }) => `aria-nav-link${isActive ? ' is-active' : ''}`}
          >
            {label}
          </NavLink>
        ))}
      </nav>
      <span className="aria-nav-clock">Mumbai — {time} IST</span>
    </header>
  );
};

export default SiteNav;
