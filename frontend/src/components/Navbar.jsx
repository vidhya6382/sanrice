import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../assets/images/logo.webp";
import { CloseIcon, MenuIcon } from "./Icons";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
  { to: "/products", label: "Products" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? "is-scrolled" : ""}`}>
      <div className="container navbar__inner">
        <Link to="/" className="navbar__logo" aria-label="SAN Rice home">
          <img src={logo} alt="SAN Rice" width="96" height="80" />
        </Link>

        <button
          className="navbar__toggle"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <CloseIcon width={26} height={26} /> : <MenuIcon width={26} height={26} />}
        </button>

        <nav className={`navbar__links ${open ? "is-open" : ""}`} aria-label="Main">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end}>
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
