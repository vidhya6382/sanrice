import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container not-found">
        <h1>Page not found</h1>
        <p>The page you're looking for doesn't exist.</p>
        <Link to="/" className="btn btn--red">Back to Home</Link>
      </div>
    </section>
  );
}
