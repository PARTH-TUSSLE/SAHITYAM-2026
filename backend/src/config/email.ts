import nodemailer from "nodemailer";

// Create email transporter
const createTransporter = () => {
  // Using Gmail SMTP for sending emails
  // Emails are sent FROM mindbendersclub01@gmail.com but TO mindbenders@cgcuniversity.org
  return nodemailer.createTransporter({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // mindbendersclub01@gmail.com
      pass: process.env.EMAIL_PASSWORD, // Gmail App Password
    },
  });
};

// Send contact form email
export const sendContactEmail = async (
  name: string,
  email: string,
  phone: string,
  subject: string,
  message: string
) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "mindbenders@cgcuniversity.org",
    subject: `SAHITYAM 2026 - Contact Form: ${subject}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 50%, #6366f1 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .info-row { margin: 15px 0; padding: 15px; background: white; border-left: 4px solid #8b5cf6; border-radius: 5px; }
          .label { font-weight: bold; color: #8b5cf6; margin-bottom: 5px; }
          .value { color: #333; }
          .message-box { background: white; padding: 20px; border-radius: 8px; margin-top: 20px; border: 2px solid #e5e7eb; }
          .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">📧 New Contact Form Submission</h1>
            <p style="margin: 10px 0 0 0;">SAHITYAM 2026</p>
          </div>
          <div class="content">
            <div class="info-row">
              <div class="label">Name:</div>
              <div class="value">${name}</div>
            </div>
            <div class="info-row">
              <div class="label">Email:</div>
              <div class="value"><a href="mailto:${email}" style="color: #8b5cf6; text-decoration: none;">${email}</a></div>
            </div>
            <div class="info-row">
              <div class="label">Phone:</div>
              <div class="value">${phone || "Not provided"}</div>
            </div>
            <div class="info-row">
              <div class="label">Subject:</div>
              <div class="value">${subject}</div>
            </div>
            <div class="message-box">
              <div class="label">Message:</div>
              <div class="value" style="margin-top: 10px;">${message}</div>
            </div>
            <div class="footer">
              <p>This email was sent from the SAHITYAM 2026 contact form</p>
              <p style="margin-top: 5px;">Reply directly to ${email} to respond to this inquiry</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Email sending error:", error);
    throw error;
  }
};

// Send confirmation email to user
export const sendConfirmationEmail = async (name: string, email: string) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Thank you for contacting SAHITYAM 2026",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 50%, #6366f1 100%); color: white; padding: 40px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .message { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px; }
          .button { display: inline-block; background: linear-gradient(135deg, #ec4899, #8b5cf6); color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">✨ Thank You for Reaching Out!</h1>
            <p style="margin: 10px 0 0 0;">SAHITYAM 2026 - Kala aur Sahit ka Sangam</p>
          </div>
          <div class="content">
            <p style="font-size: 18px; color: #333;">Dear ${name},</p>
            <div class="message">
              <p>Thank you for contacting SAHITYAM 2026! We've received your message and our team will review it shortly.</p>
              <p>We typically respond within 24-48 hours. If your inquiry is urgent, please feel free to reach out to us directly at mindbenders@cgcuniversity.org.</p>
              <p style="margin-top: 20px;">We look forward to connecting with you at <strong>SAHITYAM 2026</strong> from <strong>5th - 6th Feb 2026</strong>!</p>
            </div>
            <div style="text-align: center;">
              <a href="${process.env.FRONTEND_URL}" class="button">Visit Our Website</a>
            </div>
            <div class="footer">
              <p><strong>SAHITYAM 2026</strong></p>
              <p>Where Art and Literature Converge</p>
              <p style="margin-top: 10px;">📧 mindbenders@cgcuniversity.org</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Confirmation email error:", error);
    // Don't throw error for confirmation email failures
  }
};
