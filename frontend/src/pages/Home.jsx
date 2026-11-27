import { Link } from "react-router-dom";
import useApi from "../hooks/useApi";
import { getProducts } from "../api/client";
import ProductGrid from "../components/ProductGrid";
import VideoShowcase from "../components/VideoShowcase";
import heroBags from "../assets/images/hero-bags.webp";
import bagsFarm from "../assets/images/bags-farm.webp";
import riceBowlDark from "../assets/images/rice-bowl-dark.webp";
import farmersField from "../assets/images/farmers-field.webp";

// Figures from the SAN Rice Company Profile.
const highlights = [
  { value: "4", label: "States", detail: "Tamil Nadu, Karnataka, Andhra Pradesh, Kerala" },
  { value: "2", label: "Export markets", detail: "Dubai & Saudi Arabia" },
  { value: "3", label: "Brands", detail: "SAN Pannaiyar, SAN Market Raja, Ali Baba" },
  { value: "Lulu & Pothys", label: "Retail partners", detail: "Plus a growing distribution network" },
];

export default function Home() {
  const { data: products, loading } = useApi(() => getProducts({ featured: true }), []);

  return (
    <>
      {/* Hero */}
      <section className="home-hero">
        <div className="home-hero__text">
          <h1>SAN Rice</h1>
          <p className="eyebrow">Quality in every grain, trust in every meal</p>
        </div>
        <img
          className="home-hero__img"
          src={heroBags}
          alt="SAN Rice bags – Jeera, Soft & Milky White, Idly Rice, Netkichadi and Ali Baba"
        />
      </section>

      {/* Brand film */}
      <VideoShowcase />

      {/* Promise + story cards */}
      <section className="section">
        <div className="container promise">
          <div className="promise__intro">
            <h2 className="promise__heading">
              Quality in Every  Grain,
              <br />
              Trust in
              <br />Every Meal.
            </h2>
            <p>
             From paddy trading to our own rice mill, our journey is built on hard work, good quality and customer trust.
            </p>
            <Link to="/about" className="btn btn--outline">Our Story</Link>
          </div>

          <article className="story-card story-card--gold">
            {/* Full, uncropped photo on a blurred copy of itself */}
            <div className="story-card__media" style={{ "--media-bg": `url(${bagsFarm})` }}>
              <img src={bagsFarm} alt="SAN Pannaiyar, Ali Baba and SAN Market Raja rice bags" loading="lazy" />
            </div>
            <div className="story-card__body">
              <h3>Our Humble Growth</h3>
              <p>
                What began with paddy trading in 2020–21 has grown into rice processing and manufacturing in our
                own rice factory. Today SAN Rice reaches homes across Tamil Nadu, Karnataka, Andhra Pradesh and
                Kerala, with export connections to Dubai and Saudi Arabia.
              </p>
            </div>
          </article>

          <article className="story-card story-card--red" style={{ backgroundImage: `url(${riceBowlDark})` }}>
            <div className="story-card__body">
              <h3>Our Commitment</h3>
              <p>
                To deliver quality rice with a commitment to purity, freshness and excellence: rice that offers
                value and brings nourishment and happiness to every household, built on trust, consistency and
                customer satisfaction.
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* Product range */}
      <section className="section section--tight-top">
        <div className="container">
          <header className="section-head">
            <h2>Our Premium Rice Ranges</h2>
            <p>
              Carefully sourced, cleaned and packed. Rice that cooks soft, tastes natural and is perfect for
              everyday cooking.
            </p>
          </header>
          <ProductGrid products={products} loading={loading} action="know-more" />
        </div>
      </section>

      {/* Reach highlights */}
      <section className="highlights" aria-label="SAN Rice at a glance">
        <div className="container">
          <ul className="highlights__grid">
            {highlights.map((h) => (
              <li key={h.label} className="highlights__item">
                <strong className={`highlights__value${/^\d+$/.test(h.value) ? "" : " highlights__value--text"}`}>
                  {h.value}
                </strong>
                <span className="highlights__label">{h.label}</span>
                <span className="highlights__detail">{h.detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Farmers banner */}
      <section className="farmers-banner">
        <div className="container farmers-banner__inner">
          <div className="farmers-banner__text">
            <h2>Supporting Local Farmers.</h2>
            <p>We bring you rice grown with care by the farmers of our land.</p>
          </div>
          <div
            className="farmers-banner__img"
            style={{ backgroundImage: `url(${farmersField})` }}
            role="img"
            aria-label="Farmers planting paddy"
          />
        </div>
      </section>
    </>
  );
}
