
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  cover_image_url: string;
  tags: string[];
  view_count: number;
  created_at: string;
  profiles: {
    full_name: string | null;
    username: string | null;
  } | null;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          id,
          title,
          slug,
          excerpt,
          cover_image_url,
          tags,
          view_count,
          created_at,
          profiles!inner (
            full_name,
            username
          )
        `)
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = !selectedTag || post.tags?.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const allTags = Array.from(new Set(posts.flatMap(post => post.tags || [])));

  if (loading) {
    return (
      <div className="min-h-screen bg-cyber-dark">
        <Navigation />
        <div className="container mx-auto px-6 py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyber-blue mx-auto"></div>
            <p className="mt-4 text-cyber-text-secondary">Loading blog posts...</p>
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
            CyberSpace Blog
          </h1>
          <p className="text-xl text-cyber-text-secondary max-w-3xl mx-auto">
            CTF writeups, security research, and cybersecurity insights from the community
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-cyber-navy/50 border-cyber-blue/30 text-cyber-text-primary"
            />
            {user && (
              <Link to="/blog/new">
                <Button className="bg-cyber-gradient hover:bg-cyber-gradient-reverse text-cyber-dark whitespace-nowrap">
                  Write New Post
                </Button>
              </Link>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button
              variant={!selectedTag ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTag('')}
              className="border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-cyber-dark"
            >
              All Tags
            </Button>
            {allTags.map(tag => (
              <Button
                key={tag}
                variant={selectedTag === tag ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTag(tag)}
                className="border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-cyber-dark"
              >
                {tag}
              </Button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="glass-morphism border-cyber-blue/30 cyber-glow-hover group overflow-hidden">
              {post.cover_image_url && (
                <img 
                  src={post.cover_image_url} 
                  alt={post.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              )}
              
              <CardHeader>
                <CardTitle className="text-cyber-text-primary line-clamp-2">
                  {post.title}
                </CardTitle>
                <CardDescription className="text-cyber-text-secondary line-clamp-3">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {post.tags?.slice(0, 3).map((tag) => (
                      <Badge 
                        key={tag}
                        variant="secondary"
                        className="text-xs bg-cyber-navy/50 text-cyber-text-secondary border border-cyber-blue/30"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-sm text-cyber-text-muted">
                    <span>By {post.profiles?.full_name || post.profiles?.username || 'Anonymous'}</span>
                    <span>{post.view_count} views</span>
                  </div>

                  {/* Read More Button */}
                  <Link to={`/blog/${post.slug}`}>
                    <Button 
                      size="sm"
                      className="w-full bg-cyber-gradient hover:bg-cyber-gradient-reverse text-cyber-dark"
                    >
                      Read Full Post
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-cyber-text-secondary text-lg">
              {searchTerm || selectedTag ? 'No posts found matching your criteria.' : 'No blog posts available yet.'}
            </p>
            {user && (
              <Link to="/blog/new" className="inline-block mt-4">
                <Button className="bg-cyber-gradient hover:bg-cyber-gradient-reverse text-cyber-dark">
                  Write the First Post
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
