export interface StaffMember {
  id: string;
  name: string;
  role: string;
  status: "active" | "break" | "off-duty";
  shift: string;
  tables: number;
  sales: number;
  rating: number;
  initials: string;
}

export const staff: StaffMember[] = [
  {
    id: "1",
    name: "Silvia Johnson",
    role: "Server",
    status: "active",
    shift: "10:00 AM - 6:00 PM",
    tables: 4,
    sales: 456.5,
    rating: 4.8,
    initials: "SJ",
  },
  {
    id: "2",
    name: "Mike Chen",
    role: "Server",
    status: "active",
    shift: "10:00 AM - 6:00 PM",
    tables: 3,
    sales: 328.0,
    rating: 4.6,
    initials: "MC",
  },
  {
    id: "3",
    name: "John Davis",
    role: "Server",
    status: "active",
    shift: "12:00 PM - 8:00 PM",
    tables: 2,
    sales: 245.0,
    rating: 4.9,
    initials: "JD",
  },
  {
    id: "4",
    name: "Emily Rodriguez",
    role: "Bartender",
    status: "active",
    shift: "4:00 PM - 12:00 AM",
    tables: 0,
    sales: 678.5,
    rating: 4.7,
    initials: "ER",
  },
  {
    id: "5",
    name: "David Kim",
    role: "Chef",
    status: "active",
    shift: "10:00 AM - 6:00 PM",
    tables: 0,
    sales: 0,
    rating: 4.9,
    initials: "DK",
  },
  {
    id: "6",
    name: "Lisa Martinez",
    role: "Server",
    status: "break",
    shift: "10:00 AM - 6:00 PM",
    tables: 0,
    sales: 289.0,
    rating: 4.5,
    initials: "LM",
  },
  {
    id: "7",
    name: "Tom Anderson",
    role: "Host",
    status: "active",
    shift: "5:00 PM - 11:00 PM",
    tables: 0,
    sales: 0,
    rating: 4.6,
    initials: "TA",
  },
  {
    id: "8",
    name: "Rachel Green",
    role: "Server",
    status: "off-duty",
    shift: "Off Today",
    tables: 0,
    sales: 0,
    rating: 4.8,
    initials: "RG",
  },
];
