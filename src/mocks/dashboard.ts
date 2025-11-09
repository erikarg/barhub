export const revenueData = [
  { day: "Mon", revenue: 4200, orders: 45 },
  { day: "Tue", revenue: 3800, orders: 42 },
  { day: "Wed", revenue: 5100, orders: 58 },
  { day: "Thu", revenue: 6200, orders: 67 },
  { day: "Fri", revenue: 8900, orders: 95 },
  { day: "Sat", revenue: 9500, orders: 102 },
  { day: "Sun", revenue: 7200, orders: 78 },
];

export const categoryData = [
  { name: "Food", value: 45000, color: "#3b82f6" },
  { name: "Beverages", value: 28000, color: "#8b5cf6" },
  { name: "Bar", value: 22000, color: "#ec4899" },
  { name: "Desserts", value: 12000, color: "#f59e0b" },
];

export const peakHours = [
  { hour: "11am", covers: 12 },
  { hour: "12pm", covers: 28 },
  { hour: "1pm", covers: 35 },
  { hour: "2pm", covers: 22 },
  { hour: "6pm", covers: 42 },
  { hour: "7pm", covers: 58 },
  { hour: "8pm", covers: 62 },
  { hour: "9pm", covers: 45 },
];

export const topItems = [
  { name: "Wagyu Burger", orders: 45, revenue: 1350 },
  { name: "Caesar Salad", orders: 38, revenue: 570 },
  { name: "Craft Beer Flight", orders: 52, revenue: 780 },
  { name: "Truffle Fries", orders: 42, revenue: 504 },
  { name: "Signature Cocktail", orders: 67, revenue: 1005 },
];

export const metricsData = [
  {
    title: "Today's Revenue",
    value: "$5,847",
    icon: "DollarSign",
    change: "+12.5%",
    changeType: "positive" as const,
    iconColor: "text-green-500",
    iconBgColor: "bg-green-100",
  },
  {
    title: "Active Orders",
    value: "24",
    description: "8 pending, 16 in progress",
    icon: "UtensilsCrossed",
    changeType: "positive" as const,
    iconColor: "text-blue-500",
    iconBgColor: "bg-blue-100",
  },
  {
    title: "Tables Occupied",
    value: "18/25",
    icon: "Users",
    description: "72%",
    iconColor: "text-purple-500",
    iconBgColor: "bg-purple-100",
  },
  {
    title: "Average Order Value",
    value: "$52.50",
    icon: "TrendingUp",
    change: "+5.2%",
    changeType: "positive" as const,
    iconColor: "text-orange-500",
    iconBgColor: "bg-orange-100",
  },
];

export const chartTooltipStyle = {
  backgroundColor: "white",
  border: "1px solid #e2e8f0",
  borderRadius: "8px",
};
