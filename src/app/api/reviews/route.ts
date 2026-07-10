import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

const INITIAL_REVIEWS = [
  {
    id: 'review-1',
    name: 'Rajesh Sharma',
    role: 'Lachiwalla Greens Buyer',
    text: 'Found my dream plot in Lachiwalla Greens. Registry was smooth and mutation support was outstanding. Highly recommend Sumit ji and team!',
    rating: 5,
  },
  {
    id: 'review-2',
    name: 'Preeti Rawat',
    role: 'Bhadraj Colony Buyer',
    text: 'Acquired a forest plot in Bhadraj Colony. The 360-degree mountain views are breathtaking. Extremely reliable services.',
    rating: 5,
  },
  {
    id: 'review-3',
    name: 'Vikram Singh',
    role: 'Dev Enclave Buyer',
    text: 'Excellent registry process at Dev Enclave. Clear titles and great bank loan assistance up to 90%.',
    rating: 5,
  },
  {
    id: 'review-4',
    name: 'Anil Dobhal',
    role: 'Balaji Enclave Buyer',
    text: 'Bought an ongoing plot in Balaji Enclave. The RCC road work and boundary walls are highly professional.',
    rating: 5,
  },
  {
    id: 'review-5',
    name: 'Sandeep Negi',
    role: 'Paonta Highway Buyer',
    text: 'Smooth booking experience for Paonta Highway Enclave. Great investment potential on Doon-Chandigarh corridor.',
    rating: 5,
  },
  {
    id: 'review-6',
    name: 'Meenakshi Thapa',
    role: 'Acquisitions Client',
    text: 'Great guidance by Devika and the sales team. The documentation and mutation tracking were completely transparent.',
    rating: 5,
  },
];

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('reviews');
    
    let reviews = await collection.find({}).toArray();
    
    if (reviews.length === 0) {
      await collection.insertMany(INITIAL_REVIEWS.map(r => ({ ...r })));
      reviews = await collection.find({}).toArray();
    }
    
    return NextResponse.json(reviews);
  } catch (error: any) {
    console.error('MongoDB GET Reviews Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const review = await request.json();
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('reviews');
    
    const { _id, ...cleanReview } = review;
    
    if (!cleanReview.id) {
      cleanReview.id = `review-${Date.now()}`;
    }
    
    // Ensure rating is an integer and fallback if invalid
    cleanReview.rating = parseInt(cleanReview.rating) || 5;
    
    await collection.replaceOne(
      { id: cleanReview.id },
      cleanReview,
      { upsert: true }
    );
    
    const updatedList = await collection.find({}).toArray();
    return NextResponse.json(updatedList);
  } catch (error: any) {
    console.error('MongoDB POST Review Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Review id is required' }, { status: 400 });
    }
    
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('reviews');
    
    await collection.deleteOne({ id });
    
    const updatedList = await collection.find({}).toArray();
    return NextResponse.json(updatedList);
  } catch (error: any) {
    console.error('MongoDB DELETE Review Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
