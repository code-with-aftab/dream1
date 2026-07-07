import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

const INITIAL_TEAM = [
  {
    id: 'team-1',
    name: 'Mr Nitin Katoch',
    role: 'Director',
    initials: 'NK',
    desc: 'Director of Dreamland Associates, steering residential and investment township acquisitions in Uttarakhand.',
    phone: '9258884941',
    email: 'dreamlandassociate7@gmail.com',
    image: ''
  },
  {
    id: 'team-2',
    name: 'Mr Sumit Rajput',
    role: 'CEO & Founder',
    initials: 'SR',
    desc: 'CEO and Founder, directing land acquisition, builder collaborations, and institutional investment desk.',
    phone: '8057932926',
    email: 'dreamlandassociate7@gmail.com',
    image: ''
  },
  {
    id: 'team-3',
    name: 'Mr Suhail',
    role: 'Managing Director',
    initials: 'S',
    desc: 'Managing Director, coordinating project planning, legal compliances, and client relationships.',
    phone: '7906953585',
    email: 'dreamlandassociate7@gmail.com',
    image: ''
  },
  {
    id: 'team-4',
    name: 'Miss Devika Goswami',
    role: 'Digital Marketing & Operations Head',
    initials: 'DG',
    desc: 'Heads digital operations, media relations, brochure design, and CRM onboarding systems.',
    phone: '9319527649',
    email: 'dreamlandassociate7@gmail.com',
    image: ''
  },
  {
    id: 'team-5',
    name: 'Miss Tanugya Chaudhary',
    role: 'Sr. Sales Executive',
    initials: 'TC',
    desc: 'Senior acquisition consultant specializing in client relations, price negotiations, and Shimla Bypass plots.',
    phone: '9259055789',
    email: 'dreamlandassociate7@gmail.com',
    image: ''
  },
  {
    id: 'team-6',
    name: 'Mr Vansh Rajput',
    role: 'Sales Executive',
    initials: 'VR',
    desc: 'Facilitates seamless customer site viewings and local registry office coordinates for freehold plots.',
    phone: '9119703989',
    email: 'dreamlandassociate7@gmail.com',
    image: ''
  },
  {
    id: 'team-7',
    name: 'Mr Ansh Rajput',
    role: 'Sales Executive',
    initials: 'AR',
    desc: 'Consultant facilitating plot demarcations, site visits, and buyer registry documentation support.',
    phone: '8439811504',
    email: 'dreamlandassociate7@gmail.com',
    image: ''
  },
  {
    id: 'team-8',
    name: 'Mr Surjeet Singh Negi',
    role: 'Sr. Sales Executive',
    initials: 'SN',
    desc: 'Dedicated property advisor with a deep network in Selaqui, Premnagar, and Bhauwala residential corridors.',
    phone: '8755175939',
    email: 'dreamlandassociate7@gmail.com',
    image: ''
  },
  {
    id: 'team-9',
    name: 'Mr Ankit Kashyap',
    role: 'Sales Executive',
    initials: 'AK',
    desc: 'Assists clients with bank loan approvals, legal title searches, and mutation status reporting.',
    phone: '7830510901',
    email: 'dreamlandassociate7@gmail.com',
    image: ''
  },
  {
    id: 'team-10',
    name: 'Miss Anjali Malhotra',
    role: 'Graphics & Editor',
    initials: 'AM',
    desc: 'Handles architectural visualization, site plans, brochures, and digital media design for our portfolio listings.',
    phone: '8954576064',
    email: 'dreamlandassociate7@gmail.com',
    image: ''
  },
  {
    id: 'team-11',
    name: 'Mr Amit Bijalwal',
    role: 'Sr. Sales Executive',
    initials: 'AB',
    desc: 'Senior advisory consultant managing premium portfolios in Lachiwala Greens and Doiwala development zones.',
    phone: '7760951556',
    email: 'dreamlandassociate7@gmail.com',
    image: ''
  },
  {
    id: 'team-12',
    name: 'Miss Neetu Negi',
    role: 'Sales Executive',
    initials: 'NN',
    desc: 'Facilitates customer inquiries, pre-launch property briefs, and coordinates buyer onboarding support.',
    phone: '9368662433',
    email: 'dreamlandassociate7@gmail.com',
    image: ''
  },
  {
    id: 'team-13',
    name: 'Mr Anuj Bhatiya',
    role: 'Sales Executive',
    initials: 'AB',
    desc: 'Handles plot boundary verifications, local zoning consultations, and buyer site visits.',
    phone: '7817943638',
    email: 'dreamlandassociate7@gmail.com',
    image: ''
  }
];

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('team');
    
    let team = await collection.find({}).toArray();
    
    if (team.length === 0) {
      await collection.insertMany(INITIAL_TEAM.map(member => ({ ...member })));
      team = await collection.find({}).toArray();
    }
    
    return NextResponse.json(team);
  } catch (error: any) {
    console.error('MongoDB GET Team Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const member = await request.json();
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('team');
    
    const { _id, ...cleanMember } = member;
    
    if (!cleanMember.id) {
      cleanMember.id = `team-${Date.now()}`;
    }
    
    // Generate initials automatically if not provided
    if (!cleanMember.initials && cleanMember.name) {
      const parts = cleanMember.name.split(' ');
      let initials = '';
      if (parts.length > 0) {
        if (parts[0] === 'Mr' || parts[0] === 'Miss' || parts[0] === 'Mrs' || parts[0] === 'Ms') {
          initials = parts.slice(1).map((p: string) => p[0]).join('').substring(0, 2).toUpperCase();
        } else {
          initials = parts.map((p: string) => p[0]).join('').substring(0, 2).toUpperCase();
        }
      }
      cleanMember.initials = initials || 'D';
    }
    
    await collection.replaceOne(
      { id: cleanMember.id },
      cleanMember,
      { upsert: true }
    );
    
    const updatedList = await collection.find({}).toArray();
    return NextResponse.json(updatedList);
  } catch (error: any) {
    console.error('MongoDB POST Team Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Team member id is required' }, { status: 400 });
    }
    
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('team');
    
    await collection.deleteOne({ id });
    
    const updatedList = await collection.find({}).toArray();
    return NextResponse.json(updatedList);
  } catch (error: any) {
    console.error('MongoDB DELETE Team Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
