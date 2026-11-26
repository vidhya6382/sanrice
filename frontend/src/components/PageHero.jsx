// Full-width photo banner with a centered serif title (About, Products, Contact).
export default function PageHero({ title, image, position = "center" }) {
  return (
    <section
      className="page-hero"
      style={{ backgroundImage: `url(${image})`, backgroundPosition: position }}
    >
      <h1 className="page-hero__title">{title}</h1>
    </section>
  );
}
