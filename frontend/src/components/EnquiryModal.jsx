import { useEffect, useRef, useState } from "react";
import { createEnquiry } from "../api/client";
import { useSite } from "../context/SiteContext";
import { CheckIcon, CloseIcon } from "./Icons";

const FIELDS = ["name", "phone", "email", "quantity", "message"];
const empty = { name: "", phone: "", email: "", quantity: "", message: "" };
const MESSAGE_MAX = 1000;

const NAME_RE = /^[A-Za-z஀-௿][A-Za-z஀-௿ .'-]*$/; // English or Tamil letters
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function mobileDigits(value) {
  let d = value.replace(/\D/g, "");
  if (d.length === 12 && d.startsWith("91")) d = d.slice(2);
  else if (d.length === 11 && d.startsWith("0")) d = d.slice(1);
  return d;
}

// Every box is required.
function validateField(name, value) {
  const v = value.trim();
  switch (name) {
    case "name":
      if (!v) return "Please enter your name.";
      if (v.length < 2) return "Name must be at least 2 letters.";
      if (!NAME_RE.test(v)) return "Name can contain only letters, spaces, dots and apostrophes.";
      return "";
    case "phone":
      if (!v) return "Please enter your mobile number.";
      if (!/^[6-9]\d{9}$/.test(mobileDigits(v)))
        return "Enter a valid 10-digit mobile number (starting with 6, 7, 8 or 9).";
      return "";
    case "email":
      if (!v) return "Please enter your email address.";
      if (!EMAIL_RE.test(v)) return "Enter a valid email address.";
      return "";
    case "quantity":
      if (!v) return "Please enter the number of bags.";
      if (!/^\d+$/.test(v)) return "Enter the number of bags as a whole number.";
      if (Number(v) < 1) return "Quantity must be at least 1 bag.";
      if (Number(v) > 100000) return "For orders above 100,000 bags please call us.";
      return "";
    case "message":
      if (!v) return "Please enter your delivery address or any details.";
      if (v.length < 5) return "Please write a little more (at least 5 characters).";
      if (v.length > MESSAGE_MAX) return `Message is too long (maximum ${MESSAGE_MAX} characters).`;
      return "";
    default:
      return "";
  }
}

const LABELS = {
  name: "Name",
  phone: "Mobile",
  email: "Email",
  quantity: "Quantity (bags)",
  message: "Delivery address / message",
};

export default function EnquiryModal({ product, onClose }) {
  const { settings } = useSite();
  const isOrder = Boolean(product);
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [formError, setFormError] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | sent | offline
  const refs = useRef({});

  useEffect(() => {
    refs.current.name?.focus();
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const update = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (touched[name]) setErrors((er) => ({ ...er, [name]: validateField(name, value) }));
    if (formError) setFormError("");
  };

  const blur = (e) => {
    const { name, value } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors((er) => ({ ...er, [name]: validateField(name, value) }));
  };

  const validateAll = () => {
    const e = {};
    FIELDS.forEach((k) => {
      const msg = validateField(k, form[k]);
      if (msg) e[k] = msg;
    });
    setErrors(e);
    setTouched(Object.fromEntries(FIELDS.map((k) => [k, true])));
    const missing = FIELDS.filter((k) => !form[k].trim());
    if (missing.length) {
      setFormError(`Please fill in all fields: ${missing.map((k) => LABELS[k]).join(", ")}.`);
    } else if (Object.keys(e).length) {
      setFormError("Please correct the highlighted fields.");
    }
    // Jump to the first box that needs attention.
    const first = FIELDS.find((k) => e[k]);
    if (first) refs.current[first]?.focus();
    return Object.keys(e).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    setFormError("");
    if (!validateAll()) return;
    setStatus("sending");
    try {
      await createEnquiry({
        product: product?.id ?? null,
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        quantity: Number(form.quantity),
        message: form.message.trim(),
      });
      setStatus("sent");
    } catch (err) {
      const res = err.response;
      if (res && res.status === 400 && res.data && typeof res.data === "object") {
        const { non_field_errors, detail, ...fields } = res.data;
        setErrors(Object.fromEntries(Object.entries(fields).map(([k, v]) => [k, [].concat(v).join(" ")])));
        setFormError([].concat(non_field_errors || detail || []).join(" ") || "Please correct the highlighted fields.");
        setStatus("idle");
      } else if (res && res.status === 429) {
        setFormError("Too many requests from this device. Please try again later or call us.");
        setStatus("idle");
      } else {
        setStatus("offline");
      }
    }
  };

  const whatsappText = encodeURIComponent(
    `Hello SAN Rice, I'd like to ${isOrder ? "order" : "enquire about"} ${
      product ? `${product.name} (${product.weight})` : "your rice"
    }.`
  );

  const fieldProps = (name) => ({
    name,
    ref: (el) => (refs.current[name] = el),
    value: form[name],
    onChange: update,
    onBlur: blur,
    required: true,
    "aria-required": true,
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
    className: errors[name] ? "has-error" : "",
  });

  const ErrorText = ({ name }) =>
    errors[name] ? (
      <span id={`${name}-error`} className="form__error" role="alert">
        {errors[name]}
      </span>
    ) : null;

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-labelledby="enquiry-title" onMouseDown={onClose}>
      <div className="modal__card" onMouseDown={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose} aria-label="Close">
          <CloseIcon />
        </button>

        {status === "sent" ? (
          <div className="modal__done">
            <span className="modal__tick"><CheckIcon width={28} height={28} /></span>
            <h2>Thank you!</h2>
            <p>
              {isOrder
                ? "We've received your order request. Our team will call you shortly to confirm the price and delivery."
                : "We've received your enquiry and will call you back shortly."}
            </p>
            <button className="btn btn--red" onClick={onClose}>Close</button>
          </div>
        ) : (
          <>
            <h2 id="enquiry-title" className="modal__title">{isOrder ? "Order Now" : "Send an Enquiry"}</h2>
            {product && (
              <p className="modal__product">
                {product.name} · {product.brand?.name} · {product.weight}
              </p>
            )}
            <p className="form__hint" style={{ margin: "-12px 0 14px", fontSize: 12 }}>All fields are required.</p>

            <form onSubmit={submit} noValidate className="form">
              <label>
                Name *
                <input {...fieldProps("name")} maxLength={100} autoComplete="name" />
                <ErrorText name="name" />
              </label>
              <label>
                Mobile *
                <input {...fieldProps("phone")} maxLength={16} inputMode="tel" autoComplete="tel" placeholder="98765 43210" />
                <ErrorText name="phone" />
              </label>
              <label>
                Email *
                <input {...fieldProps("email")} type="email" maxLength={254} autoComplete="email" placeholder="you@example.com" />
                <ErrorText name="email" />
              </label>
              <label>
                Quantity (bags) *
                <input {...fieldProps("quantity")} type="number" min="1" max="100000" step="1" inputMode="numeric" placeholder="e.g. 10" />
                <ErrorText name="quantity" />
              </label>
              <label className="form__full">
                Delivery address / message *
                <textarea {...fieldProps("message")} rows="3" maxLength={MESSAGE_MAX} placeholder="Your delivery address, preferred date, or any questions" />
                <span className="form__hint">{form.message.length}/{MESSAGE_MAX}</span>
                <ErrorText name="message" />
              </label>

              {formError && <p className="form__alert form__full" role="alert">{formError}</p>}

              {status === "offline" && (
                <p className="form__alert form__full" role="alert">
                  Sorry, we couldn't send your request right now. Please{" "}
                  <a href={`https://wa.me/${settings.whatsapp}?text=${whatsappText}`} target="_blank" rel="noreferrer">
                    message us on WhatsApp
                  </a>{" "}
                  or call {settings.phone}.
                </p>
              )}

              <button className="btn btn--red form__full" disabled={status === "sending"}>
                {status === "sending" ? "Sending…" : isOrder ? "Place Order" : "Send Enquiry"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
