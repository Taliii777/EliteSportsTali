'use client';
import Link from 'next/link';
import { Instagram, Mail, Phone, Copy, CopyIcon } from 'lucide-react';

function Footer() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert(`Copied ${text} to clipboard`);
  };

  return (
    <footer id='footer' className='bg-light border-t border-blue-dark border-opacity-15'>
      <div className='max-w-[1280px] mx-auto px-10 py-16'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-12 mb-12'>
          <div className='flex flex-col gap-4'>
            <img
              src='/eliteLogo.svg'
              alt='Elite Sports Management'
              className='w-[180px] h-auto object-contain brightness-0'
            />
            <p className='text-blue-dark text-sm font-body-regular leading-relaxed max-w-xs'>
              Excellence in sports representation. Empowering athletes and
              building authentic partnerships.
            </p>
          </div>

          <div className='flex flex-col gap-4'>
            <h3 className='font-subtitles font-bold text-blue-dark text-lg mb-2'>
              Quick Links
            </h3>
            <nav className='flex flex-col gap-3'>
              <Link
                href='/about'
                className='hover:text-red transition-colors hover:underline'
              >
                About
              </Link>
              <Link
                href='/athletes'
                className='hover:text-red transition-colors hover:underline'
              >
                Athletes
              </Link>
              <Link
                href='/contact'
                className='hover:text-red transition-colors hover:underline'
              >
                Contact
              </Link>
              <Link
                href='/clubs-organizations'
                className='hover:text-red transition-colors hover:underline'
              >
                Clubs | Organizations
              </Link>
            </nav>
          </div>

          <div className='flex flex-col gap-4'>
            <h3 className='font-subtitles font-bold text-blue-dark text-lg mb-2'>
              Connect With Us
            </h3>
            <div className='flex gap-4'>
              <Link
                href='https://www.instagram.com/elitesportsmanagement__/'
                className='hover:text-red transition-colors hover:underline'
              >
                Instagram
              </Link>
              <Link
                href='https://wa.me/19548576541'
                className='hover:text-red transition-colors hover:underline'
              >
                WhatsApp
              </Link>
              <Link
                href='mailto:dhany@elitesportsmgt.com'
                className='hover:text-red transition-colors hover:underline'
              >
                Email
              </Link>
            </div>
            <div className='mt-4 text-blue-dark text-sm font-body-regular'>
              <p className='mb-1 flex items-center gap-2'>
                <strong>Email:</strong>{' '}
                <a
                  href='mailto:dhany@elitesportsmgt.com'
                  className='hover:text-red transition-colors hover:underline'
                >
                  dhany@elitesportsmgt.com
                </a>
                <button
                  onClick={() => copyToClipboard('dhany@elitesportsmgt.com')}
                  className='ml-2 text-blue-dark hover:text-red transition-colors hover:underline cursor-pointer'
                >
                  <CopyIcon className='size-4' />
                </button>
              </p>
              <p>
                <strong>Phone:</strong>{' '}
                <a
                  href='tel:+19548576541'
                  className='hover:text-red transition-colors hover:underline'
                >
                  +1 (954) 857-6541
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className='border-t border-blue-dark border-opacity-15 pt-8'>
          <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
            <p className='text-blue-dark text-xs font-body-regular text-center md:text-left'>
              © {new Date().getFullYear()} Elite Sport Management. All rights
              reserved.
            </p>
            <div className='flex gap-6 text-xs font-body-regular'>
              <Link
                href='/privacy'
                className='text-blue-dark hover:text-red transition-colors hover:underline'
              >
                Privacy Policy
              </Link>
              <Link
                href='/terms'
                className='text-blue-dark hover:text-red transition-colors hover:underline'
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
