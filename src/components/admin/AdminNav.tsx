'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Image,
  HelpCircle,
  ArrowLeft,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    href: '/admin/dashboard',
    label: 'Dashboard',
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    href: '/admin/gallery',
    label: 'Gallery',
    icon: <Image className="h-5 w-5" />,
  },
  {
    href: '/admin/faq',
    label: 'FAQ',
    icon: <HelpCircle className="h-5 w-5" />,
  },
];

export function AdminNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/admin/dashboard') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="flex-1 px-4 py-6 space-y-2">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
            isActive(item.href)
              ? 'bg-primary-600 text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white'
          )}
        >
          {item.icon}
          <span className="font-medium">{item.label}</span>
        </Link>
      ))}

      <div className="pt-6 mt-6 border-t border-gray-700">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="font-medium">Back to Site</span>
        </Link>
      </div>
    </nav>
  );
}
