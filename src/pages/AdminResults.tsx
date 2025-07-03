
import { useState } from "react";
import { Link } from "react-router-dom";
import NavigationBar from "@/components/NavigationBar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, BarChart3, Download, Calendar, Users, Trophy, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for admin results
const electionsWithResults = [
  {
    id: 1,
    title: "Student Union President 2024",
    status: "completed",
    startDate: "2024-01-15",
    endDate: "2024-01-20",
    totalVotes: 1847,
    totalVoters: 2450,
    turnout: 75.4,
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
    startDate: "2024-01-18",
    endDate: "2024-01-25",
    totalVotes: 1234,
    totalVoters: 1890,
    turnout: 65.3,
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

const AdminResults = () => {
  const { toast } = useToast();
  const [selectedElection, setSelectedElection] = useState("");

  const selectedElectionData = electionsWithResults.find(e => e.id === parseInt(selectedElection));

  const handleExportResults = () => {
    if (!selectedElectionData) return;
    
    toast({
      title: "Exporting Results",
      description: "Results are being exported to CSV format...",
    });
    
    // Simulate export
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "Results have been downloaded successfully.",
      });
    }, 2000);
  };

  const handleCloseElection = () => {
    if (!selectedElectionData || selectedElectionData.status !== 'active') return;
    
    toast({
      title: "Election Closed",
      description: "The election has been manually closed and results are now final.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Live Results';
      case 'completed':
        return 'Final Results';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar userType="admin" />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/admin">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Election Results</h1>
            <p className="text-gray-600">
              Monitor, analyze, and export election results
            </p>
          </div>
        </div>

        {/* Election Selection */}
        <Card className="border-0 shadow-md mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Select Election to View Results
                </Label>
                <Select value={selectedElection} onValueChange={setSelectedElection}>
                  <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-primary">
                    <SelectValue placeholder="Choose an election" />
                  </SelectTrigger>
                  <SelectContent>
                    {electionsWithResults.map((election) => (
                      <SelectItem key={election.id} value={election.id.toString()}>
                        <div className="flex items-center gap-2">
                          <span>{election.title}</span>
                          <Badge className={getStatusColor(election.status)}>
                            {getStatusText(election.status)}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {selectedElectionData && (
                <div className="flex gap-2">
                  <Button 
                    onClick={handleExportResults}
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export CSV
                  </Button>
                  
                  {selectedElectionData.status === 'active' && (
                    <Button 
                      onClick={handleCloseElection}
                      variant="outline"
                      className="border-red-500 text-red-600 hover:bg-red-50"
                    >
                      <AlertCircle className="h-4 w-4 mr-2" />
                      Close Election
                    </Button>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {selectedElectionData ? (
          <div className="space-y-8">
            {/* Election Overview */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <Badge className={getStatusColor(selectedElectionData.status)}>
                    {getStatusText(selectedElectionData.status)}
                  </Badge>
                  <div className="text-sm text-gray-500">
                    ID: {selectedElectionData.id}
                  </div>
                </div>
                
                <CardTitle className="text-2xl font-bold text-gray-900">
                  {selectedElectionData.title}
                </CardTitle>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {selectedElectionData.totalVotes.toLocaleString()}
                    </div>
                    <div className="text-sm text-blue-800">Total Votes</div>
                  </div>
                  
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {selectedElectionData.totalVoters.toLocaleString()}
                    </div>
                    <div className="text-sm text-green-800">Eligible Voters</div>
                  </div>
                  
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {selectedElectionData.turnout.toFixed(1)}%
                    </div>
                    <div className="text-sm text-purple-800">Turnout Rate</div>
                  </div>
                  
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">
                      {selectedElectionData.candidates.length}
                    </div>
                    <div className="text-sm text-orange-800">Candidates</div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Results Breakdown */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-bold text-gray-900">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Results Breakdown
                </CardTitle>
                <CardDescription>
                  Detailed voting results for all candidates
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-6">
                  {selectedElectionData.candidates
                    .sort((a, b) => b.votes - a.votes)
                    .map((candidate, index) => (
                    <div key={candidate.id} className="relative">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="relative">
                            <Avatar className="w-14 h-14">
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
                                #{index + 1} {candidate.name}
                                {candidate.winner && selectedElectionData.status === 'completed' && (
                                  <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                                    Winner
                                  </Badge>
                                )}
                                {index === 0 && selectedElectionData.status === 'active' && (
                                  <Badge className="bg-green-100 text-green-800 text-xs">
                                    Leading
                                  </Badge>
                                )}
                              </h3>
                              <div className="text-right">
                                <div className="font-bold text-lg text-gray-900">
                                  {candidate.votes.toLocaleString()}
                                </div>
                                <div className="text-sm font-medium text-gray-600">
                                  {candidate.percentage.toFixed(1)}%
                                </div>
                              </div>
                            </div>
                            
                            <Progress 
                              value={candidate.percentage} 
                              className="h-4"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {selectedElectionData.status === 'active' && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                      <div className="text-sm text-blue-800">
                        <p className="font-medium mb-1">Live Results</p>
                        <p>These results are updated in real-time as votes are cast. Final results will be available after the election ends on {new Date(selectedElectionData.endDate).toLocaleDateString()}.</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card className="border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">Select an Election</h3>
              <p className="text-gray-600">Choose an election from the dropdown above to view detailed results and analytics.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminResults;
