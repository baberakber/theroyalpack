import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import {
  getGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
} from '@/lib/data/gallery';
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { validateFileContent, sanitizeFilename } from '@/lib/file-validation';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET: Get single gallery item
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const item = await getGalleryItem(id);

    if (!item) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json({ item });
  } catch (error) {
    console.error('Error fetching gallery item:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gallery item' },
      { status: 500 }
    );
  }
}

// PUT: Update gallery item
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const existingItem = await getGalleryItem(id);

    if (!existingItem) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    const formData = await request.formData();
    const image = formData.get('image') as File | null;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;
    const alt = formData.get('alt') as string;

    // Validation
    if (!title || !category || !alt) {
      return NextResponse.json(
        { error: 'Title, category, and alt text are required' },
        { status: 400 }
      );
    }

    if (title.length > 100) {
      return NextResponse.json(
        { error: 'Title must be 100 characters or less' },
        { status: 400 }
      );
    }

    if (description && description.length > 500) {
      return NextResponse.json(
        { error: 'Description must be 500 characters or less' },
        { status: 400 }
      );
    }

    let imagePath = existingItem.src;

    // Handle new image upload
    if (image && image.size > 0) {
      // Validate file with magic byte checking
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      const fileValidation = await validateFileContent(image, allowedTypes, maxSize);
      if (!fileValidation.valid) {
        return NextResponse.json(
          { error: fileValidation.error || 'Invalid image file' },
          { status: 400 }
        );
      }

      // Generate unique filename with safe extension
      const filename = sanitizeFilename(uuidv4(), fileValidation.safeExtension!);
      const uploadDir = path.join(process.cwd(), 'public/gallery');

      // Ensure upload directory exists
      await fs.mkdir(uploadDir, { recursive: true });

      // Save new file
      const buffer = Buffer.from(await image.arrayBuffer());
      await fs.writeFile(path.join(uploadDir, filename), buffer);

      // Delete old file if it exists
      if (existingItem.src) {
        const oldFilePath = path.join(process.cwd(), 'public', existingItem.src);
        try {
          await fs.unlink(oldFilePath);
        } catch {
          // File might not exist, ignore
        }
      }

      imagePath = `/gallery/${filename}`;
    }

    // Update gallery item
    const updatedItem = await updateGalleryItem(id, {
      src: imagePath,
      title,
      description: description || undefined,
      category,
      alt,
    });

    return NextResponse.json({ item: updatedItem });
  } catch (error) {
    console.error('Error updating gallery item:', error);
    return NextResponse.json(
      { error: 'Failed to update gallery item' },
      { status: 500 }
    );
  }
}

// DELETE: Delete gallery item
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const existingItem = await getGalleryItem(id);

    if (!existingItem) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    // Delete the image file if it exists
    if (existingItem.src) {
      const filePath = path.join(process.cwd(), 'public', existingItem.src);
      try {
        await fs.unlink(filePath);
      } catch {
        // File might not exist, continue with deletion
      }
    }

    const deleted = await deleteGalleryItem(id);

    if (!deleted) {
      return NextResponse.json(
        { error: 'Failed to delete item' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting gallery item:', error);
    return NextResponse.json(
      { error: 'Failed to delete gallery item' },
      { status: 500 }
    );
  }
}
