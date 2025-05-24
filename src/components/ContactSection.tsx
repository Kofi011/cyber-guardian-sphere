
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Message Sent Successfully!",
      description: "Thank you for reaching out. I'll get back to you soon.",
    });
    
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const socialLinks = [
    {
      name: 'GitHub',
      username: '@cyberspace-dev',
      followers: '2.1k',
      icon: '🐙',
      url: '#',
      color: 'hover:border-cyber-text-primary'
    },
    {
      name: 'LinkedIn',
      username: '@cyberspace-security',
      connections: '500+',
      icon: '💼',
      url: '#',
      color: 'hover:border-cyber-blue'
    },
    {
      name: 'Twitter',
      username: '@CyberSpaceHacker',
      followers: '1.2k',
      icon: '🐦',
      url: '#',
      color: 'hover:border-cyber-blue'
    },
    {
      name: 'TryHackMe',
      username: 'CyberSpace',
      rank: 'Top 5%',
      icon: '🎯',
      url: '#',
      color: 'hover:border-cyber-green'
    }
  ];

  return (
    <section id="contact" className="py-20 px-6 bg-gradient-to-t from-cyber-navy/30 to-transparent">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Get In Touch
          </h2>
          <p className="text-xl text-cyber-text-secondary max-w-3xl mx-auto">
            Ready to collaborate on cybersecurity projects or discuss opportunities? Let's connect!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card className="glass-morphism border-cyber-blue/30 cyber-glow-hover">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-cyber-text-primary mb-6">Send a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Input
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="bg-cyber-navy/50 border-cyber-blue/30 text-cyber-text-primary placeholder:text-cyber-text-muted focus:border-cyber-blue"
                      />
                    </div>
                    <div>
                      <Input
                        name="email"
                        type="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="bg-cyber-navy/50 border-cyber-blue/30 text-cyber-text-primary placeholder:text-cyber-text-muted focus:border-cyber-blue"
                      />
                    </div>
                  </div>
                  <div>
                    <Input
                      name="subject"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="bg-cyber-navy/50 border-cyber-blue/30 text-cyber-text-primary placeholder:text-cyber-text-muted focus:border-cyber-blue"
                    />
                  </div>
                  <div>
                    <Textarea
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="bg-cyber-navy/50 border-cyber-blue/30 text-cyber-text-primary placeholder:text-cyber-text-muted focus:border-cyber-blue resize-none"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-cyber-gradient hover:bg-cyber-gradient-reverse text-cyber-dark font-semibold py-3 cyber-glow-hover transition-all duration-300"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info & Social Links */}
          <div className="space-y-8">
            {/* Contact Info */}
            <Card className="glass-morphism border-cyber-blue/30 cyber-glow-hover">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-cyber-text-primary mb-6">Let's Connect</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-cyber-gradient rounded-lg flex items-center justify-center">
                      <span className="text-xl">📧</span>
                    </div>
                    <div>
                      <p className="text-cyber-text-primary font-semibold">Email</p>
                      <p className="text-cyber-text-secondary">hello@cyberspace.dev</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-cyber-gradient rounded-lg flex items-center justify-center">
                      <span className="text-xl">🌐</span>
                    </div>
                    <div>
                      <p className="text-cyber-text-primary font-semibold">Location</p>
                      <p className="text-cyber-text-secondary">Remote / Global</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-cyber-gradient rounded-lg flex items-center justify-center">
                      <span className="text-xl">⚡</span>
                    </div>
                    <div>
                      <p className="text-cyber-text-primary font-semibold">Response Time</p>
                      <p className="text-cyber-text-secondary">Usually within 24 hours</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <div>
              <h3 className="text-2xl font-semibold text-cyber-text-primary mb-6">Follow My Journey</h3>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((link, index) => (
                  <Card 
                    key={index} 
                    className={`glass-morphism border-cyber-blue/30 cyber-glow-hover cursor-pointer transition-all duration-300 ${link.color}`}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="text-3xl mb-3">{link.icon}</div>
                      <h4 className="font-semibold text-cyber-text-primary mb-1">{link.name}</h4>
                      <p className="text-sm text-cyber-text-secondary mb-2">{link.username}</p>
                      <p className="text-xs text-cyber-text-muted">
                        {link.followers || link.connections || link.rank}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
