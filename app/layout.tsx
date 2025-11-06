import type { Metadata } from 'next';
import { Geist, Geist_Mono, Inter } from 'next/font/google';
import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Partners from './components/Partners';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

// Agregar Inter con next/font
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Elite Sports Management',
  description:
    'The first racquet sport agency in the U.S. Empowering athletes, inspiring partnerships.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='overflow-x-hidden'>
      {/* Preconnect a Google Fonts para cargar más rápido */}
      <link rel='preconnect' href='https://fonts.googleapis.com' />
      <link
        rel='preconnect'
        href='https://fonts.gstatic.com'
        crossOrigin='anonymous'
      />

      <link
        rel='apple-touch-icon'
        sizes='180x180'
        href='/apple-touch-icon.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='32x32'
        href='/favicon-32x32.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='16x16'
        href='/favicon-16x16.png'
      />
      <link rel='manifest' href='/site.webmanifest' />

      {/* Preload de fuentes de Google Fonts importadas vía CSS */}
      <link
        rel='preload'
        href='https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap'
        as='style'
      />

      {/* Preload de imágenes críticas */}
      <link
        rel='preload'
        href='/hero.webp'
        as='image'
        type='image/webp'
        fetchPriority='high'
      />
      <link rel='preload' href='/isotipo.svg' as='image' type='image/svg+xml' />
      <link
        rel='preload'
        href='/eliteLogo.svg'
        as='image'
        type='image/svg+xml'
      />
      <link rel='preload' href='/about-2.webp' as='image' type='image/webp' />
      <link rel='preload' href='/about-3.webp' as='image' type='image/webp' />
      <link rel='preload' href='/frase.webp' as='image' type='image/webp' />
      <link
        rel='preload'
        href='/athleteshero.webp'
        as='image'
        type='image/webp'
      />
      <link rel='preload' href='/elitelogo.webp' as='image' type='image/webp' />
      <link rel='preload' href='/padel.webp' as='image' type='image/webp' />
      <link rel='preload' href='/padel1.webp' as='image' type='image/webp' />
      <link rel='preload' href='/padel2.webp' as='image' type='image/webp' />
      <link
        rel='preload'
        href='/propadellogo.webp'
        as='image'
        type='image/webp'
      />
      <link
        rel='preload'
        href='/wilsonlogo.webp'
        as='image'
        type='image/webp'
      />
      <link rel='preload' href='/red&blue.webp' as='image' type='image/webp' />
      <link rel='preload' href='/towerlogo.webp' as='image' type='image/webp' />
      <link
        rel='preload'
        href='/bgocorporate.webp'
        as='image'
        type='image/webp'
      />
      <link
        rel='preload'
        href='/corkpadellogo.webp'
        as='image'
        type='image/webp'
      />
      <link rel='preload' href='/6lslogo.webp' as='image' type='image/webp' />
      <link rel='preload' href='/3.webp' as='image' type='image/webp' />
      <link rel='preload' href='/2.webp' as='image' type='image/webp' />
      <link rel='preload' href='/vector.webp' as='image' type='image/webp' />

      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased`}
      >
        <Header />
        {children}
        <Partners />
        <Footer />
      </body>
    </html>
  );
}
