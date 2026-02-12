'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Pencil, Trash2, AlertCircle } from 'lucide-react';
import { AdminLayout } from '@/components/admin';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';
import { Badge } from '@/components/ui/Badge';

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

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/admin/gallery');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setItems(data.items || []);
    } catch (err) {
      console.error('Error fetching gallery:', err);
      setError('Failed to load gallery items');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (id: string) => {
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/gallery/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete');

      setItems(items.filter((item) => item.id !== id));
      setDeleteId(null);
    } catch (err) {
      console.error('Error deleting item:', err);
      setError('Failed to delete item');
    } finally {
      setIsDeleting(false);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, 'default' | 'primary' | 'success' | 'warning' | 'error'> = {
      cafes: 'primary',
      restaurants: 'success',
      hotels: 'warning',
      corporate: 'default',
      seasonal: 'error',
      events: 'primary',
    };
    return colors[category] || 'default';
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Gallery</h1>
            <p className="text-gray-600 mt-1">
              Manage your gallery items
            </p>
          </div>
          <Button asChild leftIcon={<Plus className="h-4 w-4" />}>
            <Link href="/admin/gallery/new">Add New Item</Link>
          </Button>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Spinner size="lg" />
          </div>
        ) : items.length === 0 ? (
          <Card variant="bordered" padding="lg">
            <CardContent className="text-center py-12">
              <p className="text-gray-500 mb-4">No gallery items yet</p>
              <Button asChild leftIcon={<Plus className="h-4 w-4" />}>
                <Link href="/admin/gallery/new">Add Your First Item</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Image
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {items
                    .sort((a, b) => a.order - b.order)
                    .map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="h-12 w-12 relative rounded-lg overflow-hidden bg-gray-100">
                            <Image
                              src={item.src}
                              alt={item.alt}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            {item.title}
                          </div>
                          {item.description && (
                            <div className="text-sm text-gray-500 truncate max-w-xs">
                              {item.description}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant={getCategoryColor(item.category)}>
                            {item.category}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.order}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              asChild
                              variant="ghost"
                              size="sm"
                              leftIcon={<Pencil className="h-4 w-4" />}
                            >
                              <Link href={`/admin/gallery/${item.id}/edit`}>
                                Edit
                              </Link>
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setDeleteId(item.id)}
                              leftIcon={<Trash2 className="h-4 w-4 text-red-500" />}
                              className="text-red-500 hover:text-red-600 hover:bg-red-50"
                            >
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-xl">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Delete Item
              </h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this gallery item? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <Button
                  variant="secondary"
                  onClick={() => setDeleteId(null)}
                  disabled={isDeleting}
                >
                  Cancel
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(deleteId)}
                  isLoading={isDeleting}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
