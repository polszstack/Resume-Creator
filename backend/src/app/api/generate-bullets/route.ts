import { NextRequest, NextResponse } from 'next/server';
import { generateBulletPoints } from '@/lib/gemini';

export async function POST(req: NextRequest) {
  try {
    const { jobTitle, company, keyAchievements } = await req.json();

    if (!jobTitle || !keyAchievements) {
      return NextResponse.json(
        { error: 'Job title and achievements are required' },
        { status: 400 }
      );
    }

    const bullets = await generateBulletPoints(jobTitle, company, keyAchievements);
    
    return NextResponse.json({ bullets });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate bullet points' },
      { status: 500 }
    );
  }
}