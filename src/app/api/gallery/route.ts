import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

const SEED_GALLERY = [
  {
    id: 'gal-1',
    title: 'Shimla Bypass Road Gated Colony Layout',
    category: 'Layouts',
    image: '/images/hero_villa.png',
    timestamp: '2026-07-01T12:00:00.000Z'
  },
  {
    id: 'gal-2',
    title: 'Completed Gated Enclave Phase 1',
    category: 'Completed Sites',
    image: '/images/azure_villa.png',
    timestamp: '2026-06-25T12:00:00.000Z'
  },
  {
    id: 'gal-3',
    title: 'Scenic Mountain View Plots Site Elevation',
    category: 'Plot Views',
    image: '/images/mountain_retreat.png',
    timestamp: '2026-06-20T12:00:00.000Z'
  },
  {
    id: 'gal-4',
    title: 'Illuminated Night-View Main Gate Corridor',
    category: 'Completed Sites',
    image: '/images/cliffside_mansion.png',
    timestamp: '2026-06-15T12:00:00.000Z'
  },
  {
    id: 'gal-5',
    title: 'Rooftop Panoramic Plot Demarcation',
    category: 'Plot Views',
    image: '/images/urban_penthouse.png',
    timestamp: '2026-06-10T12:00:00.000Z'
  }
];

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('gallery');
    
    let gallery = await collection.find({}).sort({ timestamp: -1 }).toArray();
    
    // Seed initial gallery if empty
    if (gallery.length === 0) {
      await collection.insertMany(SEED_GALLERY.map(g => ({ ...g })));
      gallery = await collection.find({}).sort({ timestamp: -1 }).toArray();
    }
    
    return NextResponse.json(gallery);
  } catch (error: any) {
    console.error('MongoDB GET Gallery Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const item = await request.json();
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('gallery');
    
    const { _id, ...cleanItem } = item;
    
    await collection.replaceOne(
      { id: item.id },
      cleanItem,
      { upsert: true }
    );
    
    const updatedList = await collection.find({}).sort({ timestamp: -1 }).toArray();
    return NextResponse.json(updatedList);
  } catch (error: any) {
    console.error('MongoDB POST Gallery Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Gallery item id is required' }, { status: 400 });
    }
    
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('gallery');
    
    await collection.deleteOne({ id });
    
    const updatedList = await collection.find({}).sort({ timestamp: -1 }).toArray();
    return NextResponse.json(updatedList);
  } catch (error: any) {
    console.error('MongoDB DELETE Gallery Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
