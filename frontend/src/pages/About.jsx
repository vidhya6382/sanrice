import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import farmersField from "../assets/images/farmers-field.webp";
import riceSack from "../assets/images/rice-sack.webp";
import bagsFarm from "../assets/images/bags-farm.webp";
import "./About.css";

// Content from the SAN Rice Company Profile.
const timeline = [
  {
    year: "2017–2018",
    title: "Overseas connections",
    text: "Business visits to Dubai and Saudi Arabia built valuable contacts and connections in the rice trade.",
  },
  {
    year: "2020–2021",
    title: "Paddy trading",
    text: "Back in India, the founder began paddy trading with the support and guidance of a businessman from Tirunelveli.",
  },
  {
    year: "Rebuilding",
    title: "From setback to growth",
    text: "After a major financial setback, the founder chose to rebuild, holding on to customer relationships and trust.",
  },
  {
    year: "Today",
    title: "Our own rice factory",
    text: "The business grew into rice processing and manufacturing with the establishment of its own rice factory.",
  },
];

const values = [
  { title: "Quality", text: "Maintaining high standards throughout our business." },
  { title: "Purity", text: "Handling every product with care and responsibility." },
  { title: "Trust", text: "Building long-term relationships with customers and business partners." },
  { title: "Consistency", text: "Staying committed to dependable products and service." },
  { title: "Customer Satisfaction", text: "Understanding customer needs and working to serve them better." },
];

const states = ["Tamil Nadu", "Karnataka", "Andhra Pradesh", "Kerala"];
const exportMarkets = ["Dubai", "Saudi Arabia"];

export default function About() {
  return (
    <>
      <PageHero title="About Us" image={farmersField} position="center 40%" />

      {/* Tagline */}
      <section className="about-intro">
        <div className="container">
          <p className="eyebrow">SAN Rice</p>
          <h2>Quality in Every Grain, Trust in Every Meal.</h2>
          <p>A journey built on resilience, quality and customer trust.</p>
        </div>
      </section>

      {/* Our Story */}
      <section className="section section--tight-top">
        <div className="container about-grid">
          <article className="info-card info-card--red about-grid__beginning">
            <h2>Our Story</h2>
            <p>
              SAN Rice is built on a journey of determination, business experience and customer trust. What
              began with an interest in the rice trade has grown into a business focused on{" "}
              <strong>paddy trading, rice processing and rice manufacturing</strong>.
            </p>
            <p>
              The founder's journey was shaped by opportunities to learn, build relationships and understand
              the rice industry. Throughout, the trust placed in the business by customers and partners became
              an important foundation for growth.
            </p>
          </article>

          <img className="about-grid__img" src={riceSack} alt="Paddy and rice in a jute sack" loading="lazy" />

          <article className="info-card info-card--gold">
            <h2>From Setback to Growth</h2>
            <p>
              The journey was not without challenges. At one stage, the founder faced a major financial
              setback, with losses of nearly <strong>₹65 lakh</strong>. Rather than giving up, the founder chose
              to rebuild and move forward while continuing to value customer relationships and trust.
            </p>
          </article>

          <article className="info-card info-card--red">
            <h2>Our Own Rice Factory</h2>
            <p>
              The business then expanded beyond paddy trading into rice processing and rice manufacturing,
              with the establishment of its own rice factory, an important step in the journey of SAN Rice.
            </p>
          </article>
        </div>
      </section>

      {/* Journey timeline */}
      <section className="section section--tight-top">
        <div className="container">
          <header className="section-head">
            <h2>Our Journey</h2>
          </header>
          <ol className="timeline">
            {timeline.map((t) => (
              <li key={t.title} className="timeline__item">
                <span className="timeline__year">{t.year}</span>
                <h3>{t.title}</h3>
                <p>{t.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Quote banner */}
      <section className="rooted" style={{ backgroundImage: `url(${farmersField})` }}>
        <div className="container rooted__inner">
          <h2>
            “A symbol of the trust
            <br />
            our customers place in us.”
          </h2>
          <p>
            For SAN Rice, the brand represents more than a product. It represents the trust and confidence
            customers have placed in the business. Our commitment is to protect that trust, keep growing and
            reach new milestones in the years ahead.
          </p>
        </div>
      </section>

      {/* Our Reach + Looking Ahead */}
      <section className="section">
        <div className="container reach">
          <div className="reach__col">
            <h2>Our Reach</h2>
            <p>
              SAN Rice has expanded beyond Tamil Nadu, with products distributed through retail outlets such as{" "}
              <strong>Lulu Mall</strong> and <strong>Pothys</strong>, along with a growing distribution network.
            </p>
            <h3 className="reach__label">Across India</h3>
            <ul className="chips">
              {states.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <h3 className="reach__label">Export connections</h3>
            <ul className="chips chips--gold">
              {exportMarkets.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </div>

          <article className="info-card info-card--gold reach__ahead">
            <h2>Looking Ahead</h2>
            <p>
              Our next goal is to strengthen our presence across <strong>Tenkasi, Tirunelveli</strong> and nearby
              regions, while continuing to expand our distribution network and make our products available to
              more customers.
            </p>
            <Link to="/products" className="btn btn--red btn--sm">See Our Rice</Link>
          </article>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section section--tight-top">
        <div className="container mission">
          <div className="mission__text">
            <h2>Our Mission</h2>
            <p>
              To deliver quality rice with a commitment to purity, freshness and excellence. Our mission is to
              provide customers with rice that meets high-quality standards, offers value and brings nourishment
              and happiness to every household. We strive to build lasting relationships through trust,
              consistency and customer satisfaction.
            </p>
            <h2>Our Vision</h2>
            <p>
              To become a trusted and recognized name in the rice industry by setting high standards in quality,
              reliability and customer service. We aspire to expand our reach, strengthen our business network
              and make quality rice accessible to more households while preserving the goodness of traditional
              rice.
            </p>
          </div>
          <img className="mission__img" src={bagsFarm} alt="SAN Pannaiyar and Ali Baba rice bags" loading="lazy" />
        </div>
      </section>

      {/* Core Values */}
      <section className="values">
        <div className="container">
          <header className="section-head">
            <h2>Our Core Values</h2>
          </header>
          <ul className="values__grid">
            {values.map((v, i) => (
              <li key={v.title} className="values__card">
                <span className="values__num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </li>
            ))}
          </ul>
          <p className="values__thanks">Thank you for being part of our journey.</p>
        </div>
      </section>
    </>
  );
}
