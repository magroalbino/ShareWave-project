'use client';

import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { PlusCircle } from 'lucide-react';

export default function AppHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/95 backdrop-blur-sm px-4 md:px-8">
      <SidebarTrigger className="md:hidden" />
      <div className="flex-1">
        <h1 className="text-2xl font-bold font-headline tracking-tight">Dashboard</h1>
      </div>
      <Button>
        <PlusCircle className="mr-2 h-4 w-4" />
        New Connection
      </Button>
    </header>
  );
}
