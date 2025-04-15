import React, { useEffect, useState } from "react";
import { applyDiscounts } from "./utils/discountUtils";
import { DiscountCampaign, Item } from "./types";
import items from "./data/items.json";
import campaigns from "./data/campaigns.json";

const App: React.FC = () => {
  const [finalPrice, setFinalPrice] = useState<number | null>(null);

  useEffect(() => {
    const typedItems = items as Item[];
    const typedCampaigns = campaigns as DiscountCampaign[];
    const price = applyDiscounts(typedItems, typedCampaigns);
    setFinalPrice(price);
  }, []);

  return (
    <div className="p-6 max-w-xl mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4 bg-red-300 p-4 rounded">
        Final Price Calculator
      </h1>
      <p className="text-lg">
        Final Price:{" "}
        <span className="font-semibold">{finalPrice ?? "Calculating..."}</span>{" "}
        THB
      </p>
    </div>
  );
};

export default App;
