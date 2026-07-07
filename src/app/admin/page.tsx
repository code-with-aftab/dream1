'use client';

import { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Lock, Shield, ArrowLeft, Plus, Edit2, Trash2, 
  CheckCircle, MessageSquare, Building2, Check, 
  ExternalLink, LogOut, FileText, Calendar, 
  X, AlertCircle, Sparkles, MapPin, Eye, EyeOff, ClipboardList, Users, Menu,
  ChevronLeft, ChevronRight, Sun, Moon, TrendingUp, BookOpen, Camera, LayoutDashboard, BarChart3,
  Image as ImageIcon
} from 'lucide-react';
import { Sheet, SheetTrigger, SheetContent, SheetClose } from '@/components/ui/sheet';
import { 
  getProperties, saveProperty, deleteProperty, 
  getInquiries, updateInquiryStatus, deleteInquiry, 
  ContactInquiry, getTeamMembers, saveTeamMember, deleteTeamMember, TeamMember,
  getBlogs, saveBlog, deleteBlog, BlogPost,
  getGalleryItems, saveGalleryItem, deleteGalleryItem, GalleryItem,
  getHeroBanners, saveHeroBanner, deleteHeroBanner, HeroBanner
} from '../utils/db';
import { Property } from '../data';
import Image from 'next/image';

const IMAGES = [
  { label: 'Azure Villa', path: '/images/azure_villa.png' },
  { label: 'Cliffside Mansion', path: '/images/cliffside_mansion.png' },
  { label: 'Hero Villa', path: '/images/hero_villa.png' },
  { label: 'Mountain Retreat', path: '/images/mountain_retreat.png' },
  { label: 'Urban Penthouse', path: '/images/urban_penthouse.png' },
];

const DEFAULT_AMENITIES = [
  'Gated Entry', '24/7 Security', 'Electricity Poles', 'Water Supply', 
  'Cemented Roads', 'RCC Roads', 'Drainage System', 'Hill Views', 
  'Registry Ready', 'Mountain Views', 'Riverside Proximity', 
  '90% Loan Support', 'CCTV Surveillance', 'Landscaped Parks'
];

export default function AdminPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'properties' | 'inquiries' | 'sell' | 'team' | 'blogs' | 'gallery' | 'todos' | 'hero'>('dashboard');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isDark = document.documentElement.classList.contains('dark');
      setTheme(isDark ? 'dark' : 'light');
    }
  }, []);

  const handleThemeToggle = () => {
    if (typeof window !== 'undefined') {
      const isDark = document.documentElement.classList.toggle('dark');
      setTheme(isDark ? 'dark' : 'light');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }
  };

  // Data states
  const [properties, setProperties] = useState<Property[]>([]);
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [heroBanners, setHeroBanners] = useState<HeroBanner[]>([]);
  
  // Search & Filter states
  const [propSearch, setPropSearch] = useState('');
  const [inqSearch, setInqSearch] = useState('');
  const [sellSearch, setSellSearch] = useState('');
  const [teamSearch, setTeamSearch] = useState('');
  const [blogSearch, setBlogSearch] = useState('');
  const [gallerySearch, setGallerySearch] = useState('');
  const [heroSearch, setHeroSearch] = useState('');

  // Modals & Forms
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [isHeroModalOpen, setIsHeroModalOpen] = useState(false);
  const [heroFormData, setHeroFormData] = useState<Partial<HeroBanner>>({
    id: '',
    image: '',
    order: 0
  });
  const [blogFormData, setBlogFormData] = useState<Partial<BlogPost>>({
    id: '',
    title: '',
    category: 'Investment Guide',
    image: '',
    date: '',
    readTime: '5 min read',
    author: 'Sumit Rajput (CEO)',
    excerpt: '',
    content: ''
  });

  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [galleryFormData, setGalleryFormData] = useState<Partial<GalleryItem>>({
    id: '',
    title: '',
    category: 'Layouts',
    image: ''
  });

  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deletingBlogId, setDeletingBlogId] = useState<string | null>(null);
  const [deletingGalleryId, setDeletingGalleryId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // Todo List states
  const [todos, setTodos] = useState<{ id: string; text: string; completed: boolean; priority: 'low' | 'medium' | 'high'; date: string }[]>([]);
  const [newTodoText, setNewTodoText] = useState('');
  const [newTodoPriority, setNewTodoPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [todoFilter, setTodoFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [todoSearch, setTodoSearch] = useState('');
  const [todoSort, setTodoSort] = useState<'date' | 'priority'>('date');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('admin_todos');
      if (saved) {
        setTodos(JSON.parse(saved));
      } else {
        const defaultTodos = [
          { id: '1', text: 'Verify mutation documents for Doiwala Enclave Plots', completed: false, priority: 'high' as const, date: new Date().toLocaleDateString() },
          { id: '2', text: 'Call HDFC Bank manager regarding 90% loan approval schema', completed: true, priority: 'high' as const, date: new Date().toLocaleDateString() },
          { id: '3', text: 'Upload latest internal road construction photographs to gallery', completed: false, priority: 'medium' as const, date: new Date().toLocaleDateString() },
          { id: '4', text: 'Review new client inquiries from Shimla Bypass Road desk', completed: false, priority: 'medium' as const, date: new Date().toLocaleDateString() },
          { id: '5', text: 'Draft real estate market analysis blog for July', completed: false, priority: 'low' as const, date: new Date().toLocaleDateString() },
        ];
        setTodos(defaultTodos);
        localStorage.setItem('admin_todos', JSON.stringify(defaultTodos));
      }
    }
  }, []);

  const saveTodosToStorage = (updatedTodos: typeof todos) => {
    setTodos(updatedTodos);
    localStorage.setItem('admin_todos', JSON.stringify(updatedTodos));
  };

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoText.trim()) return;
    const newTodo = {
      id: Date.now().toString(),
      text: newTodoText.trim(),
      completed: false,
      priority: newTodoPriority,
      date: new Date().toLocaleDateString()
    };
    const updated = [newTodo, ...todos];
    saveTodosToStorage(updated);
    setNewTodoText('');
  };

  const handleToggleTodo = (id: string) => {
    const updated = todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    saveTodosToStorage(updated);
  };

  const handleDeleteTodo = (id: string) => {
    const updated = todos.filter(todo => todo.id !== id);
    saveTodosToStorage(updated);
  };

  const handleClearCompletedTodos = () => {
    const updated = todos.filter(todo => !todo.completed);
    saveTodosToStorage(updated);
  };

  // Form state
  const [formData, setFormData] = useState<Partial<Property>>({
    id: '',
    title: '',
    location: '',
    price: 1500000,
    type: 'Plot',
    image: '/images/azure_villa.png',
    size: '100+ Gaj',
    rate: 15000,
    roadWidth: '25 Ft Cemented',
    description: '',
    amenities: [],
    mutationStatus: 'Registry & Mutation Ready',
    featured: false,
    status: 'Completed',
    category: 'Plots',
    secondaryImages: [],
  });

  const [teamFormData, setTeamFormData] = useState<Partial<TeamMember>>({
    id: '',
    name: '',
    role: '',
    phone: '',
    email: 'dreamlandassociate7@gmail.com',
    desc: '',
    image: '',
    initials: ''
  });

  const [customAmenity, setCustomAmenity] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const auth = sessionStorage.getItem('dreamsland_admin_auth');
      if (auth === 'true') {
        setIsLoggedIn(true);
      }
    }
    getProperties().then(setProperties);
    getInquiries().then(setInquiries);
    getTeamMembers().then(setTeam);
    getBlogs().then(setBlogs);
    getGalleryItems().then(setGallery);
    getHeroBanners().then(setHeroBanners);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsLoggedIn(true);
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('dreamsland_admin_auth', 'true');
        }
        setLoginError('');
      } else {
        setLoginError(data.error || 'Invalid passcode. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setLoginError('An error occurred. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('dreamsland_admin_auth');
    }
  };

  const openAddModal = () => {
    setFormData({
      id: '',
      title: '',
      location: '',
      price: 1500000,
      type: 'Plot',
      image: '/images/azure_villa.png',
      size: '100+ Gaj',
      rate: 15000,
      roadWidth: '25 Ft Cemented',
      description: '',
      amenities: ['Gated Entry', 'Water Supply', 'Registry Ready'],
      mutationStatus: 'Registry & Mutation Ready',
      featured: false,
      status: 'Completed',
      category: 'Plots',
      secondaryImages: [],
    });
    setIsModalOpen(true);
  };

  const openEditModal = (property: Property) => {
    setFormData({ ...property });
    setIsModalOpen(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAmenityToggle = (amenity: string) => {
    const current = formData.amenities || [];
    const updated = current.includes(amenity)
      ? current.filter(a => a !== amenity)
      : [...current, amenity];
    setFormData(prev => ({ ...prev, amenities: updated }));
  };

  const handleAddCustomAmenity = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && customAmenity.trim()) {
      e.preventDefault();
      const current = formData.amenities || [];
      if (!current.includes(customAmenity.trim())) {
        setFormData(prev => ({ ...prev, amenities: [...current, customAmenity.trim()] }));
      }
      setCustomAmenity('');
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const uData = new FormData();
    uData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uData,
      });

      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      
      setFormData(prev => ({ ...prev, image: data.url }));
      alert('Image uploaded to Cloudinary successfully!');
    } catch (err: any) {
      console.error('Image upload failed:', err);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleSecondaryImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const uData = new FormData();
    uData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uData,
      });

      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      
      setFormData(prev => {
        const currentSec = prev.secondaryImages || [];
        return { ...prev, secondaryImages: [...currentSec, data.url] };
      });
      alert('Secondary image uploaded to Cloudinary successfully!');
    } catch (err: any) {
      console.error('Secondary image upload failed:', err);
      alert('Failed to upload secondary image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleBlogImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const uData = new FormData();
    uData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uData,
      });

      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      
      setBlogFormData(prev => ({ ...prev, image: data.url }));
      alert('Blog featured image uploaded to Cloudinary successfully!');
    } catch (err: any) {
      console.error('Blog image upload failed:', err);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogFormData.title || !blogFormData.content) {
      alert('Please fill out all required fields (Title and Content).');
      return;
    }

    const id = blogFormData.id || `blog-${Date.now()}`;
    const date = blogFormData.date || new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: '2-digit',
      year: 'numeric'
    });

    const completeBlog: BlogPost = {
      id,
      title: blogFormData.title,
      category: blogFormData.category || 'Investment Guide',
      image: blogFormData.image || '/images/hero_villa.png',
      date,
      readTime: blogFormData.readTime || '5 min read',
      author: blogFormData.author || 'Sumit Rajput (CEO)',
      excerpt: blogFormData.excerpt || '',
      content: blogFormData.content
    };

    try {
      const updated = await saveBlog(completeBlog);
      setBlogs(updated);
      setIsBlogModalOpen(false);
      alert('Blog article saved successfully!');
    } catch (err) {
      console.error('Failed to save blog:', err);
      alert('Error saving blog post.');
    }
  };

  const handleDeleteBlogClick = (id: string) => {
    setDeletingBlogId(id);
  };

  const handleDeleteBlogConfirm = async () => {
    if (!deletingBlogId) return;
    try {
      const updated = await deleteBlog(deletingBlogId);
      setBlogs(updated);
      setDeletingBlogId(null);
      alert('Blog article deleted successfully!');
    } catch (err) {
      console.error('Failed to delete blog:', err);
      alert('Error deleting blog post.');
    }
  };

  const handleGalleryImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const uData = new FormData();
    uData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uData,
      });

      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      
      setGalleryFormData(prev => ({ ...prev, image: data.url }));
      alert('Gallery image uploaded to Cloudinary successfully!');
    } catch (err: any) {
      console.error('Gallery image upload failed:', err);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleSaveGalleryItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryFormData.title || !galleryFormData.image) {
      alert('Please fill out all required fields (Title and Image).');
      return;
    }

    const id = galleryFormData.id || `gal-${Date.now()}`;
    const payload: GalleryItem = {
      id,
      title: galleryFormData.title || '',
      category: galleryFormData.category || 'Layouts',
      image: galleryFormData.image || '',
      timestamp: galleryFormData.timestamp || new Date().toISOString()
    };

    try {
      const updated = await saveGalleryItem(payload);
      setGallery(updated);
      setIsGalleryModalOpen(false);
      setGalleryFormData({
        id: '',
        title: '',
        category: 'Layouts',
        image: ''
      });
      alert('Gallery item saved successfully!');
    } catch (err) {
      console.error('Failed to save gallery item:', err);
      alert('Error saving gallery item.');
    }
  };

  const handleDeleteGalleryClick = (id: string) => {
    setDeletingGalleryId(id);
  };

  const handleDeleteGalleryConfirm = async () => {
    if (!deletingGalleryId) return;
    try {
      const updated = await deleteGalleryItem(deletingGalleryId);
      setGallery(updated);
      setDeletingGalleryId(null);
      alert('Gallery item deleted successfully!');
    } catch (err) {
      console.error('Failed to delete gallery item:', err);
      alert('Error deleting gallery item.');
    }
  };

  const handleSaveProperty = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.location || !formData.price || !formData.rate) {
      alert('Please fill out all required fields (Title, Location, Price, Rate).');
      return;
    }
    const propToSave: Property = {
      id: formData.id || `prop-${Date.now()}`,
      title: formData.title,
      location: formData.location,
      price: Number(formData.price),
      type: formData.type as any,
      image: formData.image || '/images/azure_villa.png',
      size: formData.size || '100+ Gaj',
      rate: Number(formData.rate),
      roadWidth: formData.roadWidth || '25 Ft Cemented',
      description: formData.description || '',
      amenities: formData.amenities || [],
      mutationStatus: formData.mutationStatus || 'Registry & Mutation Ready',
      featured: !!formData.featured,
      status: formData.status as any,
    };

    const updated = await saveProperty(propToSave);
    setProperties(updated);
    setIsModalOpen(false);
  };

  const handleDeleteConfirm = async () => {
    if (deletingId) {
      const updated = await deleteProperty(deletingId);
      setProperties(updated);
      setDeletingId(null);
    }
  };

  const handleStatusChange = async (id: string, status: 'New' | 'Contacted' | 'Archived') => {
    const updated = await updateInquiryStatus(id, status);
    setInquiries(updated);
  };

  const handleDeleteInquiryClick = async (id: string) => {
    if (confirm('Are you sure you want to delete this inquiry?')) {
      const updated = await deleteInquiry(id);
      setInquiries(updated);
    }
  };

  // Memoized Search & Filter lists
  const filteredProperties = useMemo(() => {
    return properties.filter(p => 
      p.title.toLowerCase().includes(propSearch.toLowerCase()) ||
      p.location.toLowerCase().includes(propSearch.toLowerCase()) ||
      p.type.toLowerCase().includes(propSearch.toLowerCase())
    );
  }, [properties, propSearch]);

  const consultations = useMemo(() => {
    return inquiries.filter(i => i.inquiryType !== 'Sell');
  }, [inquiries]);

  const sellRequests = useMemo(() => {
    return inquiries.filter(i => i.inquiryType === 'Sell');
  }, [inquiries]);

  const filteredInquiries = useMemo(() => {
    return consultations.filter(i => 
      i.name.toLowerCase().includes(inqSearch.toLowerCase()) ||
      i.email.toLowerCase().includes(inqSearch.toLowerCase()) ||
      i.phone.includes(inqSearch) ||
      i.requirements.toLowerCase().includes(inqSearch.toLowerCase())
    );
  }, [consultations, inqSearch]);

  const filteredSellRequests = useMemo(() => {
    return sellRequests.filter(s => 
      s.name.toLowerCase().includes(sellSearch.toLowerCase()) ||
      (s.propTitle && s.propTitle.toLowerCase().includes(sellSearch.toLowerCase())) ||
      (s.propLocation && s.propLocation.toLowerCase().includes(sellSearch.toLowerCase())) ||
      s.phone.includes(sellSearch)
    );
  }, [sellRequests, sellSearch]);

  const filteredTeam = useMemo(() => {
    return team.filter(m => 
      m.name.toLowerCase().includes(teamSearch.toLowerCase()) ||
      m.role.toLowerCase().includes(teamSearch.toLowerCase()) ||
      m.phone.includes(teamSearch)
    );
  }, [team, teamSearch]);

  // Team CRUD Handlers
  const handleOpenAddTeamModal = () => {
    setTeamFormData({
      id: '',
      name: '',
      role: '',
      phone: '',
      email: 'dreamlandassociate7@gmail.com',
      desc: '',
      image: '',
      initials: ''
    });
    setIsTeamModalOpen(true);
  };

  const handleOpenEditTeamModal = (member: TeamMember) => {
    setTeamFormData(member);
    setIsTeamModalOpen(true);
  };

  const handleTeamFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTeamFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTeamImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const uData = new FormData();
    uData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uData,
      });

      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      
      setTeamFormData(prev => ({ ...prev, image: data.url }));
      alert('Team member photo uploaded to Cloudinary successfully!');
    } catch (err: any) {
      console.error('Team image upload failed:', err);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleSaveTeamMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamFormData.name || !teamFormData.role || !teamFormData.phone) {
      alert('Please fill out all required fields (Name, Designation, Contact Number).');
      return;
    }

    const memberToSave: TeamMember = {
      id: teamFormData.id || `team-${Date.now()}`,
      name: teamFormData.name,
      role: teamFormData.role,
      phone: teamFormData.phone,
      email: teamFormData.email || 'dreamlandassociate7@gmail.com',
      desc: teamFormData.desc || '',
      image: teamFormData.image || '',
      initials: teamFormData.initials || ''
    };

    const updated = await saveTeamMember(memberToSave);
    setTeam(updated);
    setIsTeamModalOpen(false);
  };

  const handleDeleteTeamMember = async (id: string) => {
    if (confirm('Are you sure you want to delete this team member?')) {
      const updated = await deleteTeamMember(id);
      setTeam(updated);
    }
  };

  const handleHeroImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const uData = new FormData();
    uData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uData,
      });

      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      
      setHeroFormData(prev => ({ ...prev, image: data.url }));
      alert('Hero banner image uploaded to Cloudinary successfully!');
    } catch (err: any) {
      console.error('Hero banner upload failed:', err);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleSaveHeroBannerForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!heroFormData.image) return;

    const bannerToSave: HeroBanner = {
      id: heroFormData.id || `hero-img-${Date.now()}`,
      image: heroFormData.image,
      order: Number(heroFormData.order) || heroBanners.length + 1
    };

    const updated = await saveHeroBanner(bannerToSave);
    setHeroBanners(updated);
    setIsHeroModalOpen(false);
  };

  const handleDeleteHeroBanner = async (id: string) => {
    if (confirm('Are you sure you want to delete this hero banner?')) {
      const updated = await deleteHeroBanner(id);
      setHeroBanners(updated);
    }
  };

  // Statistics Metrics
  const stats = useMemo(() => {
    const totalProps = properties.length;
    const completed = properties.filter(p => p.status === 'Completed').length;
    const ongoing = properties.filter(p => p.status === 'Ongoing').length;
    
    const totalConsults = inquiries.filter(i => i.inquiryType !== 'Sell').length;
    const newConsults = inquiries.filter(i => i.inquiryType !== 'Sell' && i.status === 'New').length;
    
    const totalSellRequests = inquiries.filter(i => i.inquiryType === 'Sell').length;
    const newSellRequests = inquiries.filter(i => i.inquiryType === 'Sell' && i.status === 'New').length;

    return { 
      totalProps, completed, ongoing, 
      totalConsults, newConsults, 
      totalSellRequests, newSellRequests 
    };
  }, [properties, inquiries]);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-stone-950 flex flex-col justify-center items-center px-4 relative overflow-hidden font-sans">
        {/* Abstract Background Accents */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold-800/10 rounded-full blur-[120px]" />

        <div className="w-full max-w-md bg-stone-900/40 border border-stone-850 backdrop-blur-xl rounded-xl p-8 relative z-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          
          {/* Logo / Header */}
          <div className="text-center mb-8">
            <div className="relative w-40 h-12 mx-auto mb-6">
              <Image
                src="/logo.png"
                alt="Dreamland Associates Logo"
                fill
                className="object-contain filter invert opacity-90"
                priority
              />
            </div>
            <h2 className="font-serif text-2xl text-stone-100 font-light tracking-wider">
              ADMIN DESK ACCESS
            </h2>
            <p className="text-xs text-stone-500 mt-2 tracking-widest uppercase">
              Secure Private Workspace
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[10px] uppercase font-bold tracking-widest text-stone-400 mb-2">
                Private Passcode
              </label>
              <div className="relative">
                <input
                  type={showPasscode ? 'text' : 'password'}
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter passcode"
                  className="w-full bg-stone-950/80 border border-stone-800 focus:border-gold-500 rounded-sm py-3 px-4 text-sm text-stone-200 placeholder-stone-600 focus:outline-none transition-colors pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPasscode(!showPasscode)}
                  className="absolute right-3 top-3 text-stone-600 hover:text-stone-400 transition-colors"
                >
                  {showPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {loginError && (
                <div className="flex items-center space-x-2 mt-2 text-red-400 text-xs">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{loginError}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gold-600 hover:bg-gold-500 text-white text-xs uppercase font-bold tracking-widest py-3.5 rounded-sm shadow-md transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer hover:shadow-lg hover:shadow-gold-600/10"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Unlock Console</span>
            </button>
          </form>

          {/* Footer Back Link */}
          <div className="mt-8 text-center border-t border-stone-850/60 pt-6">
            <Link 
              href="/" 
              className="inline-flex items-center space-x-2 text-xs font-semibold text-stone-500 hover:text-gold-400 transition-colors"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Back to Public Desk</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans flex flex-col lg:flex-row">
      
      {/* ── Desktop Fixed Sidebar (Clean White) ── */}
      <aside 
        className={`hidden lg:flex flex-col justify-between h-screen fixed top-0 left-0 z-30 bg-white border-r border-slate-200/80 transition-all duration-500 ease-out ${
          sidebarCollapsed ? 'w-[72px]' : 'w-[270px]'
        }`}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="absolute -right-3.5 top-9 w-7 h-7 rounded-full flex items-center justify-center cursor-pointer z-40 transition-all duration-300 hover:scale-110 shadow-lg shadow-blue-500/25"
          style={{background: 'linear-gradient(135deg, #957258 0%, #887361 100%)'}}
          aria-label={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {sidebarCollapsed ? <ChevronRight className="w-3.5 h-3.5 text-white" /> : <ChevronLeft className="w-3.5 h-3.5 text-white" />}
        </button>

        <div className="space-y-5 px-3 pt-6">
          {/* Section Label */}
          {!sidebarCollapsed && (
            <div className="px-3">
              <span className="text-[10px] uppercase tracking-[0.18em] font-bold text-slate-400">Navigation</span>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {[
              { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', layout: 'simple' },
              { id: 'properties', icon: Building2, label: `Inventory (${properties.length})`, layout: 'simple' },
              { id: 'inquiries', icon: MessageSquare, label: 'Inquiries', badge: stats.newConsults, layout: 'badge' },
              { id: 'sell', icon: TrendingUp, label: 'Sell Requests', badge: stats.newSellRequests, layout: 'badge' },
              { id: 'team', icon: Users, label: `Team (${team.length})`, layout: 'simple' },
              { id: 'blogs', icon: BookOpen, label: `Blogs (${blogs.length})`, layout: 'simple' },
              { id: 'gallery', icon: Camera, label: `Gallery (${gallery.length})`, layout: 'simple' },
              { id: 'todos', icon: ClipboardList, label: 'Todo List', layout: 'simple' },
              { id: 'hero', icon: ImageIcon, label: 'Hero Banners', layout: 'simple' },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`group w-full flex items-center transition-all duration-300 cursor-pointer text-[15px] font-medium relative overflow-hidden ${
                    sidebarCollapsed 
                      ? 'justify-center p-3 rounded-xl' 
                      : item.layout === 'badge' ? 'justify-between px-4 py-3 rounded-xl' : 'space-x-3 px-4 py-3 rounded-xl'
                  } ${
                    isActive
                      ? 'text-white shadow-md shadow-blue-500/20'
                      : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50/80'
                  }`}
                  style={isActive ? {background: 'linear-gradient(135deg, #957258 0%, #887361 100%)'} : undefined}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  {/* Active indicator bar */}
                  {isActive && !sidebarCollapsed && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-r-full bg-white shadow-sm" />
                  )}
                  {item.layout === 'badge' ? (
                    <>
                      <div className="flex items-center space-x-3">
                        <Icon className={`w-5 h-5 shrink-0 transition-all duration-300 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-500'}`} />
                        {!sidebarCollapsed && <span>{item.label}</span>}
                      </div>
                      {(item.badge ?? 0) > 0 && (
                        <span className={`text-[10px] px-2 py-0.5 rounded-full shrink-0 font-bold ${
                          sidebarCollapsed ? 'absolute top-0.5 right-0.5 w-2.5 h-2.5 p-0 text-[0px]' : ''
                        }`}
                        style={{background: 'linear-gradient(135deg, #ef4444, #f97316)', color: 'white'}}>
                          {item.badge}
                        </span>
                      )}
                    </>
                  ) : (
                    <>
                      <Icon className={`w-5 h-5 shrink-0 transition-all duration-300 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-500'}`} />
                      {!sidebarCollapsed && <span>{item.label}</span>}
                    </>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="px-3 pb-5 space-y-3">
          <div className="h-px bg-slate-100" />
          
          {/* Logout */}
          <button
            onClick={handleLogout}
            className={`group w-full flex items-center transition-all duration-300 text-[15px] font-medium text-rose-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl cursor-pointer ${
              sidebarCollapsed ? 'justify-center p-3' : 'space-x-3 px-4 py-2.5'
            }`}
            title={sidebarCollapsed ? "Logout" : undefined}
          >
            <LogOut className="w-5 h-5 shrink-0 transition-colors group-hover:text-rose-600" />
            {!sidebarCollapsed && <span>Logout</span>}
          </button>

          {/* Admin Profile Card */}
          {sidebarCollapsed ? (
            <div className="flex items-center justify-center p-1 relative" title="Secure Admin Active">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold font-mono text-xs shrink-0 select-none shadow-md"
                style={{background: 'linear-gradient(135deg, #957258 0%, #887361 100%)'}}>
                AD
              </div>
              <span className="absolute bottom-0 right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-white shadow-sm" />
            </div>
          ) : (
            <div className="flex items-center space-x-3 px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold font-mono text-xs shrink-0 select-none shadow-md"
                style={{background: 'linear-gradient(135deg, #957258 0%, #887361 100%)'}}>
                AD
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[13px] font-semibold text-slate-700 block truncate">Dreamsland Office</span>
                <span className="text-[11px] text-slate-400 block truncate">admin@dreamsland.com</span>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0 shadow-sm animate-pulse" />
            </div>
          )}
        </div>
      </aside>

      {/* ── Mobile Header Bar (Clean White) ── */}
      <header className="lg:hidden w-full px-5 py-3.5 flex justify-between items-center bg-white border-b border-slate-200/80 sticky top-0 z-40">
        <div className="flex items-center space-x-3">
          <Sheet open={mobileSidebarOpen} onOpenChange={setMobileSidebarOpen}>
            <SheetTrigger
              className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer bg-transparent border-none focus:outline-none text-slate-700"
              aria-label="Open sidebar menu"
            >
              <Menu className="w-5 h-5" />
            </SheetTrigger>
            <SheetContent className="bg-white border-slate-200/80 text-slate-700 p-0">
              <div className="flex flex-col justify-between h-full py-6 px-4">
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-center justify-end px-2">
                    <SheetClose
                      className="text-slate-400 hover:text-slate-700 transition-colors cursor-pointer bg-transparent border-none focus:outline-none"
                      aria-label="Close menu"
                    >
                      <X className="w-5 h-5" />
                    </SheetClose>
                  </div>

                  {/* Section Label */}
                  <div className="px-3">
                    <span className="text-[10px] uppercase tracking-[0.18em] font-bold text-slate-400">Navigation</span>
                  </div>

                  <nav className="space-y-1.5">
                    {[
                      { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', layout: 'simple' },
                      { id: 'properties', icon: Building2, label: `Inventory (${properties.length})`, layout: 'simple' },
                      { id: 'inquiries', icon: MessageSquare, label: 'Inquiries', badge: stats.newConsults, layout: 'badge' },
                      { id: 'sell', icon: TrendingUp, label: 'Sell Requests', badge: stats.newSellRequests, layout: 'badge' },
                      { id: 'team', icon: Users, label: `Team (${team.length})`, layout: 'simple' },
                      { id: 'blogs', icon: BookOpen, label: `Blogs (${blogs.length})`, layout: 'simple' },
                      { id: 'gallery', icon: Camera, label: `Gallery (${gallery.length})`, layout: 'simple' },
                      { id: 'todos', icon: ClipboardList, label: 'Todo List', layout: 'simple' },
                      { id: 'hero', icon: ImageIcon, label: 'Hero Banners', layout: 'simple' },
                    ].map((item) => {
                      const Icon = item.icon;
                      const isActive = activeTab === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            setActiveTab(item.id as any);
                            setMobileSidebarOpen(false);
                          }}
                          className={`group w-full flex items-center transition-all duration-300 cursor-pointer text-[15px] font-medium relative overflow-hidden ${
                            item.layout === 'badge' ? 'justify-between px-4 py-3 rounded-xl' : 'space-x-3 px-4 py-3 rounded-xl'
                          } ${
                            isActive
                              ? 'text-white shadow-md shadow-blue-500/20'
                              : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50/80'
                          }`}
                          style={isActive ? {background: 'linear-gradient(135deg, #957258 0%, #887361 100%)'} : undefined}
                        >
                          {isActive && (
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-r-full bg-white shadow-sm" />
                          )}
                          {item.layout === 'badge' ? (
                            <>
                              <div className="flex items-center space-x-3">
                                <Icon className={`w-5 h-5 shrink-0 transition-all duration-300 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                                <span>{item.label}</span>
                              </div>
                              {(item.badge ?? 0) > 0 && (
                                <span className="text-[10px] px-2 py-0.5 rounded-full shrink-0 font-bold"
                                  style={{background: 'linear-gradient(135deg, #ef4444, #f97316)', color: 'white'}}>
                                  {item.badge}
                                </span>
                              )}
                            </>
                          ) : (
                            <>
                              <Icon className={`w-5 h-5 shrink-0 transition-all duration-300 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                              <span>{item.label}</span>
                            </>
                          )}
                        </button>
                      );
                    })}
                  </nav>
                </div>

                {/* Mobile Sidebar Footer */}
                <div className="space-y-3">
                  <div className="h-px bg-slate-100" />
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileSidebarOpen(false);
                    }}
                    className="group w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-[15px] font-medium text-rose-500 hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer"
                  >
                    <LogOut className="w-5 h-5 shrink-0 transition-colors group-hover:text-rose-600" />
                    <span>Logout</span>
                  </button>

                  {/* Mobile Admin Profile */}
                  <div className="flex items-center space-x-3 px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold font-mono text-xs shrink-0 select-none shadow-md"
                      style={{background: 'linear-gradient(135deg, #957258 0%, #887361 100%)'}}>
                      AD
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[13px] font-semibold text-slate-700 block truncate">Dreamsland Office</span>
                      <span className="text-[11px] text-slate-400 block truncate">admin@dreamsland.com</span>
                    </div>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0 shadow-sm animate-pulse" />
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="relative w-24 h-7">
          <Image
            src="/logo.png"
            alt="Dreamland Associates Logo"
            fill
            className="object-contain opacity-90"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Shield className="w-4 h-4 text-blue-500" />
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Admin</span>
        </div>
      </header>

      {/* ── Main Content Area (Offset for Desktop Sidebar) ── */}
      <div 
        className={`flex-grow min-h-screen transition-all duration-300 ${
          sidebarCollapsed ? 'lg:pl-[72px]' : 'lg:pl-[270px]'
        }`}
      >
        <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          
          {/* Title */}
          <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl text-stone-900 tracking-wide font-normal">
                {activeTab === 'dashboard'
                  ? 'Dashboard'
                  : activeTab === 'properties' 
                  ? 'Properties Portfolio' 
                  : activeTab === 'inquiries' 
                  ? 'Consult Inquiries' 
                  : activeTab === 'sell'
                  ? 'Property Sell Requests'
                  : activeTab === 'blogs'
                  ? 'Editorial Blogs'
                  : activeTab === 'gallery'
                  ? 'Site Gallery'
                  : activeTab === 'todos'
                  ? 'Admin Task Checklist'
                  : activeTab === 'hero'
                  ? 'Hero Banner Slideshow'
                  : 'Manage Team'}
              </h1>
              <p className="text-xs text-stone-500 mt-1">
                {activeTab === 'dashboard'
                  ? 'Overview of your business analytics and performance metrics.'
                  : activeTab === 'properties' 
                  ? 'Manage your real estate listings and plot inventory.' 
                  : activeTab === 'inquiries' 
                  ? 'Review client consultation desk inquiries.' 
                  : activeTab === 'sell'
                  ? 'Manage property sell requests submitted by owners.'
                  : activeTab === 'blogs'
                  ? 'Write, edit, and publish blogs/vlogs in real-time.'
                  : activeTab === 'gallery'
                  ? 'Manage your visual site gallery, layout maps, and location views.'
                  : activeTab === 'todos'
                  ? 'Manage administrative actions and day-to-day operations.'
                  : activeTab === 'hero'
                  ? 'Upload and manage background slideshow banners for the main Hero section.'
                  : 'Manage your representative leadership desk.'}
              </p>
            </div>
            
            <div className="flex items-center space-x-2 bg-stone-100 border border-stone-200 py-1.5 px-3 rounded-md text-[10px] uppercase font-bold tracking-wider text-stone-600 self-start md:self-auto">
              <Shield className="w-3.5 h-3.5 text-gold-600" />
              <span>Secure Session Active</span>
            </div>
          </div>

          {/* Stats Metrics Grid */}
          <section className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <div className="bg-white border border-stone-200/80 rounded-lg p-5 shadow-sm">
              <div className="flex justify-between items-start text-stone-400">
                <Building2 className="w-5 h-5 text-gold-500" />
                <span className="text-[10px] uppercase font-bold tracking-wider">Properties</span>
              </div>
              <p className="text-3xl font-light text-stone-900 mt-3">{stats.totalProps}</p>
              <p className="text-[10px] text-stone-400 mt-1">Total listings registered</p>
            </div>

            <div className="bg-white border border-stone-200/80 rounded-lg p-5 shadow-sm">
              <div className="flex justify-between items-start text-stone-400">
                <Sparkles className="w-5 h-5 text-emerald-500" />
                <span className="text-[10px] uppercase font-bold tracking-wider">Ongoing</span>
              </div>
              <p className="text-3xl font-light text-stone-900 mt-3">{stats.ongoing}</p>
              <p className="text-[10px] text-stone-400 mt-1">Ongoing development</p>
            </div>

            <div className="bg-white border border-stone-200/80 rounded-lg p-5 shadow-sm">
              <div className="flex justify-between items-start text-stone-400">
                <CheckCircle className="w-5 h-5 text-blue-500" />
                <span className="text-[10px] uppercase font-bold tracking-wider">Completed</span>
              </div>
              <p className="text-3xl font-light text-stone-900 mt-3">{stats.completed}</p>
              <p className="text-[10px] text-stone-400 mt-1">Gated colonies finished</p>
            </div>

            <div className="bg-white border border-stone-200/80 rounded-lg p-5 shadow-sm">
              <div className="flex justify-between items-start text-stone-400">
                <MessageSquare className="w-5 h-5 text-amber-500" />
                <span className="text-[10px] uppercase font-bold tracking-wider">Consult Desk</span>
              </div>
              <p className="text-3xl font-light text-stone-900 mt-3">{stats.totalConsults}</p>
              <p className="text-[10px] text-stone-400 mt-1">{stats.newConsults} awaiting review</p>
            </div>

            <div className="bg-white border border-stone-200/80 rounded-lg p-5 shadow-sm">
              <div className="flex justify-between items-start text-stone-400">
                <TrendingUp className="w-5 h-5 text-red-500" />
                <span className="text-[10px] uppercase font-bold tracking-wider">Sell Desk</span>
              </div>
              <p className="text-3xl font-light text-stone-900 mt-3">{stats.totalSellRequests}</p>
              <p className="text-[10px] text-stone-400 mt-1">{stats.newSellRequests} awaiting review</p>
            </div>
          </section>

        {/* Tab contents */}
        {activeTab === 'dashboard' ? (
          <section className="space-y-6">
            {/* Dashboard Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Property Type Distribution - Pie Chart */}
              <div className="bg-white border border-stone-200/80 rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="font-semibold text-stone-800 text-sm">Property Distribution</h3>
                    <p className="text-[11px] text-stone-400 mt-0.5">By property type</p>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                    <BarChart3 className="w-4 h-4 text-blue-500" />
                  </div>
                </div>
                <div className="w-full h-[260px]">
                  {(() => {
                    const { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } = require('recharts');
                    const typeData = (() => {
                      const types: Record<string, number> = {};
                      properties.forEach(p => {
                        const t = p.type || 'Other';
                        types[t] = (types[t] || 0) + 1;
                      });
                      return Object.entries(types).map(([name, value]) => ({ name, value }));
                    })();
                    const COLORS = ['#957258', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4'];
                    return typeData.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={typeData} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={4} dataKey="value" stroke="none">
                            {typeData.map((_: any, i: number) => (
                              <Cell key={i} fill={COLORS[i % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip contentStyle={{background: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)'}} />
                          <Legend iconType="circle" iconSize={8} wrapperStyle={{fontSize: '11px', color: '#64748b'}} />
                        </PieChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="h-full flex items-center justify-center text-stone-400 text-sm">No property data</div>
                    );
                  })()}
                </div>
              </div>

              {/* Inquiry Status - Bar Chart */}
              <div className="bg-white border border-stone-200/80 rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="font-semibold text-stone-800 text-sm">Inquiry Overview</h3>
                    <p className="text-[11px] text-stone-400 mt-0.5">Consultations vs Sell Requests</p>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-emerald-500" />
                  </div>
                </div>
                <div className="w-full h-[260px]">
                  {(() => {
                    const { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } = require('recharts');
                    const consultNew = inquiries.filter(i => i.inquiryType !== 'Sell' && i.status === 'New').length;
                    const consultReviewed = inquiries.filter(i => i.inquiryType !== 'Sell' && i.status !== 'New').length;
                    const sellNew = inquiries.filter(i => i.inquiryType === 'Sell' && i.status === 'New').length;
                    const sellReviewed = inquiries.filter(i => i.inquiryType === 'Sell' && i.status !== 'New').length;
                    const barData = [
                      { name: 'Consultations', New: consultNew, Reviewed: consultReviewed },
                      { name: 'Sell Requests', New: sellNew, Reviewed: sellReviewed },
                    ];
                    return (
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={barData} barGap={8}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                          <XAxis dataKey="name" tick={{fontSize: 11, fill: '#94a3b8'}} axisLine={false} tickLine={false} />
                          <YAxis tick={{fontSize: 11, fill: '#94a3b8'}} axisLine={false} tickLine={false} allowDecimals={false} />
                          <Tooltip contentStyle={{background: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)'}} />
                          <Bar dataKey="New" fill="#f59e0b" radius={[6, 6, 0, 0]} barSize={40} />
                          <Bar dataKey="Reviewed" fill="#10b981" radius={[6, 6, 0, 0]} barSize={40} />
                        </BarChart>
                      </ResponsiveContainer>
                    );
                  })()}
                </div>
              </div>
            </div>

            {/* Dashboard Charts Row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Property Status Donut */}
              <div className="bg-white border border-stone-200/80 rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="font-semibold text-stone-800 text-sm">Project Status</h3>
                    <p className="text-[11px] text-stone-400 mt-0.5">Completed vs Ongoing</p>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-violet-500" />
                  </div>
                </div>
                <div className="w-full h-[200px]">
                  {(() => {
                    const { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } = require('recharts');
                    const statusData = [
                      { name: 'Completed', value: stats.completed },
                      { name: 'Ongoing', value: stats.ongoing },
                    ].filter(d => d.value > 0);
                    const COLORS = ['#10b981', '#f59e0b'];
                    return statusData.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={statusData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={5} dataKey="value" stroke="none">
                            {statusData.map((_: any, i: number) => (
                              <Cell key={i} fill={COLORS[i % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip contentStyle={{background: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '12px'}} />
                        </PieChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="h-full flex items-center justify-center text-stone-400 text-sm">No data</div>
                    );
                  })()}
                </div>
                <div className="flex justify-center gap-5 mt-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="text-[11px] text-stone-500">Completed ({stats.completed})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <span className="text-[11px] text-stone-500">Ongoing ({stats.ongoing})</span>
                  </div>
                </div>
              </div>

              {/* Quick Stats Cards */}
              <div className="bg-white border border-stone-200/80 rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="font-semibold text-stone-800 text-sm">Team & Content</h3>
                    <p className="text-[11px] text-stone-400 mt-0.5">Resources overview</p>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                    <Users className="w-4 h-4 text-amber-500" />
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { label: 'Team Members', value: team.length, icon: Users, color: 'bg-blue-500', bgColor: 'bg-blue-50' },
                    { label: 'Blog Posts', value: blogs.length, icon: BookOpen, color: 'bg-violet-500', bgColor: 'bg-violet-50' },
                    { label: 'Gallery Images', value: gallery.length, icon: Camera, color: 'bg-emerald-500', bgColor: 'bg-emerald-50' },
                    { label: 'Todo Tasks', value: todos.length, icon: ClipboardList, color: 'bg-amber-500', bgColor: 'bg-amber-50' },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg ${item.bgColor} flex items-center justify-center`}>
                            <Icon className={`w-4 h-4 ${item.color.replace('bg-', 'text-')}`} />
                          </div>
                          <span className="text-[13px] text-stone-600 font-medium">{item.label}</span>
                        </div>
                        <span className="text-lg font-semibold text-stone-800">{item.value}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recent Activity / Quick Actions */}
              <div className="bg-white border border-stone-200/80 rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="font-semibold text-stone-800 text-sm">Quick Actions</h3>
                    <p className="text-[11px] text-stone-400 mt-0.5">Jump to sections</p>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-rose-500" />
                  </div>
                </div>
                <div className="space-y-2.5">
                  {[
                    { label: 'Add New Property', tab: 'properties' as const, icon: Plus, gradient: 'from-blue-500 to-blue-600' },
                    { label: 'Review Inquiries', tab: 'inquiries' as const, icon: MessageSquare, gradient: 'from-amber-500 to-orange-500' },
                    { label: 'Manage Team', tab: 'team' as const, icon: Users, gradient: 'from-violet-500 to-purple-600' },
                    { label: 'Write Blog Post', tab: 'blogs' as const, icon: BookOpen, gradient: 'from-emerald-500 to-teal-600' },
                    { label: 'Upload Gallery', tab: 'gallery' as const, icon: Camera, gradient: 'from-rose-500 to-pink-600' },
                  ].map((action) => {
                    const Icon = action.icon;
                    return (
                      <button
                        key={action.label}
                        onClick={() => setActiveTab(action.tab)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-stone-50 transition-all duration-200 cursor-pointer group text-left"
                      >
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${action.gradient} flex items-center justify-center shadow-sm`}>
                          <Icon className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="text-[13px] text-stone-600 group-hover:text-stone-800 font-medium transition-colors">{action.label}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-stone-300 ml-auto group-hover:text-stone-500 transition-colors" />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Dashboard Charts Row 3 - Full Width Area Chart */}
            <div className="bg-white border border-stone-200/80 rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="font-semibold text-stone-800 text-sm">Property Price Range Analysis</h3>
                  <p className="text-[11px] text-stone-400 mt-0.5">Price distribution across listings</p>
                </div>
                <div className="w-8 h-8 rounded-lg bg-cyan-50 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-cyan-500" />
                </div>
              </div>
              <div className="w-full h-[280px]">
                {(() => {
                  const { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } = require('recharts');
                  const priceData = properties
                    .map(p => ({
                      name: p.title?.substring(0, 15) + (p.title && p.title.length > 15 ? '...' : '') || 'Unnamed',
                      price: (p.price || 0) / 100000,
                    }))
                    .sort((a, b) => a.price - b.price)
                    .slice(0, 12);
                  return priceData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={priceData}>
                        <defs>
                          <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#957258" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#957258" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis dataKey="name" tick={{fontSize: 10, fill: '#94a3b8'}} axisLine={false} tickLine={false} />
                        <YAxis tick={{fontSize: 11, fill: '#94a3b8'}} axisLine={false} tickLine={false} tickFormatter={(v: number) => `₹${v}L`} />
                        <Tooltip 
                          contentStyle={{background: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)'}}
                          formatter={(value: number) => [`₹${value}L`, 'Price']}
                        />
                        <Area type="monotone" dataKey="price" stroke="#957258" strokeWidth={2.5} fill="url(#priceGradient)" dot={{r: 4, fill: '#957258', stroke: '#fff', strokeWidth: 2}} />
                      </AreaChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full flex items-center justify-center text-stone-400 text-sm">No property data available</div>
                  );
                })()}
              </div>
            </div>
          </section>
        ) : activeTab === 'properties' ? (
          <section className="space-y-6">
            
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center bg-white border border-stone-200/80 rounded-lg p-4 shadow-sm">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search by Title, Location, or Type..."
                  value={propSearch}
                  onChange={(e) => setPropSearch(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-sm py-2 px-3 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-gold-500"
                />
                {propSearch && (
                  <button 
                    onClick={() => setPropSearch('')}
                    className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <button
                onClick={openAddModal}
                className="bg-gold-500 hover:bg-gold-600 text-white text-xs uppercase font-bold tracking-widest py-2.5 px-5 rounded-sm shadow-sm transition-colors flex items-center justify-center space-x-1.5 cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>New Property</span>
              </button>
            </div>

            {/* Properties Table */}
            <div className="bg-white border border-stone-200/85 rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-stone-50 border-b border-stone-200/80 text-[10px] uppercase tracking-wider font-bold text-stone-400">
                      <th className="py-4 px-6">Property</th>
                      <th className="py-4 px-4">Location</th>
                      <th className="py-4 px-4">Category</th>
                      <th className="py-4 px-4">Type</th>
                      <th className="py-4 px-4">Rate (₹)</th>
                      <th className="py-4 px-4">Base Price</th>
                      <th className="py-4 px-4">Status</th>
                      <th className="py-4 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 text-xs">
                    {filteredProperties.length > 0 ? (
                      filteredProperties.map((prop) => (
                        <tr key={prop.id} className="hover:bg-stone-50/50 transition-colors">
                          <td className="py-4 px-6">
                            <div className="flex items-center space-x-3">
                              <div className="relative w-12 h-9 rounded-sm overflow-hidden bg-stone-100 border border-stone-200 shrink-0">
                                <Image
                                  src={prop.image}
                                  alt={prop.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <h4 className="font-semibold text-stone-900 flex items-center space-x-1.5">
                                  <span>{prop.title}</span>
                                  {prop.featured && (
                                    <span className="bg-gold-50 text-gold-600 text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded-sm font-bold border border-gold-200/30">
                                      Featured
                                    </span>
                                  )}
                                </h4>
                                <span className="text-[10px] text-stone-400 font-mono mt-0.5 block">{prop.id}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-stone-600">{prop.location}</td>
                          <td className="py-4 px-4 font-semibold text-gold-600 dark:text-gold-500 uppercase text-[10px] tracking-wider">
                            {prop.category || 'Plots'}
                          </td>
                          <td className="py-4 px-4">
                            <span className="bg-stone-100 text-stone-700 text-[10px] px-2 py-0.5 rounded-sm font-medium">
                              {prop.type}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-stone-800 font-mono">₹{prop.rate.toLocaleString('en-IN')}/Gaj</td>
                          <td className="py-4 px-4 text-stone-900 font-semibold font-mono">
                            ₹{(prop.price / 100000).toFixed(1)} Lakhs
                          </td>
                          <td className="py-4 px-4">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                              prop.status === 'Completed'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/40'
                                : 'bg-blue-50 text-blue-700 border border-blue-200/40'
                            }`}>
                              {prop.status}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-right space-x-2">
                            <button
                              onClick={() => openEditModal(prop)}
                              className="p-1.5 text-stone-500 hover:text-gold-600 hover:bg-stone-100 transition-all rounded-sm inline-flex cursor-pointer"
                              title="Edit Property"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setDeletingId(prop.id)}
                              className="p-1.5 text-stone-500 hover:text-red-600 hover:bg-red-50 transition-all rounded-sm inline-flex cursor-pointer"
                              title="Delete Property"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="text-center py-16 text-stone-400">
                          <Building2 className="w-8 h-8 mx-auto mb-2 text-stone-300" />
                          <p className="font-semibold text-stone-600">No properties found</p>
                          <p className="text-[10px] mt-1 text-stone-400">Try adjusting your search criteria or register a new one.</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        ) : activeTab === 'inquiries' ? (
          <section className="space-y-6">
            
            {/* Search Inquiries */}
            <div className="flex bg-white border border-stone-200/80 rounded-lg p-4 shadow-sm">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search inquiries by name, contact, requirements..."
                  value={inqSearch}
                  onChange={(e) => setInqSearch(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-sm py-2 px-3 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-gold-500"
                />
                {inqSearch && (
                  <button 
                    onClick={() => setInqSearch('')}
                    className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Inquiries Table */}
            <div className="bg-white border border-stone-200/85 rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-stone-50 border-b border-stone-200/80 text-[10px] uppercase tracking-wider font-bold text-stone-400">
                      <th className="py-4 px-6">Client Info</th>
                      <th className="py-4 px-4">Requirements</th>
                      <th className="py-4 px-4">Submitted At</th>
                      <th className="py-4 px-4">Status</th>
                      <th className="py-4 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 text-xs">
                    {filteredInquiries.length > 0 ? (
                      filteredInquiries.map((inq) => (
                         <tr key={inq.id} className={`hover:bg-stone-50/50 transition-colors ${inq.status === 'New' ? 'bg-amber-50/20 font-medium' : ''}`}>
                          <td className="py-4 px-6">
                            <div className="flex flex-col space-y-1">
                              <div className="flex items-center space-x-2">
                                <h4 className="font-semibold text-stone-900">{inq.name}</h4>
                                {inq.inquiryType === 'Sell' ? (
                                  <span className="bg-amber-500/10 text-amber-700 border border-amber-500/30 text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-sm">
                                    Sell Request
                                  </span>
                                ) : inq.inquiryType === 'Query' ? (
                                  <span className="bg-emerald-500/10 text-emerald-700 border border-emerald-500/30 text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-sm">
                                    Quick Query
                                  </span>
                                ) : (
                                  <span className="bg-blue-500/10 text-blue-700 border border-blue-500/30 text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-sm">
                                    Consultation
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-stone-500">{inq.email}</p>
                              <p className="text-[11px] text-stone-500 font-mono">{inq.phone}</p>
                            </div>
                          </td>
                          <td className="py-4 px-4 max-w-sm">
                            <div className="flex space-x-3 items-start">
                              {inq.propImage && (
                                <div className="relative w-16 h-12 rounded border border-stone-200 overflow-hidden shrink-0 shadow-sm">
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img 
                                    src={inq.propImage} 
                                    alt="Property uploaded by owner" 
                                    className="object-cover w-full h-full cursor-zoom-in"
                                    onClick={() => window.open(inq.propImage, '_blank')}
                                    title="View full image in new tab"
                                  />
                                </div>
                              )}
                              <div className="min-w-0 flex-1">
                                <p className="text-stone-700 whitespace-pre-wrap leading-relaxed">
                                  {inq.requirements || 'No special requirements listed.'}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-stone-500 font-mono">
                            <div className="flex items-center space-x-1.5">
                              <Calendar className="w-3.5 h-3.5 text-stone-400" />
                              <span>{new Date(inq.timestamp).toLocaleString('en-IN', {
                                dateStyle: 'medium',
                                timeStyle: 'short'
                              })}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <select
                              value={inq.status}
                              onChange={(e) => handleStatusChange(inq.id, e.target.value as any)}
                              className={`text-[10px] uppercase font-bold tracking-wider py-1 px-2.5 rounded-full border bg-white focus:outline-none transition-colors ${
                                inq.status === 'New'
                                  ? 'border-amber-300 text-amber-700 bg-amber-50/50'
                                  : inq.status === 'Contacted'
                                  ? 'border-blue-300 text-blue-700 bg-blue-50/50'
                                  : 'border-stone-300 text-stone-500 bg-stone-50/50'
                              }`}
                            >
                              <option value="New">New Request</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Archived">Archived</option>
                            </select>
                          </td>
                          <td className="py-4 px-6 text-right">
                            <button
                              onClick={() => handleDeleteInquiryClick(inq.id)}
                              className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 transition-all rounded-sm inline-flex cursor-pointer"
                              title="Delete Inquiry"
                            >
                              <Trash2 className="w-4.5 h-4.5" />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="text-center py-16 text-stone-400">
                          <MessageSquare className="w-8 h-8 mx-auto mb-2 text-stone-300" />
                          <p className="font-semibold text-stone-600">No inquiries found</p>
                          <p className="text-[10px] mt-1 text-stone-400">Customer consult requests will appear here once submitted.</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        ) : activeTab === 'sell' ? (
          <section className="space-y-6">
            
            {/* Search Sell Requests */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center bg-white border border-stone-200/80 rounded-lg p-4 shadow-sm">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search by Owner Name, Property Title, Location..."
                  value={sellSearch}
                  onChange={(e) => setSellSearch(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-sm py-2 px-3 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-gold-500"
                />
                {sellSearch && (
                  <button 
                    onClick={() => setSellSearch('')}
                    className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Sell Requests Table */}
            <div className="bg-white border border-stone-200/80 rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-stone-50 text-[10px] uppercase font-bold tracking-wider text-stone-400 border-b border-stone-200">
                      <th className="py-4 px-6">Owner Coordinates</th>
                      <th className="py-4 px-6">Property Details</th>
                      <th className="py-4 px-6">Connecting Road</th>
                      <th className="py-4 px-6">Uploaded Photo</th>
                      <th className="py-4 px-6">Date Registered</th>
                      <th className="py-4 px-6">Status</th>
                      <th className="py-4 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 text-xs">
                    {filteredSellRequests.length > 0 ? (
                      filteredSellRequests.map((req) => (
                        <tr key={req.id} className={`hover:bg-stone-50/50 transition-colors ${req.status === 'New' ? 'bg-amber-50/20 font-medium' : ''}`}>
                          <td className="py-4 px-6">
                            <div>
                              <h4 className="font-semibold text-stone-900">{req.name}</h4>
                              <p className="text-[11px] text-stone-500 mt-0.5">{req.email}</p>
                              <p className="text-[11px] text-stone-500 font-mono mt-0.5">{req.phone}</p>
                            </div>
                          </td>
                          <td className="py-4 px-6 max-w-xs">
                            <div>
                              <p className="font-semibold text-stone-850 truncate" title={req.propTitle}>
                                {req.propTitle || 'N/A'}
                              </p>
                              <div className="flex flex-wrap gap-1.5 mt-1">
                                <span className="bg-stone-100 text-stone-600 text-[9px] px-1.5 py-0.5 rounded-sm">
                                  {req.propType || 'Plot'}
                                </span>
                                <span className="bg-gold-500/10 text-gold-700 text-[9px] px-1.5 py-0.5 rounded-sm">
                                  {req.propLocation || 'Shimla Bypass'}
                                </span>
                              </div>
                              <p className="text-[11px] text-stone-500 mt-1 font-semibold">
                                Price: {req.propPrice || 'N/A'} • Size: {req.propSize || 'N/A'}
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div>
                              <p className="text-stone-750 font-medium">{req.propRoadWidth || 'N/A'}</p>
                              <p className="text-[10px] text-stone-400 mt-0.5 line-clamp-2 max-w-[200px]" title={req.requirements}>
                                {req.requirements.replace('[SELL PROPERTY REQUEST]', '').trim() || 'No remarks'}
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            {req.propImage ? (
                              <div className="relative w-16 h-12 rounded border border-stone-200 overflow-hidden shadow-sm group">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img 
                                  src={req.propImage} 
                                  alt="Property Upload" 
                                  className="object-cover w-full h-full cursor-zoom-in group-hover:scale-105 transition-transform"
                                  onClick={() => window.open(req.propImage, '_blank')}
                                />
                              </div>
                            ) : (
                              <span className="text-[10px] text-stone-400 italic">No image</span>
                            )}
                          </td>
                          <td className="py-4 px-6 text-stone-500 font-mono">
                            <div className="flex items-center space-x-1.5">
                              <Calendar className="w-3.5 h-3.5 text-stone-400" />
                              <span>{new Date(req.timestamp).toLocaleString('en-IN', {
                                dateStyle: 'short',
                                timeStyle: 'short'
                              })}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <select
                              value={req.status}
                              onChange={(e) => handleStatusChange(req.id, e.target.value as any)}
                              className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1.5 rounded-full border cursor-pointer focus:outline-none ${
                                req.status === 'New'
                                  ? 'bg-amber-50 text-amber-700 border-amber-200'
                                  : req.status === 'Contacted'
                                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                                  : 'bg-stone-50 text-stone-500 border-stone-200'
                              }`}
                            >
                              <option value="New">New Request</option>
                              <option value="Contacted">Reviewing / Contacted</option>
                              <option value="Archived">Archived</option>
                            </select>
                          </td>
                          <td className="py-4 px-6 text-right">
                            <button
                              onClick={() => handleDeleteInquiryClick(req.id)}
                              className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 transition-all rounded-sm inline-flex cursor-pointer"
                              title="Delete Request"
                            >
                              <Trash2 className="w-4.5 h-4.5" />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="text-center py-20 text-stone-400">
                          <TrendingUp className="w-8 h-8 mx-auto mb-2 text-stone-300 animate-pulse" />
                          <p className="font-semibold text-stone-600">No property sell requests found</p>
                          <p className="text-[10px] mt-1 text-stone-400">Owner-submitted properties listed for sale will appear here.</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        ) : activeTab === 'team' ? (
          <section className="space-y-6">
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center bg-white border border-stone-200/80 rounded-lg p-4 shadow-sm">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search by Name, Designation, or Contact..."
                  value={teamSearch}
                  onChange={(e) => setTeamSearch(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-sm py-2 px-3 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-gold-500"
                />
                {teamSearch && (
                  <button 
                    onClick={() => setTeamSearch('')}
                    className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <button
                onClick={handleOpenAddTeamModal}
                className="bg-gold-500 hover:bg-gold-600 text-white text-xs uppercase font-bold tracking-widest py-2.5 px-5 rounded-sm shadow-sm transition-colors flex items-center justify-center space-x-1.5 cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Add Representative</span>
              </button>
            </div>

            {/* Team Members Grid / Table */}
            <div className="bg-white border border-stone-200/85 rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-stone-50 border-b border-stone-200/80 text-[10px] uppercase tracking-wider font-bold text-stone-400">
                      <th className="py-4 px-6">Representative</th>
                      <th className="py-4 px-6">Designation</th>
                      <th className="py-4 px-6">Contact Number</th>
                      <th className="py-4 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 text-xs">
                    {filteredTeam.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="py-8 text-center text-stone-400 font-light italic">
                          No team members found. Click "Add Representative" to add.
                        </td>
                      </tr>
                    ) : (
                      filteredTeam.map((member) => (
                        <tr key={member.id} className="hover:bg-stone-50/50 transition-colors">
                          <td className="py-4 px-6 font-medium text-stone-900">
                            <div className="flex items-center space-x-3">
                              <div className="relative w-9 h-9 rounded-full overflow-hidden border border-stone-200 bg-stone-100 flex items-center justify-center text-[10px] text-stone-500 font-serif shrink-0">
                                {member.image ? (
                                  <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    className="object-cover"
                                  />
                                ) : (
                                  member.initials || member.name.substring(0, 2).toUpperCase()
                                )}
                              </div>
                              <div>
                                <span className="font-semibold text-stone-900 block">{member.name}</span>
                                <span className="text-[10px] text-stone-400 block font-light">{member.email}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6 font-medium text-stone-600">{member.role}</td>
                          <td className="py-4 px-6 font-mono text-stone-600">{member.phone}</td>
                          <td className="py-4 px-6 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end space-x-2">
                              <button
                                onClick={() => handleOpenEditTeamModal(member)}
                                className="p-1.5 text-stone-500 hover:text-gold-600 hover:bg-gold-50 rounded transition-all cursor-pointer"
                                title="Edit Representative"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteTeamMember(member.id)}
                                className="p-1.5 text-stone-500 hover:text-red-600 hover:bg-red-50 rounded transition-all cursor-pointer"
                                title="Delete Representative"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        ) : activeTab === 'blogs' ? (
          <section className="space-y-6">
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center bg-white border border-stone-200/80 rounded-lg p-4 shadow-sm">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search articles by title, category, author..."
                  value={blogSearch}
                  onChange={(e) => setBlogSearch(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-sm py-2 px-3 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-gold-500"
                />
                {blogSearch && (
                  <button 
                    onClick={() => setBlogSearch('')}
                    className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              <button
                onClick={() => {
                  setBlogFormData({
                    id: '',
                    title: '',
                    category: 'Investment Guide',
                    image: '',
                    date: '',
                    readTime: '5 min read',
                    author: 'Sumit Rajput (CEO)',
                    excerpt: '',
                    content: ''
                  });
                  setIsBlogModalOpen(true);
                }}
                className="bg-gold-500 hover:bg-gold-600 text-stone-955 px-4 py-2 rounded-sm shadow-md font-bold uppercase tracking-wider text-[10px] flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Blog Post</span>
              </button>
            </div>

            {/* Blogs Table */}
            <div className="bg-white border border-stone-200/85 rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-stone-50 border-b border-stone-200/80 text-[10px] uppercase tracking-wider font-bold text-stone-400">
                      <th className="py-4 px-6">Image</th>
                      <th className="py-4 px-4">Title & Excerpt</th>
                      <th className="py-4 px-4">Category</th>
                      <th className="py-4 px-4">Author</th>
                      <th className="py-4 px-4">Published Date</th>
                      <th className="py-4 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 text-xs text-stone-700">
                    {blogs.filter(blog => 
                      blog.title.toLowerCase().includes(blogSearch.toLowerCase()) || 
                      blog.category.toLowerCase().includes(blogSearch.toLowerCase()) ||
                      blog.author.toLowerCase().includes(blogSearch.toLowerCase())
                    ).length > 0 ? (
                      blogs.filter(blog => 
                        blog.title.toLowerCase().includes(blogSearch.toLowerCase()) || 
                        blog.category.toLowerCase().includes(blogSearch.toLowerCase()) ||
                        blog.author.toLowerCase().includes(blogSearch.toLowerCase())
                      ).map((blog) => (
                        <tr key={blog.id} className="hover:bg-stone-50/40 transition-colors">
                          <td className="py-4 px-6">
                            <div className="relative w-16 h-10 bg-stone-100 rounded overflow-hidden border border-stone-200">
                              <Image 
                                src={blog.image || '/images/hero_villa.png'} 
                                alt={blog.title} 
                                fill 
                                className="object-cover" 
                              />
                            </div>
                          </td>
                          <td className="py-4 px-4 max-w-xs">
                            <h4 className="font-bold text-stone-900 truncate" title={blog.title}>{blog.title}</h4>
                            <p className="text-[10px] text-stone-400 truncate mt-0.5" title={blog.excerpt}>{blog.excerpt}</p>
                          </td>
                          <td className="py-4 px-4 font-mono text-[10px] uppercase tracking-wide text-stone-500">
                            {blog.category}
                          </td>
                          <td className="py-4 px-4 font-medium text-stone-850">
                            {blog.author}
                          </td>
                          <td className="py-4 px-4 text-stone-400 font-mono text-[10px]">
                            {blog.date}
                          </td>
                          <td className="py-4 px-6 text-right">
                            <div className="flex items-center justify-end space-x-2.5">
                              <button
                                onClick={() => {
                                  setBlogFormData(blog);
                                  setIsBlogModalOpen(true);
                                }}
                                className="p-1.5 text-stone-500 hover:text-gold-600 hover:bg-gold-50 rounded transition-all cursor-pointer"
                                title="Edit Blog"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteBlogClick(blog.id)}
                                className="p-1.5 text-stone-500 hover:text-red-600 hover:bg-red-50 rounded transition-all cursor-pointer"
                                title="Delete Blog"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="text-center py-20 text-stone-400">
                          <BookOpen className="w-8 h-8 mx-auto mb-2 text-stone-300 animate-pulse" />
                          <p className="font-semibold text-stone-600">No blog posts found</p>
                          <p className="text-[10px] mt-1 text-stone-400">Add a new post or modify query filter above.</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        ) : activeTab === 'gallery' ? (
          <section className="space-y-6">
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center bg-white border border-stone-200/80 rounded-lg p-4 shadow-sm">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search gallery by title or category..."
                  value={gallerySearch}
                  onChange={(e) => setGallerySearch(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-sm py-2 px-3 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-gold-500"
                />
                {gallerySearch && (
                  <button 
                    onClick={() => setGallerySearch('')}
                    className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              <button
                onClick={() => {
                  setGalleryFormData({
                    id: '',
                    title: '',
                    category: 'Layouts',
                    image: ''
                  });
                  setIsGalleryModalOpen(true);
                }}
                className="bg-gold-500 hover:bg-gold-600 text-stone-955 px-4 py-2 rounded-sm shadow-md font-bold uppercase tracking-wider text-[10px] flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Gallery Image</span>
              </button>
            </div>

            {/* Gallery Table */}
            <div className="bg-white border border-stone-200/85 rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-stone-50 border-b border-stone-200/80 text-[10px] uppercase tracking-wider font-bold text-stone-400">
                      <th className="py-4 px-6">Image</th>
                      <th className="py-4 px-4">Title</th>
                      <th className="py-4 px-4">Category</th>
                      <th className="py-4 px-4">Date Added</th>
                      <th className="py-4 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 text-xs text-stone-700">
                    {gallery.filter(item => 
                      item.title.toLowerCase().includes(gallerySearch.toLowerCase()) || 
                      item.category.toLowerCase().includes(gallerySearch.toLowerCase())
                    ).length > 0 ? (
                      gallery.filter(item => 
                        item.title.toLowerCase().includes(gallerySearch.toLowerCase()) || 
                        item.category.toLowerCase().includes(gallerySearch.toLowerCase())
                      ).map((item) => (
                        <tr key={item.id} className="hover:bg-stone-50/40 transition-colors">
                          <td className="py-4 px-6">
                            <div className="relative w-16 h-10 bg-stone-100 rounded overflow-hidden border border-stone-200">
                              <Image 
                                src={item.image || '/images/hero_villa.png'} 
                                alt={item.title} 
                                fill 
                                className="object-cover" 
                              />
                            </div>
                          </td>
                          <td className="py-4 px-4 font-medium text-stone-900">
                            {item.title}
                          </td>
                          <td className="py-4 px-4 font-mono text-[10px] uppercase tracking-wide text-stone-500">
                            {item.category}
                          </td>
                          <td className="py-4 px-4 text-stone-400 font-mono text-[10px]">
                            {item.timestamp ? new Date(item.timestamp).toLocaleDateString('en-IN') : 'N/A'}
                          </td>
                          <td className="py-4 px-6 text-right">
                            <div className="flex items-center justify-end space-x-2.5">
                              <button
                                onClick={() => {
                                  setGalleryFormData(item);
                                  setIsGalleryModalOpen(true);
                                }}
                                className="p-1.5 text-stone-500 hover:text-gold-600 hover:bg-gold-50 rounded transition-all cursor-pointer"
                                title="Edit Gallery Item"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteGalleryClick(item.id)}
                                className="p-1.5 text-stone-500 hover:text-red-600 hover:bg-red-50 rounded transition-all cursor-pointer"
                                title="Delete Gallery Item"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="text-center py-20 text-stone-400">
                          <Camera className="w-8 h-8 mx-auto mb-2 text-stone-300 animate-pulse" />
                          <p className="font-semibold text-stone-600">No gallery items found</p>
                          <p className="text-[10px] mt-1 text-stone-400">Add a new image or modify query filter above.</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        ) : activeTab === 'todos' ? (
          /* Todo List Panel */
          <section className="space-y-6">
            
            {/* Summary Progress Card */}
            {(() => {
              const completedCount = todos.filter(t => t.completed).length;
              const totalCount = todos.length;
              const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
              
              return (
                <div className="bg-white border border-stone-200/80 rounded-lg p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-stone-800 uppercase tracking-wider">Progress Overview</h3>
                    <p className="text-xs text-stone-400">
                      {completedCount} of {totalCount} administrative tasks completed ({percent}%)
                    </p>
                  </div>
                  <div className="flex-grow max-w-md w-full">
                    <div className="w-full bg-stone-100 rounded-full h-2.5 overflow-hidden border border-stone-200/50">
                      <div 
                        className="bg-gold-500 h-full rounded-full transition-all duration-500" 
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Todo Input & Operations Form */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left Column: Add Task */}
              <div className="bg-white border border-stone-200/80 rounded-lg p-6 shadow-sm h-fit">
                <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-4 border-b border-stone-100 pb-2">
                  Create New Task
                </h3>
                
                <form onSubmit={handleAddTodo} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-stone-500">
                      Task Description
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Call client for Doiwala plot registry..."
                      value={newTodoText}
                      onChange={(e) => setNewTodoText(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-sm py-2 px-3 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/20"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-stone-500">
                      Priority Level
                    </label>
                    <select
                      value={newTodoPriority}
                      onChange={(e) => setNewTodoPriority(e.target.value as any)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-sm py-2 px-3 text-xs text-stone-805 focus:outline-none focus:border-gold-500 cursor-pointer"
                    >
                      <option value="low">Low Priority (Goldish Grey)</option>
                      <option value="medium">Medium Priority (Warm Gold)</option>
                      <option value="high">High Priority (Deep Red)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gold-500 hover:bg-gold-600 text-stone-955 py-2.5 rounded-sm shadow-md font-bold uppercase tracking-wider text-[10px] flex items-center justify-center space-x-1.5 transition-colors cursor-pointer border-none"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Create Task</span>
                  </button>
                </form>
              </div>

              {/* Right Column: Task List */}
              <div className="lg:col-span-2 space-y-4">
                
                {/* Search & Filter Controls */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center bg-white border border-stone-200/80 rounded-lg p-4 shadow-sm">
                  <div className="relative flex-grow max-w-md">
                    <input
                      type="text"
                      placeholder="Search tasks..."
                      value={todoSearch}
                      onChange={(e) => setTodoSearch(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-sm py-2 px-3 text-xs text-stone-805 placeholder-stone-400 focus:outline-none focus:border-gold-500"
                    />
                    {todoSearch && (
                      <button 
                        onClick={() => setTodoSearch('')}
                        className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-600"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="flex bg-stone-100 rounded-sm p-0.5 border border-stone-200">
                      {(['all', 'active', 'completed'] as const).map((filterOpt) => (
                        <button
                          key={filterOpt}
                          type="button"
                          onClick={() => setTodoFilter(filterOpt)}
                          className={`px-3 py-1.5 rounded-sm text-[9px] uppercase tracking-wider font-bold transition-all cursor-pointer ${
                            todoFilter === filterOpt
                              ? 'bg-white text-stone-800 shadow-sm'
                              : 'text-stone-400 hover:text-stone-600'
                          }`}
                        >
                          {filterOpt}
                        </button>
                      ))}
                    </div>

                    {todos.some(t => t.completed) && (
                      <button
                        onClick={handleClearCompletedTodos}
                        className="text-[9px] uppercase font-bold tracking-wider text-red-500 hover:bg-red-50 px-2.5 py-2 rounded-sm border border-red-200/30 transition-colors cursor-pointer"
                      >
                        Clear Completed
                      </button>
                    )}
                  </div>
                </div>

                {/* Todo Cards List Container */}
                <div className="space-y-2">
                  {(() => {
                    let filtered = todos.filter(todo => {
                      const matchesSearch = todo.text.toLowerCase().includes(todoSearch.toLowerCase());
                      const matchesFilter = 
                        todoFilter === 'all' ? true :
                        todoFilter === 'active' ? !todo.completed :
                        todo.completed;
                      return matchesSearch && matchesFilter;
                    });

                    // Sort: high priority first, then medium, then low
                    const priorityWeights = { high: 3, medium: 2, low: 1 };
                    filtered = [...filtered].sort((a, b) => {
                      if (todoSort === 'priority') {
                        return priorityWeights[b.priority] - priorityWeights[a.priority];
                      }
                      return b.id.localeCompare(a.id); // Newest first
                    });

                    if (filtered.length === 0) {
                      return (
                        <div className="bg-white border border-stone-200 rounded-lg py-16 text-center text-stone-400 shadow-sm">
                          <ClipboardList className="w-8 h-8 mx-auto mb-2 text-stone-300" />
                          <p className="font-semibold text-stone-600 text-xs">No tasks found</p>
                          <p className="text-[10px] mt-1 text-stone-400">All caught up or adjust filters above.</p>
                        </div>
                      );
                    }

                    return filtered.map((todo) => {
                      const priorityColor = 
                        todo.priority === 'high' ? 'bg-red-500/10 text-red-600 border-red-200/40' :
                        todo.priority === 'medium' ? 'bg-gold-500/10 text-gold-700 border-gold-300/40' :
                        'bg-stone-100 text-stone-500 border-stone-200/50';

                      return (
                        <div 
                          key={todo.id}
                          onClick={() => handleToggleTodo(todo.id)}
                          className={`bg-white border p-4 rounded-lg shadow-sm flex items-center justify-between gap-4 cursor-pointer select-none transition-all duration-200 hover:shadow-md hover:border-stone-300/80 ${
                            todo.completed ? 'opacity-65 bg-stone-50/50' : ''
                          }`}
                        >
                          <div className="flex items-center space-x-3.5 flex-grow min-w-0">
                            {/* Circle Checkbox */}
                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors shrink-0 ${
                              todo.completed 
                                ? 'bg-emerald-500 border-emerald-500 text-white' 
                                : 'border-stone-300 hover:border-gold-500 bg-white'
                            }`}>
                              {todo.completed && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            
                            <div className="min-w-0 flex-grow">
                              <span className={`text-xs font-semibold leading-relaxed break-words block ${
                                todo.completed ? 'line-through text-stone-400' : 'text-stone-850'
                              }`}>
                                {todo.text}
                              </span>
                              <span className="text-[9px] font-mono text-stone-400 block mt-0.5">
                                Created: {todo.date}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3 shrink-0" onClick={(e) => e.stopPropagation()}>
                            {/* Priority Badge */}
                            <span className={`text-[8px] uppercase font-bold tracking-widest px-2 py-0.5 rounded border ${priorityColor}`}>
                              {todo.priority}
                            </span>
                            
                            {/* Delete Task Button */}
                            <button
                              onClick={() => handleDeleteTodo(todo.id)}
                              className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors cursor-pointer border-none bg-transparent"
                              title="Delete Task"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>

              </div>

            </div>

          </section>
        ) : activeTab === 'hero' ? (
          <section className="space-y-6 animate-in fade-in duration-300">
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center bg-white border border-stone-200/80 rounded-lg p-4 shadow-sm">
              <div className="relative flex-grow max-w-md">
                <input
                  type="text"
                  placeholder="Filter banners by path..."
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-sm py-2 px-3 text-xs text-stone-850 placeholder-stone-400 focus:outline-none focus:border-gold-500"
                />
                {heroSearch && (
                  <button 
                    type="button"
                    onClick={() => setHeroSearch('')}
                    className="absolute right-3 top-2.5 text-stone-450 hover:text-stone-700 bg-transparent border-none outline-none cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              <button
                type="button"
                onClick={() => {
                  setHeroFormData({ id: '', image: '', order: heroBanners.length + 1 });
                  setIsHeroModalOpen(true);
                }}
                className="bg-stone-900 hover:bg-gold-500 hover:text-stone-950 text-white font-bold uppercase tracking-wider text-[10px] py-2.5 px-4 rounded-sm flex items-center justify-center space-x-1.5 transition-all shadow-sm cursor-pointer shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Hero Banner</span>
              </button>
            </div>

            {/* Banners Grid */}
            {heroBanners.filter(b => b.image.toLowerCase().includes(heroSearch.toLowerCase())).length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {heroBanners
                  .filter(b => b.image.toLowerCase().includes(heroSearch.toLowerCase()))
                  .map((banner) => (
                    <div key={banner.id} className="bg-white border border-stone-200/80 rounded-xl overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                      <div className="relative aspect-[16/9] w-full bg-stone-100 border-b border-stone-100">
                        <Image
                          src={banner.image}
                          alt="Hero Banner Image"
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover"
                        />
                        <div className="absolute top-2 left-2 bg-stone-900/85 text-white text-[9px] font-bold tracking-widest px-2.5 py-1 rounded shadow-sm">
                          ORDER {banner.order}
                        </div>
                      </div>
                      <div className="p-4 flex items-center justify-between gap-4">
                        <div className="min-w-0 flex-1">
                          <span className="text-[10px] font-mono text-stone-400 block truncate" title={banner.image}>
                            {banner.image}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setHeroFormData(banner);
                              setIsHeroModalOpen(true);
                            }}
                            className="p-1.5 border border-stone-200 hover:border-gold-500 text-stone-500 hover:text-gold-600 rounded transition-all cursor-pointer bg-transparent"
                            title="Edit Banner"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteHeroBanner(banner.id)}
                            className="p-1.5 border border-stone-200 hover:border-red-500 text-stone-550 hover:text-red-600 rounded transition-all cursor-pointer bg-transparent"
                            title="Delete Banner"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="bg-white border border-stone-200 rounded-lg py-16 text-center text-stone-450 shadow-sm">
                <ImageIcon className="w-8 h-8 mx-auto mb-2 text-stone-300" />
                <p className="font-semibold text-stone-600 text-xs">No banners found</p>
                <p className="text-[10px] mt-1 text-stone-400">Add a new background banner to get started.</p>
              </div>
            )}
          </section>
        ) : null}
      </main>
    </div>

      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-lg max-w-sm w-full p-6 shadow-xl border border-stone-250/60 animate-in fade-in zoom-in duration-200">
            <h3 className="font-serif text-xl text-stone-900 mb-2">Delete Property Listing?</h3>
            <p className="text-xs text-stone-500 leading-relaxed mb-6">
              Are you sure you want to delete this property? This action is permanent and cannot be undone.
            </p>
            <div className="flex space-x-3 justify-end">
              <button
                onClick={() => setDeletingId(null)}
                className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-stone-500 hover:text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-sm cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-700 rounded-sm cursor-pointer transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Blog Delete Confirmation Modal */}
      {deletingBlogId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-lg max-w-sm w-full p-6 shadow-xl border border-stone-250/60 animate-in fade-in zoom-in duration-200">
            <h3 className="font-serif text-xl text-stone-900 mb-2">Delete Blog Post?</h3>
            <p className="text-xs text-stone-500 leading-relaxed mb-6">
              Are you sure you want to delete this blog post? This action is permanent and will remove it from the public blog section.
            </p>
            <div className="flex space-x-3 justify-end">
              <button
                onClick={() => setDeletingBlogId(null)}
                className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-stone-500 hover:text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-sm cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteBlogConfirm}
                className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-700 rounded-sm cursor-pointer transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Blog Modal */}
      {isBlogModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-stone-200 animate-in fade-in zoom-in duration-300">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-stone-100 bg-stone-50/50">
              <div>
                <h3 className="font-serif text-xl text-stone-900">
                  {blogFormData.id ? 'Edit Blog Article' : 'Write New Blog Article'}
                </h3>
                <p className="text-[10px] text-stone-400 uppercase tracking-wider mt-0.5">Dreamsland Editorial Portal</p>
              </div>
              <button
                onClick={() => setIsBlogModalOpen(false)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSaveBlog} className="flex-grow overflow-y-auto p-6 space-y-5 text-xs text-stone-700">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Title */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-stone-400 pl-1">Article Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Why Shimla Bypass Road is appreciations"
                    value={blogFormData.title || ''}
                    onChange={(e) => setBlogFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full bg-stone-50 border border-stone-200 focus:bg-white rounded-sm py-2 px-3 focus:outline-none focus:border-gold-500 font-medium"
                  />
                </div>

                {/* Category */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-stone-400 pl-1">Category *</label>
                  <select
                    value={blogFormData.category || 'Investment Guide'}
                    onChange={(e) => setBlogFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full bg-stone-50 border border-stone-200 focus:bg-white rounded-sm py-2 px-3 focus:outline-none focus:border-gold-500 font-medium"
                  >
                    <option value="Investment Guide">Investment Guide</option>
                    <option value="Legal & Registry">Legal & Registry</option>
                    <option value="Development Standards">Development Standards</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {/* Author */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-stone-400 pl-1">Author Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Sumit Rajput (CEO)"
                    value={blogFormData.author || ''}
                    onChange={(e) => setBlogFormData(prev => ({ ...prev, author: e.target.value }))}
                    className="w-full bg-stone-50 border border-stone-200 focus:bg-white rounded-sm py-2 px-3 focus:outline-none focus:border-gold-500 font-medium"
                  />
                </div>

                {/* Read Time */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-stone-400 pl-1">Read Time Estimate</label>
                  <input
                    type="text"
                    placeholder="e.g. 5 min read"
                    value={blogFormData.readTime || ''}
                    onChange={(e) => setBlogFormData(prev => ({ ...prev, readTime: e.target.value }))}
                    className="w-full bg-stone-50 border border-stone-200 focus:bg-white rounded-sm py-2 px-3 focus:outline-none focus:border-gold-500 font-medium"
                  />
                </div>

                {/* Custom Date (Optional) */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-stone-400 pl-1">Custom Date (Optional)</label>
                  <input
                    type="text"
                    placeholder="Leave empty for current date"
                    value={blogFormData.date || ''}
                    onChange={(e) => setBlogFormData(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full bg-stone-50 border border-stone-200 focus:bg-white rounded-sm py-2 px-3 focus:outline-none focus:border-gold-500 font-medium"
                  />
                </div>
              </div>

              {/* Excerpt */}
              <div className="space-y-1.5">
                <label className="block text-[10px] uppercase font-bold tracking-wider text-stone-400 pl-1">Excerpt (Short Summary) *</label>
                <input
                  type="text"
                  required
                  placeholder="Provide a concise 1-2 sentence description of the article..."
                  value={blogFormData.excerpt || ''}
                  onChange={(e) => setBlogFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                  className="w-full bg-stone-50 border border-stone-200 focus:bg-white rounded-sm py-2 px-3 focus:outline-none focus:border-gold-500 font-medium"
                />
              </div>

              {/* Content Textarea */}
              <div className="space-y-1.5">
                <label className="block text-[10px] uppercase font-bold tracking-wider text-stone-400 pl-1">Article Content *</label>
                <textarea
                  required
                  rows={8}
                  placeholder="Write the full content of the blog post here. Use two newlines (press Enter twice) between paragraphs to separate them nicely in the readable layout."
                  value={blogFormData.content || ''}
                  onChange={(e) => setBlogFormData(prev => ({ ...prev, content: e.target.value }))}
                  className="w-full bg-stone-50 border border-stone-200 focus:bg-white rounded-sm py-3 px-3 focus:outline-none focus:border-gold-500 font-light leading-relaxed resize-y"
                />
              </div>

              {/* Photo Upload with Cloudinary */}
              <div className="space-y-2 border-t border-stone-100 pt-4">
                <span className="block text-[10px] uppercase font-bold tracking-wider text-stone-400 pl-1">
                  Featured Image (Cloudinary Upload)
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                  <div className="flex flex-col space-y-2">
                    <input
                      type="text"
                      placeholder="Or enter custom image URL directly..."
                      value={blogFormData.image || ''}
                      onChange={(e) => setBlogFormData(prev => ({ ...prev, image: e.target.value }))}
                      className="w-full bg-stone-50 border border-stone-200 focus:bg-white rounded-sm py-2 px-3 focus:outline-none focus:border-gold-500"
                    />
                    
                    <label className="flex items-center justify-center border border-dashed border-stone-300 hover:border-gold-500 rounded-sm py-3 px-4 bg-stone-50/50 hover:bg-white transition-all cursor-pointer">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gold-600 hover:text-gold-700">
                        {uploading ? 'Uploading...' : 'Upload Image File'}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        disabled={uploading}
                        onChange={handleBlogImageUpload}
                      />
                    </label>
                  </div>

                  {blogFormData.image && (
                    <div className="relative aspect-video w-full max-w-[200px] rounded border border-stone-200 overflow-hidden bg-stone-100 justify-self-center sm:justify-self-start">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={blogFormData.image} alt="Featured Preview" className="object-cover w-full h-full" />
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-stone-100 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsBlogModalOpen(false)}
                  className="px-5 py-2.5 rounded-sm border border-stone-200 text-stone-500 hover:text-stone-750 hover:bg-stone-50 cursor-pointer font-bold uppercase tracking-wider text-[10px] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gold-500 hover:bg-gold-600 text-stone-955 px-7 py-2.5 rounded-sm shadow-md font-bold uppercase tracking-widest text-[10px] transition-colors cursor-pointer"
                >
                  Publish Article
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Add / Edit Property Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-stone-200 animate-in fade-in zoom-in duration-300">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-stone-100 bg-stone-50/50">
              <div>
                <h3 className="font-serif text-xl text-stone-900">
                  {formData.id ? 'Edit Property Details' : 'Register New Property'}
                </h3>
                <p className="text-[10px] text-stone-400 uppercase tracking-widest mt-0.5">
                  {formData.id ? `ID: ${formData.id}` : 'Create Private Desk Entry'}
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSaveProperty} className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
              
              {/* Basic Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-widest text-stone-500 mb-1.5">
                    Property Name / Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleFormChange}
                    placeholder="e.g. Doon Crest Township"
                    className="w-full bg-stone-50 border border-stone-200 rounded-sm py-2 px-3 focus:outline-none focus:border-gold-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-widest text-stone-500 mb-1.5">
                    Location Corridor *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleFormChange}
                    placeholder="e.g. Shimla Bypass Road, Dehradun"
                    className="w-full bg-stone-50 border border-stone-200 rounded-sm py-2 px-3 focus:outline-none focus:border-gold-500"
                    required
                  />
                </div>
              </div>

              {/* Pricing and Rates */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-widest text-stone-500 mb-1.5">
                    Rate per Gaj (₹) *
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="rate"
                      value={formData.rate}
                      onChange={handleFormChange}
                      placeholder="18000"
                      className="w-full bg-stone-50 border border-stone-200 rounded-sm py-2 px-3 focus:outline-none focus:border-gold-500 font-mono"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-widest text-stone-500 mb-1.5">
                    Base Price (₹ for 100 Gaj) *
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleFormChange}
                      placeholder="1800000"
                      className="w-full bg-stone-50 border border-stone-200 rounded-sm py-2 px-3 focus:outline-none focus:border-gold-500 font-mono"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-widest text-stone-500 mb-1.5">
                    Plot Sizes (Range)
                  </label>
                  <input
                    type="text"
                    name="size"
                    value={formData.size}
                    onChange={handleFormChange}
                    placeholder="e.g. 100 - 300 Gaj"
                    className="w-full bg-stone-50 border border-stone-200 rounded-sm py-2 px-3 focus:outline-none focus:border-gold-500"
                  />
                </div>
              </div>

              {/* Details & Specs */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-widest text-stone-500 mb-1.5">
                    Category (Sub-section) *
                  </label>
                  <select
                    name="category"
                    value={formData.category || 'Plots'}
                    onChange={handleFormChange}
                    className="w-full bg-stone-50 border border-stone-200 rounded-sm py-2 px-3 focus:outline-none focus:border-gold-500"
                  >
                    <option value="Plots">Plots</option>
                    <option value="Houses">Houses</option>
                    <option value="Flats">Flats</option>
                    <option value="Resales">Resales</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-widest text-stone-500 mb-1.5">
                    Property Type
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleFormChange}
                    className="w-full bg-stone-50 border border-stone-200 rounded-sm py-2 px-3 focus:outline-none focus:border-gold-500"
                  >
                    <option value="Plot">Plot (Freehold)</option>
                    <option value="Premium Plot">Premium Plot</option>
                    <option value="Forest Plot">Forest Plot</option>
                    <option value="Highway Plot">Highway Plot</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-widest text-stone-500 mb-1.5">
                    Road Width Specification
                  </label>
                  <input
                    type="text"
                    name="roadWidth"
                    value={formData.roadWidth}
                    onChange={handleFormChange}
                    placeholder="e.g. 25 Ft RCC roads"
                    className="w-full bg-stone-50 border border-stone-200 rounded-sm py-2 px-3 focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-widest text-stone-500 mb-1.5">
                    Registry & Mutation Status
                  </label>
                  <input
                    type="text"
                    name="mutationStatus"
                    value={formData.mutationStatus}
                    onChange={handleFormChange}
                    placeholder="e.g. Registry & Mutation Ready"
                    className="w-full bg-stone-50 border border-stone-200 rounded-sm py-2 px-3 focus:outline-none focus:border-gold-500"
                  />
                </div>
              </div>

              {/* Image Picker */}
              <div>
                <label className="block text-[10px] uppercase font-bold tracking-widest text-stone-500 mb-2">
                  Cover Image
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {IMAGES.map((img) => (
                    <div 
                      key={img.path}
                      onClick={() => setFormData(prev => ({ ...prev, image: img.path }))}
                      className={`relative aspect-[4/3] rounded-sm overflow-hidden cursor-pointer border-2 transition-all ${
                        formData.image === img.path 
                          ? 'border-gold-500 scale-102 shadow-md' 
                          : 'border-transparent opacity-60 hover:opacity-100 hover:scale-101'
                      }`}
                    >
                      <Image
                        src={img.path}
                        alt={img.label}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-stone-900/60 text-white text-[8px] text-center py-1">
                        {img.label}
                      </div>
                    </div>
                  ))}
                </div>
                {/* Fallback Custom URL & File Upload */}
                <div className="mt-3 flex flex-col sm:flex-row gap-3 items-center">
                  <div className="flex-1 w-full">
                    <input
                      type="text"
                      name="image"
                      value={formData.image}
                      onChange={handleFormChange}
                      placeholder="Or enter custom image URL"
                      className="w-full bg-stone-50 border border-stone-200 rounded-sm py-2 px-3 focus:outline-none focus:border-gold-500 font-mono text-[11px]"
                    />
                  </div>
                  <div className="w-full sm:w-auto shrink-0">
                    <label className="inline-flex items-center justify-center bg-gold-500 hover:bg-gold-600 text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-sm cursor-pointer shadow-sm transition-all duration-300 select-none">
                      <span>{uploading ? 'Uploading...' : 'Upload to Cloudinary'}</span>
                      <input
                        type="file"
                        disabled={uploading}
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Secondary Images (Gallery) */}
              <div className="space-y-3">
                <label className="block text-[10px] uppercase font-bold tracking-widest text-stone-500">
                  Secondary Gallery Images (Carousel)
                </label>
                
                {/* Secondary images thumbnails */}
                {formData.secondaryImages && formData.secondaryImages.length > 0 && (
                  <div className="flex flex-wrap gap-3 p-3 bg-stone-50 border border-stone-200 rounded-sm">
                    {formData.secondaryImages.map((secImg, idx) => (
                      <div key={idx} className="relative w-20 aspect-[4/3] rounded border border-stone-300 overflow-hidden group">
                        <Image
                          src={secImg}
                          alt={`Secondary ${idx + 1}`}
                          fill
                          className="object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setFormData(prev => {
                              const filtered = (prev.secondaryImages || []).filter((_, i) => i !== idx);
                              return { ...prev, secondaryImages: filtered };
                            });
                          }}
                          className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[9px] font-bold uppercase transition-opacity duration-200 cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Upload or input URL */}
                <div className="flex flex-col sm:flex-row gap-3 items-center">
                  <div className="flex-1 w-full">
                    <input
                      type="text"
                      placeholder="Add secondary image URL directly"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                          e.preventDefault();
                          const val = e.currentTarget.value.trim();
                          setFormData(prev => {
                            const curr = prev.secondaryImages || [];
                            if (!curr.includes(val)) {
                              return { ...prev, secondaryImages: [...curr, val] };
                            }
                            return prev;
                          });
                          e.currentTarget.value = '';
                        }
                      }}
                      className="w-full bg-stone-50 border border-stone-200 rounded-sm py-2 px-3 focus:outline-none focus:border-gold-500 font-mono text-[11px]"
                    />
                    <p className="text-[9px] text-stone-400 mt-1">Press Enter to add the URL directly to the gallery array.</p>
                  </div>
                  <div className="w-full sm:w-auto shrink-0 self-start">
                    <label className="inline-flex items-center justify-center bg-stone-850 hover:bg-stone-900 text-white text-[10px] font-bold uppercase tracking-wider px-4 py-2 rounded-sm cursor-pointer shadow-sm transition-all duration-300 select-none">
                      <span>{uploading ? 'Uploading...' : 'Upload Gallery Image'}</span>
                      <input
                        type="file"
                        disabled={uploading}
                        accept="image/*"
                        onChange={handleSecondaryImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Status and Features */}
              <div className="flex flex-wrap items-center gap-6 bg-stone-50 p-4 border border-stone-150 rounded-sm">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-stone-500">
                    Status:
                  </span>
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="Completed"
                      checked={formData.status === 'Completed'}
                      onChange={handleFormChange}
                      className="text-gold-600 focus:ring-gold-500"
                    />
                    <span className="ml-1.5 mr-4 text-stone-700">Completed</span>
                  </label>
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="Ongoing"
                      checked={formData.status === 'Ongoing'}
                      onChange={handleFormChange}
                      className="text-gold-600 focus:ring-gold-500"
                    />
                    <span className="ml-1.5 text-stone-700">Ongoing Development</span>
                  </label>
                </div>

                <div className="h-4 w-px bg-stone-200 hidden sm:block" />

                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={!!formData.featured}
                    onChange={handleFormChange}
                    className="rounded text-gold-600 focus:ring-gold-500"
                  />
                  <span className="ml-2 text-stone-700 font-bold uppercase tracking-wider text-[10px]">
                    Feature on Homepage
                  </span>
                </label>
              </div>

              {/* Amenities checkboxes */}
              <div>
                <label className="block text-[10px] uppercase font-bold tracking-widest text-stone-500 mb-2">
                  Amenities & Facilities
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-stone-50/50 p-4 rounded-sm border border-stone-150">
                  {DEFAULT_AMENITIES.map((am) => {
                    const isChecked = formData.amenities?.includes(am);
                    return (
                      <label key={am} className="flex items-center space-x-2 cursor-pointer py-1">
                        <input
                          type="checkbox"
                          checked={!!isChecked}
                          onChange={() => handleAmenityToggle(am)}
                          className="rounded text-gold-600 focus:ring-gold-500"
                        />
                        <span className="text-stone-700">{am}</span>
                      </label>
                    );
                  })}
                </div>
                {/* Custom Amenity input */}
                <div className="mt-3">
                  <input
                    type="text"
                    placeholder="Type a custom amenity and press Enter"
                    value={customAmenity}
                    onChange={(e) => setCustomAmenity(e.target.value)}
                    onKeyDown={handleAddCustomAmenity}
                    className="w-full bg-stone-50 border border-stone-200 rounded-sm py-2 px-3 focus:outline-none focus:border-gold-500"
                  />
                  {formData.amenities && formData.amenities.filter(a => !DEFAULT_AMENITIES.includes(a)).length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {formData.amenities.filter(a => !DEFAULT_AMENITIES.includes(a)).map(a => (
                        <span key={a} className="inline-flex items-center space-x-1 bg-gold-50 text-gold-700 border border-gold-200/50 py-0.5 px-2 rounded-sm text-[10px]">
                          <span>{a}</span>
                          <button type="button" onClick={() => handleAmenityToggle(a)} className="text-gold-500 hover:text-gold-700">
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-[10px] uppercase font-bold tracking-widest text-stone-500 mb-1.5">
                  Detailed Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  placeholder="Provide comprehensive details about the colony, road connectivity, surrounding highlights, legal title info, etc..."
                  rows={5}
                  className="w-full bg-stone-50 border border-stone-200 rounded-sm py-2 px-3 focus:outline-none focus:border-gold-500 leading-relaxed"
                  required
                />
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end space-x-3 pt-6 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-stone-500 hover:text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-sm cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-gold-600 hover:bg-gold-700 rounded-sm cursor-pointer transition-all shadow-sm hover:shadow-lg flex items-center space-x-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>{formData.id ? 'Save Changes' : 'Register Property'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Team Representative Modal (Add / Edit) ── */}
      {isTeamModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white border border-stone-200 rounded-lg w-full max-w-lg shadow-2xl flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-stone-200">
              <h3 className="font-serif text-lg text-stone-900 tracking-wide">
                {teamFormData.id ? 'Edit Representative' : 'Add New Representative'}
              </h3>
              <button 
                onClick={() => setIsTeamModalOpen(false)}
                className="text-stone-400 hover:text-stone-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleSaveTeamMember} className="flex-grow overflow-y-auto p-6 space-y-5 text-left text-xs">
              <div>
                <label className="block text-[10px] uppercase font-bold tracking-widest text-stone-500 mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={teamFormData.name}
                  onChange={handleTeamFormChange}
                  placeholder="e.g. Mr Nitin Katoch"
                  className="w-full bg-stone-50 border border-stone-200 rounded-sm py-2 px-3 focus:outline-none focus:border-gold-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-widest text-stone-500 mb-1.5">
                    Designation (Role) *
                  </label>
                  <input
                    type="text"
                    name="role"
                    value={teamFormData.role}
                    onChange={handleTeamFormChange}
                    placeholder="e.g. CEO & Founder"
                    className="w-full bg-stone-50 border border-stone-200 rounded-sm py-2 px-3 focus:outline-none focus:border-gold-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-widest text-stone-500 mb-1.5">
                    Contact Number *
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={teamFormData.phone}
                    onChange={handleTeamFormChange}
                    placeholder="e.g. 9258884941"
                    className="w-full bg-stone-50 border border-stone-200 rounded-sm py-2 px-3 focus:outline-none focus:border-gold-500 font-mono"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-widest text-stone-500 mb-1.5">
                    Private Email (Optional)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={teamFormData.email}
                    onChange={handleTeamFormChange}
                    placeholder="e.g. email@gmail.com"
                    className="w-full bg-stone-50 border border-stone-200 rounded-sm py-2 px-3 focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-widest text-stone-500 mb-1.5">
                    Initials (Optional)
                  </label>
                  <input
                    type="text"
                    name="initials"
                    value={teamFormData.initials}
                    onChange={handleTeamFormChange}
                    placeholder="e.g. NK"
                    maxLength={3}
                    className="w-full bg-stone-50 border border-stone-200 rounded-sm py-2 px-3 focus:outline-none focus:border-gold-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold tracking-widest text-stone-500 mb-1.5">
                  Bio / Description
                </label>
                <textarea
                  name="desc"
                  value={teamFormData.desc}
                  onChange={handleTeamFormChange}
                  placeholder="Short bio about their expertise..."
                  rows={3}
                  className="w-full bg-stone-50 border border-stone-200 rounded-sm py-2 px-3 focus:outline-none focus:border-gold-500 resize-none"
                />
              </div>

              {/* Photo Upload with Cloudinary */}
              <div>
                <label className="block text-[10px] uppercase font-bold tracking-widest text-stone-500 mb-2">
                  Representative Photo (Cloudinary Upload)
                </label>
                <div className="flex items-center space-x-4 bg-stone-50 border border-stone-200 rounded-sm p-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border border-stone-200 bg-stone-100 flex items-center justify-center text-xs text-stone-400 shrink-0">
                    {teamFormData.image ? (
                      <Image
                        src={teamFormData.image}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      'No Photo'
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      name="image"
                      value={teamFormData.image}
                      onChange={handleTeamFormChange}
                      placeholder="Photo secure URL"
                      className="w-full bg-white border border-stone-200 rounded-sm py-1.5 px-3 focus:outline-none focus:border-gold-500 font-mono text-[10px]"
                    />
                    <label className="inline-flex items-center justify-center bg-gold-500 hover:bg-gold-600 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-sm cursor-pointer shadow-sm transition-all duration-300 select-none text-white">
                      <span>{uploading ? 'Uploading...' : 'Upload Photo'}</span>
                      <input
                        type="file"
                        disabled={uploading}
                        accept="image/*"
                        onChange={handleTeamImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsTeamModalOpen(false)}
                  className="px-4 py-2 border border-stone-200 rounded-sm text-stone-500 hover:bg-stone-50 uppercase tracking-wider text-[10px] font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-5 py-2 bg-stone-900 hover:bg-gold-600 text-white rounded-sm uppercase tracking-wider text-[10px] font-bold transition-all cursor-pointer shadow-sm disabled:opacity-50"
                >
                  Save Representative
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Gallery Delete Confirmation Modal */}
      {deletingGalleryId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-lg max-w-sm w-full p-6 shadow-xl border border-stone-250/60 animate-in fade-in zoom-in duration-200">
            <h3 className="font-serif text-xl text-stone-900 mb-2">Delete Gallery Image?</h3>
            <p className="text-xs text-stone-500 leading-relaxed mb-6">
              Are you sure you want to delete this gallery item? This action is permanent and will remove it from the public homepage gallery section.
            </p>
            <div className="flex space-x-3 justify-end">
              <button
                onClick={() => setDeletingGalleryId(null)}
                className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-stone-500 hover:text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-sm cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteGalleryConfirm}
                className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-700 rounded-sm cursor-pointer transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Gallery Item Modal */}
      {isGalleryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl border border-stone-200 animate-in fade-in zoom-in duration-300">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-stone-100 bg-stone-50/50">
              <div>
                <h3 className="font-serif text-xl text-stone-900">
                  {galleryFormData.id ? 'Edit Gallery Item' : 'Add Gallery Image'}
                </h3>
                <p className="text-[10px] text-stone-400 uppercase tracking-wider mt-0.5">Dreamsland Visual Gallery Portal</p>
              </div>
              <button
                onClick={() => setIsGalleryModalOpen(false)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSaveGalleryItem} className="flex-grow overflow-y-auto p-6 space-y-5 text-xs text-stone-700">
              
              {/* Title */}
              <div className="space-y-1.5">
                <label className="font-bold text-stone-900">Image Title *</label>
                <input
                  type="text"
                  required
                  value={galleryFormData.title || ''}
                  onChange={(e) => setGalleryFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g. Phase 2 Layout Plan / Shimla Bypass Colony View..."
                  className="w-full bg-stone-50 border border-stone-200 rounded-sm py-2 px-3 text-xs text-stone-850 focus:outline-none focus:border-gold-500"
                />
              </div>

              {/* Category Selection */}
              <div className="space-y-1.5">
                <label className="font-bold text-stone-900">Gallery Category *</label>
                <select
                  value={galleryFormData.category || 'Layouts'}
                  onChange={(e) => setGalleryFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full bg-stone-50 border border-stone-200 rounded-sm py-2 px-3 text-xs text-stone-850 focus:outline-none focus:border-gold-500 cursor-pointer"
                >
                  <option value="Layouts">Layouts</option>
                  <option value="Completed Sites">Completed Sites</option>
                  <option value="Plot Views">Plot Views</option>
                </select>
              </div>

              {/* Image Upload Area */}
              <div className="space-y-1.5">
                <label className="font-bold text-stone-900">Image Resource *</label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    required
                    value={galleryFormData.image || ''}
                    onChange={(e) => setGalleryFormData(prev => ({ ...prev, image: e.target.value }))}
                    placeholder="Image URL (e.g. /images/... or Cloudinary URL)"
                    className="flex-1 bg-stone-50 border border-stone-200 rounded-sm py-2 px-3 text-xs text-stone-850 focus:outline-none focus:border-gold-500"
                  />
                  <label className="inline-flex items-center justify-center bg-gold-500 hover:bg-gold-600 text-[10px] font-bold uppercase tracking-wider px-3.5 py-2 rounded-sm cursor-pointer shadow-sm transition-all duration-300 select-none text-white shrink-0">
                    <span>{uploading ? 'Uploading...' : 'Upload File'}</span>
                    <input
                      type="file"
                      disabled={uploading}
                      accept="image/*"
                      onChange={handleGalleryImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                
                {/* Thumbnail Preview */}
                {galleryFormData.image && (
                  <div className="relative w-32 aspect-[4/3] bg-stone-50 border border-stone-200 rounded overflow-hidden mt-3 shadow-sm">
                    <Image
                      src={galleryFormData.image}
                      alt="Gallery Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsGalleryModalOpen(false)}
                  className="px-4 py-2 border border-stone-200 rounded-sm text-stone-500 hover:bg-stone-50 uppercase tracking-wider text-[10px] font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-5 py-2 bg-stone-900 hover:bg-gold-600 text-white rounded-sm uppercase tracking-wider text-[10px] font-bold transition-all cursor-pointer shadow-sm disabled:opacity-50"
                >
                  Save Image
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Hero Banner Modal */}
      {isHeroModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg max-w-lg w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-stone-900 text-white px-6 py-4 flex justify-between items-center">
              <h3 className="font-serif text-lg tracking-wide">
                {heroFormData.id ? 'Edit Hero Banner' : 'Add New Hero Banner'}
              </h3>
              <button
                type="button"
                onClick={() => setIsHeroModalOpen(false)}
                className="text-stone-400 hover:text-white transition-colors bg-transparent border-none outline-none cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveHeroBannerForm} className="p-6 space-y-4">
              
              {/* Image Input & Cloudinary Upload */}
              <div>
                <label className="text-[10px] uppercase font-bold tracking-wider text-stone-500 block mb-1.5">
                  Banner Image *
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={heroFormData.image || ''}
                    onChange={(e) => setHeroFormData(prev => ({ ...prev, image: e.target.value }))}
                    placeholder="Image URL (e.g. /images/... or Cloudinary URL)"
                    className="flex-1 bg-stone-50 border border-stone-200 rounded-sm py-2 px-3 text-xs text-stone-850 focus:outline-none focus:border-gold-500"
                  />
                  <label className="inline-flex items-center justify-center bg-gold-500 hover:bg-gold-600 text-[10px] font-bold uppercase tracking-wider px-3.5 py-2 rounded-sm cursor-pointer shadow-sm transition-all duration-300 select-none text-white shrink-0">
                    <span>{uploading ? 'Uploading...' : 'Upload File'}</span>
                    <input
                      type="file"
                      disabled={uploading}
                      accept="image/*"
                      onChange={handleHeroImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                
                {/* Thumbnail Preview */}
                {heroFormData.image && (
                  <div className="relative w-full aspect-[16/9] bg-stone-50 border border-stone-200 rounded overflow-hidden mt-3 shadow-sm">
                    <Image
                      src={heroFormData.image}
                      alt="Banner Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Order Input */}
              <div>
                <label className="text-[10px] uppercase font-bold tracking-wider text-stone-500 block mb-1.5">
                  Display Order / Slide Number
                </label>
                <input
                  type="number"
                  min="1"
                  value={heroFormData.order || ''}
                  onChange={(e) => setHeroFormData(prev => ({ ...prev, order: Number(e.target.value) }))}
                  placeholder="e.g. 1, 2, 3 (Leave empty to add to end)"
                  className="w-full bg-stone-50 border border-stone-200 rounded-sm py-2.5 px-3 text-xs text-stone-850 focus:outline-none focus:border-gold-500"
                />
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsHeroModalOpen(false)}
                  className="px-4 py-2 border border-stone-200 rounded-sm text-stone-500 hover:bg-stone-50 uppercase tracking-wider text-[10px] font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-5 py-2 bg-stone-900 hover:bg-gold-600 text-white rounded-sm uppercase tracking-wider text-[10px] font-bold transition-all cursor-pointer shadow-sm disabled:opacity-50"
                >
                  Save Banner
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}
