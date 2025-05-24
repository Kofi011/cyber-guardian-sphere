
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const [typedText, setTypedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const fullText = "Securing Tomorrow, Learning Today";

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Matrix Background */}
      <div className="matrix-bg">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="matrix-rain-drop"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${10 + Math.random() * 10}s`
            }}
          >
            {String.fromCharCode(33 + Math.random() * 94)}
          </div>
        ))}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyber-dark/90 via-cyber-navy/80 to-cyber-dark/90" />

      <div className="relative z-10 text-center space-y-8 px-6 animate-slide-up">
        {/* Profile Image */}
        <div className="relative mx-auto w-32 h-32 mb-8">
          <div className="w-full h-full rounded-full bg-cyber-gradient p-1 animate-glow-pulse">
            <div className="w-full h-full rounded-full bg-cyber-navy flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-cyber-gradient flex items-center justify-center text-2xl font-bold">
                CS
              </div>
            </div>
          </div>
        </div>

        {/* Name */}
        <h1 className="text-5xl md:text-7xl font-bold gradient-text mb-4">
          CyberSpace
        </h1>

        {/* Typing Animation */}
        <div className="text-xl md:text-2xl text-cyber-text-secondary h-8 flex items-center justify-center">
          <span className="font-mono">
            {typedText}
            <span className="animate-pulse">|</span>
          </span>
        </div>

        {/* Description */}
        <p className="text-lg text-cyber-text-muted max-w-2xl mx-auto leading-relaxed">
          Cybersecurity Enthusiast | Ethical Hacker in Training | 
          Building secure digital experiences through continuous learning and hands-on practice
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
          <Button 
            onClick={scrollToProjects}
            className="bg-cyber-gradient hover:bg-cyber-gradient-reverse text-cyber-dark font-semibold px-8 py-3 rounded-lg cyber-glow-hover transition-all duration-300"
          >
            View Projects
          </Button>
          <Button 
            onClick={scrollToContact}
            variant="outline"
            className="border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-cyber-dark px-8 py-3 rounded-lg cyber-glow-hover transition-all duration-300"
          >
            Get In Touch
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-cyber-blue rounded-full flex justify-center">
            <div className="w-1 h-3 bg-cyber-blue rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
