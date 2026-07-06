import nodemailer from 'nodemailer';

export interface EmailOptions {
  to: string;
  subject: string;
  name: string;
  phone: string;
  email: string;
  requirements: string;
  inquiryType?: string;
}

export async function sendAutoresponderEmail(options: EmailOptions) {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_USER || 'dreamlandassociate7@gmail.com';
  const pass = process.env.SMTP_PASS; // Gmail App Password

  if (!pass) {
    console.warn('SMTP_PASS is not set in env variables. Skipping email notifications.');
    return false;
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });

  const logoUrl = 'https://dreamsland.in/logo.png';

  // HTML content for the client
  const clientHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; background-color: #faf9f6; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
        .wrapper { max-width: 600px; margin: 30px auto; background-color: #ffffff; border: 1px solid #e5e5e0; border-radius: 4px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.02); }
        .header { background-color: #111111; padding: 25px; text-align: center; border-bottom: 3px solid #887361; }
        .logo { max-height: 44px; display: inline-block; vertical-align: middle; }
        .content { padding: 35px; text-align: left; }
        .greeting { font-family: Georgia, serif; color: #111111; font-size: 20px; font-weight: normal; margin-top: 0; margin-bottom: 20px; }
        .text { color: #555552; font-size: 14px; line-height: 1.6; margin-bottom: 25px; }
        .details-box { background-color: #f7f6f2; border: 1px solid #e8e7e1; padding: 20px; border-radius: 3px; margin-bottom: 25px; }
        .details-box h4 { margin-top: 0; color: #111111; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #e0dfd9; pb: 8px; margin-bottom: 12px; }
        .row { margin-bottom: 8px; font-size: 13px; color: #444442; }
        .row strong { color: #666662; width: 110px; display: inline-block; }
        .footer { background-color: #f7f6f2; padding: 20px; text-align: center; font-size: 11px; color: #8a8982; border-top: 1px solid #e8e7e1; }
        .footer a { color: #887361; text-decoration: none; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="header">
          <img src="${logoUrl}" alt="Dreamsland Associates" class="logo" style="max-height: 44px;" />
          <div style="font-family: Georgia, serif; color: #ffffff; font-size: 16px; letter-spacing: 3px; margin-top: 8px; text-transform: uppercase;">Dreamsland Associates</div>
        </div>
        <div class="content">
          <h3 class="greeting">Thank You for Reaching Out</h3>
          <p class="text">Dear ${options.name},</p>
          <p class="text">We have received your property consult inquiry. A dedicated coordinator from our Dehradun Shimla Bypass office is reviewing your specifications and will connect with you via Phone or WhatsApp shortly.</p>
          
          <div class="details-box">
            <h4>Inquiry Coordinates</h4>
            <div class="row"><strong>Full Name:</strong> ${options.name}</div>
            <div class="row"><strong>Phone:</strong> ${options.phone}</div>
            <div class="row"><strong>Email:</strong> ${options.email}</div>
            <div class="row"><strong>Inquiry Type:</strong> ${options.inquiryType || 'Consultation'}</div>
            <div class="row" style="margin-top: 12px; border-top: 1px dashed #dcdbd3; pt: 8px; white-space: pre-wrap;"><strong>Specifications:</strong><br/>${options.requirements}</div>
          </div>
          
          <p class="text" style="font-size: 12px; color: #8a8982; border-top: 1px solid #e8e7e1; pt: 15px;">
            If you wish to reach our acquisition coordinators directly, feel free to call us at +91 9927502248 or +91 8057932926.
          </p>
        </div>
        <div class="footer">
          <p>© 2026 Dreamsland Associates. Gorakhpur, Shimla Bypass Road, Dehradun, Uttarakhand.</p>
          <p><a href="https://dreamsland.in">dreamsland.in</a> | <a href="https://wa.me/919927502248">WhatsApp Chat</a></p>
        </div>
      </div>
    </body>
    </html>
  `;

  // HTML content for the admin
  const adminHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px; }
        .box { max-width: 600px; margin: 0 auto; background: #ffffff; padding: 30px; border: 1px solid #dddddd; border-radius: 4px; }
        h2 { color: #887361; font-family: Georgia, serif; font-size: 20px; border-bottom: 2px solid #eeeeee; pb: 10px; margin-top: 0; }
        .item { margin-bottom: 12px; font-size: 14px; color: #333333; }
        .item strong { color: #666666; width: 120px; display: inline-block; }
      </style>
    </head>
    <body>
      <div class="box">
        <h2>New Inquiry Registered - Dreamsland Portal</h2>
        <p style="font-size: 14px; color: #555555;">A new user has submitted a query form on the website. Below are the registered details:</p>
        
        <div class="item"><strong>Inquiry Type:</strong> ${options.inquiryType || 'Consultation'}</div>
        <div class="item"><strong>Client Name:</strong> ${options.name}</div>
        <div class="item"><strong>Client Phone:</strong> ${options.phone}</div>
        <div class="item"><strong>Client Email:</strong> ${options.email}</div>
        <div class="item" style="margin-top: 15px; background: #fafafa; padding: 15px; border: 1px solid #eeeeee; white-space: pre-wrap;"><strong>Message:</strong><br/>${options.requirements}</div>
        
        <p style="font-size: 12px; color: #888888; margin-top: 20px; border-top: 1px solid #eeeeee; pt: 10px;">
          This is an automated notification from the Dreamsland Web Desk. You can log into the Admin Console to manage this request.
        </p>
      </div>
    </body>
    </html>
  `;

  try {
    // 1. Send thank you response to the client
    if (options.email && options.email !== 'dreamlandassociate7@gmail.com') {
      await transporter.sendMail({
        from: `"Dreamsland Desk" <${user}>`,
        to: options.email,
        subject: `Thank you for your inquiry - Dreamsland Associates`,
        html: clientHtml,
      });
      console.log(`Autoresponder email sent to client: ${options.email}`);
    }

    // 2. Send notification copy to admin
    await transporter.sendMail({
      from: `"Dreamsland Web Desk" <${user}>`,
      to: 'dreamlandassociate7@gmail.com',
      subject: `[NEW INQUIRY] ${options.name} - ${options.inquiryType || 'Consultation'}`,
      html: adminHtml,
    });
    console.log(`Inquiry notification copy sent to admin: dreamlandassociate7@gmail.com`);

    return true;
  } catch (err) {
    console.error('Nodemailer SMTP Transporter Error:', err);
    return false;
  }
}
