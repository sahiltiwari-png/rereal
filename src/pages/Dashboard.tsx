import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  return (
    <div className="p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to Trivara Real Estate Admin Panel</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/30">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl">Property Management</CardTitle>
                <CardDescription>Add and manage property listings</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              <Link to="/properties/add" className="flex-1">
                <Button className="w-full shadow-md hover:shadow-lg transition-all">Add Property</Button>
              </Link>
              <Link to="/properties" className="flex-1">
                <Button variant="outline" className="w-full hover:bg-primary/5">View All</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-all duration-300 border-border/50 hover:border-accent/30">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors">
                <FileText className="h-6 w-6 text-accent" />
              </div>
              <div>
                <CardTitle className="text-xl">Customer Queries</CardTitle>
                <CardDescription>View and manage customer inquiries</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Link to="/queries">
              <Button variant="outline" className="w-full hover:bg-accent/5">View Queries</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
