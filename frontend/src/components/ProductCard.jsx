import { Link } from "react-router-dom";
import { useSite } from "../context/SiteContext";

/**
 * action = "know-more" → links to the product detail page (Home page design)
 * action = "enquire"   → opens the enquiry popup (Products page design)
 */
export default function ProductCard({ product, action = "know-more" }) {
  const { openEnquiry } = useSite();

  return (
    <article className="product-card">
      <div className="product-card__media">
        <img src={product.image} alt={`${product.brand?.name} ${product.name} rice bag`} loading="lazy" />
      </div>

      <div className="product-card__body">
        <h3 className="product-card__title">{product.name}</h3>
        <p className="product-card__meta">
          {product.brand?.name} · {product.weight}
        </p>
        <p className="product-card__desc">{product.description}</p>

        <ul className="product-card__features">
          {product.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>

        {action === "enquire" ? (
          <button className="btn btn--outline btn--sm" onClick={() => openEnquiry(product)}>
            Order Now
          </button>
        ) : (
          <Link className="btn btn--outline btn--sm" to={`/products/${product.slug}`}>
            Know More
          </Link>
        )}
      </div>
    </article>
  );
}
