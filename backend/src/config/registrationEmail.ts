import nodemailer from "nodemailer";

const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

/**
 * Send registration confirmation email to user
 */
export const sendRegistrationConfirmation = async (
  userName: string,
  userEmail: string,
  eventTitles: string[],
  registrationId: string,
  totalFee: number
) => {
  const transporter = createTransporter();

  const eventsList = eventTitles
    .map((title, index) => `${index + 1}. ${title}`)
    .join("<br>");

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: "Registration Confirmation - SAHITYAM 2026",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 50%, #6366f1 100%); color: white; padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px 20px; border-radius: 0 0 10px 10px; }
          .event-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #8b5cf6; }
          .info-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #e5e7eb; }
          .label { font-weight: bold; color: #6b7280; }
          .value { color: #1f2937; }
          .highlight { background: linear-gradient(135deg, #ec4899, #8b5cf6); color: white; padding: 15px; border-radius: 8px; text-align: center; margin: 20px 0; }
          .button { display: inline-block; background: linear-gradient(135deg, #ec4899, #8b5cf6); color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; margin-top: 20px; }
          .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
          .important-note { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; border-radius: 4px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">🎉 Registration Confirmed!</h1>
            <p style="margin: 10px 0 0 0;">SAHITYAM 2026</p>
          </div>
          <div class="content">
            <p style="font-size: 18px; color: #1f2937;">Dear ${userName},</p>
            
            <p>Thank you for registering for <strong>SAHITYAM 2026 - Kala aur Sahit ka Sangam</strong>! We're excited to have you join us.</p>
            
            <div class="highlight">
              <h2 style="margin: 0;">📅 Event Dates</h2>
              <p style="margin: 5px 0 0 0; font-size: 20px;"><strong>February 5-6, 2026</strong></p>
            </div>
            
            <div class="event-box">
              <h3 style="color: #8b5cf6; margin-top: 0;">📝 Registration Details</h3>
              
              <div class="info-row">
                <span class="label">Registration ID:</span>
                <span class="value"><strong>${registrationId}</strong></span>
              </div>
              
              <div class="info-row">
                <span class="label">Name:</span>
                <span class="value">${userName}</span>
              </div>
              
              <div class="info-row">
                <span class="label">Email:</span>
                <span class="value">${userEmail}</span>
              </div>
              
              <div class="info-row" style="border-bottom: none;">
                <span class="label">Total Fee:</span>
                <span class="value"><strong>₹${totalFee}</strong></span>
              </div>
            </div>
            
            <div class="event-box">
              <h3 style="color: #8b5cf6; margin-top: 0;">🎭 Registered Events</h3>
              <div style="padding-left: 10px;">
                ${eventsList}
              </div>
            </div>
            
            <div class="important-note">
              <p style="margin: 0;"><strong>⚠️ Payment Verification Pending</strong></p>
              <p style="margin: 10px 0 0 0;">Your payment screenshot has been submitted and is currently under review. You'll receive a confirmation email once your payment is verified by our admin team.</p>
            </div>
            
            <div style="margin-top: 30px;">
              <h3 style="color: #1f2937;">What's Next?</h3>
              <ul style="color: #4b5563;">
                <li>Wait for payment verification (usually within 24-48 hours)</li>
                <li>You'll receive a confirmation email once verified</li>
                <li>Bring your registration ID on the event day</li>
                <li>Check your email for event updates and schedules</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="${process.env.FRONTEND_URL}/profile" class="button">View Your Profile</a>
            </div>
            
            <div class="footer">
              <p><strong>SAHITYAM 2026</strong></p>
              <p>Where Art and Literature Converge</p>
              <p style="margin-top: 10px;">
                📧 mindbenders@cgcuniversity.org<br>
                🌐 <a href="${process.env.FRONTEND_URL}" style="color: #8b5cf6;">Visit Website</a>
              </p>
              <p style="margin-top: 20px; font-size: 12px;">
                If you have any questions, please don't hesitate to <a href="${process.env.FRONTEND_URL}/contact" style="color: #8b5cf6;">contact us</a>.
              </p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Registration confirmation email sent to ${userEmail}`);
  } catch (error) {
    console.error("Error sending registration confirmation email:", error);
    // Don't throw error - registration should succeed even if email fails
  }
};

/**
 * Send payment verification email to user
 */
export const sendPaymentVerificationEmail = async (
  userName: string,
  userEmail: string,
  eventTitles: string[],
  registrationId: string,
  isVerified: boolean
) => {
  const transporter = createTransporter();

  const eventsList = eventTitles
    .map((title, index) => `${index + 1}. ${title}`)
    .join("<br>");

  const subject = isVerified
    ? "Payment Verified - SAHITYAM 2026"
    : "Payment Verification Failed - SAHITYAM 2026";

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject,
    html: isVerified
      ? `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px 20px; border-radius: 0 0 10px 10px; }
          .success-box { background: #d1fae5; border-left: 4px solid #10b981; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .event-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #8b5cf6; }
          .button { display: inline-block; background: linear-gradient(135deg, #ec4899, #8b5cf6); color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; margin-top: 20px; }
          .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">✅ Payment Verified!</h1>
            <p style="margin: 10px 0 0 0;">SAHITYAM 2026</p>
          </div>
          <div class="content">
            <p style="font-size: 18px; color: #1f2937;">Dear ${userName},</p>
            
            <div class="success-box">
              <h2 style="color: #059669; margin-top: 0;">🎉 Your payment has been verified!</h2>
              <p style="margin: 10px 0 0 0;">You're all set for SAHITYAM 2026. We can't wait to see you there!</p>
            </div>
            
            <div class="event-box">
              <h3 style="color: #8b5cf6; margin-top: 0;">📋 Confirmed Registration</h3>
              <p><strong>Registration ID:</strong> ${registrationId}</p>
              <p><strong>Events:</strong></p>
              <div style="padding-left: 10px;">
                ${eventsList}
              </div>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1f2937; margin-top: 0;">📅 Save the Date</h3>
              <p style="font-size: 18px; color: #8b5cf6;"><strong>February 5-6, 2026</strong></p>
              <p>Please bring a valid ID and your registration ID: <strong>${registrationId}</strong></p>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="${process.env.FRONTEND_URL}/schedule" class="button">View Event Schedule</a>
            </div>
            
            <div class="footer">
              <p><strong>SAHITYAM 2026</strong></p>
              <p>Where Art and Literature Converge</p>
              <p style="margin-top: 10px;">See you at the event! 🎭📚</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `
      : `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px 20px; border-radius: 0 0 10px 10px; }
          .error-box { background: #fee2e2; border-left: 4px solid #ef4444; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .button { display: inline-block; background: linear-gradient(135deg, #ec4899, #8b5cf6); color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; margin-top: 20px; }
          .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">❌ Payment Verification Issue</h1>
            <p style="margin: 10px 0 0 0;">SAHITYAM 2026</p>
          </div>
          <div class="content">
            <p style="font-size: 18px; color: #1f2937;">Dear ${userName},</p>
            
            <div class="error-box">
              <h2 style="color: #dc2626; margin-top: 0;">Payment Verification Failed</h2>
              <p>Unfortunately, we couldn't verify your payment for registration ID: <strong>${registrationId}</strong></p>
              <p style="margin-top: 15px;"><strong>Possible reasons:</strong></p>
              <ul>
                <li>Payment screenshot unclear or unreadable</li>
                <li>Transaction ID doesn't match</li>
                <li>Payment amount incorrect</li>
                <li>Payment details incomplete</li>
              </ul>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1f2937; margin-top: 0;">What to do next?</h3>
              <ol>
                <li>Check your payment screenshot for clarity</li>
                <li>Ensure all payment details are visible</li>
                <li>Submit a new registration with correct payment proof</li>
                <li>Or contact us for assistance</li>
              </ol>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="${process.env.FRONTEND_URL}/register" class="button">Register Again</a>
              <a href="${process.env.FRONTEND_URL}/contact" class="button" style="background: #6b7280; margin-left: 10px;">Contact Us</a>
            </div>
            
            <div class="footer">
              <p><strong>SAHITYAM 2026</strong></p>
              <p>📧 mindbenders@cgcuniversity.org</p>
              <p style="margin-top: 10px;">We're here to help!</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Payment verification email sent to ${userEmail}`);
  } catch (error) {
    console.error("Error sending payment verification email:", error);
  }
};
