import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

const SEED_BLOGS = [
  {
    id: 'blog-1',
    title: 'Why Shimla Bypass Road is Dehradun’s Hottest Real Estate Corridor',
    category: 'Investment Guide',
    image: '/images/hero_villa.png',
    date: 'July 02, 2026',
    readTime: '5 min read',
    author: 'Sumit Rajput (CEO)',
    excerpt: 'Discover why national builders and private investors are flocking to Shimla Bypass Road. We analyze registry trends, RCC road expansions, and proximity coordinates.',
    content: 'In recent years, Dehradun’s real estate landscape has undergone a tectonic shift. As the central city coordinates face high density, premium residential demand has shifted toward peripheral bypass corridors. Among these, Shimla Bypass Road has emerged as the clear frontrunner for residential plot investments.\n\nOne of the key drivers is connectivity. The corridor links directly to the Delhi-Dehradun Expressway corridor, slashing travel times to the national capital. Proximity to ISBT Dehradun and major educational institutions (like Graphic Era, Uttaranchal University) makes it extremely convenient for families.\n\nDevelopment standards have also matured. Standard gated enclaves along Shimla Bypass now feature 25 to 30 feet wide cemented RCC internal roads, underground electric grids, and integrated stormwater drains. This standard of infrastructure, combined with the peaceful, green environment of Dehradun, makes it a perfect residential coordinate.\n\nFrom an investment perspective, land prices along this stretch have appreciated by 35% over the past 24 months. Early buyers who acquired plots in gated communities are witnessing high returns on equity. With upcoming bypass widening projects, this appreciation curve is projected to remain steep for the next decade.'
  },
  {
    id: 'blog-2',
    title: 'Understanding Land Mutation (Dakhil Kharij) in Uttarakhand',
    category: 'Legal & Registry',
    image: '/images/hero_villa.png',
    date: 'June 28, 2026',
    readTime: '7 min read',
    author: 'Nitin Katoch (Director)',
    excerpt: 'What is land mutation? How does it differ from registry? We explain the complete Dakhil Kharij process in Uttarakhand with legal checkpoints.',
    content: 'When purchasing residential land in Dehradun, many buyers assume that registered deeds (Registry) are the final step in property ownership. However, without land mutation—locally known as Dakhil Kharij—your legal title remains incomplete in the government revenue books.\n\nWhat exactly is Dakhil Kharij? While the Registry transfers the physical title of the property from the seller to the buyer, Mutation records the transfer of ownership in the local government’s land revenue register. It updates the Khatauni records, declaring you as the official taxpayer for that plot coordinate.\n\nThe mutation process in Uttarakhand involves several key checkpoints: First, the registry office submits a notice of transaction to the local Tehsildar office. Next, a public notice period is declared (usually 35 days) to ensure there are no objections from previous co-owners. Finally, the local Patwari (Revenue Inspector) conducts site measurements and updates the Devbhoomi land record portal.\n\nAt Dreamsland Associates, we handle this entire legal pipeline for our buyers. Every plot sold in our gated enclaves comes with immediate Registry and verified Mutation coordinates, giving you 100% legal immunity against co-owner disputes.'
  },
  {
    id: 'blog-3',
    title: 'Why connecting road widths matter in gated communities',
    category: 'Development Standards',
    image: '/images/hero_villa.png',
    date: 'June 20, 2026',
    readTime: '4 min read',
    author: 'Suhail (Managing Director)',
    excerpt: 'Why connecting road widths matter. We discuss why RCC cemented roads, integrated drains, and gated community entrance grids add 30% premium value.',
    content: 'When buyers evaluate residential plots, they often focus solely on the plot size and price per square yard (Gaj). However, the infrastructure surrounding the plot—specifically internal roads—determines the long-term liveability and resale valuation of the asset.\n\nNarrow roads (such as 15 or 18 feet) create immediate logistical bottlenecks. Passing two SUVs simultaneously becomes difficult, and visitor parking can block emergency vehicles. This is why modern township codes mandate wider corridors.\n\nA premium gated community should ideally feature 25 to 30 feet wide RCC cemented internal roads. Cemented RCC roads withstand heavy monsoon downpours without developing potholes, ensuring smooth transit year-round. Integrated side drains run alongside these roads, preventing water-logging and soil erosion.\n\nWider internal roads and proper planning add a premium of up to 30% on property valuations over time. Investing in gated societies with robust road coordinates, demarcated boundaries, and professional entrance grids is the smartest way to secure your capital.'
  }
];

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('blogs');
    
    let blogs = await collection.find({}).sort({ date: -1 }).toArray();
    
    // Seed initial blogs if empty
    if (blogs.length === 0) {
      await collection.insertMany(SEED_BLOGS.map(b => ({ ...b })));
      blogs = await collection.find({}).sort({ date: -1 }).toArray();
    }
    
    return NextResponse.json(blogs);
  } catch (error: any) {
    console.error('MongoDB GET Blogs Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const blog = await request.json();
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('blogs');
    
    const { _id, ...cleanBlog } = blog;
    
    await collection.replaceOne(
      { id: blog.id },
      cleanBlog,
      { upsert: true }
    );
    
    const updatedList = await collection.find({}).sort({ date: -1 }).toArray();
    return NextResponse.json(updatedList);
  } catch (error: any) {
    console.error('MongoDB POST Blog Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Blog id is required' }, { status: 400 });
    }
    
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('blogs');
    
    await collection.deleteOne({ id });
    
    const updatedList = await collection.find({}).sort({ date: -1 }).toArray();
    return NextResponse.json(updatedList);
  } catch (error: any) {
    console.error('MongoDB DELETE Blog Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
