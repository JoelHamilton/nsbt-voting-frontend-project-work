
import NavigationBar from "@/components/NavigationBar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Users, Vote, BarChart3, Calendar, Settings } from "lucide-react";
import { Link } from "react-router-dom";

// Mock admin data
const dashboardData = {
  stats: {
    totalElections: 12,
    activeElections: 2,
    totalVoters: 4340,
    totalVotes: 3081
  },
  recentElections: [
    {
      id: 1,
      title: "Student Union President 2024",
      status: "completed",
      startDate: "2024-01-15",
      endDate: "2024-01-20",
      totalVotes: 1847,
      totalVoters: 2450
    },
    {
      id: 2,
      title: "Faculty Representative Election",
      status: "active",
      startDate: "2024-01-18",
      endDate: "2024-01-25",
      totalVotes: 1234,
      totalVoters: 1890
    },
    {
      id: 3,
      title: "Sports Committee Election",
      status: "upcoming",
      startDate: "2024-02-01",
      endDate: "2024-02-05",
      totalVotes: 0,
      totalVoters: 0
    }
  ]
};

const AdminDashboard = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'upcoming':
        return 'Upcoming';
      case 'completed':
        return 'Completed';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar userType="admin" />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">
              Manage university elections and monitor voting activities
            </p>
          </div>
          
          <Button asChild className="university-gradient hover:shadow-lg transition-all duration-300">
            <Link to="/admin/create">
              <Plus className="h-4 w-4 mr-2" />
              Create Election
            </Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Elections</p>
                  <p className="text-2xl font-bold text-gray-900">{dashboardData.stats.totalElections}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Elections</p>
                  <p className="text-2xl font-bold text-green-600">{dashboardData.stats.activeElections}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Vote className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Voters</p>
                  <p className="text-2xl font-bold text-gray-900">{dashboardData.stats.totalVoters.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Votes</p>
                  <p className="text-2xl font-bold text-gray-900">{dashboardData.stats.totalVotes.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-md hover-lift cursor-pointer">
            <Link to="/admin/create">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 university-gradient rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Plus className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Create Election</h3>
                <p className="text-sm text-gray-600">Set up a new election with dates and details</p>
              </CardContent>
            </Link>
          </Card>

          <Card className="border-0 shadow-md hover-lift cursor-pointer">
            <Link to="/admin/candidates">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Manage Candidates</h3>
                <p className="text-sm text-gray-600">Add and manage candidates for elections</p>
              </CardContent>
            </Link>
          </Card>

          <Card className="border-0 shadow-md hover-lift cursor-pointer">
            <Link to="/admin/results">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">View Results</h3>
                <p className="text-sm text-gray-600">Monitor and export election results</p>
              </CardContent>
            </Link>
          </Card>
        </div>

        {/* Recent Elections */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900">Recent Elections</CardTitle>
            <CardDescription>
              Overview of recent and upcoming elections
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData.recentElections.map((election) => (
                <div key={election.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{election.title}</h3>
                      <Badge className={getStatusColor(election.status)}>
                        {getStatusText(election.status)}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600">
                      {new Date(election.startDate).toLocaleDateString()} - {new Date(election.endDate).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">
                      {election.totalVotes > 0 ? `${election.totalVotes} votes` : 'No votes yet'}
                    </div>
                    {election.totalVoters > 0 && (
                      <div className="text-xs text-gray-500">
                        {election.totalVoters} eligible voters
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
