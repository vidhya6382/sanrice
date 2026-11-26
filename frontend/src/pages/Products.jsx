import { useSearchParams } from "react-router-dom";
import useApi from "../hooks/useApi";
import { getProducts } from "../api/client";
import { useSite } from "../context/SiteContext";
import PageHero from "../components/PageHero";
import ProductGrid from "../components/ProductGrid";
import productsHero from "../assets/images/products-hero.webp";

export default function Products() {
  const [params, setParams] = useSearchParams();
  const brandSlug = params.get("brand") || "";
  const { brands } = useSite();
  const { data: products, loading } = useApi(() => getProducts({ brand: brandSlug }), [brandSlug]);

  const activeBrand = brands.find((b) => b.slug === brandSlug);
  const selectBrand = (slug) => (slug ? setParams({ brand: slug }) : setParams({}));

  return (
    <>
      <PageHero title="Our Products" image={productsHero} />

      <section className="section">
        <div className="container">
          <header className="section-head">
            <h2 className="section-head__big">{activeBrand ? activeBrand.name : "SAN Rice"}</h2>
            <p>
              SAN rice is the first choice for perfectly soft, aromatic and authentic South Indian taste.
              <br />
              Sourced with sincerity, our grains are clean, pure and wholesome.
            </p>
          </header>

          <div className="brand-filter" role="tablist" aria-label="Filter by brand">
            <button role="tab" aria-selected={!brandSlug} className={!brandSlug ? "is-active" : ""} onClick={() => selectBrand("")}>
              All
            </button>
            {brands.map((b) => (
              <button
                key={b.slug}
                role="tab"
                aria-selected={brandSlug === b.slug}
                className={brandSlug === b.slug ? "is-active" : ""}
                onClick={() => selectBrand(b.slug)}
              >
                {b.name}
              </button>
            ))}
          </div>

          <ProductGrid products={products} loading={loading} action="enquire" />
        </div>
      </section>
    </>
  );
}
