import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  const startTime = Date.now();
  try {
    const client = await clientPromise;
    const db = client.db();
    
    // Ping MongoDB to test active connection
    await db.command({ ping: 1 });
    const latency = Date.now() - startTime;
    
    // Query count aggregates
    const properties = await db.collection('properties').countDocuments();
    const inquiries = await db.collection('inquiries').countDocuments();
    const reviews = await db.collection('reviews').countDocuments();
    const collections = await db.collection('collections').countDocuments();

    return NextResponse.json({
      status: 'Healthy',
      database: 'Connected',
      latency: `${latency}ms`,
      properties,
      inquiries,
      reviews,
      collections
    });
  } catch (error: any) {
    console.error('Health check endpoint failed:', error);
    return NextResponse.json({
      status: 'Degraded',
      database: 'Disconnected',
      error: error.message,
      latency: 'N/A'
    }, { status: 500 });
  }
}
