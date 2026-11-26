import { Link } from "react-router-dom";
import logo from "../assets/images/logo.webp";
import { useSite } from "../context/SiteContext";
import { FacebookIcon, InstagramIcon } from "./Icons";

export default function Footer() {
  const { brands, settings } = useSite();
  // The footer lists the three consumer brands (SAN Rice is the umbrella name).
  const footerBrands = brands.filter((b) => b.slug !== "san-rice");

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <img src={logo} alt="SAN Rice" width="110" height="92" />
          <p className="footer__tagline">
            Pure grains,
            <br />
            naturally yours.
          </p>
        </div>

        <ul className="footer__col">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          {footerBrands.map((b) => (
            <li key={b.slug}>
              <Link to={`/products?brand=${b.slug}`}>{b.name}</Link>
            </li>
          ))}
        </ul>

        <ul className="footer__col">
          <li><Link to="/contact">Contact Us</Link></li>
          <li><Link to="/privacy-policy">Privacy Policy</Link></li>
          <li><Link to="/terms">Terms &amp; Conditions</Link></li>
          <li className="footer__plain">Connect with us</li>
          <li className="footer__social">
            <a href={settings.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
              <InstagramIcon />
            </a>
            <a href={settings.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
              <FacebookIcon />
            </a>
          </li>
        </ul>
      </div>

      <p className="footer__copy">© {new Date().getFullYear()} SAN Impex. All Rights Reserved.</p>
    </footer>
  );
}
