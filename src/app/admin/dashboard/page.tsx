'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Image, HelpCircle, Plus, ArrowRight, Clock } from 'lucide-react';
import { AdminLayout } from '@/components/admin';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';

interface DashboardStats {
  galleryCount: number;
  faqCount: number;
  recentGallery: Array<{ id: string; title: string; createdAt: string }>;
  recentFaq: Array<{ id: string; question: string; createdAt: string }>;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchStats() {
      try {
        const [galleryRes, faqRes] = await Promise.all([
          fetch('/api/admin/gallery'),
          fetch('/api/admin/faq'),
        ]);

        if (!galleryRes.ok || !faqRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const galleryData = await galleryRes.json();
        const faqData = await faqRes.json();

        const galleryItems = galleryData.items || [];
        const faqItems = faqData.items || [];

        // Sort by createdAt and get recent items
        const sortedGallery = [...galleryItems]
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 5);

        const sortedFaq = [...faqItems]
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 5);

        setStats({
          galleryCount: galleryItems.length,
          faqCount: faqItems.length,
          recentGallery: sortedGallery.map((item: { id: string; title: string; createdAt: string }) => ({
            id: item.id,
            title: item.title,
            createdAt: item.createdAt,
          })),
          recentFaq: sortedFaq.map((item: { id: string; question: string; createdAt: string }) => ({
            id: item.id,
            question: item.question,
            createdAt: item.createdAt,
          })),
        });
      } catch (err) {
        console.error('Error fetching stats:', err);
        setError('Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    }

    fetchStats();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Welcome to the Royal Pack admin panel
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Spinner size="lg" />
          </div>
        ) : error ? (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
            {error}
          </div>
        ) : stats ? (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Gallery Stats */}
              <Card variant="bordered" padding="md">
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Gallery Items</p>
                      <p className="text-3xl font-bold text-gray-900 mt-1">
                        {stats.galleryCount}
                      </p>
                    </div>
                    <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Image className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button
                      asChild
                      size="sm"
                      variant="secondary"
                      leftIcon={<Plus className="h-4 w-4" />}
                    >
                      <Link href="/admin/gallery/new">Add New</Link>
                    </Button>
                    <Button
                      asChild
                      size="sm"
                      variant="ghost"
                      rightIcon={<ArrowRight className="h-4 w-4" />}
                    >
                      <Link href="/admin/gallery">View All</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ Stats */}
              <Card variant="bordered" padding="md">
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">FAQ Items</p>
                      <p className="text-3xl font-bold text-gray-900 mt-1">
                        {stats.faqCount}
                      </p>
                    </div>
                    <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <HelpCircle className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button
                      asChild
                      size="sm"
                      variant="secondary"
                      leftIcon={<Plus className="h-4 w-4" />}
                    >
                      <Link href="/admin/faq/new">Add New</Link>
                    </Button>
                    <Button
                      asChild
                      size="sm"
                      variant="ghost"
                      rightIcon={<ArrowRight className="h-4 w-4" />}
                    >
                      <Link href="/admin/faq">View All</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Gallery Items */}
              <Card variant="bordered" padding="none">
                <CardHeader className="px-6 py-4 border-b border-gray-200 mb-0">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-gray-400" />
                    <CardTitle>Recent Gallery Items</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  {stats.recentGallery.length > 0 ? (
                    <ul className="divide-y divide-gray-100">
                      {stats.recentGallery.map((item) => (
                        <li key={item.id}>
                          <Link
                            href={`/admin/gallery/${item.id}/edit`}
                            className="flex items-center justify-between px-6 py-3 hover:bg-gray-50 transition-colors"
                          >
                            <span className="text-sm font-medium text-gray-900 truncate">
                              {item.title}
                            </span>
                            <span className="text-xs text-gray-500">
                              {formatDate(item.createdAt)}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="px-6 py-4 text-sm text-gray-500">
                      No gallery items yet
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Recent FAQ Items */}
              <Card variant="bordered" padding="none">
                <CardHeader className="px-6 py-4 border-b border-gray-200 mb-0">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-gray-400" />
                    <CardTitle>Recent FAQ Items</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  {stats.recentFaq.length > 0 ? (
                    <ul className="divide-y divide-gray-100">
                      {stats.recentFaq.map((item) => (
                        <li key={item.id}>
                          <Link
                            href={`/admin/faq/${item.id}/edit`}
                            className="flex items-center justify-between px-6 py-3 hover:bg-gray-50 transition-colors"
                          >
                            <span className="text-sm font-medium text-gray-900 truncate max-w-[300px]">
                              {item.question}
                            </span>
                            <span className="text-xs text-gray-500">
                              {formatDate(item.createdAt)}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="px-6 py-4 text-sm text-gray-500">
                      No FAQ items yet
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Quick Links */}
            <Card variant="bordered" padding="md">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  <Button asChild variant="primary" leftIcon={<Plus className="h-4 w-4" />}>
                    <Link href="/admin/gallery/new">Add Gallery Item</Link>
                  </Button>
                  <Button asChild variant="primary" leftIcon={<Plus className="h-4 w-4" />}>
                    <Link href="/admin/faq/new">Add FAQ Item</Link>
                  </Button>
                  <Button asChild variant="secondary" leftIcon={<Image className="h-4 w-4" />}>
                    <Link href="/admin/gallery">Manage Gallery</Link>
                  </Button>
                  <Button asChild variant="secondary" leftIcon={<HelpCircle className="h-4 w-4" />}>
                    <Link href="/admin/faq">Manage FAQ</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        ) : null}
      </div>
    </AdminLayout>
  );
}
