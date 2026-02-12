'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, AlertCircle } from 'lucide-react';
import { AdminLayout } from '@/components/admin';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { FAQ_CATEGORIES } from '@/lib/data/faq-categories';

export default function NewFaqItemPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: '',
  });

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
    if (!formData.question || !formData.answer || !formData.category) {
      setError('Question, answer, and category are required');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/admin/faq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to create item');
      }

      router.push('/admin/faq');
    } catch (err) {
      console.error('Error creating FAQ item:', err);
      setError(err instanceof Error ? err.message : 'Failed to create item');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        {/* Page Header */}
        <div className="mb-8">
          <Link
            href="/admin/faq"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to FAQ
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Add New Question</h1>
          <p className="text-gray-600 mt-1">
            Create a new frequently asked question
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Question */}
          <Input
            label="Question"
            name="question"
            value={formData.question}
            onChange={handleInputChange}
            placeholder="e.g., What is your minimum order quantity?"
            maxLength={200}
            required
          />

          {/* Category */}
          <Select
            label="Category"
            value={formData.category}
            onChange={(e) => handleCategoryChange(e.target.value)}
            options={FAQ_CATEGORIES.map((cat) => ({
              value: cat.value,
              label: cat.label,
            }))}
            placeholder="Select a category"
            required
          />

          {/* Answer */}
          <div>
            <Textarea
              label="Answer"
              name="answer"
              value={formData.answer}
              onChange={handleInputChange}
              placeholder="Provide a helpful answer to the question"
              maxLength={2000}
              rows={6}
              required
            />
            <p className="mt-1 text-xs text-gray-500 text-right">
              {formData.answer.length} / 2000
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <Button
              type="button"
              variant="secondary"
              onClick={() => router.push('/admin/faq')}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={isSubmitting}
              leftIcon={<Save className="h-4 w-4" />}
            >
              {isSubmitting ? 'Saving...' : 'Save Question'}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
