'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Save, AlertCircle } from 'lucide-react';
import { AdminLayout } from '@/components/admin';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { FileUpload } from '@/components/forms/FileUpload';
import { Spinner } from '@/components/ui/Spinner';
import { GALLERY_CATEGORIES } from '@/lib/data/gallery-categories';

interface GalleryItem {
  id: string;
  src: string;
  title: string;
  description?: string;
  category: string;
  alt: string;
  order: number;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditGalleryItemPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [currentImage, setCurrentImage] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    alt: '',
  });

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await fetch(`/api/admin/gallery/${id}`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        const item: GalleryItem = data.item;

        setFormData({
          title: item.title,
          description: item.description || '',
          category: item.category,
          alt: item.alt,
        });
        setCurrentImage(item.src);
      } catch (err) {
        console.error('Error fetching gallery item:', err);
        setError('Failed to load gallery item');
      } finally {
        setIsLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.title || !formData.category || !formData.alt) {
      setError('Title, category, and alt text are required');
      return;
    }

    setIsSubmitting(true);

    try {
      const submitData = new FormData();
      submitData.append('title', formData.title);
      submitData.append('description', formData.description);
      submitData.append('category', formData.category);
      submitData.append('alt', formData.alt);

      if (imageFile) {
        submitData.append('image', imageFile);
      }

      const res = await fetch(`/api/admin/gallery/${id}`, {
        method: 'PUT',
        body: submitData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to update item');
      }

      router.push('/admin/gallery');
    } catch (err) {
      console.error('Error updating gallery item:', err);
      setError(err instanceof Error ? err.message : 'Failed to update item');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex justify-center py-12">
          <Spinner size="lg" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        {/* Page Header */}
        <div className="mb-8">
          <Link
            href="/admin/gallery"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Gallery
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Edit Gallery Item</h1>
          <p className="text-gray-600 mt-1">
            Update the gallery item details
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Current Image */}
          {currentImage && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Image
              </label>
              <div className="relative w-48 h-48 rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={currentImage}
                  alt={formData.alt || 'Current image'}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}

          {/* New Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Replace Image (Optional)
            </label>
            <FileUpload
              onFileSelect={setImageFile}
              disabled={isSubmitting}
            />
            {imageFile && (
              <p className="mt-2 text-sm text-green-600">
                New image selected: {imageFile.name}
              </p>
            )}
          </div>

          {/* Title */}
          <Input
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="e.g., Custom Cafe Cups"
            maxLength={100}
            required
          />

          {/* Alt Text */}
          <Input
            label="Alt Text"
            name="alt"
            value={formData.alt}
            onChange={handleInputChange}
            placeholder="Describe the image for accessibility"
            helperText="This text is used by screen readers and for SEO"
            required
          />

          {/* Category */}
          <Select
            label="Category"
            value={formData.category}
            onChange={(e) => handleCategoryChange(e.target.value)}
            options={GALLERY_CATEGORIES.map((cat) => ({
              value: cat.value,
              label: cat.label,
            }))}
            placeholder="Select a category"
            required
          />

          {/* Description */}
          <Textarea
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Optional description for the gallery item"
            maxLength={500}
            rows={3}
          />

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <Button
              type="button"
              variant="secondary"
              onClick={() => router.push('/admin/gallery')}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={isSubmitting}
              leftIcon={<Save className="h-4 w-4" />}
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
