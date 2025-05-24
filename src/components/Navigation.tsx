
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'blog', label: 'Blog', path: '/blog' },
    { id: 'contact', label: 'Contact' },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const handleNavClick = (item: any) => {
    if (item.path) {
      // External navigation - let React Router handle it
      return;
    } else {
      // Internal scroll navigation
      scrollToSection(item.id);
    }
  };

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "glass-morphism py-4" : "bg-transparent py-6"
    )}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold gradient-text">
            CyberSpace
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              item.path ? (
                <Link
                  key={item.id}
                  to={item.path}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-all duration-300",
                    "hover:text-cyber-blue text-cyber-text-secondary"
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-all duration-300",
                    "hover:text-cyber-blue",
                    activeSection === item.id
                      ? "text-cyber-blue after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-cyber-gradient"
                      : "text-cyber-text-secondary"
                  )}
                >
                  {item.label}
                </button>
              )
            ))}

            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/dashboard">
                  <Button variant="outline" size="sm" className="border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-cyber-dark">
                    Dashboard
                  </Button>
                </Link>
                <Button 
                  onClick={signOut}
                  variant="outline" 
                  size="sm"
                  className="border-cyber-red text-cyber-red hover:bg-cyber-red hover:text-white"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <Link to="/auth">
                <Button className="bg-cyber-gradient hover:bg-cyber-gradient-reverse text-cyber-dark">
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          <button className="md:hidden p-2 text-cyber-text-primary hover:text-cyber-blue transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
