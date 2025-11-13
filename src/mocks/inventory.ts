export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  minStock: number;
  maxStock: number;
  lastRestocked: string;
  supplier: string;
}

export const inventoryItems: InventoryItem[] = [
  {
    id: "1",
    name: "Tomatoes",
    category: "Vegetables",
    quantity: 15,
    unit: "kg",
    minStock: 20,
    maxStock: 50,
    lastRestocked: "2 days ago",
    supplier: "Fresh Farms Co.",
  },
  {
    id: "2",
    name: "Mozzarella Cheese",
    category: "Dairy",
    quantity: 8,
    unit: "kg",
    minStock: 10,
    maxStock: 30,
    lastRestocked: "1 day ago",
    supplier: "Dairy Fresh Ltd.",
  },
  {
    id: "3",
    name: "Ribeye Steak",
    category: "Meat",
    quantity: 25,
    unit: "kg",
    minStock: 15,
    maxStock: 40,
    lastRestocked: "1 day ago",
    supplier: "Prime Meats Inc.",
  },
  {
    id: "4",
    name: "Olive Oil",
    category: "Oils",
    quantity: 12,
    unit: "L",
    minStock: 8,
    maxStock: 25,
    lastRestocked: "5 days ago",
    supplier: "Mediterranean Imports",
  },
  {
    id: "5",
    name: "Pasta",
    category: "Grains",
    quantity: 40,
    unit: "kg",
    minStock: 20,
    maxStock: 60,
    lastRestocked: "3 days ago",
    supplier: "Italian Foods Co.",
  },
  {
    id: "6",
    name: "Salmon Fillets",
    category: "Seafood",
    quantity: 6,
    unit: "kg",
    minStock: 10,
    maxStock: 25,
    lastRestocked: "6 hours ago",
    supplier: "Ocean Fresh",
  },
  {
    id: "7",
    name: "Lettuce",
    category: "Vegetables",
    quantity: 18,
    unit: "heads",
    minStock: 15,
    maxStock: 40,
    lastRestocked: "1 day ago",
    supplier: "Fresh Farms Co.",
  },
  {
    id: "8",
    name: "Red Wine",
    category: "Beverages",
    quantity: 45,
    unit: "bottles",
    minStock: 30,
    maxStock: 80,
    lastRestocked: "4 days ago",
    supplier: "Wine & Spirits Ltd.",
  },
];
