
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import NavigationBar from "@/components/NavigationBar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, ArrowLeft, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CreateElection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate dates
    const startDateTime = new Date(`${formData.startDate}T${formData.startTime}`);
    const endDateTime = new Date(`${formData.endDate}T${formData.endTime}`);
    
    if (startDateTime >= endDateTime) {
      toast({
        title: "Invalid Dates",
        description: "End date and time must be after start date and time.",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    if (startDateTime <= new Date()) {
      toast({
        title: "Invalid Start Date",
        description: "Start date must be in the future.",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Election Created Successfully!",
        description: "The new election has been created and is ready for candidate registration.",
      });
      navigate('/admin');
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Get tomorrow's date as minimum date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar userType="admin" />
      
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/admin">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>

        <Card className="border-0 shadow-lg">
          <CardHeader className="text-center pb-8">
            <div className="w-16 h-16 university-gradient rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">Create New Election</CardTitle>
            <CardDescription className="text-gray-600">
              Set up a new election for university students
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Election Title */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                  Election Title *
                </Label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="e.g., Student Union President 2024"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="h-12 px-4 border-2 border-gray-200 focus:border-primary transition-colors duration-200"
                />
              </div>

              {/* Election Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                  Description *
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  rows={4}
                  placeholder="Describe the purpose and scope of this election..."
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="px-4 py-3 border-2 border-gray-200 focus:border-primary transition-colors duration-200 resize-none"
                />
              </div>

              {/* Date and Time Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Start Date & Time */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate" className="text-sm font-medium text-gray-700">
                      Start Date *
                    </Label>
                    <Input
                      id="startDate"
                      name="startDate"
                      type="date"
                      min={minDate}
                      value={formData.startDate}
                      onChange={handleChange}
                      required
                      className="h-12 px-4 border-2 border-gray-200 focus:border-primary transition-colors duration-200"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="startTime" className="text-sm font-medium text-gray-700">
                      Start Time *
                    </Label>
                    <Input
                      id="startTime"
                      name="startTime"
                      type="time"
                      value={formData.startTime}
                      onChange={handleChange}
                      required
                      className="h-12 px-4 border-2 border-gray-200 focus:border-primary transition-colors duration-200"
                    />
                  </div>
                </div>

                {/* End Date & Time */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="endDate" className="text-sm font-medium text-gray-700">
                      End Date *
                    </Label>
                    <Input
                      id="endDate"
                      name="endDate"
                      type="date"
                      min={formData.startDate || minDate}
                      value={formData.endDate}
                      onChange={handleChange}
                      required
                      className="h-12 px-4 border-2 border-gray-200 focus:border-primary transition-colors duration-200"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="endTime" className="text-sm font-medium text-gray-700">
                      End Time *
                    </Label>
                    <Input
                      id="endTime"
                      name="endTime"
                      type="time"
                      value={formData.endTime}
                      onChange={handleChange}
                      required
                      className="h-12 px-4 border-2 border-gray-200 focus:border-primary transition-colors duration-200"
                    />
                  </div>
                </div>
              </div>

              {/* Information Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">Important Notes:</p>
                    <ul className="space-y-1 text-blue-700">
                      <li>• Elections must be scheduled at least 24 hours in advance</li>
                      <li>• You can add candidates after creating the election</li>
                      <li>• Students will be notified automatically when voting opens</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full university-gradient hover:shadow-lg transition-all duration-300 h-12 text-base font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating Election..." : "Create Election"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateElection;
