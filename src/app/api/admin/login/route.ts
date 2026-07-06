import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { passcode } = await request.json();
    const systemPasscode = process.env.ADMIN_PASSWORD || 'admin123';
    
    if (passcode === systemPasscode) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, error: 'Invalid passcode' }, { status: 401 });
    }
  } catch (error: any) {
    console.error('Admin Login API Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
