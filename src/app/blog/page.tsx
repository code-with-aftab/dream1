'use client';

import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppWidget from '../components/WhatsAppWidget';
import { Calendar, Clock, ArrowRight, BookOpen, X, Search, Sparkles, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import { getBlogs, BlogPost } from '../utils/db';

export default function BlogPage() {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    getBlogs().then((data) => {
      setBlogPosts(data);
      setLoading(false);
    });
  }, []);

  const categories = ['All', 'Investment Guide', 'Legal & Registry', 'Development Standards'];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-stone-50 text-stone-850 dark:bg-stone-950 dark:text-stone-300 font-sans transition-colors duration-300">
      <title>Real Estate Blogs & Latest News | Dreamland Associates</title>
      <meta name="description" content="Read expert real estate advisory blogs, Dehradun land investment guides, registry mutation news, and gated plot development tips on the Dreamland Associates Blog." />
      {/* Navigation */}
      <Navbar />

      {/* Hero Banner Section */}
      <section className="relative pt-32 pb-20 bg-[#957258] text-white overflow-hidden">
        {/* Decorative Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-600/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 text-center">
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-amber-100/90 mb-4 block animate-pulse">
            Knowledge Hub
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light tracking-wide leading-tight max-w-4xl mx-auto text-white">
            Dreamsland <span className="text-amber-100 font-normal">Real Estate Desk</span>
          </h1>
          <p className="text-sm sm:text-base font-light text-stone-100/90 max-w-2xl mx-auto mt-6 leading-relaxed">
            Read expert real estate advisory blogs, Dehradun land investment guides, registry mutation news, and gated plot development tips on the Dreamland Associates Blog.
          </p>
        </div>
      </section>

      {/* Main Blog Workspace */}
      <section className="py-20 max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Filter Controls (Category Buttons & Search Input) */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-stretch md:items-center mb-12">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer border ${
                  activeCategory === cat
                    ? 'bg-gold-500 border-gold-500 text-stone-955 shadow-sm'
                    : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-850 text-stone-500 hover:text-stone-700 dark:hover:text-stone-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[280px]">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-850 rounded-full py-2.5 pl-10 pr-4 text-xs focus:outline-none focus:border-gold-500 text-stone-800 dark:text-white placeholder-stone-400 shadow-sm"
            />
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-stone-400" />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-3 text-stone-400 hover:text-stone-600 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Featured Hero Article Post (If exists and no search query active) */}
        {filteredPosts.length > 0 && searchQuery === '' && activeCategory === 'All' && (
          <div className="bg-white dark:bg-stone-900 border border-stone-200/60 dark:border-stone-850 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 mb-16 grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            <div className="lg:col-span-7 relative min-h-[300px] lg:h-auto bg-stone-100 dark:bg-stone-950">
              <Image 
                src={filteredPosts[0].image} 
                alt={filteredPosts[0].title}
                fill
                className="object-cover"
              />
            </div>

            <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-[10px] uppercase font-bold tracking-widest text-gold-600">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Featured Post</span>
                  <span>•</span>
                  <span>{filteredPosts[0].category}</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 dark:text-white font-normal leading-tight">
                  {filteredPosts[0].title}
                </h2>
                <p className="text-xs font-light text-stone-500 dark:text-stone-400 leading-relaxed line-clamp-3">
                  {filteredPosts[0].excerpt}
                </p>
              </div>

              <div className="pt-6 border-t border-stone-100 dark:border-stone-850 flex items-center justify-between mt-6">
                <div className="flex items-center space-x-3 text-[11px] text-stone-400 font-medium">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{filteredPosts[0].date}</span>
                  <span>•</span>
                  <Clock className="w-3.5 h-3.5" />
                  <span>{filteredPosts[0].readTime}</span>
                </div>
                <button
                  onClick={() => setSelectedPost(filteredPosts[0])}
                  className="text-xs uppercase font-bold tracking-widest text-gold-600 hover:text-gold-700 flex items-center space-x-1 cursor-pointer transition-colors"
                >
                  <span>Read Post</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        )}

        {/* Regular Blog Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article 
              key={post.id}
              className="bg-white dark:bg-stone-900 border border-stone-200/60 dark:border-stone-850 rounded-lg overflow-hidden shadow-sm flex flex-col h-full justify-between hover:shadow-md transition-shadow duration-300"
            >
              <div>
                {/* Visual Thumbnail */}
                <div className="relative aspect-video w-full bg-stone-100 dark:bg-stone-950">
                  <Image 
                    src={post.image} 
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                  <span className="absolute top-4 left-4 bg-stone-900/90 text-white text-[9px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-sm">
                    {post.category}
                  </span>
                </div>

                {/* Text Metadata */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center space-x-2 text-[10px] text-stone-400 font-semibold font-mono">
                    <Calendar className="w-3 h-3" />
                    <span>{post.date}</span>
                    <span>•</span>
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="font-serif text-lg text-stone-900 dark:text-white font-normal leading-snug line-clamp-2 hover:text-gold-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-xs font-light text-stone-500 dark:text-stone-400 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Bottom Card Action */}
              <div className="px-6 pb-6 pt-4 border-t border-stone-50 dark:border-stone-850 flex justify-between items-center text-xs">
                <span className="text-[10px] text-stone-400 italic">By {post.author}</span>
                <button
                  onClick={() => setSelectedPost(post)}
                  className="text-[10px] uppercase font-bold tracking-wider text-gold-600 hover:text-gold-700 transition-colors flex items-center space-x-1 cursor-pointer"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

            </article>
          ))}
        </div>

        {/* Empty Search State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-20 bg-white dark:bg-stone-900 border border-stone-200/60 dark:border-stone-850 rounded-lg">
            <BookOpen className="w-12 h-12 mx-auto text-stone-300 mb-3 animate-pulse" />
            <h4 className="font-serif text-xl text-stone-600">No blog articles match search criteria</h4>
            <p className="text-xs text-stone-400 mt-1">Try searching another topic (e.g. land, mutation, or bypass)</p>
          </div>
        )}

      </section>

      {/* Full-Post Detailed Overlay Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-300">
          <div className="bg-white dark:bg-stone-900 rounded-lg max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-stone-200 dark:border-stone-850 animate-in zoom-in duration-300">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-stone-100 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-950/20">
              <div>
                <span className="text-[9px] uppercase font-bold tracking-widest text-gold-600">
                  {selectedPost.category}
                </span>
                <h3 className="font-serif text-base sm:text-lg text-stone-900 dark:text-white font-normal mt-0.5 line-clamp-1">
                  {selectedPost.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Workspace */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
              
              {/* Blog Image */}
              <div className="relative aspect-[21/9] w-full bg-stone-100 dark:bg-stone-950 rounded-md overflow-hidden border border-stone-200/40 dark:border-stone-800">
                <Image 
                  src={selectedPost.image} 
                  alt={selectedPost.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Metadata */}
              <div className="flex flex-wrap gap-4 items-center text-xs text-stone-400 font-semibold border-b border-stone-100 dark:border-stone-850 pb-4">
                <span>By {selectedPost.author}</span>
                <span>•</span>
                <div className="flex items-center space-x-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{selectedPost.date}</span>
                </div>
                <span>•</span>
                <div className="flex items-center space-x-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{selectedPost.readTime}</span>
                </div>
              </div>

              {/* Text Paragraphs */}
              <div className="text-xs sm:text-sm font-light text-stone-600 dark:text-stone-300 leading-relaxed space-y-4">
                {typeof selectedPost.content === 'string' ? (
                  selectedPost.content.split('\n\n').map((para, pIdx) => (
                    <p key={pIdx}>{para}</p>
                  ))
                ) : Array.isArray(selectedPost.content) ? (
                  (selectedPost.content as string[]).map((para, pIdx) => (
                    <p key={pIdx}>{para}</p>
                  ))
                ) : null}
              </div>

            </div>

            {/* Modal Footer Call to Action */}
            <div className="px-6 py-4 bg-stone-50 dark:bg-stone-950/20 border-t border-stone-100 dark:border-stone-800 flex flex-col sm:flex-row gap-3 justify-between items-center">
              <span className="text-[10px] text-stone-400 italic">Interested in this topic? Connect with advisors.</span>
              <a
                href="https://wa.me/919258884941"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gold-500 hover:bg-gold-600 text-stone-955 px-5 py-2.5 rounded-sm font-bold uppercase tracking-wider text-[10px] transition-all flex items-center space-x-1.5 cursor-pointer"
              >
                <span>Discuss on WhatsApp</span>
              </a>
            </div>

          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />

      {/* WhatsApp Chat widget */}
      <WhatsAppWidget />
    </div>
  );
}
