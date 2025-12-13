import { PageHeader } from "@/components/page-header";
import { OrdersBoard } from "@/components/orders/orders-board";

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Active Orders"
        description="Track and manage current orders"
      />
      <OrdersBoard />
    </div>
  );
}
