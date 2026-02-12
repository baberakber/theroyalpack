import { NextRequest, NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/schemas/contact';
import { sendContactEmail } from '@/lib/email';
import { rateLimit, rateLimitConfigs } from '@/lib/rate-limit';

// Generate reference number
function generateReference(): string {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `C${year}${month}${day}-${random}`;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitResult = await rateLimit(request, rateLimitConfigs.contact);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          error: 'Too many requests. Please try again later.',
          retryAfter: Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000),
        },
        {
          status: 429,
          headers: {
            'Retry-After': Math.ceil(
              (rateLimitResult.resetTime - Date.now()) / 1000
            ).toString(),
          },
        }
      );
    }

    // Parse JSON body
    const body = await request.json();

    // Validate data
    const validationResult = contactFormSchema.safeParse(body);

    if (!validationResult.success) {
      const errors = validationResult.error.flatten();
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: errors.fieldErrors,
        },
        { status: 400 }
      );
    }

    const validatedData = validationResult.data;

    // Generate reference number
    const reference = generateReference();

    // Send email notification
    try {
      await sendContactEmail(validatedData, reference);
    } catch (emailError) {
      console.error('Email send error:', emailError);
      // Don't fail the request if email fails - we have the data
    }

    // Return success response
    return NextResponse.json(
      {
        success: true,
        reference,
        message: 'Message sent successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact submission error:', error);

    // Check for JSON parse error
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}
