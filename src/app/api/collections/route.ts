import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

const INITIAL_COLLECTIONS: any[] = [];

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('collections');
    
    let collections = await collection.find({}).toArray();
    
    if (collections.length === 0) {
      for (const col of INITIAL_COLLECTIONS) {
        await collection.replaceOne({ id: col.id }, col, { upsert: true });
      }
      collections = await collection.find({}).toArray();
    }
    
    return NextResponse.json(collections);
  } catch (error: any) {
    console.error('MongoDB GET Collections Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const collectionItem = await request.json();
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('collections');
    
    const { _id, ...cleanCollection } = collectionItem;
    
    if (!cleanCollection.id) {
      cleanCollection.id = `col-${Date.now()}`;
    }
    
    cleanCollection.count = Number(cleanCollection.count) || 0;
    
    await collection.replaceOne(
      { id: cleanCollection.id },
      cleanCollection,
      { upsert: true }
    );
    
    const updatedList = await collection.find({}).toArray();
    return NextResponse.json(updatedList);
  } catch (error: any) {
    console.error('MongoDB POST Collection Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Collection id is required' }, { status: 400 });
    }
    
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('collections');
    
    await collection.deleteOne({ id });
    
    const updatedList = await collection.find({}).toArray();
    return NextResponse.json(updatedList);
  } catch (error: any) {
    console.error('MongoDB DELETE Collection Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
