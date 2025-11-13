import {
  AlertCircle,
  Badge,
  Package,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { InventoryItem } from "@/mocks/inventory";
import { inventoryItems } from "@/mocks/inventory";

export default function InventoryPage() {
  const getStockStatus = (item: InventoryItem) => {
    const percentage = (item.quantity / item.maxStock) * 100;
    if (item.quantity <= item.minStock)
      return { label: "Low Stock", color: "red" };
    if (percentage < 50) return { label: "Medium Stock", color: "yellow" };
    return { label: "Good Stock", color: "green" };
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
    <div className="p-4 lg:p-8 space-y-6">
      <div>
        <h2 className="text-gray-900">Inventory Management</h2>
        <p className="text-gray-500">
          Monitor stock levels and manage supplies
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Package className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-gray-500">Total Items</p>
                <p className="text-gray-900">{inventoryItems.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-8 h-8 text-red-600" />
              <div>
                <p className="text-gray-700">Low Stock</p>
                <p className="text-gray-900">{lowStockItems.length} items</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-gray-500">Categories</p>
                <p className="text-gray-900">{totalCategories}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingDown className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-gray-500">Avg. Stock Level</p>
                <p className="text-gray-900">{averageStock.toFixed(0)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {lowStockItems.length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-900">
              <AlertCircle className="w-5 h-5" />
              Low Stock Alert
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-800">
              {lowStockItems.length} item{lowStockItems.length > 1 ? "s" : ""}{" "}
              need restocking:{" "}
              {lowStockItems.map((item) => item.name).join(", ")}
            </p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Inventory Items</CardTitle>
            <Button className="bg-blue-600 hover:bg-blue-700">Add Item</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-gray-700">Item</th>
                  <th className="text-left py-3 px-4 text-gray-700">
                    Category
                  </th>
                  <th className="text-left py-3 px-4 text-gray-700">
                    Stock Level
                  </th>
                  <th className="text-left py-3 px-4 text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 text-gray-700">
                    Supplier
                  </th>
                  <th className="text-right py-3 px-4 text-gray-700">
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
                        <p className="text-gray-900">{item.name}</p>
                        <p className="text-gray-500">
                          Last restocked: {item.lastRestocked}
                        </p>
                      </td>
                      <td className="py-4 px-4">
                        <Badge>{item.category}</Badge>
                      </td>
                      <td className="py-4 px-4">
                        <div className="space-y-1 min-w-[150px]">
                          <div className="flex justify-between">
                            <span className="text-gray-900">
                              {item.quantity} {item.unit}
                            </span>
                            <span className="text-gray-500">
                              / {item.maxStock} {item.unit}
                            </span>
                          </div>
                          <Progress value={percentage} className="h-2" />
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge
                          className={
                            status.color === "red"
                              ? "bg-red-100 text-red-800 hover:bg-red-100"
                              : status.color === "yellow"
                              ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                              : "bg-green-100 text-green-800 hover:bg-green-100"
                          }
                        >
                          {status.label}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-gray-600">
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
