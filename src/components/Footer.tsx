
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-cyber-navy/50 border-t border-cyber-blue/30 py-12 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <div className="text-2xl font-bold gradient-text mb-2">CyberSpace</div>
            <p className="text-cyber-text-secondary text-sm">
              Securing Tomorrow, Learning Today
            </p>
          </div>
          
          <div className="flex items-center space-x-6">
            <a 
              href="#" 
              className="text-cyber-text-secondary hover:text-cyber-blue transition-colors duration-300"
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              className="text-cyber-text-secondary hover:text-cyber-blue transition-colors duration-300"
            >
              Terms of Service
            </a>
          </div>
        </div>
        
        <div className="border-t border-cyber-blue/20 mt-8 pt-8 text-center">
          <p className="text-cyber-text-muted text-sm">
            © {currentYear} CyberSpace Portfolio. Built with passion for cybersecurity.
          </p>
          <p className="text-cyber-text-muted text-xs mt-2">
            This portfolio showcases educational cybersecurity projects and learning journey.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
