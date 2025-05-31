
import type { Metadata } from 'next';
import './globals.css';
import { AppLayout } from '@/components/layout/AppLayout';
import { Toaster } from "@/components/ui/toaster";
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'VenueVerse',
  description: 'Manage your events seamlessly with VenueVerse.',
};

// Check if the current path is for the public-facing site
function isPublicPath(pathname: string | null): boolean {
  return pathname?.startsWith('/browse-events') || false;
}

export default function RootLayout({
  children,
  // Next.js 13+ App Router passes params which can include pathname.
  // However, to get pathname reliably here, we'd need to use headers() from next/headers in a Server Component.
  // For simplicity in this prototyping phase, we'll apply a general body class and assume AppLayout handles its own conditional rendering if needed.
  // A more robust way would involve different layouts or a conditional layout component.
}: Readonly<{
  children: React.ReactNode;
}>) {

  // This is a simplified way for prototyping. In a real app, you might have:
  // 1. Different RootLayouts for admin vs public.
  // 2. A conditional within RootLayout using `headers()` from `next/headers` to get the pathname.
  // For now, we'll assume AppLayout is for admin, and public pages like /browse-events will not use it directly,
  // or AppLayout itself could become conditional (more complex for now).
  // The /browse-events page creates its own full-page structure.

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        {/* 
          This logic is a bit tricky in RootLayout without direct access to pathname on server side easily.
          The simplest approach for prototyping is to let /browse-events define its own full layout structure
          and ensure AppLayout is primarily used by the admin routes.
          If AppLayout wraps everything, it needs to be smart enough to not render sidebar/header on public pages.
          For now, I'll assume `/browse-events/page.tsx` defines its own layout and doesn't get AppLayout.
          This will be handled by Next.js routing: if /browse-events does not have its own layout.tsx, it inherits this one.
          So, AppLayout should be smart.
        */}
        <ConditionalAppLayout>
          {children}
        </ConditionalAppLayout>
        <Toaster />
      </body>
    </html>
  );
}

// A new component to conditionally apply AppLayout
// This would ideally use `usePathname` but that's client-side.
// For server-side, we need `headers()` from `next/headers`
import { headers } from 'next/headers';

function ConditionalAppLayout({ children }: { children: React.ReactNode }) {
  const heads = headers();
  const pathname = heads.get('next-url'); // next-url should contain the path

  if (isPublicPath(pathname)) {
    // For public paths, just render children without the admin AppLayout
    return <>{children}</>;
  }
  // For admin paths, wrap with AppLayout
  return <AppLayout>{children}</AppLayout>;
}
