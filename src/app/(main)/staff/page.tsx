import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { staff, StaffMember } from "@/mocks/staff";
import { Clock, DollarSign, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/page-header";
import { formatCurrency } from "@/lib/utils";

export default function StaffPage() {
  const getStatusBadge = (status: StaffMember["status"]) => {
    switch (status) {
      case "active":
        return <Badge variant="success">Active</Badge>;
      case "break":
        return <Badge variant="warning">On Break</Badge>;
      case "off-duty":
        return <Badge variant="default">Off Duty</Badge>;
      default:
        return null;
    }
  };

  const activeStaff = staff.filter((s) => s.status === "active").length;
  const totalSales = staff.reduce((acc, s) => acc + s.sales, 0);
  const averageRating =
    staff.reduce((acc, s) => acc + s.rating, 0) / staff.length;

  const roleGroups = {
    Servers: staff.filter((s) => s.role === "Server"),
    Kitchen: staff.filter((s) => s.role === "Chef"),
    Bar: staff.filter((s) => s.role === "Bartender"),
    Other: staff.filter((s) => ["Host", "Manager"].includes(s.role)),
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Staff Management"
        description="Monitor team performance and schedules"
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Staff</p>
                <p className="text-2xl font-semibold">
                  {activeStaff}/{staff.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-600">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Sales Today</p>
                <p className="text-2xl font-semibold">{formatCurrency(totalSales)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center text-amber-600">
                <Star className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg. Rating</p>
                <p className="text-2xl font-semibold">{averageRating.toFixed(1)}/5.0</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-violet-500/10 rounded-lg flex items-center justify-center text-violet-600">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">On Break</p>
                <p className="text-2xl font-semibold">
                  {staff.filter((s) => s.status === "break").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        {Object.entries(roleGroups).map(
          ([role, members]) =>
            members.length > 0 && (
              <Card key={role}>
                <CardHeader>
                  <CardTitle>{role}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {members.map((member) => (
                      <div
                        key={member.id}
                        className="flex items-center gap-4 p-4 border rounded-lg"
                      >
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {member.initials}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-medium truncate">
                              {member.name}
                            </p>
                            {getStatusBadge(member.status)}
                          </div>
                          <p className="text-sm text-muted-foreground">{member.shift}</p>
                        </div>

                        <div className="text-right space-y-1">
                          {member.role === "Server" &&
                            member.status === "active" && (
                              <>
                                <p className="font-medium">
                                  {member.tables} tables
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {formatCurrency(member.sales)}
                                </p>
                              </>
                            )}
                          {member.role === "Bartender" && (
                            <p className="font-medium">
                              {formatCurrency(member.sales)}
                            </p>
                          )}
                          <div className="flex items-center gap-1 text-yellow-600">
                            <Star className="w-4 h-4 fill-current" />
                            <span>{member.rating}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Performers Today</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {staff
              .filter((s) => s.sales > 0)
              .sort((a, b) => b.sales - a.sales)
              .slice(0, 5)
              .map((member, index) => (
                <div
                  key={member.id}
                  className="flex items-center gap-4 p-3 bg-muted rounded-lg"
                >
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                    {index + 1}
                  </div>
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-background text-muted-foreground border">
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      {formatCurrency(member.sales)}
                    </p>
                    <div className="flex items-center gap-1 text-yellow-600">
                      <Star className="w-3 h-3 fill-current" />
                      <span>{member.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
