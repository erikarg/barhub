"use client";

import * as React from "react";
import { Clock, Users, RotateCcw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge, BadgeVariant } from "@/components/ui/badge";
import { Table, TableStatus, tables as seedTables } from "@/mocks/tables";
import { formatCurrency, cn } from "@/lib/utils";

type TablesState = Table[];
const STORAGE_KEY = "barhub_demo_tables";

function readStoredTables(): TablesState | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as TablesState;
  } catch {
    return null;
  }
}

function writeStoredTables(value: TablesState) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
}

export function TablesBoard() {
  const [tables, setTables] = React.useState<TablesState>(() => {
    const stored = readStoredTables();
    return stored ?? seedTables;
  });

  React.useEffect(() => {
    writeStoredTables(tables);
  }, [tables]);

  const statusToVariant: Record<TableStatus, BadgeVariant> = {
    available: "success",
    occupied: "danger",
    reserved: "warning",
  };

  const STATUS_CARD_CLASSES: Record<TableStatus, string> = {
    available: "bg-emerald-500/10 border-emerald-500/20",
    occupied: "bg-rose-500/10 border-rose-500/20",
    reserved: "bg-amber-500/10 border-amber-500/20",
  };

  const stats = React.useMemo(() => {
    return {
      total: tables.length,
      occupied: tables.filter((t) => t.status === "occupied").length,
      available: tables.filter((t) => t.status === "available").length,
      reserved: tables.filter((t) => t.status === "reserved").length,
    };
  }, [tables]);

  const seatGuests = React.useCallback((id: number) => {
    setTables((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const guests = Math.max(1, Math.min(t.seats, 2));
        return {
          ...t,
          status: "occupied",
          currentGuests: guests,
          duration: "0:05",
          orderTotal: 24.5,
          server: "Demo",
        };
      })
    );
  }, []);

  const clearTable = React.useCallback((id: number) => {
    setTables((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        return {
          ...t,
          status: "available",
          currentGuests: 0,
          duration: undefined,
          orderTotal: undefined,
          server: undefined,
        };
      })
    );
  }, []);

  const reset = React.useCallback(() => {
    window.localStorage.removeItem(STORAGE_KEY);
    setTables(seedTables);
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent>
            <p className="text-sm text-muted-foreground">Total Tables</p>
            <p className="mt-1 text-2xl font-semibold">{stats.total}</p>
          </CardContent>
        </Card>
        <Card className="border-rose-500/20 bg-rose-500/10">
          <CardContent>
            <p className="text-sm text-muted-foreground">Occupied</p>
            <p className="mt-1 text-2xl font-semibold">{stats.occupied}</p>
          </CardContent>
        </Card>
        <Card className="border-emerald-500/20 bg-emerald-500/10">
          <CardContent>
            <p className="text-sm text-muted-foreground">Available</p>
            <p className="mt-1 text-2xl font-semibold">{stats.available}</p>
          </CardContent>
        </Card>
        <Card className="border-amber-500/20 bg-amber-500/10">
          <CardContent>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm text-muted-foreground">Reserved</p>
                <p className="mt-1 text-2xl font-semibold">{stats.reserved}</p>
              </div>
              <Button
                variant="outline"
                size="icon"
                aria-label="Reset demo table statuses"
                onClick={reset}
              >
                <RotateCcw className="size-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {tables.map((table) => (
          <Card
            key={table.id}
            className={cn("border-2", STATUS_CARD_CLASSES[table.status])}
          >
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <p className="font-medium">Table {table.number}</p>
                <Badge variant={statusToVariant[table.status]}>
                  {table.status.charAt(0).toUpperCase() + table.status.slice(1)}
                </Badge>
              </div>

              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="w-4 h-4" />
                <span>
                  {table.status === "occupied" ? `${table.currentGuests}/` : ""}
                  {table.seats} seats
                </span>
              </div>

              {table.status === "occupied" && (
                <>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{table.duration}</span>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Order Total:</span>
                      <span className="font-medium">
                        {formatCurrency(table.orderTotal ?? 0)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-muted-foreground">Server:</span>
                      <span className="font-medium">{table.server}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-1">
                    <Button variant="outline" className="flex-1">
                      View Order
                    </Button>
                    <Button
                      variant="secondary"
                      className="flex-1"
                      onClick={() => clearTable(table.id)}
                    >
                      Clear
                    </Button>
                  </div>
                </>
              )}

              {table.status === "available" && (
                <Button className="w-full mt-2" onClick={() => seatGuests(table.id)}>
                  Seat Guests
                </Button>
              )}

              {table.status === "reserved" && (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Reserved for 7:30 PM
                  </p>
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


