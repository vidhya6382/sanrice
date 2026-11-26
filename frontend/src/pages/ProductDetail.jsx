import { Link, useParams } from "react-router-dom";
import useApi from "../hooks/useApi";
import { getProduct, getProducts } from "../api/client";
import { useSite } from "../context/SiteContext";
import ProductGrid from "../components/ProductGrid";
import { CheckIcon } from "../components/Icons";

export default function ProductDetail() {
  const { slug } = useParams();
  const { openEnquiry } = useSite();
  const { data: product, loading } = useApi(() => getProduct(slug), [slug]);
  const { data: others } = useApi(() => getProducts(), [], []);

  if (loading) return <div className="section container"><p className="empty-note">Loading…</p></div>;

  if (!product) {
    return (
      <div className="section container not-found">
        <h1>Product not found</h1>
        <Link to="/products" className="btn btn--red">See all products</Link>
      </div>
    );
  }

  const related = (others || []).filter((p) => p.slug !== product.slug).slice(0, 3);

  return (
    <>
      <section className="section detail">
        <div className="container detail__inner">
          <div className="detail__media">
            <img src={product.image} alt={`${product.brand?.name} ${product.name} rice bag`} />
          </div>
          <div className="detail__info">
            <p className="eyebrow eyebrow--red">
              <Link to={`/products?brand=${product.brand?.slug}`}>{product.brand?.name}</Link>
            </p>
            <h1>{product.name}</h1>
            <p className="detail__weight">{product.weight} bag</p>
            <p className="detail__desc">{product.description}</p>
            <ul className="detail__features">
              {product.features.map((f) => (
                <li key={f}><CheckIcon width={16} height={16} /> {f}</li>
              ))}
            </ul>
            <div className="detail__actions">
              <button className="btn btn--red" onClick={() => openEnquiry(product)}>Order Now</button>
              <Link to="/products" className="btn btn--outline">All Products</Link>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section section--tight-top">
          <div className="container">
            <header className="section-head"><h2>You may also like</h2></header>
            <ProductGrid products={related} action="know-more" />
          </div>
        </section>
      )}
    </>
  );
}
