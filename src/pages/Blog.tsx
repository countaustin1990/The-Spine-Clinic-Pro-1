import  { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Tag, Search, ArrowRight } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: 'Understanding Spinal Stenosis: Causes, Symptoms, and Treatment Options',
    excerpt: 'Spinal stenosis is a common condition that affects many adults as they age. Learn about the causes, symptoms, and various treatment options available.',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwc3BpbmUlMjBvcnRob3BlZGljJTIwZG9jdG9yJTIwaGVhbHRoY2FyZXxlbnwwfHx8fDE3NDI4NzM0NDd8MA&ixlib=rb-4.0.3&fit=fillmax&h=600&w=800',
    author: 'Dr. Sarah Johnson',
    authorRole: 'Spine Surgeon',
    date: 'June 15, 2023',
    readTime: '8 min read',
    categories: ['Spine Health', 'Education']
  },
  {
    id: 2,
    title: 'Hip Replacement Surgery: What to Expect Before, During, and After',
    excerpt: 'Hip replacement surgery can be life-changing for those suffering from chronic hip pain. This article outlines what patients can expect throughout the process.',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwyfHxtZWRpY2FsJTIwc3BpbmUlMjBvcnRob3BlZGljJTIwZG9jdG9yJTIwaGVhbHRoY2FyZXxlbnwwfHx8fDE3NDI4NzM0NDd8MA&ixlib=rb-4.0.3&fit=fillmax&h=600&w=800',
    author: 'Dr. Michael Chen',
    authorRole: 'Orthopedic Surgeon',
    date: 'May 28, 2023',
    readTime: '10 min read',
    categories: ['Joint Replacement', 'Surgery']
  },
  {
    id: 3,
    title: '5 Exercises to Strengthen Your Core and Prevent Back Pain',
    excerpt: 'A strong core is essential for spine health. Learn five effective exercises that can help strengthen your core muscles and prevent back pain.',
    image: 'https://images.unsplash.com/photo-1530213786676-41ad9f7736f6?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwzfHxtZWRpY2FsJTIwc3BpbmUlMjBvcnRob3BlZGljJTIwZG9jdG9yJTIwaGVhbHRoY2FyZXxlbnwwfHx8fDE3NDI4NzM0NDd8MA&ixlib=rb-4.0.3&fit=fillmax&h=600&w=800',
    author: 'Dr. James Wilson',
    authorRole: 'Physical Therapist',
    date: 'July 2, 2023',
    readTime: '6 min read',
    categories: ['Exercise', 'Prevention']
  },
  {
    id: 4,
    title: 'Advances in Minimally Invasive Spine Surgery: Less Pain, Faster Recovery',
    excerpt: 'Discover how minimally invasive spine surgery techniques are transforming treatment options, resulting in less pain and faster recovery times for patients.',
    image: 'https://images.unsplash.com/photo-1584467735815-f778f274e296?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHw1fHxtZWRpY2FsJTIwc3BpbmUlMjBvcnRob3BlZGljJTIwZG9jdG9yJTIwaGVhbHRoY2FyZXxlbnwwfHx8fDE3NDI4NzM0NDd8MA&ixlib=rb-4.0.3&fit=fillmax&h=600&w=800',
    author: 'Dr. Sarah Johnson',
    authorRole: 'Spine Surgeon',
    date: 'April 12, 2023',
    readTime: '8 min read',
    categories: ['Spine Surgery', 'Innovation']
  },
  {
    id: 5,
    title: 'Managing Chronic Pain: Beyond Medication',
    excerpt: 'Chronic pain management requires a multifaceted approach. Learn about non-medication strategies that can help you effectively manage chronic pain.',
    image: 'https://images.unsplash.com/photo-1516841273335-e39b37888115?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHw0fHxtZWRpY2FsJTIwc3BpbmUlMjBvcnRob3BlZGljJTIwZG9jdG9yJTIwaGVhbHRoY2FyZXxlbnwwfHx8fDE3NDI4NzM0NDd8MA&ixlib=rb-4.0.3&fit=fillmax&h=600&w=800',
    author: 'Dr. Elizabeth Taylor',
    authorRole: 'Pain Management Specialist',
    date: 'March 5, 2023',
    readTime: '7 min read',
    categories: ['Pain Management', 'Wellness']
  },
  {
    id: 6,
    title: 'Nutrition for Bone Health: Foods That Support Joint and Spine Function',
    excerpt: 'Your diet plays a crucial role in maintaining bone health. Discover the foods and nutrients that can help support joint and spine function.',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwc3BpbmUlMjBvcnRob3BlZGljJTIwZG9jdG9yJTIwaGVhbHRoY2FyZXxlbnwwfHx8fDE3NDI4NzM0NDd8MA&ixlib=rb-4.0.3&fit=fillmax&h=600&w=800',
    author: 'Dr. James Wilson',
    authorRole: 'Physical Therapist',
    date: 'February 18, 2023',
    readTime: '6 min read',
    categories: ['Nutrition', 'Wellness']
  }
];

const categories = [
  'All',
  'Spine Health',
  'Joint Replacement',
  'Exercise',
  'Pain Management',
  'Nutrition',
  'Surgery',
  'Innovation',
  'Wellness',
  'Education'
];

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  useEffect(() => {
    if (searchTerm === '' && selectedCategory === 'All') {
      setFilteredPosts(blogPosts);
      return;
    }
    
    const filtered = blogPosts.filter((post) => {
      const matchesSearch = searchTerm === '' || 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        
      const matchesCategory = selectedCategory === 'All' || 
        post.categories.includes(selectedCategory);
        
      return matchesSearch && matchesCategory;
    });
    
    setFilteredPosts(filtered);
  }, [searchTerm, selectedCategory]);

  return (
    <div className="pt-24 pb-16">
      <div className="bg-sky-700 text-white py-16">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Blog</h1>
          <p className="text-xl text-sky-100 max-w-3xl">
            Insights, tips, and the latest information on orthopedic care, spine health, and more from our team of specialists.
          </p>
        </div>
      </div>
      
      <div className="container-custom py-16">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Content */}
          <div className="w-full md:w-2/3">
            <div className="mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            
            {filteredPosts.length > 0 ? (
              <div className="space-y-10">
                {filteredPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="grid md:grid-cols-2 gap-6 blog-post-card"
                  >
                    <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-lg">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    <div className="flex flex-col">
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {post.date}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {post.readTime}
                        </span>
                      </div>
                      
                      <h2 className="text-2xl font-bold mb-3 hover:text-sky-600 transition-colors">
                        <Link to={`/blog/${post.id}`}>{post.title}</Link>
                      </h2>
                      
                      <p className="text-gray-600 mb-4 flex-grow">{post.excerpt}</p>
                      
                      <div className="mb-4">
                        {post.categories.map((category) => (
                          <span
                            key={category}
                            className="inline-flex items-center mr-2 mb-2 px-3 py-1 bg-sky-50 text-sky-700 rounded-full text-sm"
                          >
                            <Tag className="h-3.5 w-3.5 mr-1" />
                            {category}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="bg-sky-100 w-10 h-10 rounded-full flex items-center justify-center text-sky-600 font-bold text-lg mr-3">
                            {post.author.split(' ')[0][0]}{post.author.split(' ')[1][0]}
                          </div>
                          <div>
                            <p className="font-medium">{post.author}</p>
                            <p className="text-sm text-gray-600">{post.authorRole}</p>
                          </div>
                        </div>
                        
                        <Link
                          to={`/blog/${post.id}`}
                          className="text-sky-600 font-medium flex items-center hover:text-sky-700 transition-colors"
                        >
                          Read more <ArrowRight size={16} className="ml-1" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <SearchX className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                <h3 className="text-lg font-medium text-gray-700 mb-1">No Articles Found</h3>
                <p className="text-gray-600 mb-4">
                  We couldn't find any articles matching your search criteria.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                  }}
                  className="text-sky-600 font-medium hover:text-sky-700"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="w-full md:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-lg font-bold mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                      selectedCategory === category
                        ? 'bg-sky-100 text-sky-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-lg font-bold mb-4">Recent Posts</h3>
              <div className="space-y-4">
                {blogPosts.slice(0, 3).map((post) => (
                  <div key={post.id} className="flex items-start">
                    <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0 mr-3">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm hover:text-sky-600 transition-colors">
                        <Link to={`/blog/${post.id}`}>{post.title}</Link>
                      </h4>
                      <p className="text-xs text-gray-600 mt-1">{post.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-sky-50 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4">Subscribe to Our Newsletter</h3>
              <p className="text-gray-600 text-sm mb-4">
                Stay updated with the latest articles, tips, and insights on orthopedic care.
              </p>
              <form className="space-y-3">
                <div>
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SearchX = ({ className = "h-6 w-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default Blog;
 