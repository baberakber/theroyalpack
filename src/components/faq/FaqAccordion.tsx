'use client';

import { useState, useMemo, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/Accordion';
import { CategoryTabs } from './CategoryTabs';
import { cn } from '@/lib/utils';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
  className?: string;
}

const CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'ordering', label: 'Ordering' },
  { key: 'products', label: 'Products' },
  { key: 'printing', label: 'Printing' },
  { key: 'delivery', label: 'Delivery' },
  { key: 'design', label: 'Design' },
  { key: 'sustainability', label: 'Sustainability' },
];

export function FaqAccordion({ items, className }: FaqAccordionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Handle URL hash for deep linking
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && CATEGORIES.some((cat) => cat.key === hash)) {
      setActiveCategory(hash);
    }
  }, []);

  // Filter items based on search and category
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory =
        activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch =
        searchQuery === '' ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [items, activeCategory, searchQuery]);

  // Get categories that have questions
  const availableCategories = useMemo(() => {
    const categoriesWithItems = new Set(items.map((item) => item.category));
    return CATEGORIES.filter(
      (cat) => cat.key === 'all' || categoriesWithItems.has(cat.key)
    );
  }, [items]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    // Update URL hash
    window.history.replaceState(null, '', category === 'all' ? '#' : `#${category}`);
  };

  return (
    <div className={cn('', className)}>
      {/* Search input */}
      <div className="max-w-md mx-auto mb-6">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted"
            aria-hidden="true"
          />
          <Input
            type="search"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            aria-label="Search frequently asked questions"
          />
        </div>
      </div>

      {/* Category tabs */}
      <CategoryTabs
        categories={availableCategories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        className="mb-6"
      />

      {/* FAQ accordion */}
      <div
        role="tabpanel"
        id={`tabpanel-${activeCategory}`}
        aria-labelledby={`tab-${activeCategory}`}
        className="max-w-3xl mx-auto"
      >
        {filteredItems.length > 0 ? (
          <Accordion className="divide-y divide-border-light">
            {filteredItems.map((item) => (
              <AccordionItem key={item.id} id={item.id}>
                <AccordionTrigger id={item.id} className="text-left py-4">
                  <span className="text-base lg:text-lg font-medium pr-4">
                    {item.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent id={item.id} className="pb-4">
                  <p className="text-text-secondary leading-relaxed">
                    {item.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="text-center py-12">
            <p className="text-text-secondary">
              No questions found for &quot;{searchQuery}&quot;. Try a different
              search or{' '}
              <a href="/contact" className="text-primary-600 hover:underline">
                contact us
              </a>
              .
            </p>
          </div>
        )}
      </div>

      {/* Screen reader announcement for filter changes */}
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {filteredItems.length} questions found
      </div>
    </div>
  );
}
