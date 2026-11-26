// Fallback content used when the Django API is not reachable.
// The shape of these objects matches the API responses exactly,
// so components work the same way with either source.

import premiumNetkichadi from "../assets/images/premium-netkichadi.webp";
import softMilkyWhite from "../assets/images/soft-milky-white.webp";
import idlyRice from "../assets/images/idly-rice.webp";
import jeeraRice from "../assets/images/jeera-rice.webp";
import neiKitchadi from "../assets/images/nei-kitchadi.webp";

export const brands = [
  { id: 1, name: "SAN Pannaiyar", slug: "san-pannaiyar" },
  { id: 2, name: "SAN Market Raja", slug: "san-market-raja" },
  { id: 3, name: "Ali Baba", slug: "ali-baba" },
  { id: 4, name: "SAN Rice", slug: "san-rice" },
];

const brand = (slug) => brands.find((b) => b.slug === slug);

export const products = [
  {
    id: 1,
    name: "Premium Netkichadi",
    slug: "premium-netkichadi",
    brand: brand("san-pannaiyar"),
    weight: "26 kg",
    description: "Premium rice that cooks soft and fluffy, perfect for ghee rice and festive meals.",
    image: premiumNetkichadi,
    features: ["Superior grain quality", "Rich natural aroma", "Long, non-sticky grain"],
    is_featured: true,
  },
  {
    id: 2,
    name: "Soft & Milky White",
    slug: "soft-milky-white",
    brand: brand("san-pannaiyar"),
    weight: "26 kg",
    description: "Soft, milky white rice for everyday South Indian meals.",
    image: softMilkyWhite,
    features: ["Soft texture", "Ideal for daily meals", "Naturally gluten-free"],
    is_featured: true,
  },
  {
    id: 3,
    name: "Idly Rice",
    slug: "idly-rice",
    brand: brand("san-rice"),
    weight: "26 kg",
    description: "Makes soft, spongy idlis and crisp, golden dosas every time.",
    image: idlyRice,
    features: ["High water absorbency", "Soft idlis, crisp dosas", "Easy to digest"],
    is_featured: true,
  },
  {
    id: 4,
    name: "Jeera Rice",
    slug: "jeera-rice",
    brand: brand("san-market-raja"),
    weight: "26 kg",
    description: "Fragrant, long-grain rice for pulao, biryani and jeera rice.",
    image: jeeraRice,
    features: ["Fragrant long grain", "Perfect for pulao", "Export quality"],
    is_featured: true,
  },
  {
    id: 5,
    name: "Nei Kitchadi",
    slug: "nei-kitchadi",
    brand: brand("ali-baba"),
    weight: "10 kg",
    description: "Aromatic Nei Kitchadi rice, a traditional favourite for ghee rice.",
    image: neiKitchadi,
    features: ["Aromatic grain", "Traditional taste", "Handy 10 kg pack"],
    is_featured: true,
  },
];

export const settings = {
  phone: "+91 70105 57589",
  whatsapp: "917010557589",
  email: "sanrice.ambai@gmail.com",
  hours: "Open daily, 8:30 AM – 9:00 PM",
  instagram_handle: "@san_rice_ambai",
  instagram: "https://www.instagram.com/san_rice_ambai/",
  facebook: "https://www.facebook.com/share/18hiDct7Zq/",
  youtube: "https://www.youtube.com/",
  address: "San Rice,\n6/51, Main Road,\nPallakkal Pothukudi,\nTamil Nadu 627413",
  map_url: "https://www.google.com/maps/search/?api=1&query=San+Rice+Pallakkal+Pothukudi+Tamil+Nadu+627413",
  map_embed_url: "https://www.google.com/maps?q=San+Rice,+Pallakkal+Pothukudi,+Tamil+Nadu+627413&output=embed",
};
