import { useSite } from "../context/SiteContext";
import { WhatsAppIcon } from "./Icons";

export default function WhatsAppButton() {
  const { settings } = useSite();
  const number = settings.whatsapp || import.meta.env.VITE_WHATSAPP_NUMBER;
  const text = encodeURIComponent("Hello SAN Rice, I'd like to know more about your rice.");

  return (
    <a
      className="whatsapp-btn"
      href={`https://wa.me/${number}?text=${text}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
    >
      <WhatsAppIcon width={26} height={26} />
    </a>
  );
}
