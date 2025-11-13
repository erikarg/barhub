import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { staff, StaffMember } from "@/mocks/staff";
import { Badge, Clock, DollarSign, Star } from "lucide-react";

export default function StaffPage() {
  const getStatusBadge = (status: StaffMember["status"]) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Active
          </Badge>
        );
      case "break":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            On Break
          </Badge>
        );
      case "off-duty":
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
            Off Duty
          </Badge>
        );
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
    <div className="p-4 lg:p-8 space-y-6">
      <div>
        <h2 className="text-gray-900">Staff Management</h2>
        <p className="text-gray-500">Monitor team performance and schedules</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-gray-500">Active Staff</p>
                <p className="text-gray-900">
                  {activeStaff}/{staff.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-green-600">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <p className="text-gray-500">Total Sales Today</p>
                <p className="text-gray-900">${totalSales.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center text-yellow-600">
                <Star className="w-5 h-5" />
              </div>
              <div>
                <p className="text-gray-500">Avg. Rating</p>
                <p className="text-gray-900">{averageRating.toFixed(1)}/5.0</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-gray-500">On Break</p>
                <p className="text-gray-900">
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
                          <AvatarFallback className="bg-blue-600 text-white">
                            {member.initials}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-gray-900 truncate">
                              {member.name}
                            </p>
                            {getStatusBadge(member.status)}
                          </div>
                          <p className="text-gray-500">{member.shift}</p>
                        </div>

                        <div className="text-right space-y-1">
                          {member.role === "Server" &&
                            member.status === "active" && (
                              <>
                                <p className="text-gray-900">
                                  {member.tables} tables
                                </p>
                                <p className="text-gray-500">
                                  ${member.sales.toFixed(2)}
                                </p>
                              </>
                            )}
                          {member.role === "Bartender" && (
                            <p className="text-gray-900">
                              ${member.sales.toFixed(2)}
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
                  className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center">
                    {index + 1}
                  </div>
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-gray-300 text-gray-700">
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-gray-900">{member.name}</p>
                    <p className="text-gray-500">{member.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-900">${member.sales.toFixed(2)}</p>
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
