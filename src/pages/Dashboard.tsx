
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

interface Project {
  id: string;
  title: string;
  description: string;
  status: string;
  featured: boolean;
  created_at: string;
}

interface BlogPost {
  id: string;
  title: string;
  published: boolean;
  view_count: number;
  created_at: string;
}

const Dashboard = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [analytics, setAnalytics] = useState({ totalViews: 0, totalProjects: 0, totalPosts: 0 });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchUserData();
  }, [user, navigate]);

  const fetchUserData = async () => {
    try {
      // Fetch projects
      const { data: projectsData } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      // Fetch blog posts
      const { data: postsData } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      // Fetch analytics
      const { data: viewsData } = await supabase
        .from('portfolio_views')
        .select('id')
        .eq('user_id', user?.id);

      setProjects(projectsData || []);
      setBlogPosts(postsData || []);
      setAnalytics({
        totalViews: viewsData?.length || 0,
        totalProjects: projectsData?.length || 0,
        totalPosts: postsData?.length || 0,
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (projectId: string) => {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId);

      if (error) throw error;

      setProjects(projects.filter(p => p.id !== projectId));
      toast({
        title: "Success",
        description: "Project deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      });
    }
  };

  const deleteBlogPost = async (postId: string) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', postId);

      if (error) throw error;

      setBlogPosts(blogPosts.filter(p => p.id !== postId));
      toast({
        title: "Success",
        description: "Blog post deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete blog post",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cyber-dark">
        <Navigation />
        <div className="container mx-auto px-6 py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyber-blue mx-auto"></div>
            <p className="mt-4 text-cyber-text-secondary">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cyber-dark">
      <Navigation />
      
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Dashboard
          </h1>
          <p className="text-xl text-cyber-text-secondary">
            Manage your cybersecurity portfolio and content
          </p>
        </div>

        {/* Analytics Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="glass-morphism border-cyber-blue/30">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-cyber-blue">{analytics.totalViews}</CardTitle>
              <CardDescription>Total Portfolio Views</CardDescription>
            </CardHeader>
          </Card>
          <Card className="glass-morphism border-cyber-blue/30">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-cyber-green">{analytics.totalProjects}</CardTitle>
              <CardDescription>Active Projects</CardDescription>
            </CardHeader>
          </Card>
          <Card className="glass-morphism border-cyber-blue/30">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-cyber-purple">{analytics.totalPosts}</CardTitle>
              <CardDescription>Blog Posts</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <Tabs defaultValue="projects" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="blog">Blog Posts</TabsTrigger>
          </TabsList>

          <TabsContent value="projects">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-cyber-text-primary">Your Projects</h2>
              <Button 
                onClick={() => navigate('/projects/new')}
                className="bg-cyber-gradient hover:bg-cyber-gradient-reverse text-cyber-dark"
              >
                Add New Project
              </Button>
            </div>

            <div className="grid gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="glass-morphism border-cyber-blue/30">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-cyber-text-primary">{project.title}</CardTitle>
                        <CardDescription className="mt-2">{project.description}</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant={project.status === 'completed' ? 'default' : 'secondary'}>
                          {project.status}
                        </Badge>
                        {project.featured && (
                          <Badge className="bg-cyber-green text-cyber-dark">Featured</Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => navigate(`/projects/edit/${project.id}`)}>
                        Edit
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive" 
                        onClick={() => deleteProject(project.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="blog">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-cyber-text-primary">Your Blog Posts</h2>
              <Button 
                onClick={() => navigate('/blog/new')}
                className="bg-cyber-gradient hover:bg-cyber-gradient-reverse text-cyber-dark"
              >
                Write New Post
              </Button>
            </div>

            <div className="grid gap-6">
              {blogPosts.map((post) => (
                <Card key={post.id} className="glass-morphism border-cyber-blue/30">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-cyber-text-primary">{post.title}</CardTitle>
                        <div className="flex gap-4 mt-2 text-sm text-cyber-text-muted">
                          <span>{post.view_count} views</span>
                          <span>{new Date(post.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <Badge variant={post.published ? 'default' : 'secondary'}>
                        {post.published ? 'Published' : 'Draft'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => navigate(`/blog/edit/${post.id}`)}>
                        Edit
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive" 
                        onClick={() => deleteBlogPost(post.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
