import { NextResponse } from 'next/server';
import { sendSupportEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    
    if (!message || message.trim() === '') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const success = await sendSupportEmail(message);

    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Failed to send support email via SMTP.' }, { status: 500 });
    }
  } catch (error: any) {
    console.error('API Support Route Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
