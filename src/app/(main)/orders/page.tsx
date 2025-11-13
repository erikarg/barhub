import { Clock, ChefHat, CheckCircle, Badge } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { OrderItem, OrderStatus, orders } from "@/mocks/orders";

export default function OrdersPage() {
  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "preparing":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "ready":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "served":
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "preparing":
        return <ChefHat className="w-4 h-4" />;
      case "ready":
        return <CheckCircle className="w-4 h-4" />;
      case "served":
        return <CheckCircle className="w-4 h-4" />;
    }
  };

  const stats = {
    pending: orders.filter((o) => o.status === "pending").length,
    preparing: orders.filter((o) => o.status === "preparing").length,
    ready: orders.filter((o) => o.status === "ready").length,
  };

  return (
    <div className="p-4 lg:p-8 space-y-6">
      <div>
        <h2 className="text-gray-900">Active Orders</h2>
        <p className="text-gray-500">Track and manage current orders</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-4">
            <p className="text-gray-700">Pending</p>
            <p className="text-gray-900 mt-1">{stats.pending} orders</p>
          </CardContent>
        </Card>
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <p className="text-gray-700">Preparing</p>
            <p className="text-gray-900 mt-1">{stats.preparing} orders</p>
          </CardContent>
        </Card>
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
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
                <Badge className={getStatusColor(order.status)}>
                  <span className="flex items-center gap-1">
                    {getStatusIcon(order.status)}
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </span>
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
                      ${(item.quantity * item.price).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Total</span>
                  <span className="text-gray-900">
                    ${order.total.toFixed(2)}
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
