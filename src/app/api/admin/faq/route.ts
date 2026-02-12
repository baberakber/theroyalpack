import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getFaqItems, addFaqItem, reorderFaqItems } from '@/lib/data/faq';

// GET: List all FAQ items
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const items = await getFaqItems();
    return NextResponse.json({ items });
  } catch (error) {
    console.error('Error fetching FAQ items:', error);
    return NextResponse.json(
      { error: 'Failed to fetch FAQ items' },
      { status: 500 }
    );
  }
}

// POST: Add new FAQ item
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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

    // Get current items to determine order
    const currentItems = await getFaqItems();
    const maxOrder = currentItems.reduce((max, item) => Math.max(max, item.order), 0);

    // Add FAQ item
    const newItem = await addFaqItem({
      question,
      answer,
      category,
      order: maxOrder + 1,
    });

    return NextResponse.json({ item: newItem }, { status: 201 });
  } catch (error) {
    console.error('Error adding FAQ item:', error);
    return NextResponse.json(
      { error: 'Failed to add FAQ item' },
      { status: 500 }
    );
  }
}

// PATCH: Reorder FAQ items
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

    await reorderFaqItems(orderedIds);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error reordering FAQ items:', error);
    return NextResponse.json(
      { error: 'Failed to reorder FAQ items' },
      { status: 500 }
    );
  }
}
