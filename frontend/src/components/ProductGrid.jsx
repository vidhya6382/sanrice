import ProductCard from "./ProductCard";

export default function ProductGrid({ products, loading, action }) {
  if (loading) {
    return (
      <div className="product-grid">
        {[1, 2, 3].map((i) => (
          <div key={i} className="product-card product-card--skeleton" aria-hidden />
        ))}
      </div>
    );
  }

  if (!products?.length) {
    return <p className="empty-note">No products found for this brand yet.</p>;
  }

  return (
    <div className="product-grid">
      {products.map((p) => (
        <ProductCard key={p.id ?? p.slug} product={p} action={action} />
      ))}
    </div>
  );
}
