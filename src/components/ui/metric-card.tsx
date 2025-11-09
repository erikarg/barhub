import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DollarSign,
  Users,
  TrendingUp,
  LucideIcon,
  UtensilsCrossed,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  DollarSign,
  Users,
  TrendingUp,
  UtensilsCrossed,
};

interface MetricCardProps {
  title: string;
  value: string;
  description?: string;
  icon: string;
  iconColor?: string;
  iconBgColor?: string;
  change?: string;
  changeType?: "positive" | "negative";
}

export function MetricCard({
  title,
  value,
  description,
  icon,
  iconColor = "",
  iconBgColor = "",
  change,
  changeType,
}: MetricCardProps) {
  const Icon = iconMap[icon];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm">{title}</CardTitle>
        <div className={`${iconBgColor} p-3 rounded-lg`}>
          <Icon className={`size-5 ${iconColor}`} />
        </div>
      </CardHeader>
      <CardContent>
        <div>{value}</div>
        <p className={`text-xs mt-1 font-bold ${iconColor}`}>
          {change && changeType && (
            <span
              className={
                changeType === "positive" ? "text-green-600" : "text-red-600"
              }
            >
              {change}{" "}
            </span>
          )}
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
