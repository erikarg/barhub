import { Badge, Clock, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { tables, TableStatus } from "@/mocks/tables";

export default function TablesPage() {
  const getStatusColor = (status: TableStatus) => {
    switch (status) {
      case "available":
        return "bg-green-50 border-green-200";
      case "occupied":
        return "bg-red-50 border-red-200";
      case "reserved":
        return "bg-yellow-50 border-yellow-200";
    }
  };

  const getStatusBadge = (status: TableStatus) => {
    switch (status) {
      case "available":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Available
          </Badge>
        );
      case "occupied":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            Occupied
          </Badge>
        );
      case "reserved":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            Reserved
          </Badge>
        );
    }
  };

  const stats = {
    total: tables.length,
    occupied: tables.filter((t) => t.status === "occupied").length,
    available: tables.filter((t) => t.status === "available").length,
    reserved: tables.filter((t) => t.status === "reserved").length,
  };

  return (
    <div className="p-4 lg:p-8 space-y-6">
      <div>
        <h2 className="text-gray-900">Table Management</h2>
        <p className="text-gray-500">Monitor and manage restaurant seating</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-gray-500">Total Tables</p>
            <p className="text-gray-900 mt-1">{stats.total}</p>
          </CardContent>
        </Card>
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <p className="text-gray-700">Occupied</p>
            <p className="text-gray-900 mt-1">{stats.occupied}</p>
          </CardContent>
        </Card>
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <p className="text-gray-700">Available</p>
            <p className="text-gray-900 mt-1">{stats.available}</p>
          </CardContent>
        </Card>
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-4">
            <p className="text-gray-700">Reserved</p>
            <p className="text-gray-900 mt-1">{stats.reserved}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {tables.map((table) => (
          <Card
            key={table.id}
            className={`border-2 ${getStatusColor(table.status)}`}
          >
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-gray-900">Table {table.number}</p>
                {getStatusBadge(table.status)}
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <Users className="w-4 h-4" />
                <span>
                  {table.status === "occupied" ? `${table.currentGuests}/` : ""}
                  {table.seats} seats
                </span>
              </div>

              {table.status === "occupied" && (
                <>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{table.duration}</span>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Order Total:</span>
                      <span className="text-gray-900">
                        ${table.orderTotal?.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-gray-500">Server:</span>
                      <span className="text-gray-900">{table.server}</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-2">
                    View Order
                  </Button>
                </>
              )}

              {table.status === "available" && (
                <Button className="w-full mt-2 bg-blue-600 hover:bg-blue-700">
                  Seat Guests
                </Button>
              )}

              {table.status === "reserved" && (
                <div className="space-y-2">
                  <p className="text-gray-600">Reserved for 7:30 PM</p>
                  <Button variant="outline" className="w-full">
                    View Details
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
