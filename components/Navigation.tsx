'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Wrench, TrendingUp, Trophy, ShoppingBag, Box } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/maintenance', label: 'Upgrades', icon: Wrench },
  { href: '/mileage', label: 'Journey', icon: TrendingUp },
  { href: '/achievements', label: 'Shrines', icon: Trophy },
  { href: '/gear', label: 'Inventory', icon: ShoppingBag },
  { href: '/bike', label: 'Cycle', icon: Box },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-slate-blue border-t-2 border-sheikah-blue z-50 md:top-0 md:bottom-auto md:border-t-0 md:border-b-2 shadow-lg backdrop-blur-sm bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-around md:justify-center md:space-x-8 py-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col md:flex-row items-center gap-1 md:gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                  isActive
                    ? 'text-sheikah-blue sheikah-glow bg-deep-blue'
                    : 'text-aged-paper hover:text-sheikah-blue hover:bg-deep-blue/50'
                }`}
              >
                <Icon size={20} />
                <span className="text-xs md:text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

