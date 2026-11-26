import { createContext, useContext, useState } from "react";
import useApi from "../hooks/useApi";
import { getBrands, getSettings } from "../api/client";
import * as fallback from "../data/fallback";
import EnquiryModal from "../components/EnquiryModal";

const SiteContext = createContext(null);

// Shares brands, contact settings and the enquiry popup across every page.
export function SiteProvider({ children }) {
  const { data: settings } = useApi(getSettings, [], fallback.settings);
  const { data: brands } = useApi(getBrands, [], fallback.brands);
  const [enquiryProduct, setEnquiryProduct] = useState(undefined);

  const value = {
    settings,
    brands,
    openEnquiry: (product = null) => setEnquiryProduct(product),
  };

  return (
    <SiteContext.Provider value={value}>
      {children}
      {enquiryProduct !== undefined && (
        <EnquiryModal product={enquiryProduct} onClose={() => setEnquiryProduct(undefined)} />
      )}
    </SiteContext.Provider>
  );
}

export const useSite = () => useContext(SiteContext);
