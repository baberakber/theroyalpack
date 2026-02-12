import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import {
  getGalleryItems,
  addGalleryItem,
  reorderGalleryItems,
} from '@/lib/data/gallery';
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { validateFileContent, sanitizeFilename } from '@/lib/file-validation';

// GET: List all gallery items
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const items = await getGalleryItems();
    return NextResponse.json({ items });
  } catch (error) {
    console.error('Error fetching gallery items:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gallery items' },
      { status: 500 }
    );
  }
}

// POST: Add new gallery item (with image upload)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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

    let imagePath = '';

    // Handle image upload
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

      // Save file
      const buffer = Buffer.from(await image.arrayBuffer());
      await fs.writeFile(path.join(uploadDir, filename), buffer);

      imagePath = `/gallery/${filename}`;
    } else {
      return NextResponse.json(
        { error: 'Image is required' },
        { status: 400 }
      );
    }

    // Get current items to determine order
    const currentItems = await getGalleryItems();
    const maxOrder = currentItems.reduce((max, item) => Math.max(max, item.order), 0);

    // Add gallery item
    const newItem = await addGalleryItem({
      src: imagePath,
      title,
      description: description || undefined,
      category,
      alt,
      order: maxOrder + 1,
    });

    return NextResponse.json({ item: newItem }, { status: 201 });
  } catch (error) {
    console.error('Error adding gallery item:', error);
    return NextResponse.json(
      { error: 'Failed to add gallery item' },
      { status: 500 }
    );
  }
}

// PATCH: Reorder gallery items
export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { orderedIds } = await request.json();

    if (!Array.isArray(orderedIds)) {
      return NextResponse.json(
        { error: 'orderedIds must be an array' },
        { status: 400 }
      );
    }

    await reorderGalleryItems(orderedIds);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error reordering gallery items:', error);
    return NextResponse.json(
      { error: 'Failed to reorder gallery items' },
      { status: 500 }
    );
  }
}
