import type { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
import {
  Geist,
  Geist_Mono,
  Inter,
  Roboto_Condensed,
  Judson,
  Roboto,
  Roboto_Mono,
} from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import LayoutWrapper from './components/LayoutWrapper';

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

const robotoCondensed = Roboto_Condensed({
  variable: '--font-condensed',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

const judson = Judson({
  variable: '--font-judson',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  weight: ['400', '700'],
});

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

const robotoMono = Roboto_Mono({
  variable: '--font-roboto-mono',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

const dentonCondensedRegular = localFont({
  src: '../public/fonts/DentonXCondensedTest-Regular.otf',
  variable: '--font-denton',
  display: 'swap',
  preload: true,
});

// Fuente personalizada Neue Haas Display Bold
const neueHaasDisplayBold = localFont({
  src: '../public/fonts/NeueHaasDisplayBold.ttf',
  variable: '--font-neue-bold',
  display: 'swap',
  preload: true,
});

const neueHaasDisplayRoman = localFont({
  src: '../public/fonts/NeueHaasDisplayRoman.ttf',
  variable: '--font-neue-roman',
  display: 'swap',
  preload: true,
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
      <link
        rel='preload'
        href='/desingGirl.webp'
        as='image'
        type='image/webp'
      />
      <link
        rel='preload'
        href='/eliteManageLogo.svg'
        as='image'
        type='image/svg+xml'
      />
      <link rel='preload' href='/frase.webp' as='image' type='image/webp' />
      <link
        rel='preload'
        href='/clubs-and-org.webp'
        as='image'
        type='image/webp'
      />
      <link rel='preload' href='/about-2.webp' as='image' type='image/webp' />
      <link rel='preload' href='/about-3.webp' as='image' type='image/webp' />
      <link rel='preload' href='/hero.webp' as='image' type='image/webp' />
      <link
        rel='preload'
        href='/athleteshero.webp'
        as='image'
        type='image/webp'
      />
      <link
        rel='preload'
        href='/home-clubs.webp'
        as='image'
        type='image/webp'
      />
      <link rel='preload' href='/home-orga.webp' as='image' type='image/webp' />
      <link rel='preload' href='/founder.webp' as='image' type='image/webp' />
      <link rel='preload' href='/athletes.webp' as='image' type='image/webp' />
      <link rel='preload' href='/team.webp' as='image' type='image/webp' />
      <link
        rel='preload'
        href='/servathletes.webp'
        as='image'
        type='image/webp'
      />
      <link
        rel='preload'
        href='/clementina.webp'
        as='image'
        type='image/webp'
      />

      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${robotoCondensed.variable} ${judson.variable} ${roboto.variable} ${robotoMono.variable} ${neueHaasDisplayBold.variable} ${neueHaasDisplayRoman.variable} ${dentonCondensedRegular.variable} antialiased`}
      >
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
      <GoogleAnalytics gaId='G-V6G7JTQ8VK' />
    </html>
  );
}
