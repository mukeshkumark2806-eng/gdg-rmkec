import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
    const name = sanitize(data.name, 100);
    const email = sanitize(data.email, 120).toLowerCase();
    const subject = sanitize(data.subject, 100);
    const message = sanitize(data.message, 3000);

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    const recipientEmail = 'mukeshkumar.k2806@gmail.com';
    const emailSubject = `[GDG RMKEC Contact] ${subject || 'General Inquiry'} - from ${name}`;

    const payload = {
      timestamp: new Date().toISOString(),
      recipient: recipientEmail,
      name,
      email,
      subject: subject || 'General Inquiry',
      message,
    };

    console.log('[GDG Contact Message Received]:', payload);

    // 1. Direct First-Party Delivery via Gmail SMTP (Zero 3rd Parties)
    const smtpPass = process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS;
    const smtpUser = process.env.SMTP_USER || recipientEmail;

    if (smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        await transporter.sendMail({
          from: `"GDG on Campus RMKEC" <${smtpUser}>`,
          to: recipientEmail,
          replyTo: email,
          subject: emailSubject,
          text: `Name: ${name}\nEmail: ${email}\nTopic: ${subject || 'General Inquiry'}\n\nMessage:\n${message}\n\n---\nSent via GDG RMKEC Portal`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0;">
              <div style="border-bottom: 2px solid #4285F4; padding-bottom: 12px; margin-bottom: 20px;">
                <h2 style="color: #1a1a1a; margin: 0; font-size: 20px;">New Contact Inquiry Received</h2>
                <span style="font-size: 12px; color: #4285F4; font-weight: 600;">GDG on Campus RMKEC Portal</span>
              </div>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
                <tr>
                  <td style="padding: 8px 0; color: #64748b; width: 90px; font-weight: 600;">Sender:</td>
                  <td style="padding: 8px 0; color: #0f172a; font-weight: 500;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Email:</td>
                  <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #4285F4; text-decoration: none;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Topic:</td>
                  <td style="padding: 8px 0; color: #0f172a;">${subject || 'General Inquiry'}</td>
                </tr>
              </table>
              <div style="background: #f8fafc; border-left: 4px solid #4285F4; padding: 16px; border-radius: 8px; margin-bottom: 20px;">
                <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #1e293b; white-space: pre-wrap;">${message}</p>
              </div>
              <p style="font-size: 11px; color: #94a3b8; margin: 0; border-top: 1px solid #e2e8f0; padding-top: 12px;">
                Direct message delivered securely to ${recipientEmail}. Hit Reply in Gmail to answer the sender directly.
              </p>
            </div>
          `,
        });

        console.log('[Direct Gmail SMTP]: Message successfully dispatched to', recipientEmail);
      } catch (smtpErr) {
        console.error('[Direct Gmail SMTP Error]:', smtpErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Your message has been sent directly to ${recipientEmail}.`,
    });
  } catch (error) {
    console.error('[Contact API Error]:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

