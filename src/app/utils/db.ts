import { Property, PROPERTIES, Collection } from '../data';

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  requirements: string;
  timestamp: string;
  status: 'New' | 'Contacted' | 'Archived';
  inquiryType?: 'Consult' | 'Sell' | 'Query';
  propTitle?: string;
  propType?: string;
  propLocation?: string;
  propPrice?: string;
  propSize?: string;
  propRoadWidth?: string;
  propImage?: string;
}

export async function getProperties(): Promise<Property[]> {
  try {
    const res = await fetch('/api/properties');
    if (!res.ok) throw new Error('Failed to fetch properties');
    return await res.json();
  } catch (e) {
    console.error('getProperties error, falling back to static list:', e);
    return PROPERTIES;
  }
}

export async function saveProperty(property: Property): Promise<Property[]> {
  try {
    const res = await fetch('/api/properties', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(property),
    });
    if (!res.ok) throw new Error('Failed to save property');
    return await res.json();
  } catch (e) {
    console.error('saveProperty error:', e);
    return [];
  }
}

export async function deleteProperty(id: string): Promise<Property[]> {
  try {
    const res = await fetch(`/api/properties?id=${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete property');
    return await res.json();
  } catch (e) {
    console.error('deleteProperty error:', e);
    return [];
  }
}

export async function getInquiries(): Promise<ContactInquiry[]> {
  try {
    const res = await fetch('/api/inquiries');
    if (!res.ok) throw new Error('Failed to fetch inquiries');
    return await res.json();
  } catch (e) {
    console.error('getInquiries error:', e);
    return [];
  }
}

export async function addInquiry(inquiry: Omit<ContactInquiry, 'id' | 'timestamp' | 'status'>): Promise<ContactInquiry[]> {
  try {
    const res = await fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inquiry),
    });
    if (!res.ok) throw new Error('Failed to add inquiry');
    return await res.json();
  } catch (e) {
    console.error('addInquiry error:', e);
    return [];
  }
}

export async function updateInquiryStatus(id: string, status: 'New' | 'Contacted' | 'Archived'): Promise<ContactInquiry[]> {
  try {
    const res = await fetch('/api/inquiries', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    if (!res.ok) throw new Error('Failed to update inquiry status');
    return await res.json();
  } catch (e) {
    console.error('updateInquiryStatus error:', e);
    return [];
  }
}

export async function deleteInquiry(id: string): Promise<ContactInquiry[]> {
  try {
    const res = await fetch(`/api/inquiries?id=${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete inquiry');
    return await res.json();
  } catch (e) {
    console.error('deleteInquiry error:', e);
    return [];
  }
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  initials: string;
  desc: string;
  phone: string;
  email: string;
  image?: string;
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const res = await fetch('/api/team');
    if (!res.ok) throw new Error('Failed to fetch team members');
    return await res.json();
  } catch (e) {
    console.error('getTeamMembers error:', e);
    return [];
  }
}

export async function saveTeamMember(member: TeamMember): Promise<TeamMember[]> {
  try {
    const res = await fetch('/api/team', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(member),
    });
    if (!res.ok) throw new Error('Failed to save team member');
    return await res.json();
  } catch (e) {
    console.error('saveTeamMember error:', e);
    return [];
  }
}

export async function deleteTeamMember(id: string): Promise<TeamMember[]> {
  try {
    const res = await fetch(`/api/team?id=${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete team member');
    return await res.json();
  } catch (e) {
    console.error('deleteTeamMember error:', e);
    return [];
  }
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  image: string;
  date: string;
  readTime: string;
  author: string;
  excerpt: string;
  content: string;
}

export async function getBlogs(): Promise<BlogPost[]> {
  try {
    const res = await fetch('/api/blogs');
    if (!res.ok) throw new Error('Failed to fetch blogs');
    return await res.json();
  } catch (e) {
    console.error('getBlogs error:', e);
    return [];
  }
}

export async function saveBlog(blog: BlogPost): Promise<BlogPost[]> {
  try {
    const res = await fetch('/api/blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blog),
    });
    if (!res.ok) throw new Error('Failed to save blog post');
    return await res.json();
  } catch (e) {
    console.error('saveBlog error:', e);
    return [];
  }
}

export async function deleteBlog(id: string): Promise<BlogPost[]> {
  try {
    const res = await fetch(`/api/blogs?id=${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete blog post');
    return await res.json();
  } catch (e) {
    console.error('deleteBlog error:', e);
    return [];
  }
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  timestamp: string;
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  try {
    const res = await fetch('/api/gallery');
    if (!res.ok) throw new Error('Failed to fetch gallery items');
    return await res.json();
  } catch (e) {
    console.error('getGalleryItems error:', e);
    return [];
  }
}

export async function saveGalleryItem(item: GalleryItem): Promise<GalleryItem[]> {
  try {
    const res = await fetch('/api/gallery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
    if (!res.ok) throw new Error('Failed to save gallery item');
    return await res.json();
  } catch (e) {
    console.error('saveGalleryItem error:', e);
    return [];
  }
}

export async function deleteGalleryItem(id: string): Promise<GalleryItem[]> {
  try {
    const res = await fetch(`/api/gallery?id=${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete gallery item');
    return await res.json();
  } catch (e) {
    console.error('deleteGalleryItem error:', e);
    return [];
  }
}

export interface HeroBanner {
  id: string;
  image: string;
  order: number;
  title?: string;
  location?: string;
  rate?: string;
}

export async function getHeroBanners(): Promise<HeroBanner[]> {
  try {
    const res = await fetch('/api/hero');
    if (!res.ok) throw new Error('Failed to fetch hero banners');
    return await res.json();
  } catch (e) {
    console.error('getHeroBanners error:', e);
    return [];
  }
}

export async function saveHeroBanner(banner: HeroBanner): Promise<HeroBanner[]> {
  try {
    const res = await fetch('/api/hero', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(banner),
    });
    if (!res.ok) throw new Error('Failed to save hero banner');
    return await res.json();
  } catch (e) {
    console.error('saveHeroBanner error:', e);
    return [];
  }
}

export async function deleteHeroBanner(id: string): Promise<HeroBanner[]> {
  try {
    const res = await fetch(`/api/hero?id=${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete hero banner');
    return await res.json();
  } catch (e) {
    console.error('deleteHeroBanner error:', e);
    return [];
  }
}

export interface Review {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
}

export async function getReviews(): Promise<Review[]> {
  try {
    const res = await fetch('/api/reviews');
    if (!res.ok) throw new Error('Failed to fetch reviews');
    return await res.json();
  } catch (e) {
    console.error('getReviews error:', e);
    return [];
  }
}

export async function saveReview(review: Review): Promise<Review[]> {
  try {
    const res = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(review),
    });
    if (!res.ok) throw new Error('Failed to save review');
    return await res.json();
  } catch (e) {
    console.error('saveReview error:', e);
    return [];
  }
}

export async function deleteReview(id: string): Promise<Review[]> {
  try {
    const res = await fetch(`/api/reviews?id=${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete review');
    return await res.json();
  } catch (e) {
    console.error('deleteReview error:', e);
    return [];
  }
}

export async function getCollections(): Promise<Collection[]> {
  try {
    const res = await fetch('/api/collections');
    if (!res.ok) throw new Error('Failed to fetch collections');
    return await res.json();
  } catch (e) {
    console.error('getCollections error:', e);
    return [];
  }
}

export async function saveCollection(collection: Collection): Promise<Collection[]> {
  try {
    const res = await fetch('/api/collections', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(collection),
    });
    if (!res.ok) throw new Error('Failed to save collection');
    return await res.json();
  } catch (e) {
    console.error('saveCollection error:', e);
    return [];
  }
}

export async function deleteCollection(id: string): Promise<Collection[]> {
  try {
    const res = await fetch(`/api/collections?id=${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete collection');
    return await res.json();
  } catch (e) {
    console.error('deleteCollection error:', e);
    return [];
  }
}


