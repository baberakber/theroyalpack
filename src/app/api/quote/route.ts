import { NextRequest, NextResponse } from 'next/server';
import { quoteFormSchema } from '@/lib/schemas/quote';
import { sendQuoteEmail } from '@/lib/email';
import { rateLimit, rateLimitConfigs } from '@/lib/rate-limit';
import { v4 as uuidv4 } from 'uuid';
import { validateFileContent, sanitizeFilename } from '@/lib/file-validation';

// Generate reference number
function generateReference(): string {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `Q${year}${month}${day}-${random}`;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitResult = await rateLimit(request, rateLimitConfigs.quote);
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

    // Parse form data
    const formData = await request.formData();
    const data: Record<string, unknown> = {};

    // Extract form fields
    formData.forEach((value, key) => {
      if (key === 'designFile') return; // Handle file separately

      // Convert string values to appropriate types
      if (key === 'quantity') {
        data[key] = parseInt(value as string, 10);
      } else if (key === 'ecoPreference' || key === 'consent') {
        data[key] = value === 'true';
      } else {
        data[key] = value;
      }
    });

    // Validate data
    const validationResult = quoteFormSchema.safeParse(data);

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

    // Handle file upload (if present)
    const designFile = formData.get('designFile') as File | null;
    let designFileUrl: string | undefined;

    if (designFile && designFile.size > 0) {
      // Validate file with magic byte checking
      const allowedTypes = [
        'image/jpeg',
        'image/png',
        'image/webp',
        'application/pdf',
        'application/postscript', // .ai files
        'image/vnd.adobe.photoshop',
      ];
      const maxSize = 10 * 1024 * 1024; // 10MB

      const fileValidation = await validateFileContent(designFile, allowedTypes, maxSize);
      if (!fileValidation.valid) {
        return NextResponse.json(
          { error: fileValidation.error || 'Invalid file' },
          { status: 400 }
        );
      }

      // Save file with UUID name and safe extension (never use user-provided filename)
      try {
        const fs = await import('fs/promises');
        const path = await import('path');

        const filename = sanitizeFilename(uuidv4(), fileValidation.safeExtension!);
        const uploadDir = path.join(process.cwd(), 'public/uploads/designs');

        await fs.mkdir(uploadDir, { recursive: true });
        const buffer = Buffer.from(await designFile.arrayBuffer());
        await fs.writeFile(path.join(uploadDir, filename), buffer);

        designFileUrl = `/uploads/designs/${filename}`;
      } catch (uploadError) {
        console.error('File upload error:', uploadError);
        // Continue without file - non-critical error
      }
    }

    // Generate reference number
    const reference = generateReference();

    // Send email notification
    try {
      await sendQuoteEmail(
        { ...validatedData, designFileUrl },
        reference
      );
    } catch (emailError) {
      console.error('Email send error:', emailError);
      // Don't fail the request if email fails - we have the data
    }

    // Return success response
    return NextResponse.json(
      {
        success: true,
        reference,
        message: 'Quote request submitted successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Quote submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit quote request. Please try again.' },
      { status: 500 }
    );
  }
}
