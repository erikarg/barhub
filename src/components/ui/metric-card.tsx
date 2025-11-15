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
    <Card className="gap-0">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-sm text-gray-500">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-sm">{value}</div>
          <div className={`${iconBgColor} p-3 rounded-lg`}>
            <Icon className={`size-5 ${iconColor}`} />
          </div>
        </div>
        <p className={`text-xs ${iconColor}`}>
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
