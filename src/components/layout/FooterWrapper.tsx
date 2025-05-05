'use client';

import { usePathname } from 'next/navigation';
import Footer from '@/components/layout/Footer';

export default function FooterWrapper() {
  const pathname = usePathname();
  const noFooterRoutes = ['/scenes'];

  const shouldHideFooter = noFooterRoutes.some(route => pathname.startsWith(route));

  if (shouldHideFooter) return null;

  return <Footer />;
}