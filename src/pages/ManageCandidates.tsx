
import { useState } from "react";
import { Link } from "react-router-dom";
import NavigationBar from "@/components/NavigationBar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Users, ArrowLeft, Plus, Trash2, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for elections and candidates
const electionsData = [
  { id: 1, title: "Student Union President 2024", status: "active" },
  { id: 2, title: "Faculty Representative Election", status: "active" },
  { id: 3, title: "Sports Committee Election", status: "upcoming" },
];

const candidatesData = [
  {
    id: 1,
    electionId: 1,
    name: "Sarah Johnson",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200",
    bio: "Computer Science student with leadership experience in student organizations.",
    manifesto: "Focused on improving campus facilities and student engagement."
  },
  {
    id: 2,
    electionId: 1,
    name: "Michael Chen",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
    bio: "Business Administration student, former class representative.",
    manifesto: "Committed to environmental sustainability and digital innovation."
  }
];

const ManageCandidates = () => {
  const { toast } = useToast();
  const [selectedElection, setSelectedElection] = useState("");
  const [candidates, setCandidates] = useState(candidatesData);
  const [isAddingCandidate, setIsAddingCandidate] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    manifesto: "",
    image: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedElection) {
      toast({
        title: "Please select an election",
        variant: "destructive"
      });
      return;
    }

    // Simulate adding candidate
    const newCandidate = {
      id: candidates.length + 1,
      electionId: parseInt(selectedElection),
      name: formData.name,
      image: formData.image || `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200`,
      bio: formData.bio,
      manifesto: formData.manifesto
    };

    setCandidates([...candidates, newCandidate]);
    setFormData({ name: "", bio: "", manifesto: "", image: "" });
    setIsAddingCandidate(false);
    
    toast({
      title: "Candidate Added Successfully!",
      description: `${formData.name} has been added to the election.`,
    });
  };

  const handleRemoveCandidate = (candidateId: number) => {
    setCandidates(candidates.filter(c => c.id !== candidateId));
    toast({
      title: "Candidate Removed",
      description: "The candidate has been removed from the election.",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const filteredCandidates = selectedElection 
    ? candidates.filter(c => c.electionId === parseInt(selectedElection))
    : [];

  const selectedElectionData = electionsData.find(e => e.id === parseInt(selectedElection));

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

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Candidates</h1>
          <p className="text-gray-600">
            Add and manage candidates for university elections
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Add Candidate Form */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center text-lg font-bold text-gray-900">
                  <Plus className="h-5 w-5 mr-2" />
                  Add Candidate
                </CardTitle>
                <CardDescription>
                  Register a new candidate for an election
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Election Selection */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Select Election *
                    </Label>
                    <Select value={selectedElection} onValueChange={setSelectedElection}>
                      <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-primary">
                        <SelectValue placeholder="Choose an election" />
                      </SelectTrigger>
                      <SelectContent>
                        {electionsData.map((election) => (
                          <SelectItem key={election.id} value={election.id.toString()}>
                            <div className="flex items-center justify-between w-full">
                              <span>{election.title}</span>
                              <Badge 
                                className={`ml-2 ${
                                  election.status === 'active' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-blue-100 text-blue-800'
                                }`}
                              >
                                {election.status}
                              </Badge>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Candidate Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                      Candidate Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter full name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="h-12 px-4 border-2 border-gray-200 focus:border-primary transition-colors duration-200"
                    />
                  </div>

                  {/* Bio */}
                  <div className="space-y-2">
                    <Label htmlFor="bio" className="text-sm font-medium text-gray-700">
                      Biography
                    </Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      rows={3}
                      placeholder="Brief background information..."
                      value={formData.bio}
                      onChange={handleChange}
                      className="px-4 py-3 border-2 border-gray-200 focus:border-primary transition-colors duration-200 resize-none"
                    />
                  </div>

                  {/* Manifesto */}
                  <div className="space-y-2">
                    <Label htmlFor="manifesto" className="text-sm font-medium text-gray-700">
                      Manifesto *
                    </Label>
                    <Textarea
                      id="manifesto"
                      name="manifesto"
                      rows={4}
                      placeholder="Campaign promises and goals..."
                      value={formData.manifesto}
                      onChange={handleChange}
                      required
                      className="px-4 py-3 border-2 border-gray-200 focus:border-primary transition-colors duration-200 resize-none"
                    />
                  </div>

                  {/* Image URL */}
                  <div className="space-y-2">
                    <Label htmlFor="image" className="text-sm font-medium text-gray-700">
                      Image URL (Optional)
                    </Label>
                    <Input
                      id="image"
                      name="image"
                      type="url"
                      placeholder="https://example.com/photo.jpg"
                      value={formData.image}
                      onChange={handleChange}
                      className="h-12 px-4 border-2 border-gray-200 focus:border-primary transition-colors duration-200"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full university-gradient hover:shadow-lg transition-all duration-300 h-12 text-base font-medium"
                    disabled={!selectedElection}
                  >
                    Add Candidate
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Candidates List */}
          <div className="lg:col-span-2">
            {selectedElection && selectedElectionData ? (
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl font-bold text-gray-900">
                    <Users className="h-5 w-5 mr-2" />
                    Candidates for {selectedElectionData.title}
                  </CardTitle>
                  <CardDescription>
                    {filteredCandidates.length} candidate(s) registered
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  {filteredCandidates.length > 0 ? (
                    <div className="space-y-4">
                      {filteredCandidates.map((candidate) => (
                        <div key={candidate.id} className="border border-gray-200 rounded-lg p-6">
                          <div className="flex items-start gap-4">
                            <Avatar className="w-16 h-16">
                              <AvatarImage src={candidate.image} alt={candidate.name} />
                              <AvatarFallback>{candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-3">
                                <h3 className="text-lg font-semibold text-gray-900">{candidate.name}</h3>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleRemoveCandidate(candidate.id)}
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                              
                              {candidate.bio && (
                                <p className="text-gray-600 mb-3 text-sm">{candidate.bio}</p>
                              )}
                              
                              <div className="bg-gray-50 rounded-lg p-3">
                                <h4 className="font-medium text-gray-900 mb-2">Manifesto:</h4>
                                <p className="text-gray-700 text-sm">{candidate.manifesto}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No Candidates Yet</h3>
                      <p className="text-gray-600">Add the first candidate using the form on the left.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card className="border-0 shadow-lg">
                <CardContent className="p-12 text-center">
                  <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-900 mb-2">Select an Election</h3>
                  <p className="text-gray-600">Choose an election from the dropdown to view and manage candidates.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageCandidates;
