import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { sendAutoresponderEmail } from '@/lib/email';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('inquiries');
    
    const inquiries = await collection.find({}).sort({ timestamp: -1 }).toArray();
    return NextResponse.json(inquiries);
  } catch (error: any) {
    console.error('MongoDB GET Inquiries Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const inquiry = await request.json();
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('inquiries');
    
    const newInquiry = {
      ...inquiry,
      id: `inq-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      timestamp: new Date().toISOString(),
      status: 'New'
    };
    
    await collection.insertOne(newInquiry);
    
    // Trigger email autoresponder (await ensures serverless functions on Vercel do not terminate before completion)
    try {
      await sendAutoresponderEmail({
        to: newInquiry.email,
        subject: 'Inquiry Confirmation',
        name: newInquiry.name,
        phone: newInquiry.phone,
        email: newInquiry.email,
        requirements: newInquiry.requirements,
        inquiryType: newInquiry.inquiryType
      });
    } catch (emailErr) {
      console.error('Autoresponder Email failed:', emailErr);
    }
    
    const updatedList = await collection.find({}).sort({ timestamp: -1 }).toArray();
    return NextResponse.json(updatedList);
  } catch (error: any) {
    console.error('MongoDB POST Inquiry Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, status } = await request.json();
    
    if (!id || !status) {
      return NextResponse.json({ error: 'Inquiry id and status are required' }, { status: 400 });
    }
    
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('inquiries');
    
    await collection.updateOne(
      { id },
      { $set: { status } }
    );
    
    const updatedList = await collection.find({}).sort({ timestamp: -1 }).toArray();
    return NextResponse.json(updatedList);
  } catch (error: any) {
    console.error('MongoDB PATCH Inquiry Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Inquiry id is required' }, { status: 400 });
    }
    
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('inquiries');
    
    await collection.deleteOne({ id });
    
    const updatedList = await collection.find({}).sort({ timestamp: -1 }).toArray();
    return NextResponse.json(updatedList);
  } catch (error: any) {
    console.error('MongoDB DELETE Inquiry Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
