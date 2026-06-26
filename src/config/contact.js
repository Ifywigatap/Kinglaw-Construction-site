import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // 1. Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, subject, message, _hp } = req.body;

  // 2. Honeypot check: If the hidden field is filled, treat it as success but do nothing.
  if (_hp) {
    console.warn("Spam bot detected via honeypot.");
    return res.status(200).json({ message: 'Inquiry received successfully' });
  }

  // 3. Server-side validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'All required fields must be provided.' });
  }

  // 4. Configure your Email Transporter
  // Note: Use environment variables for sensitive credentials!
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST, // e.g., smtp.gmail.com
    port: process.env.EMAIL_PORT || 587,
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"${name}" <${process.env.EMAIL_USER}>`, // Sent via your auth user
    to: process.env.CONTACT_RECEIVER_EMAIL, // Where you want to receive inquiries
    replyTo: email, // The user's email so you can reply directly
    subject: `New Contact Form Submission: ${subject}`,
    text: `You have a new message from ${name} (${email}):\n\n${message}`,
    html: `
      <div style="font-family: sans-serif; padding: 20px; color: #334155;">
        <h2 style="color: #f59e0b;">New Project Inquiry</h2>
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
        <p style="white-space: pre-wrap;">${message}</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Email sending error:', error);
    return res.status(500).json({ message: 'Internal server error. Please try again later.' });
  }
}