# 16 — Admin Panel

> Basic password-protected admin panel for gallery and FAQ management.
> Uses NextAuth.js credentials provider with single admin user.

---

## 1. Overview

| Aspect | Detail |
|--------|--------|
| **Purpose** | Allow client to manage gallery images and FAQ entries without developer help |
| **Auth method** | NextAuth.js with credentials provider (email/password) |
| **Users** | Single admin user, credentials stored in `.env` |
| **Storage** | JSON files for data (or SQLite for future expansion) |
| **Routes prefix** | `/admin/*` |

---

## 2. Routes Structure

| Route | Page | Auth Required |
|-------|------|---------------|
| `/admin/login` | Login page | No |
| `/admin` | Dashboard (redirects to `/admin/dashboard`) | Yes |
| `/admin/dashboard` | Dashboard overview | Yes |
| `/admin/gallery` | Gallery management | Yes |
| `/admin/gallery/new` | Add new gallery image | Yes |
| `/admin/gallery/[id]/edit` | Edit gallery image | Yes |
| `/admin/faq` | FAQ management | Yes |
| `/admin/faq/new` | Add new FAQ | Yes |
| `/admin/faq/[id]/edit` | Edit FAQ | Yes |

---

## 3. Authentication

### 3.1 NextAuth.js Configuration

**File:** `src/app/api/auth/[...nextauth]/route.ts`

```tsx
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Admin Login',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

        if (credentials.email !== adminEmail) {
          return null;
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          adminPasswordHash!
        );

        if (!isValid) {
          return null;
        }

        return {
          id: '1',
          email: adminEmail,
          name: 'Admin',
        };
      },
    }),
  ],
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = 'admin';
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
```

### 3.2 Environment Variables

```env
# Admin credentials
ADMIN_EMAIL=admin@xerostopcups.com
ADMIN_PASSWORD_HASH=$2a$12$... # bcrypt hash of the password

# NextAuth
NEXTAUTH_SECRET=your-random-secret-key
NEXTAUTH_URL=https://www.xerostopcups.com
```

**Password hash generation:**
```bash
node -e "console.log(require('bcryptjs').hashSync('your-password', 12))"
```

### 3.3 Middleware Protection

**File:** `src/middleware.ts`

```tsx
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    // Additional checks if needed
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ['/admin/((?!login).*)'],
};
```

---

## 4. Login Page

**Route:** `/admin/login`
**File:** `src/app/admin/login/page.tsx`

### 4.1 Design

- **Layout:** Centered card on dark/muted background.
- **Card:** `color-bg-primary`, `radius-lg`, `shadow-xl`, max-width 400px.
- **Logo:** Xerostop logo at top.
- **Heading:** `"Admin Login"` — `text-h3`.

### 4.2 Form

| Field | Type | Label | Validation |
|-------|------|-------|------------|
| `email` | email | Email | required, valid email |
| `password` | password | Password | required, min 8 chars |

- **Submit:** `"Sign In"` — variant `primary`, full-width.
- **Error message:** Displayed above form if login fails.
- **Remember me:** Not needed (session lasts 24 hours).

### 4.3 Component

```tsx
'use client';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function AdminLoginPage() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/admin/dashboard';

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const result = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    });

    if (result?.error) {
      setError('Invalid email or password');
      setLoading(false);
    } else {
      router.push(callbackUrl);
    }
  }

  // ... render form
}
```

---

## 5. Dashboard

**Route:** `/admin/dashboard`
**File:** `src/app/admin/dashboard/page.tsx`

### 5.1 Layout

```
┌─────────────────────────────────────────────────┐
│ Admin Header (logo, user, logout)               │
├──────────────┬──────────────────────────────────┤
│              │                                  │
│  Sidebar     │    Main Content Area             │
│  - Dashboard │                                  │
│  - Gallery   │    Dashboard Stats               │
│  - FAQ       │    - Gallery items count         │
│              │    - FAQ count                   │
│              │    Quick Actions                 │
│              │    - Add Gallery Image           │
│              │    - Add FAQ                     │
│              │                                  │
└──────────────┴──────────────────────────────────┘
```

### 5.2 Admin Header

- Logo (links to dashboard).
- User email display.
- Logout button: `signOut()` from next-auth.

### 5.3 Sidebar

- Fixed on desktop, drawer on mobile.
- Links: Dashboard, Gallery, FAQ.
- Active state: `color-primary` bg, white text.

### 5.4 Dashboard Stats

Two stat cards:
- **Gallery:** `"X images"` with link to manage.
- **FAQ:** `"X questions"` with link to manage.

### 5.5 Quick Actions

- `"Add Gallery Image"` → `/admin/gallery/new`.
- `"Add FAQ"` → `/admin/faq/new`.

---

## 6. Gallery Management

### 6.1 Gallery List

**Route:** `/admin/gallery`

- **Layout:** Grid of image cards with actions.
- **Actions per card:**
  - Edit → `/admin/gallery/[id]/edit`
  - Delete (with confirmation modal)
  - Drag to reorder (optional, phase 2)
- **Add button:** `"Add Image"` → `/admin/gallery/new`.
- **Filter:** By category (same as front-end filters).

**Card Design:**
- Thumbnail image, 150×150, `object-cover`.
- Title below.
- Category tag.
- Edit/Delete icons.

### 6.2 Add/Edit Gallery Image

**Route:** `/admin/gallery/new` and `/admin/gallery/[id]/edit`

| Field | Type | Label | Validation |
|-------|------|-------|------------|
| `image` | file upload | Image | required (new), optional (edit) |
| `title` | text | Title | required, max 100 chars |
| `description` | textarea | Description | optional, max 500 chars |
| `category` | select | Category | required, from list |
| `alt` | text | Alt Text | required for accessibility |

**Categories:** cafes, restaurants, hotels, corporate, events, seasonal.

**Image Upload:**
- Preview shown after selection.
- Max size: 5MB.
- Formats: JPG, PNG, WebP.
- On save: image is optimized and saved to `public/gallery/`.

### 6.3 API Routes

**File:** `src/app/api/admin/gallery/route.ts`

```tsx
// GET: List all gallery items
// POST: Add new gallery item (multipart form data)

// Protected by middleware
```

**File:** `src/app/api/admin/gallery/[id]/route.ts`

```tsx
// GET: Get single gallery item
// PUT: Update gallery item
// DELETE: Delete gallery item
```

### 6.4 Data Storage

**Option A: JSON File (simpler)**

**File:** `src/data/gallery.json`

```json
{
  "items": [
    {
      "id": "uuid-1",
      "src": "/gallery/cafe-cup.jpg",
      "title": "Café Cup Design",
      "description": "Full-color print for local café",
      "category": "cafes",
      "alt": "Custom printed café cup",
      "order": 1,
      "createdAt": "2024-01-15T10:00:00Z"
    }
  ]
}
```

**Option B: SQLite (more robust)**

```sql
CREATE TABLE gallery (
  id TEXT PRIMARY KEY,
  src TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  alt TEXT NOT NULL,
  display_order INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

## 7. FAQ Management

### 7.1 FAQ List

**Route:** `/admin/faq`

- **Layout:** Table or list of questions.
- **Columns:** Question (truncated), Category, Actions.
- **Actions:** Edit, Delete.
- **Add button:** `"Add Question"` → `/admin/faq/new`.
- **Filter:** By category.
- **Reorder:** Drag-and-drop to set display order.

### 7.2 Add/Edit FAQ

**Route:** `/admin/faq/new` and `/admin/faq/[id]/edit`

| Field | Type | Label | Validation |
|-------|------|-------|------------|
| `question` | text | Question | required, max 200 chars |
| `answer` | textarea (rich text optional) | Answer | required, max 2000 chars |
| `category` | select | Category | required |

**Categories:** ordering, products, printing, delivery, design, sustainability.

### 7.3 API Routes

**File:** `src/app/api/admin/faq/route.ts`

```tsx
// GET: List all FAQ items
// POST: Add new FAQ item
```

**File:** `src/app/api/admin/faq/[id]/route.ts`

```tsx
// GET: Get single FAQ item
// PUT: Update FAQ item
// DELETE: Delete FAQ item
```

### 7.4 Data Storage

**File:** `src/data/faq.json`

```json
{
  "items": [
    {
      "id": "uuid-1",
      "question": "What is your minimum order quantity?",
      "answer": "Our minimum order is 1,000 pieces...",
      "category": "ordering",
      "order": 1,
      "createdAt": "2024-01-15T10:00:00Z"
    }
  ]
}
```

---

## 8. Component Structure

```
src/
├── app/
│   ├── admin/
│   │   ├── layout.tsx               # Admin layout with sidebar
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── gallery/
│   │   │   ├── page.tsx             # List
│   │   │   ├── new/
│   │   │   │   └── page.tsx         # Add
│   │   │   └── [id]/
│   │   │       └── edit/
│   │   │           └── page.tsx     # Edit
│   │   └── faq/
│   │       ├── page.tsx
│   │       ├── new/
│   │       │   └── page.tsx
│   │       └── [id]/
│   │           └── edit/
│   │               └── page.tsx
│   └── api/
│       ├── auth/
│       │   └── [...nextauth]/
│       │       └── route.ts
│       └── admin/
│           ├── gallery/
│           │   ├── route.ts
│           │   └── [id]/
│           │       └── route.ts
│           └── faq/
│               ├── route.ts
│               └── [id]/
│                   └── route.ts
├── components/
│   └── admin/
│       ├── AdminLayout.tsx
│       ├── AdminHeader.tsx
│       ├── AdminSidebar.tsx
│       ├── GalleryList.tsx
│       ├── GalleryForm.tsx
│       ├── FaqList.tsx
│       ├── FaqForm.tsx
│       ├── ConfirmDialog.tsx
│       └── ImageUpload.tsx
├── lib/
│   ├── auth.ts                      # NextAuth helpers
│   └── data/
│       ├── gallery.ts               # Gallery CRUD functions
│       └── faq.ts                   # FAQ CRUD functions
└── data/
    ├── gallery.json
    └── faq.json
```

---

## 9. Security

### 9.1 Authentication

- Session-based JWT via NextAuth.js.
- 24-hour session expiry.
- Password hashed with bcrypt (cost 12).

### 9.2 API Protection

- All `/api/admin/*` routes check for valid session.
- Middleware blocks unauthenticated requests.

```tsx
// In API route
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }
  // ... proceed
}
```

### 9.3 CSRF Protection

- NextAuth.js handles CSRF for auth endpoints.
- For custom API routes, validate origin header.

### 9.4 File Upload Security

- Validate file type by magic bytes.
- Limit file size (5MB).
- Sanitize filenames (UUID-based naming).
- Store in `public/gallery/` with non-executable permissions.

### 9.5 Input Validation

- All inputs validated with Zod on server.
- Escape HTML in FAQ answers if not using rich text.

---

## 10. Admin UI Design

### 10.1 Color Scheme

- Uses same design tokens as main site.
- Sidebar: `color-bg-secondary`.
- Active nav: `color-primary` bg.
- Cards: `color-bg-primary`, `shadow-sm`.

### 10.2 Typography

- Same font family (Inter).
- Headings: `text-h3`, `text-h4`.
- Body: `text-body`.

### 10.3 Responsive

- Desktop: Sidebar fixed, 240px width.
- Tablet: Sidebar collapsible.
- Mobile: Sidebar as drawer (hamburger menu).

---

## 11. Data Management Functions

**File:** `src/lib/data/gallery.ts`

```tsx
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const DATA_FILE = path.join(process.cwd(), 'src/data/gallery.json');

interface GalleryItem {
  id: string;
  src: string;
  title: string;
  description?: string;
  category: string;
  alt: string;
  order: number;
  createdAt: string;
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  const data = await fs.readFile(DATA_FILE, 'utf-8');
  return JSON.parse(data).items;
}

export async function addGalleryItem(item: Omit<GalleryItem, 'id' | 'createdAt'>): Promise<GalleryItem> {
  const items = await getGalleryItems();
  const newItem: GalleryItem = {
    ...item,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
  };
  items.push(newItem);
  await fs.writeFile(DATA_FILE, JSON.stringify({ items }, null, 2));
  return newItem;
}

export async function updateGalleryItem(id: string, updates: Partial<GalleryItem>): Promise<GalleryItem | null> {
  const items = await getGalleryItems();
  const index = items.findIndex(item => item.id === id);
  if (index === -1) return null;
  items[index] = { ...items[index], ...updates };
  await fs.writeFile(DATA_FILE, JSON.stringify({ items }, null, 2));
  return items[index];
}

export async function deleteGalleryItem(id: string): Promise<boolean> {
  const items = await getGalleryItems();
  const filtered = items.filter(item => item.id !== id);
  if (filtered.length === items.length) return false;
  await fs.writeFile(DATA_FILE, JSON.stringify({ items: filtered }, null, 2));
  return true;
}
```

---

## 12. Future Enhancements (Out of Scope)

- Multiple admin users with role-based access.
- Rich text editor for FAQ answers.
- Image cropping/editing.
- Audit log of changes.
- Scheduled publishing.
- Backup/restore functionality.
