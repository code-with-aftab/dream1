import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

const DEFAULT_HERO_IMAGES = [
  { id: 'hero-img-1', image: '/images/hero_villa.png', order: 1 },
  { id: 'hero-img-2', image: '/images/azure_villa.png', order: 2 },
  { id: 'hero-img-3', image: '/images/cliffside_mansion.png', order: 3 },
  { id: 'hero-img-4', image: '/images/mountain_retreat.png', order: 4 },
  { id: 'hero-img-5', image: '/images/urban_penthouse.png', order: 5 },
];

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('hero_banners');
    
    let images = await collection.find({}).sort({ order: 1 }).toArray();
    
    // Seed initial banners if empty
    if (images.length === 0) {
      await collection.insertMany(DEFAULT_HERO_IMAGES.map(img => ({ ...img })));
      images = await collection.find({}).sort({ order: 1 }).toArray();
    }
    
    return NextResponse.json(images);
  } catch (error: any) {
    console.error('MongoDB GET Hero Banners Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, image, order } = body;
    
    if (!image) {
      return NextResponse.json({ error: 'Image path or URL is required' }, { status: 400 });
    }
    
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('hero_banners');
    
    const newId = id || `hero-img-${Date.now()}`;
    const newOrder = order || (await collection.countDocuments()) + 1;
    
    const updatedImage = {
      id: newId,
      image,
      order: newOrder
    };
    
    // Use upsert to update if exists, or insert new
    await collection.updateOne(
      { id: newId },
      { $set: updatedImage },
      { upsert: true }
    );
    
    const images = await collection.find({}).sort({ order: 1 }).toArray();
    return NextResponse.json(images);
  } catch (error: any) {
    console.error('MongoDB POST Hero Banner Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Banner ID is required' }, { status: 400 });
    }
    
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('hero_banners');
    
    await collection.deleteOne({ id });
    
    const images = await collection.find({}).sort({ order: 1 }).toArray();
    return NextResponse.json(images);
  } catch (error: any) {
    console.error('MongoDB DELETE Hero Banner Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
