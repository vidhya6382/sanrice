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
             SAN Rice started with a simple interest in the rice trade. Over time, that interest grew into a business covering paddy trading and rice milling.
</p>
            <p>
              In 2017–2018, our founder visited the UAE (Dubai) and Saudi Arabia on business. These trips helped us build useful contacts in the rice trade. After returning to India, we started paddy trading in 2020–2021, guided by an experienced businessman from Tirunelveli. The trust of our customers and partners became the base we built on.
            
            </p>
          </article>

          <img className="about-grid__img" src={riceSack} alt="Paddy and rice in a jute sack" loading="lazy" />

          <article className="info-card info-card--gold">
            <h2>From Setback to Growth</h2>
            <p>
              Our journey has not always been easy. At one point, we faced a major financial loss. We chose to rebuild rather than give up, and we never stopped valuing the trust of our customers.</p>
            <p>That decision led to our next big step. In [year], we set up our own rice mill and moved from paddy trading into rice milling.</p>
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

     
      {/* Our Reach + Looking Ahead */}
      <section className="section">
        <div className="container reach">
          <div className="reach__col">
            <h2>Our Reach</h2>
            <p>
             Today, SAN Rice is available beyond Tamil Nadu in Karnataka, Andhra Pradesh and Kerala. You can find our rice at [LuLu Hypermarket] and [Pothys], and through our growing network of distributors. We also have export links with buyers in the UAE (Dubai) and Saudi Arabia.
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
Next, we want to grow stronger in our home region of Tenkasi, Tirunelveli and nearby areas. We will also keep expanding our distribution network so more families can enjoy our rice.
              To us, SAN Rice is more than a product. It stands for the trust our customers place in us, and we work every day to keep it.
            </p>
            <Link to="/products" className="btn btn--red btn--sm">See Our Rice</Link>
          </article>
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
      {/* Mission & Vision */}
      <section className="section section--tight-top">
        <div className="container mission">
          <div className="mission__text">
            <h2>Our Mission</h2>
            <p>
              To supply pure, fresh and good-quality rice at a fair price. We want every household to enjoy healthy, satisfying meals, and we aim to earn lasting trust through consistent quality and good service.
            </p>
            <h2>Our Vision</h2>
            <p>
              To become a trusted name in the rice industry, known for quality, reliability and customer care. We aim to grow our reach and network so more households can access good rice, while keeping the goodness of traditional rice alive.
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
