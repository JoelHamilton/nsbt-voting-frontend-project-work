
import NavigationBar from "@/components/NavigationBar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Clock } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for elections
const elections = [
  {
    id: 1,
    title: "Student Union President 2024",
    description: "Vote for the next Student Union President who will represent student interests and lead campus initiatives.",
    status: "active",
    startDate: "2024-01-15",
    endDate: "2024-01-20",
    totalVoters: 2450,
    hasVoted: false
  },
  {
    id: 2,
    title: "Faculty Representative Election",
    description: "Choose representatives from each faculty to serve on the academic council.",
    status: "active",
    startDate: "2024-01-18",
    endDate: "2024-01-25",
    totalVoters: 1890,
    hasVoted: true
  },
  {
    id: 3,
    title: "Sports Committee Election",
    description: "Select members for the university sports committee to organize athletic events and manage facilities.",
    status: "upcoming",
    startDate: "2024-02-01",
    endDate: "2024-02-05",
    totalVoters: 0,
    hasVoted: false
  }
];

const Vote = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'ended':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Active Now';
      case 'upcoming':
        return 'Coming Soon';
      case 'ended':
        return 'Ended';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar userType="student" />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">University Elections</h1>
          <p className="text-gray-600">
            Participate in democratic decision-making for your university community
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {elections.map((election) => (
            <Card key={election.id} className="hover-lift bg-white border-0 shadow-md">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-2">
                  <Badge className={getStatusColor(election.status)}>
                    {getStatusText(election.status)}
                  </Badge>
                  {election.hasVoted && (
                    <Badge variant="secondary" className="bg-green-50 text-green-700">
                      Voted ✓
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900 leading-tight">
                  {election.title}
                </CardTitle>
                <CardDescription className="text-gray-600 line-clamp-3">
                  {election.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(election.startDate).toLocaleDateString()} - {new Date(election.endDate).toLocaleDateString()}
                  </div>
                  
                  {election.status === 'active' && (
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="h-4 w-4 mr-2" />
                      {election.totalVoters} eligible voters
                    </div>
                  )}
                  
                  {election.status === 'upcoming' && (
                    <div className="flex items-center text-sm text-blue-600">
                      <Clock className="h-4 w-4 mr-2" />
                      Starts {new Date(election.startDate).toLocaleDateString()}
                    </div>
                  )}
                </div>

                {election.status === 'active' && !election.hasVoted && (
                  <Button 
                    asChild 
                    className="w-full university-gradient hover:shadow-md transition-all duration-200"
                  >
                    <Link to={`/vote/${election.id}`}>
                      View & Vote
                    </Link>
                  </Button>
                )}

                {election.status === 'active' && election.hasVoted && (
                  <Button 
                    asChild 
                    variant="outline" 
                    className="w-full border-green-200 text-green-700 hover:bg-green-50"
                  >
                    <Link to={`/vote/${election.id}`}>
                      View Results
                    </Link>
                  </Button>
                )}

                {election.status === 'upcoming' && (
                  <Button 
                    disabled 
                    className="w-full"
                  >
                    Election Not Started
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {elections.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Users className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No Elections Available</h3>
            <p className="text-gray-600">Check back later for upcoming university elections.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Vote;
