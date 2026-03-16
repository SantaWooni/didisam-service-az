'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  BookOpen,
  PlusSquare,
  Package,
  FileVideo,
  Users,
  MessageSquare,
  BarChart2,
  Headphones,
  Palette,
  Globe,
  Settings,
} from 'lucide-react';

const navItems = [
  {
    label: '홈',
    href: '/',
    icon: Home,
  },
  {
    label: '클래스 관리',
    href: '/class/manage',
    icon: BookOpen,
  },
  {
    label: '클래스 만들기',
    href: '/class/create',
    icon: PlusSquare,
  },
  {
    label: '교재/교구',
    href: '/materials',
    icon: Package,
  },
  {
    label: '콘텐츠',
    href: '/contents',
    icon: FileVideo,
  },
  {
    label: '회원',
    href: '/members',
    icon: Users,
  },
  {
    label: '메시지',
    href: '/messages',
    icon: MessageSquare,
  },
  {
    label: '매출 관리',
    href: '/sales',
    icon: BarChart2,
  },
  {
    label: '상담',
    href: '/consulting',
    icon: Headphones,
  },
  {
    label: '디자인',
    href: '/design',
    icon: Palette,
  },
  {
    label: '커뮤니티',
    href: '/community',
    icon: Globe,
  },
  {
    label: '설정',
    href: '/settings',
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-60 flex-col bg-gray-900 text-white">
      <div className="flex h-16 items-center justify-center border-b border-gray-700">
        <span className="text-xl font-bold tracking-wide">Didisam</span>
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
