import { UserButton } from "@clerk/clerk-react";
import { LayoutDashboard, BarChart, Settings, LogOut } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col p-5 space-y-6">
        <h2 className="text-xl font-bold text-center">My Dashboard</h2>
        <nav className="space-y-3">
          <a href="#" className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-800">
            <LayoutDashboard size={20} /> Dashboard
          </a>
          <a href="#" className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-800">
            <BarChart size={20} /> Analytics
          </a>
          <a href="#" className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-800">
            <Settings size={20} /> Settings
          </a>
        </nav>
        <div className="mt-auto">
          <a href="#" className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-800">
            <LogOut size={20} /> Logout
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        {/* Navbar */}
        <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <UserButton />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">1,245</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">$25,430</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">732</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
