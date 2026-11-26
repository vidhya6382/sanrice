import { useSite } from "../context/SiteContext";
import PageHero from "../components/PageHero";
import contactHero from "../assets/images/contact-hero.webp";
import riceScatter from "../assets/images/rice-scatter.webp";

export default function Contact() {
  const { settings, openEnquiry } = useSite();
  const tel = settings.phone.replace(/\s/g, "");

  return (
    <>
      <PageHero title="Contact Us" image={contactHero} />

      <section className="section">
        <div className="container contact-grid">
          <article className="info-card info-card--gold contact-card">
            <h2>Connect with SAN</h2>
            <dl>
              <div><dt>Mobile:</dt><dd><a href={`tel:${tel}`}>{settings.phone}</a></dd></div>
              <div><dt>Email:</dt><dd><a href={`mailto:${settings.email}`}>{settings.email}</a></dd></div>
              <div><dt>Hours:</dt><dd>{settings.hours}</dd></div>
              <div><dt>Instagram:</dt><dd><a href={settings.instagram} target="_blank" rel="noreferrer">{settings.instagram_handle}</a></dd></div>
            </dl>
            <button className="btn btn--red btn--sm" onClick={() => openEnquiry(null)}>Send an Enquiry</button>
          </article>

          <img className="contact-grid__img" src={riceScatter} alt="Rice grains and a bowl of rice" loading="lazy" />

          <div className="contact-grid__map">
            <iframe
              title="SAN Rice location on Google Maps"
              src={settings.map_embed_url}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          <article className="info-card info-card--red contact-address">
            <h2>Address</h2>
            <address>
              {settings.address.split("\n").map((line) => (
                <span key={line}>{line}<br /></span>
              ))}
            </address>
            <a className="btn btn--outline-light btn--sm" href={settings.map_url} target="_blank" rel="noreferrer">
              View on Google Maps
            </a>
          </article>
        </div>
      </section>
    </>
  );
}
