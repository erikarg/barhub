export type TableStatus = "available" | "occupied" | "reserved";

export interface Table {
  id: number;
  number: string;
  seats: number;
  status: TableStatus;
  currentGuests?: number;
  orderTotal?: number;
  duration?: string;
  server?: string;
}

export const tables: Table[] = [
  {
    id: 1,
    number: "T1",
    seats: 2,
    status: "occupied",
    currentGuests: 2,
    orderTotal: 45.5,
    duration: "0:32",
    server: "Sarah",
  },
  { id: 2, number: "T2", seats: 4, status: "available", currentGuests: 0 },
  {
    id: 3,
    number: "T3",
    seats: 4,
    status: "occupied",
    currentGuests: 4,
    orderTotal: 125.0,
    duration: "1:15",
    server: "Mike",
  },
  { id: 4, number: "T4", seats: 2, status: "reserved", currentGuests: 0 },
  { id: 5, number: "T5", seats: 6, status: "available", currentGuests: 0 },
  {
    id: 6,
    number: "T6",
    seats: 4,
    status: "occupied",
    currentGuests: 3,
    orderTotal: 87.5,
    duration: "0:45",
    server: "Sarah",
  },
  { id: 7, number: "T7", seats: 2, status: "available", currentGuests: 0 },
  {
    id: 8,
    number: "T8",
    seats: 8,
    status: "occupied",
    currentGuests: 8,
    orderTotal: 245.0,
    duration: "1:05",
    server: "John",
  },
  { id: 9, number: "T9", seats: 4, status: "reserved", currentGuests: 0 },
  { id: 10, number: "T10", seats: 4, status: "available", currentGuests: 0 },
  {
    id: 11,
    number: "T11",
    seats: 2,
    status: "occupied",
    currentGuests: 2,
    orderTotal: 62.0,
    duration: "0:28",
    server: "Mike",
  },
  { id: 12, number: "T12", seats: 6, status: "available", currentGuests: 0 },
];
