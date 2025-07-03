
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Vote, Users, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              <span className="text-primary">Nduom University</span>
              <br />
              <span className="text-2xl md:text-4xl font-medium">of Business and Technology</span>
            </h1>
            <div className="w-24 h-1 university-gradient mx-auto rounded-full"></div>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Secure and Transparent Voting for University Elections powered by Blockchain Technology
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button 
              asChild 
              size="lg" 
              className="university-gradient hover:shadow-lg transition-all duration-300 text-lg px-8 py-6 rounded-xl"
            >
              <Link to="/login">
                <Vote className="mr-2 h-6 w-6" />
                Vote Now
              </Link>
            </Button>
            
            <Button 
              asChild 
              variant="outline" 
              size="lg"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 text-lg px-8 py-6 rounded-xl"
            >
              <Link to="/admin-login">
                <Shield className="mr-2 h-6 w-6" />
                Admin Panel
              </Link>
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="p-8 hover-lift bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <div className="text-center">
              <div className="w-16 h-16 university-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure Voting</h3>
              <p className="text-gray-600">Blockchain technology ensures your vote is secure, anonymous, and tamper-proof.</p>
            </div>
          </Card>

          <Card className="p-8 hover-lift bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <div className="text-center">
              <div className="w-16 h-16 university-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Easy Access</h3>
              <p className="text-gray-600">Simple registration and voting process designed for all university students.</p>
            </div>
          </Card>

          <Card className="p-8 hover-lift bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <div className="text-center">
              <div className="w-16 h-16 university-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-time Results</h3>
              <p className="text-gray-600">Watch election results update in real-time with complete transparency.</p>
            </div>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-gray-500">
          <p>&copy; 2024 Nduom University of Business and Technology. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
