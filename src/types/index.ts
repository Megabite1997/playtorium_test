export type Item = {
  name: string;
  price: number;
  category: "Clothing" | "Accessories" | "Electronics";
};

export type DiscountCampaign =
  | {
      type: "Fixed";
      category: "Coupon";
      amount: number;
    }
  | {
      type: "Percentage";
      category: "Coupon";
      percentage: number;
    }
  | {
      type: "ItemCategoryPercentage";
      category: "On Top";
      itemCategory: Item["category"];
      percentage: number;
    }
  | {
      type: "Points";
      category: "On Top";
      points: number;
    }
  | {
      type: "Seasonal";
      category: "Seasonal";
      every: number;
      discount: number;
    };
