import { NextResponse } from 'next/server';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Simple sanitization helper to prevent script injection
function sanitize(input: unknown, maxLength: number): string {
  if (typeof input !== 'string') return '';
  return input
    .trim()
    .slice(0, maxLength)
    .replace(/[<>]/g, '');
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return NextResponse.json({ error: 'Content-Type must be application/json' }, { status: 415 });
    }

    const data = await request.json();
    const fullName = sanitize(data.fullName, 100);
    const rollNumber = sanitize(data.rollNumber, 30);
    const email = sanitize(data.email, 120).toLowerCase();
    const department = sanitize(data.department, 50);
    const year = sanitize(data.year, 30);
    const opportunity = sanitize(data.opportunity, 50);
    const github = sanitize(data.github, 150);
    const motivation = sanitize(data.motivation, 2000);

    if (!fullName || !rollNumber || !email) {
      return NextResponse.json(
        { error: 'Full name, roll number, and email are required.' },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    const payload = {
      timestamp: new Date().toISOString(),
      fullName,
      rollNumber,
      email,
      department: department || 'Not Specified',
      year: year || 'Not Specified',
      opportunity: opportunity || 'General Member',
      github: github || 'N/A',
      motivation: motivation || 'N/A',
    };

    console.log('[GDG Member Application Validated]:', payload);

    // Forward to secure webhook if configured (Google Sheets / Supabase)
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
