import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// You should set these in your .env.local
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const FROM_EMAIL = process.env.FROM_EMAIL || SMTP_USER;

export async function POST(request: NextRequest) {
  try {
    const { contacts, message, locationUrl, senderName, senderEmail } = await request.json();
    if (!contacts || !Array.isArray(contacts) || contacts.length === 0) {
      return NextResponse.json({ error: 'No contacts provided' }, { status: 400 });
    }
    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
      return NextResponse.json({ error: 'SMTP configuration is missing' }, { status: 500 });
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465, // true for 465, false for other ports
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    // Use sender's email and name if provided, else fallback
    const fromField = senderEmail
      ? `${senderName || senderEmail} <${senderEmail}>`
      : FROM_EMAIL;

    // Send email to each contact
    const results = await Promise.all(contacts.map(async (contact: any) => {
      if (!contact.email) return { email: null, status: 'skipped', error: 'No email' };
      try {
        await transporter.sendMail({
          from: fromField,
          to: contact.email,
          subject: '🚨 SOS Emergency Alert',
          text: `${message}\n\nLocation: ${locationUrl}\n\nContacted for: ${contact.name} (${contact.relationship})`,
          html: `<p>${message}</p><p><strong>Location:</strong> <a href="${locationUrl}">${locationUrl}</a></p><p>Contacted for: <b>${contact.name}</b> (${contact.relationship})</p>`,
        });
        return { email: contact.email, status: 'sent' };
      } catch (error) {
        return { email: contact.email, status: 'error', error: error instanceof Error ? error.message : String(error) };
      }
    }));

    return NextResponse.json({ message: 'SOS emails sent', results });
  } catch (error) {
    console.error('SOS email error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 