import { useSite } from "../context/SiteContext";

// Placeholder legal pages. Replace the text with your final wording.
export function PrivacyPolicy() {
  const { settings } = useSite();
  return (
    <section className="section">
      <div className="container legal">
        <h1>Privacy Policy</h1>
        <p>
          SAN Impex collects only the details you give us through our enquiry and contact forms (name,
          mobile number, email and message). We use them only to reply to your enquiry and process orders.
        </p>
        <p>We do not sell or share your personal information with third parties.</p>
        <p>
          To ask us to update or delete your details, email{" "}
          <a href={`mailto:${settings.email}`}>{settings.email}</a>.
        </p>
      </div>
    </section>
  );
}

export function Terms() {
  return (
    <section className="section">
      <div className="container legal">
        <h1>Terms &amp; Conditions</h1>
        <p>
          Product information, pack sizes and images on this website are for reference. Prices and
          availability are confirmed at the time of order.
        </p>
        <p>
          All brand names, logos and images (SAN Pannaiyar, SAN Market Raja, Ali Baba, SAN Rice) belong to
          SAN Impex and may not be used without permission.
        </p>
      </div>
    </section>
  );
}
