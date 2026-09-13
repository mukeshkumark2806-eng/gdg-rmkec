import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, subject, message } = data;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    const payload = {
      timestamp: new Date().toISOString(),
      name,
      email,
      subject: subject || 'General Inquiry',
      message,
    };

    console.log('[GDG Contact Message Received]:', payload);

    // If an external contact webhook or notification endpoint is configured
    const contactWebhookUrl = process.env.CONTACT_WEBHOOK_URL;
    if (contactWebhookUrl) {
      try {
        await fetch(contactWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch (webhookErr) {
        console.error('[Contact Webhook Error]:', webhookErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Message received successfully.',
    });
  } catch (error) {
    console.error('[Contact API Error]:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
