export interface Bottle {
  id: number;
  name: string;
  price: number;
  size: string;
  description: string;
  image: string;
  material: string;
  type: string;
  sku: string;
}

export const bottles: Bottle[] = [
  {
    id: 1,
    name: "Aqua Classic",
    price: 500,
    size: "50cl",
    description: "Pure and refreshing everyday hydration.",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500",
    material: "PET Plastic",
    type: "Purified Water",
    sku: "AQ-001",
  },
  {
    id: 2,
    name: "Premium Water",
    price: 800,
    size: "75cl",
    description: "Premium quality water for your lifestyle.",
    image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=500",
    material: "Reusable Plastic",
    type: "Spring Water",
    sku: "AQ-002",
  },
  {
    id: 3,
    name: "Sports Water",
    price: 1200,
    size: "1L",
    description: "Stay refreshed during every workout.",
    image: "https://images.unsplash.com/photo-1564419320461-6870880221ad?w=500",
    material: "PET Plastic",
    type: "Mineral Water",
    sku: "AQ-003",
  },
];
