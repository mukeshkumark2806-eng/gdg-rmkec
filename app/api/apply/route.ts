import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { fullName, rollNumber, email, department, year, opportunity, github, motivation } = data;

    if (!fullName || !email || !rollNumber) {
      return NextResponse.json(
        { error: 'Full name, roll number, and email are required.' },
        { status: 400 }
      );
    }

    const payload = {
      timestamp: new Date().toISOString(),
      fullName,
      rollNumber,
      email,
      department,
      year,
      opportunity,
      github: github || 'N/A',
      motivation: motivation || 'N/A',
    };

    console.log('[GDG Member Application Received]:', payload);

    // If an external Google Sheet Webhook or Formspree URL is configured, forward it
    const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch (webhookErr) {
        console.error('[Webhook Forwarding Error]:', webhookErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully.',
    });
  } catch (error) {
    console.error('[Application API Error]:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
