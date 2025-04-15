import React, { useEffect, useState } from "react";
import { applyDiscounts } from "./utils/discountUtils";
import { DiscountCampaign, Item } from "./types";

const App: React.FC = () => {
  const [finalPrice, setFinalPrice] = useState<number | null>(null);

  const items: Item[] = [
    { name: "T-Shirt", price: 350, category: "Clothing" },
    { name: "Hat", price: 250, category: "Accessories" },
    { name: "Belt", price: 230, category: "Accessories" },
  ];

  const campaigns: DiscountCampaign[] = [
    { type: "Fixed", category: "Coupon", amount: 50 },
    { type: "Points", category: "On Top", points: 68 },
    { type: "Seasonal", category: "Seasonal", every: 300, discount: 40 },
  ];

  useEffect(() => {
    const price = applyDiscounts(items, campaigns);
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
