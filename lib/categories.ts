export type CategorySlug =
  | "beauty-wellness"
  | "finance-economy"
  | "business-leaders"
  | "education"
  | "healthcare";

export interface Category {
  slug: CategorySlug;
  name: string;
  shortName: string;
  description: string;
}

export const CATEGORIES: Category[] = [
  {
    slug: "beauty-wellness",
    name: "Beauty & Wellness",
    shortName: "Beauty & Wellness",
    description:
      "Spas, salons, and wellness studios shaping self-care across the Centennial State.",
  },
  {
    slug: "finance-economy",
    name: "Finance & Economy",
    shortName: "Finance & Economy",
    description:
      "Markets, local banking, and the economic forces moving Colorado forward.",
  },
  {
    slug: "business-leaders",
    name: "Business Leaders",
    shortName: "Business Leaders",
    description:
      "The entrepreneurs and executives building Colorado's business landscape.",
  },
  {
    slug: "education",
    name: "Education",
    shortName: "Education",
    description:
      "Schools, universities, and the people advancing learning statewide.",
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    shortName: "Healthcare",
    description:
      "Hospitals, clinics, and the caregivers keeping Colorado healthy.",
  },
];

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
