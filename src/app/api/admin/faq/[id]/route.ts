import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getFaqItem, updateFaqItem, deleteFaqItem } from '@/lib/data/faq';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET: Get single FAQ item
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const item = await getFaqItem(id);

    if (!item) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json({ item });
  } catch (error) {
    console.error('Error fetching FAQ item:', error);
    return NextResponse.json(
      { error: 'Failed to fetch FAQ item' },
      { status: 500 }
    );
  }
}

// PUT: Update FAQ item
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const existingItem = await getFaqItem(id);

    if (!existingItem) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    const body = await request.json();
    const { question, answer, category } = body;

    // Validation
    if (!question || !answer || !category) {
      return NextResponse.json(
        { error: 'Question, answer, and category are required' },
        { status: 400 }
      );
    }

    if (question.length > 200) {
      return NextResponse.json(
        { error: 'Question must be 200 characters or less' },
        { status: 400 }
      );
    }

    if (answer.length > 2000) {
      return NextResponse.json(
        { error: 'Answer must be 2000 characters or less' },
        { status: 400 }
      );
    }

    // Update FAQ item
    const updatedItem = await updateFaqItem(id, {
      question,
      answer,
      category,
    });

    return NextResponse.json({ item: updatedItem });
  } catch (error) {
    console.error('Error updating FAQ item:', error);
    return NextResponse.json(
      { error: 'Failed to update FAQ item' },
      { status: 500 }
    );
  }
}

// DELETE: Delete FAQ item
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const existingItem = await getFaqItem(id);

    if (!existingItem) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    const deleted = await deleteFaqItem(id);

    if (!deleted) {
      return NextResponse.json(
        { error: 'Failed to delete item' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting FAQ item:', error);
    return NextResponse.json(
      { error: 'Failed to delete FAQ item' },
      { status: 500 }
    );
  }
}
