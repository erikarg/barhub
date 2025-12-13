"use client";

import * as React from "react";
import { Clock, ChefHat, CheckCircle, RotateCcw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge, BadgeVariant } from "@/components/ui/badge";
import { Order, OrderItem, OrderStatus, orders as seedOrders } from "@/mocks/orders";
import { formatCurrency } from "@/lib/utils";

type OrdersState = Order[];

const STORAGE_KEY = "barhub_demo_orders";

function readStoredOrders(): OrdersState | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as OrdersState;
  } catch {
    return null;
  }
}

function writeStoredOrders(value: OrdersState) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
}

function nextStatus(status: OrderStatus): OrderStatus {
  switch (status) {
    case "pending":
      return "preparing";
    case "preparing":
      return "ready";
    case "ready":
      return "served";
    case "served":
    default:
      return "served";
  }
}

export function OrdersBoard() {
  const [orders, setOrders] = React.useState<OrdersState>(() => {
    const stored = readStoredOrders();
    return stored ?? seedOrders;
  });

  React.useEffect(() => {
    writeStoredOrders(orders);
  }, [orders]);

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

  const stats = React.useMemo(() => {
    return {
      pending: orders.filter((o) => o.status === "pending").length,
      preparing: orders.filter((o) => o.status === "preparing").length,
      ready: orders.filter((o) => o.status === "ready").length,
    };
  }, [orders]);

  const advance = React.useCallback((orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: nextStatus(o.status) } : o))
    );
  }, []);

  const reset = React.useCallback(() => {
    window.localStorage.removeItem(STORAGE_KEY);
    setOrders(seedOrders);
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-amber-500/20 bg-amber-500/10">
          <CardContent>
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="mt-1 text-2xl font-semibold">{stats.pending} orders</p>
          </CardContent>
        </Card>
        <Card className="border-primary/20 bg-primary/10">
          <CardContent>
            <p className="text-sm text-muted-foreground">Preparing</p>
            <p className="mt-1 text-2xl font-semibold">
              {stats.preparing} orders
            </p>
          </CardContent>
        </Card>
        <Card className="border-emerald-500/20 bg-emerald-500/10">
          <CardContent>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm text-muted-foreground">Ready to Serve</p>
                <p className="mt-1 text-2xl font-semibold">{stats.ready} orders</p>
              </div>
              <Button
                variant="outline"
                size="icon"
                aria-label="Reset demo order statuses"
                onClick={reset}
              >
                <RotateCcw className="size-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {orders.length === 0 ? (
        <Card>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              No orders right now. In a real app, this would update in real time.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{order.id}</CardTitle>
                    <p className="mt-1 text-sm text-muted-foreground">
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
                  {order.items.map((item: OrderItem) => (
                    <div
                      key={`${order.id}-${item.name}`}
                      className="flex justify-between items-start"
                    >
                      <div className="flex-1">
                        <p className="font-medium">
                          {item.quantity}x {item.name}
                        </p>
                        {item.notes && (
                          <p className="text-sm text-muted-foreground">
                            {item.notes}
                          </p>
                        )}
                      </div>
                      <p className="font-medium">
                        {formatCurrency(item.quantity * item.price)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Total</span>
                    <span className="font-medium">{formatCurrency(order.total)}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Server:</span>
                    <span className="font-medium">{order.server}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  {order.status !== "served" ? (
                    <Button className="flex-1" onClick={() => advance(order.id)}>
                      {order.status === "pending"
                        ? "Start Preparing"
                        : order.status === "preparing"
                          ? "Mark Ready"
                          : "Mark Served"}
                    </Button>
                  ) : (
                    <Button variant="secondary" className="flex-1" disabled>
                      Served
                    </Button>
                  )}

                  <Button variant="outline">Details</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}


