import type { MenuItem } from "./types";

export const MENU: MenuItem[] = [
  {
    id: "burger",
    name: "Classic Burger",
    description: "Beef patty, cheddar, pickles, house sauce",
    price: 9.5,
    category: "Mains",
    emoji: "🍔",
  },
  {
    id: "pizza",
    name: "Margherita Pizza",
    description: "Tomato, mozzarella, fresh basil",
    price: 12,
    category: "Mains",
    emoji: "🍕",
  },
  {
    id: "bowl",
    name: "Chicken Rice Bowl",
    description: "Grilled chicken, jasmine rice, greens",
    price: 11.25,
    category: "Mains",
    emoji: "🍛",
  },
  {
    id: "taco",
    name: "Fish Tacos (2)",
    description: "Crispy fish, slaw, lime crema",
    price: 8.75,
    category: "Mains",
    emoji: "🌮",
  },
  {
    id: "fries",
    name: "Fries",
    description: "Sea salt, skin on",
    price: 3.5,
    category: "Sides",
    emoji: "🍟",
  },
  {
    id: "salad",
    name: "Side Salad",
    description: "Mixed leaves, vinaigrette",
    price: 4,
    category: "Sides",
    emoji: "🥗",
  },
  {
    id: "lemonade",
    name: "Lemonade",
    description: "Freshly squeezed",
    price: 3,
    category: "Drinks",
    emoji: "🍋",
  },
  {
    id: "coffee",
    name: "Iced Coffee",
    description: "Cold brew over ice",
    price: 3.75,
    category: "Drinks",
    emoji: "🧋",
  },
  {
    id: "cookie",
    name: "Choc Chip Cookie",
    description: "Baked this morning",
    price: 2.25,
    category: "Desserts",
    emoji: "🍪",
  },
];

export const DELIVERY_FEE = 2.99;
export const TAX_RATE = 0.08;
