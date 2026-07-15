import { NextRequest, NextResponse } from 'next/server';
import { improveBulletPoint } from '@/lib/gemini';

export async function POST(req: NextRequest) {
  try {
    const { text, tone } = await req.json();

    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    console.log('Improving text:', text.substring(0, 50) + '...');
    const improved = await improveBulletPoint(text, tone);
    console.log('Improved text:', improved);
    
    return NextResponse.json({ improved });
  } catch (error: any) {
    console.error('Improve API Error:', error.message);
    console.error('Full error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
