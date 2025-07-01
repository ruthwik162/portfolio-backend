const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  // Email transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Server to Admin Email (you)
  const adminMailOptions = {
    from: `"Client Alert" <${process.env.EMAIL_USER}>`,
    to: ['ruthwik.merugu@outlook.com', 'nagaruthwikmerugu162@gmail.com'],
    subject: `🚀  New Project Inquiry from ${name}`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Submission</title>
        <style>
          /* Apple-style CSS */
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f5f5f7;
            color: #1d1d1f;
            -webkit-font-smoothing: antialiased;
          }
          .email-container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 18px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          }
          .email-header {
            background: linear-gradient(to right, #0071e3, #2997ff);
            color: white;
            padding: 40px 30px;
            text-align: center;
          }
          .email-header h1 {
            font-size: 32px;
            font-weight: 700;
            margin: 0;
            letter-spacing: -0.5px;
          }
          .email-header p {
            font-size: 18px;
            opacity: 0.9;
            margin: 10px 0 0;
          }
          .email-body {
            padding: 40px 30px;
          }
          .info-box {
            background-color: #f5f5f7;
            border-radius: 14px;
            padding: 25px;
            margin-bottom: 30px;
          }
          .info-item {
            display: flex;
            padding: 15px 0;
            border-bottom: 1px solid #e0e0e0;
          }
          .info-item:last-child {
            border-bottom: none;
          }
          .info-label {
            font-weight: 600;
            min-width: 100px;
            color: #86868b;
          }
          .info-value {
            flex: 1;
          }
          .message-content {
            background-color: #f5f5f7;
            border-radius: 14px;
            padding: 25px;
            margin-top: 30px;
            font-size: 16px;
            line-height: 1.6;
          }
          .image-container {
            margin: 30px 0;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 6px 16px rgba(0,0,0,0.08);
          }
          .image-container img {
            width: 100%;
            display: block;
          }
          .email-footer {
            background-color: #f5f5f7;
            padding: 30px;
            text-align: center;
            font-size: 14px;
            color: #86868b;
            border-top: 1px solid #e0e0e0;
          }
          .action-button {
            display: inline-block;
            background-color: #0071e3;
            color: white;
            text-decoration: none;
            padding: 14px 30px;
            border-radius: 12px;
            font-weight: 500;
            font-size: 17px;
            margin-top: 20px;
            transition: all 0.2s ease;
          }
          .action-button:hover {
            background-color: #0077ed;
            transform: translateY(-1px);
          }
          .signature {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e0e0e0;
          }
          .signature p {
            margin: 5px 0;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="email-header">
            <h1>New Contact Submission</h1>
            <p>From your website contact form</p>
          </div>
          
          <div class="email-body">
            <div class="info-box">
              <div class="info-item">
                <div class="info-label">Name</div>
                <div class="info-value">${name}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Email</div>
                <div class="info-value">
                  <a href="mailto:${email}" style="color: #0071e3; text-decoration: none;">${email}</a>
                </div>
              </div>
            </div>
            
            <h2 style="font-size: 22px; font-weight: 600; margin-bottom: 15px;">Message</h2>
            <div class="message-content">
              ${message.replace(/\n/g, '<br>')}
            </div>
            
            <div class="image-container">
              <img src="cid:admin_image" alt="Contact Notification" />
            </div>
            
            <div class="signature">
              <p>Best regards,</p>
              <p style="font-weight: 600;">Your Website Contact System</p>
            </div>
          </div>
          
          <div class="email-footer">
            <p>This message was generated automatically by your website.</p>
            <a href="mailto:${email}" class="action-button">Reply to ${name}</a>
          </div>
        </div>
      </body>
      </html>
    `,
    attachments: [
      {
        filename: 'contact-banner.png',
        path: './assets/email_image.png', // adjust path to match image location
        cid: 'admin_image', // unique content ID
      },
    ],
  };

  // Auto-reply to user
  const userMailOptions = {
    from: `"Nagaruthwik Merugu" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `✅ We've received your message, ${name}`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You for Your Message</title>
        <style>
          /* Apple-style CSS */
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f5f5f7;
            color: #1d1d1f;
            -webkit-font-smoothing: antialiased;
          }
          .email-container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 18px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          }
          .email-header {
            background: linear-gradient(to right, #34c759, #30d158);
            color: white;
            padding: 40px 30px;
            text-align: center;
          }
          .email-header h1 {
            font-size: 32px;
            font-weight: 700;
            margin: 0;
            letter-spacing: -0.5px;
          }
          .email-header p {
            font-size: 18px;
            opacity: 0.9;
            margin: 10px 0 0;
          }
          .email-body {
            padding: 40px 30px;
            text-align: center;
          }
          .confirmation-icon {
            font-size: 72px;
            color: #34c759;
            margin-bottom: 25px;
            font-weight: 700;
          }
          .message-content {
            font-size: 18px;
            line-height: 1.6;
            margin-bottom: 30px;
            color: #1d1d1f;
          }
          .quote {
            font-style: italic;
            color: #86868b;
            padding: 25px;
            border-left: 4px solid #e0e0e0;
            margin: 40px 0;
            text-align: left;
          }
          .contact-info {
            background-color: #f5f5f7;
            border-radius: 14px;
            padding: 25px;
            margin: 30px 0;
            text-align: center;
          }
          .contact-info p {
            margin: 10px 0;
          }
          .image-container {
            margin: 30px 0;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 6px 16px rgba(0,0,0,0.08);
          }
          .image-container img {
            width: 100%;
            display: block;
          }
          .email-footer {
            background-color: #f5f5f7;
            padding: 30px;
            text-align: center;
            font-size: 14px;
            color: #86868b;
            border-top: 1px solid #e0e0e0;
          }
          .signature {
            margin-top: 30px;
          }
          .signature p {
            margin: 5px 0;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="email-header">
            <h1>Message Received</h1>
            <p>Thank you for reaching out</p>
          </div>
          
          <div class="email-body">
            <div class="confirmation-icon">✓</div>
            
            <div class="message-content">
              <p>Hello ${name},</p>
              <p>Thank you for contacting me! I've received your message and will get back to you shortly.</p>
            </div>
            
            <div class="image-container">
              <img src="cid:user_image" alt="Thank You" />
            </div>
            
            <div class="quote">
              "Success in business is all about making human connections."<br>
              <span style="font-size: 15px;">– Richard Branson</span>
            </div>
            
            <div class="contact-info">
              <p>In the meantime, feel free to connect with me directly:</p>
              <p style="font-weight: 600; font-size: 18px; margin-top: 15px;">
                <a href="mailto:ruthwik.merugu@outlook.com" style="color: #0071e3; text-decoration: none;">ruthwik.merugu@outlook.com</a>
              </p>
            </div>
            
            <div class="signature">
              <p>Best wishes,</p>
              <p style="font-weight: 600; font-size: 18px;">Nagaruthwik Merugu</p>
            </div>
          </div>
          
          <div class="email-footer">
            <p>This is an automated message. Please do not reply to this email.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    attachments: [
      {
        filename: 'thank-you-banner.png',
        path: './assets/email_image.png', // same image or different if needed
        cid: 'email_image', // unique content ID
      },
    ],
  };

  try {
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);
    return res.status(200).json({ success: true, message: 'Messages sent successfully!' });
  } catch (err) {
    console.error('Error sending email:', err);
    return res.status(500).json({ error: 'Failed to send email. Please try again later.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});