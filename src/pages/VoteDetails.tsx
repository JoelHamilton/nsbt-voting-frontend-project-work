import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import NavigationBar from "@/components/NavigationBar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Calendar, Users, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for election details
const electionData: Record<string, {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  totalVoters: number;
  candidates: Array<{
    id: number;
    name: string;
    image: string;
    manifesto: string;
    experience: string;
  }>;
}> = {
  "1": {
    title: "Student Union President 2024",
    description: "Vote for the next Student Union President who will represent student interests and lead campus initiatives.",
    startDate: "2024-01-15",
    endDate: "2024-01-20",
    totalVoters: 2450,
    candidates: [
      {
        id: 1,
        name: "Sarah Johnson",
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200",
        manifesto: "Focused on improving campus facilities, expanding student support services, and creating more opportunities for student engagement. My goal is to bridge the gap between administration and students.",
        experience: "3 years as Class Representative, Vice President of Debate Club"
      },
      {
        id: 2,
        name: "Michael Chen",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
        manifesto: "Committed to environmental sustainability on campus, digital innovation in student services, and fostering a more inclusive university community for all students.",
        experience: "President of Environmental Club, Student Council Treasurer"
      },
      {
        id: 3,
        name: "Aisha Patel",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
        manifesto: "Advocating for mental health resources, career development programs, and affordable campus dining options. Together, we can build a stronger student community.",
        experience: "Peer Counselor, Founder of Career Development Society"
      }
    ]
  }
};

const VoteDetails = () => {
  const { electionId } = useParams();
  const { toast } = useToast();
  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [isVoting, setIsVoting] = useState(false);

  const election = electionId ? electionData[electionId] : undefined;

  if (!election) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavigationBar userType="student" />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Election Not Found</h1>
          <Button asChild>
            <Link to="/vote">Back to Elections</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleVote = async () => {
    if (!selectedCandidate) return;
    
    setIsVoting(true);
    
    // Simulate voting process
    setTimeout(() => {
      setIsVoting(false);
      setHasVoted(true);
      toast({
        title: "Vote Submitted Successfully!",
        description: "Your vote has been recorded on the blockchain and cannot be changed.",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar userType="student" />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/vote">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Elections
          </Link>
        </Button>

        {/* Election Header */}
        <Card className="mb-8 border-0 shadow-md">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <Badge className="bg-green-100 text-green-800">
                Active Now
              </Badge>
              {hasVoted && (
                <Badge className="bg-blue-100 text-blue-800">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Vote Submitted
                </Badge>
              )}
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              {election.title}
            </CardTitle>
            <CardDescription className="text-lg text-gray-600">
              {election.description}
            </CardDescription>
            
            <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-500">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {new Date(election.startDate).toLocaleDateString()} - {new Date(election.endDate).toLocaleDateString()}
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2" />
                {election.totalVoters} eligible voters
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Candidates */}
        <div className="space-y-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900">Candidates</h2>
          
          {election.candidates.map((candidate) => (
            <Card 
              key={candidate.id}
              className={`border-2 transition-all duration-200 cursor-pointer hover:shadow-md ${
                selectedCandidate === candidate.id 
                  ? 'border-primary bg-primary/5' 
                  : 'border-gray-200 hover:border-gray-300'
              } ${hasVoted ? 'cursor-not-allowed opacity-75' : ''}`}
              onClick={() => !hasVoted && setSelectedCandidate(candidate.id)}
            >
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={candidate.image} alt={candidate.name} />
                      <AvatarFallback>{candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-semibold text-gray-900">{candidate.name}</h3>
                      {selectedCandidate === candidate.id && !hasVoted && (
                        <Badge className="bg-primary text-white">Selected</Badge>
                      )}
                    </div>
                    
                    <p className="text-gray-600 mb-3 leading-relaxed">{candidate.manifesto}</p>
                    
                    <div className="text-sm text-gray-500">
                      <strong>Experience:</strong> {candidate.experience}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Vote Button */}
        {!hasVoted && (
          <div className="text-center">
            <Button
              onClick={handleVote}
              disabled={!selectedCandidate || isVoting}
              size="lg"
              className="university-gradient hover:shadow-lg transition-all duration-300 px-8"
            >
              {isVoting ? "Submitting Vote..." : "Submit Vote"}
            </Button>
            
            {selectedCandidate && (
              <p className="text-sm text-gray-600 mt-3">
                You are voting for: <strong>{election.candidates.find(c => c.id === selectedCandidate)?.name}</strong>
              </p>
            )}
          </div>
        )}

        {hasVoted && (
          <div className="text-center">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-green-900 mb-2">Vote Submitted Successfully!</h3>
              <p className="text-green-700">
                Your vote has been securely recorded on the blockchain. Results will be available after the election ends.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoteDetails;
