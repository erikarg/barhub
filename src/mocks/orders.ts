export type OrderStatus = "pending" | "preparing" | "ready" | "served";

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  notes?: string;
}

export interface Order {
  id: string;
  table: string;
  status: OrderStatus;
  items: OrderItem[];
  total: number;
  time: string;
  server: string;
}

export const orders: Order[] = [
  {
    id: "ORD-001",
    table: "T3",
    status: "preparing",
    items: [
      { name: "Margherita Pizza", quantity: 2, price: 15.0 },
      { name: "Caesar Salad", quantity: 1, price: 12.0 },
      { name: "Craft Beer", quantity: 2, price: 8.0 },
    ],
    total: 58.0,
    time: "12:45 PM",
    server: "Mike",
  },
  {
    id: "ORD-002",
    table: "T1",
    status: "pending",
    items: [
      { name: "Burger Deluxe", quantity: 2, price: 17.0 },
      { name: "French Fries", quantity: 1, price: 6.0 },
    ],
    total: 40.0,
    time: "12:52 PM",
    server: "Silvia",
  },
  {
    id: "ORD-003",
    table: "T8",
    status: "ready",
    items: [
      { name: "Ribeye Steak", quantity: 3, price: 35.0 },
      { name: "Grilled Salmon", quantity: 2, price: 28.0 },
      { name: "House Wine", quantity: 2, price: 12.0 },
    ],
    total: 185.0,
    time: "12:30 PM",
    server: "John",
  },
  {
    id: "ORD-004",
    table: "T6",
    status: "preparing",
    items: [
      { name: "Pasta Carbonara", quantity: 2, price: 18.0 },
      { name: "Tiramisu", quantity: 1, price: 8.0 },
    ],
    total: 44.0,
    time: "12:40 PM",
    server: "Silvia",
  },
];
