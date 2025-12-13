import { PageHeader } from "@/components/page-header";
import { TablesBoard } from "@/components/tables/tables-board";

export default function TablesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Table Management"
        description="Monitor and manage restaurant seating"
      />
      <TablesBoard />
    </div>
  );
}
