const nodemailer = require('nodemailer');

/**
 * Creates a Nodemailer transporter using environment variables.
 * Uses Gmail with App Password.
 */
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

/**
 * Sends an email notification when a contact form is submitted.
 * @param {Object} param0 - Contact form data
 */
const sendContactEmail = async ({ name, email, subject, message }) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('⚠️  Email credentials not configured. Skipping email send.');
    return;
  }

  const transporter = createTransporter();

  const mailOptions = {
    from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    replyTo: email,
    subject: `[Portfolio] New Message: ${subject}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #06b6d4; border-bottom: 1px solid #e5e7eb; padding-bottom: 12px;">
          New Portfolio Contact
        </h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #374151; width: 80px;">From:</td>
            <td style="padding: 8px 0;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #374151;">Email:</td>
            <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #06b6d4;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #374151;">Subject:</td>
            <td style="padding: 8px 0;">${subject}</td>
          </tr>
        </table>
        <div style="margin-top: 16px;">
          <p style="font-weight: bold; color: #374151; margin-bottom: 8px;">Message:</p>
          <div style="background: #f9fafb; border-left: 4px solid #06b6d4; padding: 16px; border-radius: 4px; white-space: pre-wrap;">${message}</div>
        </div>
        <p style="margin-top: 24px; color: #9ca3af; font-size: 12px;">
          This message was sent via your portfolio contact form.
        </p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendContactEmail };
