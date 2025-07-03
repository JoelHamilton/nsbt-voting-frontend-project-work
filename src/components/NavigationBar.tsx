
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Vote, BarChart3, Settings, LogOut, Home } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavigationBarProps {
  userType: 'student' | 'admin';
}

const NavigationBar = ({ userType }: NavigationBarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const studentLinks = [
    { name: 'Home', href: '/vote', icon: Home },
    { name: 'Vote', href: '/vote', icon: Vote },
    { name: 'Results', href: '/results', icon: BarChart3 },
  ];

  const adminLinks = [
    { name: 'Dashboard', href: '/admin', icon: Home },
    { name: 'Create', href: '/admin/create', icon: Settings },
    { name: 'Stats', href: '/admin/results', icon: BarChart3 },
  ];

  const links = userType === 'student' ? studentLinks : adminLinks;

  const handleLogout = () => {
    // Add logout logic here
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 university-gradient rounded-lg flex items-center justify-center">
              <Vote className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-lg text-gray-900">NUBT Voting</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    "flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-200",
                    isActive 
                      ? "bg-primary text-white" 
                      : "text-gray-600 hover:text-primary hover:bg-primary/10"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
              className="text-gray-600 hover:text-red-600 hover:border-red-600"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-primary hover:bg-gray-100"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    "flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-200",
                    isActive 
                      ? "bg-primary text-white" 
                      : "text-gray-600 hover:text-primary hover:bg-primary/10"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="h-4 w-4" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
            
            <button 
              onClick={handleLogout}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 hover:text-red-600 w-full text-left"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavigationBar;
