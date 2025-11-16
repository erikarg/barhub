import { Clock, ChefHat, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { OrderItem, OrderStatus, orders } from "@/mocks/orders";
import { Badge, BadgeVariant } from "@/components/ui/badge";
import { PageHeader } from "@/components/page-header";
import { formatCurrency } from "@/lib/utils";

export default function OrdersPage() {
  const statusIcons: Record<OrderStatus, React.ReactNode> = {
    pending: <Clock className="w-4 h-4" />,
    preparing: <ChefHat className="w-4 h-4" />,
    ready: <CheckCircle className="w-4 h-4" />,
    served: <CheckCircle className="w-4 h-4" />,
  };

  const statusToVariant: Record<OrderStatus, BadgeVariant> = {
    pending: "warning",
    preparing: "info",
    ready: "success",
    served: "default",
  };

  const stats = {
    pending: orders.filter((o) => o.status === "pending").length,
    preparing: orders.filter((o) => o.status === "preparing").length,
    ready: orders.filter((o) => o.status === "ready").length,
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Active Orders"
        description="Track and manage current orders"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent>
            <p className="text-gray-700">Pending</p>
            <p className="text-gray-900 mt-1">{stats.pending} orders</p>
          </CardContent>
        </Card>
        <Card className="border-blue-200 bg-blue-50">
          <CardContent>
            <p className="text-gray-700">Preparing</p>
            <p className="text-gray-900 mt-1">{stats.preparing} orders</p>
          </CardContent>
        </Card>
        <Card className="border-green-200 bg-green-50">
          <CardContent>
            <p className="text-gray-700">Ready to Serve</p>
            <p className="text-gray-900 mt-1">{stats.ready} orders</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{order.id}</CardTitle>
                  <p className="text-gray-500 mt-1">
                    Table {order.table} • {order.time}
                  </p>
                </div>

                <Badge variant={statusToVariant[order.status]}>
                  {statusIcons[order.status]}
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2">
                {order.items.map((item: OrderItem, index: number) => (
                  <div key={index} className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="text-gray-900">
                        {item.quantity}x {item.name}
                      </p>
                      {item.notes && (
                        <p className="text-gray-500">{item.notes}</p>
                      )}
                    </div>
                    <p className="text-gray-900">
                      {formatCurrency(item.quantity * item.price)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Total</span>
                  <span className="text-gray-900">
                    {formatCurrency(order.total)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Server:</span>
                  <span className="text-gray-900">{order.server}</span>
                </div>
              </div>

              <div className="flex gap-2">
                {order.status === "pending" && (
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                    Start Preparing
                  </Button>
                )}

                {order.status === "preparing" && (
                  <Button className="flex-1 bg-green-600 hover:bg-green-700">
                    Mark Ready
                  </Button>
                )}

                {order.status === "ready" && (
                  <Button className="flex-1 bg-gray-900 hover:bg-gray-800">
                    Mark Served
                  </Button>
                )}

                <Button variant="outline">Details</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
