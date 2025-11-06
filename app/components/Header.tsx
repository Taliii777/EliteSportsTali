'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <>
      <header
        className={`flex justify-between items-center py-5 px-10 fixed top-0 left-0 right-0 z-50 transition-all ${
          isScrolled ? 'bg-light border-b border-black' : 'bg-transparent'
        }`}
      >
        <Image
          src='/eliteLogo.svg'
          className={`w-[150px] h-[60px] md:w-[238px] md:h-[100px] ${
            isScrolled ? 'brightness-0' : ''
          }`}
          alt='logo'
          width={1920}
          height={1080}
        />
        <nav>
          <ul
            className={`hidden md:flex gap-4 text-lg font-roboto ${
              isScrolled ? 'text-black' : 'text-light'
            }`}
          >
            <li>
              <Link href='/'>About</Link>
            </li>
            <li>
              <Link href='/'>Athletes</Link>
            </li>
            <li>
              <Link href='/'>Contact</Link>
            </li>
            <li>
              <Link href='/'>Clubs | Organizations</Link>
            </li>
          </ul>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className='md:hidden cursor-pointer'
            aria-label='Toggle menu'
          >
            <Menu className={`size-7 ${isScrolled ? 'text-black' : 'text-light'}`} />
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
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-light z-50 transform transition-transform ease-in-out md:hidden ${
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
            <ul className='flex flex-col gap-6'>
              <li>
                <Link
                  href='/'
                  onClick={handleLinkClick}
                  className='text-lg font-roboto text-black hover:text-black/70 transition-colors block py-2'
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href='/'
                  onClick={handleLinkClick}
                  className='text-lg font-roboto text-black hover:text-black/70 transition-colors block py-2'
                >
                  Athletes
                </Link>
              </li>
              <li>
                <Link
                  href='/'
                  onClick={handleLinkClick}
                  className='text-lg font-roboto text-black hover:text-black/70 transition-colors block py-2'
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href='/'
                  onClick={handleLinkClick}
                  className='text-lg font-roboto text-black hover:text-black/70 transition-colors block py-2'
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
