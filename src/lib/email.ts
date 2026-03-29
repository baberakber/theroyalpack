import nodemailer from 'nodemailer';
import type { QuoteFormData } from './schemas/quote';
import type { SampleFormData } from './schemas/sample';
import type { ContactFormData } from './schemas/contact';

// HTML escape to prevent XSS in email content
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Create reusable transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 465,
    secure: true, // Use TLS
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

// Email templates
const emailStyles = `
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #1e3a5f; color: white; padding: 20px; text-align: center; }
    .header h1 { margin: 0; font-size: 24px; }
    .content { padding: 20px; background: #f9f9f9; }
    .section { margin-bottom: 20px; padding: 15px; background: white; border-radius: 8px; }
    .section h2 { margin-top: 0; color: #1e3a5f; font-size: 18px; border-bottom: 2px solid #1e3a5f; padding-bottom: 8px; }
    .field { margin-bottom: 10px; }
    .field-label { font-weight: bold; color: #666; }
    .field-value { color: #333; }
    .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
    .reference { background: #1e3a5f; color: white; padding: 10px; text-align: center; border-radius: 4px; margin: 20px 0; }
  </style>
`;

// Quote email - to business
export async function sendQuoteEmail(
  data: QuoteFormData & { designFileUrl?: string },
  reference: string
): Promise<void> {
  const transporter = createTransporter();

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>${emailStyles}</head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Quote Request</h1>
        </div>
        <div class="content">
          <div class="reference">
            Reference: ${reference}
          </div>

          <div class="section">
            <h2>Contact Information</h2>
            <div class="field">
              <span class="field-label">Name:</span>
              <span class="field-value">${escapeHtml(data.name)}</span>
            </div>
            <div class="field">
              <span class="field-label">Email:</span>
              <span class="field-value"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></span>
            </div>
            <div class="field">
              <span class="field-label">Phone:</span>
              <span class="field-value"><a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a></span>
            </div>
            ${data.company ? `
            <div class="field">
              <span class="field-label">Company:</span>
              <span class="field-value">${escapeHtml(data.company)}</span>
            </div>
            ` : ''}
            ${data.industry ? `
            <div class="field">
              <span class="field-label">Industry:</span>
              <span class="field-value">${escapeHtml(data.industry)}</span>
            </div>
            ` : ''}
          </div>

          <div class="section">
            <h2>Cup Requirements</h2>
            <div class="field">
              <span class="field-label">Cup Type:</span>
              <span class="field-value">${escapeHtml(data.cupType)}</span>
            </div>
            <div class="field">
              <span class="field-label">Cup Size:</span>
              <span class="field-value">${escapeHtml(data.cupSize)}</span>
            </div>
            <div class="field">
              <span class="field-label">Quantity:</span>
              <span class="field-value">${data.quantity.toLocaleString()} pieces</span>
            </div>
            ${data.lidRequired ? `
            <div class="field">
              <span class="field-label">Lid Required:</span>
              <span class="field-value">${escapeHtml(data.lidRequired)}</span>
            </div>
            ` : ''}
            ${data.sleeveRequired ? `
            <div class="field">
              <span class="field-label">Sleeve Required:</span>
              <span class="field-value">${escapeHtml(data.sleeveRequired)}</span>
            </div>
            ` : ''}
          </div>

          <div class="section">
            <h2>Printing Details</h2>
            <div class="field">
              <span class="field-label">Custom Printing:</span>
              <span class="field-value">${data.needsPrinting === 'yes' ? 'Yes' : 'No'}</span>
            </div>
            ${data.needsPrinting === 'yes' ? `
            ${data.printingMethod ? `
            <div class="field">
              <span class="field-label">Printing Method:</span>
              <span class="field-value">${escapeHtml(data.printingMethod)}</span>
            </div>
            ` : ''}
            ${data.designReady ? `
            <div class="field">
              <span class="field-label">Design Ready:</span>
              <span class="field-value">${data.designReady === 'yes' ? 'Yes' : 'Needs design support'}</span>
            </div>
            ` : ''}
            ${data.colorCount ? `
            <div class="field">
              <span class="field-label">Color Count:</span>
              <span class="field-value">${escapeHtml(data.colorCount)}</span>
            </div>
            ` : ''}
            ${data.designFileUrl ? `
            <div class="field">
              <span class="field-label">Design File:</span>
              <span class="field-value"><a href="${escapeHtml(data.designFileUrl)}">Download</a></span>
            </div>
            ` : ''}
            ` : ''}
          </div>

          <div class="section">
            <h2>Additional Details</h2>
            ${data.timeline ? `
            <div class="field">
              <span class="field-label">Timeline:</span>
              <span class="field-value">${escapeHtml(data.timeline)}</span>
            </div>
            ` : ''}
            <div class="field">
              <span class="field-label">Eco-Friendly Interest:</span>
              <span class="field-value">${data.ecoPreference ? 'Yes' : 'No'}</span>
            </div>
            ${data.message ? `
            <div class="field">
              <span class="field-label">Additional Notes:</span>
              <div class="field-value" style="margin-top: 5px; padding: 10px; background: #f5f5f5; border-radius: 4px;">${escapeHtml(data.message)}</div>
            </div>
            ` : ''}
          </div>
        </div>
        <div class="footer">
          <p>This quote request was submitted via the Royal Pack website.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  // Send to business
  await transporter.sendMail({
    from: `"Royal Pack Website" <${process.env.SMTP_FROM}>`,
    to: process.env.QUOTE_RECIPIENT_EMAIL || process.env.SMTP_FROM,
    subject: `New Quote Request from ${data.name.replace(/[<>]/g, '')} - ${data.cupType} ${data.cupSize} (${reference})`,
    html: htmlContent,
  });

  // Send confirmation to customer
  const customerHtml = `
    <!DOCTYPE html>
    <html>
    <head>${emailStyles}</head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Quote Request Received</h1>
        </div>
        <div class="content">
          <p>Dear ${escapeHtml(data.name)},</p>
          <p>Thank you for your quote request! We have received your inquiry and our team will prepare a detailed quote for you.</p>

          <div class="reference">
            Your Reference Number: ${reference}
          </div>

          <h3>What happens next?</h3>
          <ul>
            <li>Our team will review your requirements</li>
            <li>You'll receive a detailed quote within 24 hours</li>
            <li>If you requested design support, our design team will reach out with options</li>
          </ul>

          <p>If you have any urgent questions, feel free to contact us directly.</p>

          <p>Best regards,<br>The Royal Pack Team</p>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} Royal Pack. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: `"Royal Pack" <${process.env.SMTP_FROM}>`,
    to: data.email,
    subject: `Quote Request Received - ${reference} | Royal Pack`,
    html: customerHtml,
  });
}

// Sample request email - to business
export async function sendSampleEmail(
  data: SampleFormData,
  reference: string
): Promise<void> {
  const transporter = createTransporter();

  const fullAddress = [
    data.addressLine1,
    data.addressLine2,
    data.city,
    data.state,
    data.postalCode,
    data.country,
  ].filter((s): s is string => Boolean(s)).map(s => escapeHtml(s)).join(', ');

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>${emailStyles}</head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Sample Request</h1>
        </div>
        <div class="content">
          <div class="reference">
            Reference: ${reference}
          </div>

          <div class="section">
            <h2>Contact Information</h2>
            <div class="field">
              <span class="field-label">Name:</span>
              <span class="field-value">${escapeHtml(data.name)}</span>
            </div>
            <div class="field">
              <span class="field-label">Email:</span>
              <span class="field-value"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></span>
            </div>
            <div class="field">
              <span class="field-label">Phone:</span>
              <span class="field-value"><a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a></span>
            </div>
            ${data.company ? `
            <div class="field">
              <span class="field-label">Company:</span>
              <span class="field-value">${escapeHtml(data.company)}</span>
            </div>
            ` : ''}
          </div>

          <div class="section">
            <h2>Shipping Address</h2>
            <div class="field">
              <span class="field-value">${escapeHtml(data.addressLine1)}</span>
            </div>
            ${data.addressLine2 ? `
            <div class="field">
              <span class="field-value">${escapeHtml(data.addressLine2)}</span>
            </div>
            ` : ''}
            <div class="field">
              <span class="field-value">${escapeHtml(data.city)}${data.state ? `, ${escapeHtml(data.state)}` : ''} ${data.postalCode ? escapeHtml(data.postalCode) : ''}</span>
            </div>
            <div class="field">
              <span class="field-value">${escapeHtml(data.country)}</span>
            </div>
          </div>

          <div class="section">
            <h2>Sample Preferences</h2>
            ${data.cupTypes && data.cupTypes.length > 0 ? `
            <div class="field">
              <span class="field-label">Cup Types:</span>
              <span class="field-value">${data.cupTypes.map(t => escapeHtml(t)).join(', ')}</span>
            </div>
            ` : ''}
            ${data.preferredSize ? `
            <div class="field">
              <span class="field-label">Preferred Size:</span>
              <span class="field-value">${escapeHtml(data.preferredSize)}</span>
            </div>
            ` : ''}
            ${data.message ? `
            <div class="field">
              <span class="field-label">Additional Notes:</span>
              <div class="field-value" style="margin-top: 5px; padding: 10px; background: #f5f5f5; border-radius: 4px;">${escapeHtml(data.message)}</div>
            </div>
            ` : ''}
          </div>
        </div>
        <div class="footer">
          <p>This sample request was submitted via the Royal Pack website.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  // Send to business
  await transporter.sendMail({
    from: `"Royal Pack Website" <${process.env.SMTP_FROM}>`,
    to: process.env.SAMPLE_RECIPIENT_EMAIL || process.env.QUOTE_RECIPIENT_EMAIL || process.env.SMTP_FROM,
    subject: `New Sample Request from ${data.name.replace(/[<>]/g, '')} - ${data.city}, ${data.country} (${reference})`,
    html: htmlContent,
  });

  // Send confirmation to customer
  const customerHtml = `
    <!DOCTYPE html>
    <html>
    <head>${emailStyles}</head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Sample Request Received</h1>
        </div>
        <div class="content">
          <p>Dear ${escapeHtml(data.name)},</p>
          <p>Thank you for requesting a sample kit! We have received your request and will prepare your samples shortly.</p>

          <div class="reference">
            Your Reference Number: ${reference}
          </div>

          <h3>Shipping Details</h3>
          <p>Your samples will be shipped to:</p>
          <p style="padding: 10px; background: #f5f5f5; border-radius: 4px;">
            ${fullAddress}
          </p>

          <h3>Expected Delivery</h3>
          <p>Your sample kit will be shipped within 3-5 business days.</p>

          <p>If you have any questions about your order, feel free to contact us.</p>

          <p>Best regards,<br>The Royal Pack Team</p>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} Royal Pack. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: `"Royal Pack" <${process.env.SMTP_FROM}>`,
    to: data.email,
    subject: `Sample Request Confirmed - ${reference} | Royal Pack`,
    html: customerHtml,
  });
}

// Contact email - to business
export async function sendContactEmail(
  data: ContactFormData,
  reference: string
): Promise<void> {
  const transporter = createTransporter();

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>${emailStyles}</head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Contact Message</h1>
        </div>
        <div class="content">
          <div class="reference">
            Reference: ${reference}
          </div>

          <div class="section">
            <h2>Contact Details</h2>
            <div class="field">
              <span class="field-label">Name:</span>
              <span class="field-value">${escapeHtml(data.name)}</span>
            </div>
            <div class="field">
              <span class="field-label">Email:</span>
              <span class="field-value"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></span>
            </div>
            ${data.phone ? `
            <div class="field">
              <span class="field-label">Phone:</span>
              <span class="field-value"><a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a></span>
            </div>
            ` : ''}
            <div class="field">
              <span class="field-label">Subject:</span>
              <span class="field-value">${escapeHtml(data.subject)}</span>
            </div>
          </div>

          <div class="section">
            <h2>Message</h2>
            <div style="padding: 15px; background: #f5f5f5; border-radius: 4px; white-space: pre-wrap;">
              ${escapeHtml(data.message)}
            </div>
          </div>
        </div>
        <div class="footer">
          <p>This message was submitted via the Royal Pack website contact form.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  // Send to business
  await transporter.sendMail({
    from: `"Royal Pack Website" <${process.env.SMTP_FROM}>`,
    to: process.env.CONTACT_RECIPIENT_EMAIL || process.env.QUOTE_RECIPIENT_EMAIL || process.env.SMTP_FROM,
    replyTo: data.email,
    subject: `[${data.subject}] Contact from ${data.name.replace(/[<>]/g, '')} (${reference})`,
    html: htmlContent,
  });

  // Send confirmation to customer
  const customerHtml = `
    <!DOCTYPE html>
    <html>
    <head>${emailStyles}</head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Message Received</h1>
        </div>
        <div class="content">
          <p>Dear ${escapeHtml(data.name)},</p>
          <p>Thank you for contacting Royal Pack! We have received your message and will respond within 24 hours.</p>

          <div class="reference">
            Your Reference Number: ${reference}
          </div>

          <h3>Your Message</h3>
          <p><strong>Subject:</strong> ${escapeHtml(data.subject)}</p>
          <div style="padding: 15px; background: #f5f5f5; border-radius: 4px; white-space: pre-wrap;">
            ${escapeHtml(data.message)}
          </div>

          <p style="margin-top: 20px;">If your matter is urgent, please don't hesitate to call us directly.</p>

          <p>Best regards,<br>The Royal Pack Team</p>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} Royal Pack. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: `"Royal Pack" <${process.env.SMTP_FROM}>`,
    to: data.email,
    subject: `We Received Your Message - ${reference} | Royal Pack`,
    html: customerHtml,
  });
}

