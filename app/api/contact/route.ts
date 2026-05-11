import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend('re_N4oPQW94_4d5xZKfRwY7cKhB8D89A8JWe');

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, message } = await request.json();

    // Send email to you (the agency)
    const agencyEmail = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'mnemonictranslation@gmail.com',
      subject: `New Quote Request from ${name}`,
      html: `
        <h2>New Translation Quote Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    console.log('Agency email result:', agencyEmail);

    // Send confirmation email to the customer
    const customerEmail = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'We Received Your Quote Request - TranslationPro',
      html: `
        <h2>Thank you, ${name}!</h2>
        <p>We've received your translation quote request and will get back to you within 24 hours.</p>
        <p>In the meantime, if you have any questions, feel free to reply to this email.</p>
        <p>Best regards,<br>TranslationPro Team</p>
      `,
    });

    console.log('Customer email result:', customerEmail);

    return NextResponse.json(
      { message: 'Form submitted successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to process form' },
      { status: 500 }
    );
  }
}