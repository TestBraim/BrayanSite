import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  AiFillStar,
  AiOutlineFundProjectionScreen,
  AiOutlineHome,
  AiOutlineUser,
} from "react-icons/ai";
import { CgFileDocument } from "react-icons/cg";
import { FaGithub } from "react-icons/fa";
import logo from "../Assets/logo.webp";
import logoSmall from "../Assets/logo-240.webp";
import { githubProfile } from "./SocialLinks";

const navItems = [
  { to: "/", label: "Início", Icon: AiOutlineHome },
  { to: "/about", label: "Sobre", Icon: AiOutlineUser },
  { to: "/project", label: "Projetos", Icon: AiOutlineFundProjectionScreen },
  { to: "/resume", label: "Currículo", Icon: CgFileDocument },
];

function Navbar() {
  const [expanded, setExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggle = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => {
    setExpanded(false);
  }, [pathname]);

  useEffect(() => {
    function updateScroll() {
      setScrolled(window.scrollY >= 20);
    }

    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  function closeMenu() {
    if (!expanded) return;

    setExpanded(false);
    toggle.current.focus({ preventScroll: true });
  }

  function handleEscape(event) {
    if (event.key === "Escape" && expanded) {
      event.preventDefault();
      closeMenu();
    }
  }

  function handleBlur(event) {
    if (expanded && !event.currentTarget.contains(event.relatedTarget)) {
      setExpanded(false);
    }
  }

  return (
    <header className={`site-header${scrolled ? " site-header-scrolled" : ""}`}>
      <nav className="container site-nav" aria-label="Navegação principal" onKeyDown={handleEscape} onBlur={handleBlur}>
        <Link to="/" className="brand" onClick={pathname === "/" ? closeMenu : undefined}>
          <img src={logoSmall} srcSet={`${logoSmall} 1x, ${logo} 2x`} width="240" height="33" alt="Brayan Pletsch, início" />
        </Link>
        <button
          ref={toggle}
          className="nav-toggle"
          type="button"
          aria-label="Menu"
          aria-controls="links-principais"
          aria-expanded={expanded}
          onClick={() => setExpanded((open) => !open)}
        >
          <span className="nav-toggle-icon" aria-hidden="true"><span /><span /><span /></span>
        </button>
        <div id="links-principais" className={`nav-panel${expanded ? " nav-panel-open" : ""}`}>
          <ul className="nav-links">
            {navItems.map(({ to, label, Icon }) => (
              <li key={to}>
                <NavLink to={to} end onClick={pathname === to ? closeMenu : undefined}>
                  <Icon aria-hidden="true" focusable="false" /> {label}
                </NavLink>
              </li>
            ))}
            <li>
              <a className="nav-github" href={githubProfile} target="_blank" rel="noopener noreferrer" aria-label="Perfil no GitHub (abre em nova aba)">
                <FaGithub aria-hidden="true" focusable="false" />
                <AiFillStar aria-hidden="true" focusable="false" />
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
