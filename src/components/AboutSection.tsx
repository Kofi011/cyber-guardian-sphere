
import { Progress } from '@/components/ui/progress';

const AboutSection = () => {
  const skills = [
    { name: 'Network Security', level: 75, icon: '🛡️' },
    { name: 'Penetration Testing', level: 60, icon: '🔍' },
    { name: 'Python Scripting', level: 80, icon: '🐍' },
    { name: 'Linux Administration', level: 70, icon: '🐧' },
    { name: 'SIEM Tools', level: 55, icon: '📊' },
    { name: 'Incident Response', level: 65, icon: '🚨' },
  ];

  const certifications = [
    { name: 'CompTIA Security+', status: 'In Progress', color: 'text-cyber-orange' },
    { name: 'CEH (Certified Ethical Hacker)', status: 'Planned', color: 'text-cyber-text-muted' },
    { name: 'CISSP', status: 'Future Goal', color: 'text-cyber-text-muted' },
    { name: 'OSCP', status: 'Future Goal', color: 'text-cyber-text-muted' },
  ];

  const journey = [
    { year: '2024', milestone: 'Started Cybersecurity Journey', description: 'Began intensive self-study and hands-on labs' },
    { year: '2024', milestone: 'First CTF Competition', description: 'Participated in beginner-friendly capture the flag events' },
    { year: '2024', milestone: 'Home Lab Setup', description: 'Built dedicated environment for security testing and learning' },
    { year: '2025', milestone: 'Security+ Certification', description: 'Working towards CompTIA Security+ certification' },
  ];

  return (
    <section id="about" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            About Me
          </h2>
          <p className="text-xl text-cyber-text-secondary max-w-3xl mx-auto">
            Passionate about cybersecurity with a focus on ethical hacking and defensive security measures
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Personal Story */}
          <div className="space-y-6">
            <div className="glass-morphism p-8 rounded-xl cyber-glow-hover">
              <h3 className="text-2xl font-semibold text-cyber-blue mb-4">My Journey</h3>
              <p className="text-cyber-text-secondary leading-relaxed mb-4">
                My fascination with cybersecurity began when I realized how vulnerable our digital world really is. 
                What started as curiosity about how systems work evolved into a passion for protecting them.
              </p>
              <p className="text-cyber-text-secondary leading-relaxed">
                Currently pursuing hands-on experience through home labs, CTF competitions, and continuous learning. 
                My goal is to become a skilled ethical hacker and contribute to making the digital world safer.
              </p>
            </div>
          </div>

          {/* Learning Timeline */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-cyber-green mb-6">Learning Timeline</h3>
            <div className="space-y-4">
              {journey.map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-20 text-cyber-blue font-mono text-sm">
                    {item.year}
                  </div>
                  <div className="glass-morphism p-4 rounded-lg flex-1">
                    <h4 className="font-semibold text-cyber-text-primary mb-1">{item.milestone}</h4>
                    <p className="text-sm text-cyber-text-secondary">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Skills Matrix */}
        <div className="mb-16">
          <h3 className="text-3xl font-semibold text-center gradient-text mb-8">Skills & Expertise</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <div key={index} className="glass-morphism p-6 rounded-xl cyber-glow-hover">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{skill.icon}</span>
                    <span className="font-semibold text-cyber-text-primary">{skill.name}</span>
                  </div>
                  <span className="text-cyber-blue font-mono text-sm">{skill.level}%</span>
                </div>
                <Progress value={skill.level} className="h-2" />
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <h3 className="text-3xl font-semibold text-center gradient-text mb-8">Certifications & Goals</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="glass-morphism p-6 rounded-xl cyber-glow-hover flex items-center justify-between">
                <span className="font-semibold text-cyber-text-primary">{cert.name}</span>
                <span className={`font-mono text-sm ${cert.color}`}>{cert.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
