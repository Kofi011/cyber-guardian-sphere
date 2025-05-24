
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ProjectsSection = () => {
  const projects = [
    {
      title: 'Network Vulnerability Scanner',
      description: 'Python-based tool for automated network reconnaissance and vulnerability assessment with custom reporting features.',
      image: '/placeholder.svg',
      technologies: ['Python', 'Nmap', 'Socket Programming', 'JSON'],
      category: 'Security Tools',
      github: '#',
      demo: '#',
      status: 'Completed'
    },
    {
      title: 'CTF Writeups Collection',
      description: 'Detailed documentation of solutions for various Capture The Flag challenges, including methodology and lessons learned.',
      image: '/placeholder.svg',
      technologies: ['Web Security', 'Cryptography', 'Reverse Engineering', 'Forensics'],
      category: 'CTF',
      github: '#',
      demo: '#',
      status: 'Ongoing'
    },
    {
      title: 'Home Lab Environment',
      description: 'Virtualized cybersecurity lab with multiple VMs for penetration testing practice and security tool evaluation.',
      image: '/placeholder.svg',
      technologies: ['VMware', 'Kali Linux', 'Metasploitable', 'pfSense'],
      category: 'Infrastructure',
      github: '#',
      demo: '#',
      status: 'Active'
    },
    {
      title: 'Password Security Analyzer',
      description: 'Web application that analyzes password strength and provides recommendations for improved security practices.',
      image: '/placeholder.svg',
      technologies: ['JavaScript', 'React', 'Node.js', 'Crypto APIs'],
      category: 'Web Security',
      github: '#',
      demo: '#',
      status: 'In Progress'
    },
    {
      title: 'Incident Response Playbook',
      description: 'Comprehensive documentation and automated scripts for common cybersecurity incident response scenarios.',
      image: '/placeholder.svg',
      technologies: ['PowerShell', 'Python', 'MITRE ATT&CK', 'SIEM'],
      category: 'Documentation',
      github: '#',
      demo: '#',
      status: 'Completed'
    },
    {
      title: 'Malware Analysis Sandbox',
      description: 'Isolated environment for safe malware analysis with automated reporting and behavioral tracking capabilities.',
      image: '/placeholder.svg',
      technologies: ['VirtualBox', 'YARA', 'Wireshark', 'Process Monitor'],
      category: 'Malware Analysis',
      github: '#',
      demo: '#',
      status: 'Planned'
    }
  ];

  const categories = ['All', 'Security Tools', 'CTF', 'Infrastructure', 'Web Security', 'Documentation', 'Malware Analysis'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-cyber-green text-cyber-dark';
      case 'In Progress': return 'bg-cyber-blue text-cyber-dark';
      case 'Ongoing': return 'bg-cyber-purple text-white';
      case 'Active': return 'bg-cyber-green text-cyber-dark';
      case 'Planned': return 'bg-cyber-orange text-cyber-dark';
      default: return 'bg-cyber-text-muted text-white';
    }
  };

  return (
    <section id="projects" className="py-20 px-6 bg-gradient-to-b from-transparent to-cyber-navy/20">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Projects & Labs
          </h2>
          <p className="text-xl text-cyber-text-secondary max-w-3xl mx-auto">
            Hands-on cybersecurity projects showcasing practical skills and continuous learning
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant="outline"
              className="border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-cyber-dark transition-all duration-300"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="glass-morphism border-cyber-blue/30 cyber-glow-hover group overflow-hidden">
              <div className="relative">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4">
                  <Badge className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                </div>
              </div>
              
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-cyber-text-primary text-xl mb-2">{project.title}</CardTitle>
                    <Badge variant="outline" className="border-cyber-purple text-cyber-purple text-xs">
                      {project.category}
                    </Badge>
                  </div>
                </div>
                <CardDescription className="text-cyber-text-secondary leading-relaxed">
                  {project.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge 
                        key={techIndex}
                        variant="secondary"
                        className="text-xs bg-cyber-navy/50 text-cyber-text-secondary border border-cyber-blue/30"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-2">
                    <Button 
                      size="sm"
                      className="bg-cyber-gradient hover:bg-cyber-gradient-reverse text-cyber-dark flex-1 transition-all duration-300"
                    >
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                      </svg>
                      GitHub
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-cyber-green text-cyber-green hover:bg-cyber-green hover:text-cyber-dark flex-1 transition-all duration-300"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Demo
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View More Projects */}
        <div className="text-center mt-12">
          <Button 
            size="lg"
            className="bg-cyber-gradient hover:bg-cyber-gradient-reverse text-cyber-dark px-8 py-3 cyber-glow-hover transition-all duration-300"
          >
            View All Projects on GitHub
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
