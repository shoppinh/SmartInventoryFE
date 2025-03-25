'use client';

import React, { useState, useEffect } from 'react';
import { Sidebar, MobileMenuButton } from './sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    // Initial check *after* mount
    checkIfMobile();
    
    // Add event listener
    window.addEventListener('resize', checkIfMobile);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []); // Empty dependency array: runs only on mount

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar 
        isMobile={isMobile} 
        isOpen={sidebarOpen} 
        toggleSidebar={toggleSidebar} 
      />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col h-full overflow-auto">
        {/* Header */}
        <header className="h-16 border-b px-4 flex items-center justify-between">
          <div className="flex items-center">
            <MobileMenuButton toggleSidebar={toggleSidebar} />
            <h1 className="ml-4 text-xl font-semibold lg:hidden" suppressHydrationWarning>Smart Inventory</h1>
          </div>
        </header>
        
        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
      
      {/* Mobile overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={toggleSidebar}
          suppressHydrationWarning
        />
      )}
    </div>
  );
}