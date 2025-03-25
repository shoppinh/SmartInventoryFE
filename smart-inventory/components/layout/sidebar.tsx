import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  Settings,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isMobile: boolean;
  isOpen: boolean;
  toggleSidebar: () => void;
}

export function Sidebar({ isMobile, isOpen, toggleSidebar }: SidebarProps) {
  const pathname = usePathname();

  const navItems = [
    {
      name: 'Dashboard',
      href: '/',
      icon: LayoutDashboard
    },
    {
      name: 'Items',
      href: '/items',
      icon: Package
    },
    {
      name: 'Orders',
      href: '/orders',
      icon: ShoppingBag
    },
    {
      name: 'Suppliers',
      href: '/suppliers',
      icon: Users
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: Settings
    },
  ];

  if (isMobile && !isOpen) return null;

  return (
    <div className={cn(
      "flex flex-col h-full bg-secondary text-secondary-foreground w-64 p-4 transition-all duration-300 ease-in-out",
      isMobile && isOpen ? "fixed inset-y-0 left-0 z-50" : "",
      isMobile && !isOpen ? "hidden" : ""
    )}>
      <div className="flex items-center justify-between mb-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-primary rounded-md p-1">
            <Package size={24} className="text-white" />
          </div>
          <h1 className="text-xl font-bold">Smart Inventory</h1>
        </Link>
        {isMobile && (
          <button onClick={toggleSidebar} className="p-1">
            <X size={24} />
          </button>
        )}
      </div>
      
      <nav className="flex-1">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link 
                href={item.href}
                className={cn(
                  "flex items-center gap-4 px-4 py-3 rounded-md hover:bg-secondary-foreground/10 transition-colors",
                  pathname === item.href ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""
                )}
              >
                <item.icon size={20} />
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="mt-auto pt-4 border-t border-secondary-foreground/20">
        <div className="flex items-center gap-3 px-4 py-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
            A
          </div>
          <div>
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-secondary-foreground/70">admin@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MobileMenuButton({ toggleSidebar }: { toggleSidebar: () => void }) {
  return (
    <button 
      onClick={toggleSidebar}
      className="lg:hidden p-2 rounded-md hover:bg-secondary/80"
    >
      <Menu size={24} />
    </button>
  );
} 