'use client';
import { type ReactNode } from 'react';
import ErrorBoundary from '@/app/components/ui/ErrorBoundary';

export default function ClientLayout({ children }: { children: ReactNode }) {
  return <ErrorBoundary>{children}</ErrorBoundary>;
}
