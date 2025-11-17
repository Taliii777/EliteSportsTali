'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cerrar el menú cuando se hace clic en un enlace
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  // Prevenir el scroll del body cuando el menú está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const pathname = usePathname();
  const isServicesPage = pathname === '/services';
  const isAthletesPage = pathname === '/athletes';
  // const isContactPage = pathname === '/#footer';
  const isClubsPage = pathname === '/clubs';
  return (
    <>
      <header
        className={`flex justify-between items-center py-2 px-5 fixed top-0 left-0 right-0 z-50 transition-all ${
          isScrolled ? 'bg-light/85 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <Image
          src='/svg/header-logo.svg'
          onClick={() => router.push('/')}
          className={`w-[150px] h-[60px] md:w-[338px] md:h-[100px] cursor-pointer ${
            isScrolled ? 'brightness-0' : ''
          }`}
          alt='logo'
          width={1402}
          height={453}
        />
        <nav>
          <ul
            className={`hidden md:flex gap-4 text-lg font-neue-roman ${
              isScrolled ? 'text-black' : 'text-light'
            }`}
          >
            <li>
              <Link
                href='/services'
                className={`hover:underline ${
                  isServicesPage ? 'underline' : ''
                }`}
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                href='/athletes'
                className={`hover:underline ${
                  isAthletesPage ? 'underline' : ''
                }`}
              >
                Athletes
              </Link>
            </li>
            <li>
              <Link
                href='/clubs'
                className={`hover:underline ${isClubsPage ? 'underline' : ''}`}
              >
                Clubs | Organizations
              </Link>
            </li>
          </ul>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className='md:hidden cursor-pointer'
            aria-label='Toggle menu'
          >
            <Menu
              className={`size-7 ${isScrolled ? 'text-black' : 'text-light'}`}
            />
          </button>
        </nav>
      </header>

      {/* Overlay oscuro */}
      {isOpen && (
        <div
          className='fixed inset-0 bg-black/50 z-40 md:hidden'
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Menú lateral */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-light/85 backdrop-blur-md z-50 transform transition-transform ease-in-out md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className='flex flex-col h-full'>
          {/* Header del menú con botón cerrar */}
          <div className='flex justify-end items-center px-6 pt-6'>
            <button
              onClick={() => setIsOpen(false)}
              aria-label='Close menu'
              className='p-2 hover:bg-black/5 rounded transition-colors cursor-pointer'
            >
              <X className='size-7 text-black' />
            </button>
          </div>

          {/* Enlaces del menú */}
          <nav className='flex-1 p-6'>
            <ul className='flex flex-col gap-6 font-neue-roman'>
              <li>
                <Link
                  href='/services'
                  onClick={handleLinkClick}
                  className={`text-lg text-black hover:text-black/70 transition-colors block py-2 ${
                    isServicesPage ? 'underline' : ''
                  }`}
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href='/athletes'
                  onClick={handleLinkClick}
                  className={`text-lg text-black hover:text-black/70 transition-colors block py-2 ${
                    isAthletesPage ? 'underline' : ''
                  }`}
                >
                  Athletes
                </Link>
              </li>
              <li>
                <Link
                  href='/clubs'
                  onClick={handleLinkClick}
                  className={`text-lg text-black hover:text-black/70 transition-colors block py-2 ${
                    isClubsPage ? 'underline' : ''
                  }`}
                >
                  Clubs | Organizations
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Header;
