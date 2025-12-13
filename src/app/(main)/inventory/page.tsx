import { AlertCircle, Package, TrendingDown, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { InventoryItem, inventoryItems } from "@/mocks/inventory";
import { Badge, BadgeVariant } from "@/components/ui/badge";
import { PageHeader } from "@/components/page-header";

export default function InventoryPage() {
  const getStockStatus = (item: InventoryItem) => {
    const percentage = (item.quantity / item.maxStock) * 100;
    if (item.quantity <= item.minStock)
      return { label: "Low Stock", color: "red" };
    if (percentage < 50) return { label: "Medium Stock", color: "yellow" };
    return { label: "Good Stock", color: "green" };
  };

  const statusToVariant: Record<string, BadgeVariant> = {
    red: "danger",
    yellow: "warning",
    green: "success",
  };

  const lowStockItems = inventoryItems.filter(
    (item) => item.quantity <= item.minStock
  );
  const totalCategories = new Set(inventoryItems.map((item) => item.category))
    .size;
  const averageStock =
    inventoryItems.reduce(
      (acc, item) => acc + (item.quantity / item.maxStock) * 100,
      0
    ) / inventoryItems.length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Inventory Management"
        description="Monitor stock levels and manage supplies"
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent>
            <div className="flex items-center gap-3">
              <Package className="w-8 h-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Items</p>
                <p className="text-2xl font-semibold">{inventoryItems.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-rose-500/20 bg-rose-500/10">
          <CardContent>
            <div className="flex items-center gap-3">
              <AlertCircle className="w-8 h-8 text-rose-600" />
              <div>
                <p className="text-sm text-muted-foreground">Low Stock</p>
                <p className="text-2xl font-semibold">
                  {lowStockItems.length} items
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-emerald-600" />
              <div>
                <p className="text-sm text-muted-foreground">Categories</p>
                <p className="text-2xl font-semibold">{totalCategories}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="flex items-center gap-3">
              <TrendingDown className="w-8 h-8 text-violet-600" />
              <div>
                <p className="text-sm text-muted-foreground">Avg. Stock Level</p>
                <p className="text-2xl font-semibold">
                  {averageStock.toFixed(0)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {lowStockItems.length > 0 && (
        <Card className="border-rose-500/20 bg-rose-500/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Low Stock Alert
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {lowStockItems.length} item{lowStockItems.length > 1 ? "s" : ""}{" "}
              need restocking:{" "}
              {lowStockItems.map((item) => item.name).join(", ")}
            </p>
          </CardContent>
        </Card>
      )}
      {lowStockItems.length === 0 && (
        <Card>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              All stock levels look healthy. In a real app, this would reflect live inventory.
            </p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Inventory Items</CardTitle>
            <Button>Add Item</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Item
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Category
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Stock Level
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Supplier
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {inventoryItems.map((item) => {
                  const status = getStockStatus(item);
                  const percentage = (item.quantity / item.maxStock) * 100;

                  return (
                    <tr key={item.id} className="border-b last:border-0">
                      <td className="py-4 px-4">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Last restocked: {item.lastRestocked}
                        </p>
                      </td>
                      <td className="py-4 px-4">
                        <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded bg-muted text-foreground">
                          {item.category}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="space-y-1 min-w-[150px]">
                          <div className="flex justify-between">
                            <span className="font-medium">
                              {item.quantity} {item.unit}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              / {item.maxStock} {item.unit}
                            </span>
                          </div>
                          <Progress
                            value={percentage}
                            className="h-2"
                            ariaLabel={`${item.name} stock level`}
                          />
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge variant={statusToVariant[status.color]}>
                          {status.label}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-sm text-muted-foreground">
                        {item.supplier}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <Button variant="outline" size="sm">
                          Restock
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
