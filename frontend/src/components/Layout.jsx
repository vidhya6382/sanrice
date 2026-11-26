import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";
import useScrollReveal from "../hooks/useScrollReveal";
import "../styles/animations.css";

export default function Layout() {
  const { pathname } = useLocation();

  // Start every new page at the top.
  // Block body so the effect returns nothing (newer browsers return a Promise from scrollTo).
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  // Fade/slide boxes in as they scroll into view.
  useScrollReveal(pathname);

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
