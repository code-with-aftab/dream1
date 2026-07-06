import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { PROPERTIES } from '../../data';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('properties');
    
    let properties = await collection.find({}).toArray();
    
    // Seed initial properties if empty
    if (properties.length === 0) {
      await collection.insertMany(PROPERTIES.map(p => ({ ...p })));
      properties = await collection.find({}).toArray();
    }
    
    return NextResponse.json(properties);
  } catch (error: any) {
    console.error('MongoDB GET Properties Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const property = await request.json();
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('properties');
    
    // Remove MongoDB internal _id if it was passed from frontend to avoid immutable error
    const { _id, ...cleanProperty } = property;
    
    await collection.replaceOne(
      { id: property.id },
      cleanProperty,
      { upsert: true }
    );
    
    const updatedList = await collection.find({}).toArray();
    return NextResponse.json(updatedList);
  } catch (error: any) {
    console.error('MongoDB POST Property Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Property id is required' }, { status: 400 });
    }
    
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('properties');
    
    await collection.deleteOne({ id });
    
    const updatedList = await collection.find({}).toArray();
    return NextResponse.json(updatedList);
  } catch (error: any) {
    console.error('MongoDB DELETE Property Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
