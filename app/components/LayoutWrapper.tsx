'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import Partners from './Partners';

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isPrivacyPage = pathname === '/privacy';

  if (isPrivacyPage) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      {children}
      <Partners />
      <Footer />
    </>
  );
}

