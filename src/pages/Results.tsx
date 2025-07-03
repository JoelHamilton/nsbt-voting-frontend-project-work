import NavigationBar from "@/components/NavigationBar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Trophy, Users, Calendar, BarChart3 } from "lucide-react";

// Mock results data
const electionResults = [
  {
    id: 1,
    title: "Student Union President 2024",
    status: "completed",
    endDate: "2024-01-20",
    totalVotes: 1847,
    totalVoters: 2450,
    candidates: [
      {
        id: 1,
        name: "Sarah Johnson",
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200",
        votes: 789,
        percentage: 42.7,
        winner: true
      },
      {
        id: 2,
        name: "Michael Chen",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
        votes: 634,
        percentage: 34.3,
        winner: false
      },
      {
        id: 3,
        name: "Aisha Patel",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
        votes: 424,
        percentage: 23.0,
        winner: false
      }
    ]
  },
  {
    id: 2,
    title: "Faculty Representative Election",
    status: "active",
    endDate: "2024-01-25",
    totalVotes: 1234,
    totalVoters: 1890,
    candidates: [
      {
        id: 4,
        name: "Dr. James Wilson",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200",
        votes: 567,
        percentage: 45.9,
        winner: false
      },
      {
        id: 5,
        name: "Prof. Maria Garcia",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200",
        votes: 445,
        percentage: 36.1,
        winner: false
      },
      {
        id: 6,
        name: "Dr. Robert Kim",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200",
        votes: 222,
        percentage: 18.0,
        winner: false
      }
    ]
  }
];

const Results = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'active':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Final Results';
      case 'active':
        return 'Live Results';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar userType="student" />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Election Results</h1>
          <p className="text-gray-600">
            Real-time and final results for university elections
          </p>
        </div>

        <div className="space-y-8">
          {electionResults.map((election) => (
            <Card key={election.id} className="border-0 shadow-lg">
              <CardHeader className="pb-6">
                <div className="flex items-start justify-between mb-4">
                  <Badge className={getStatusColor(election.status)}>
                    {getStatusText(election.status)}
                  </Badge>
                  <div className="text-right text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Ended: {new Date(election.endDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                
                <CardTitle className="text-2xl font-bold text-gray-900">
                  {election.title}
                </CardTitle>
                
                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    {election.totalVotes} votes cast
                  </div>
                  <div>
                    Turnout: {((election.totalVotes / election.totalVoters) * 100).toFixed(1)}%
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-6">
                  {election.candidates
                    .sort((a, b) => b.votes - a.votes)
                    .map((candidate, index) => (
                    <div key={candidate.id} className="relative">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="relative">
                            <Avatar className="w-12 h-12">
                              <AvatarImage src={candidate.image} alt={candidate.name} />
                              <AvatarFallback>{candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            {candidate.winner && (
                              <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                                <Trophy className="h-3 w-3 text-yellow-800" />
                              </div>
                            )}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                                {candidate.name}
                                {index === 0 && election.status === 'completed' && (
                                  <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                                    Winner
                                  </Badge>
                                )}
                                {index === 0 && election.status === 'active' && (
                                  <Badge className="bg-blue-100 text-blue-800 text-xs">
                                    Leading
                                  </Badge>
                                )}
                              </h3>
                              <div className="text-right">
                                <div className="font-semibold text-gray-900">
                                  {candidate.votes.toLocaleString()} votes
                                </div>
                                <div className="text-sm font-medium text-gray-600">
                                  {candidate.percentage.toFixed(1)}%
                                </div>
                              </div>
                            </div>
                            
                            <Progress 
                              value={candidate.percentage} 
                              className="h-3"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {election.status === 'active' && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      🔄 Results are updated in real-time. Final results will be available after the election ends.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {electionResults.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <BarChart3 className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No Results Available</h3>
            <p className="text-gray-600">Results will appear here after elections are completed.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Results;
