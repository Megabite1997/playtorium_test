import { Item, DiscountCampaign } from "../types";

export const applyDiscounts = (
  items: Item[],
  campaigns: DiscountCampaign[]
): number => {
  let total = items.reduce((acc, item) => acc + item.price, 0);
  const categoriesApplied = new Set<string>();

  const order = ["Coupon", "On Top", "Seasonal"];
  campaigns.sort(
    (a, b) => order.indexOf(a.category) - order.indexOf(b.category)
  );

  for (const campaign of campaigns) {
    if (categoriesApplied.has(campaign.category)) continue;
    categoriesApplied.add(campaign.category);

    switch (campaign.type) {
      case "Fixed":
        total -= campaign.amount;
        break;
      case "Percentage":
        total *= 1 - campaign.percentage / 100;
        break;
      case "ItemCategoryPercentage": {
        const subTotal = items
          .filter((i) => i.category === campaign.itemCategory)
          .reduce((sum, i) => sum + i.price, 0);
        total -= subTotal * (campaign.percentage / 100);
        break;
      }
      case "Points": {
        const maxDiscount = total * 0.2;
        total -= Math.min(campaign.points, maxDiscount);
        break;
      }
      case "Seasonal": {
        const seasonalTimes = Math.floor(total / campaign.every);
        total -= seasonalTimes * campaign.discount;
        break;
      }
    }
  }

  return Math.max(0, Math.round(total)); // Ensure total not negative and round off
};
