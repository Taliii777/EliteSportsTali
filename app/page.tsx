import { ArrowDown, CopyrightIcon } from 'lucide-react';
import AboutUs from './components/AboutUs';
import HomeAbout from './components/HomeAbout';
import Founder from './components/Founder';
import InstagramSection from './components/InstagramSection';

import { CarouselElement } from './components/Carousel';

export default function Home() {
  return (
    <>
      <div className='flex max-h-screen items-center justify-center font-sans relative h-screen w-full overflow-hidden'>
        <img
          src='/hero.webp'
          alt='hero image'
          className='absolute top-0 left-0 w-full h-full object-cover object-[50%_15%] scale-150 z-0'
          fetchPriority='high'
          loading='eager'
        />
        <div className='absolute top-0 left-0 right-0 bottom-0 bg-black/50 z-10'>
          <div className='flex flex-col md:flex-row items-center justify-center h-full w-full px-4 max-w-3xl mx-auto overflow-hidden'>
            <img
              src='/svg/hero-homePage.svg'
              alt='elite logo'
              className='w-full h-full object-contain object-center'
              width={1080}
              height={1080}
            />
          </div>
          <div className='flex items-center justify-between absolute bottom-10 left-0 right-0 px-10'>
            <div className='flex items-center justify-center gap-20'>
              <CopyrightIcon className='size-4 text-light' />
              <p className='text-light md:text-lg/5 text-sm/5 font-neue-roman'>
                Where ambition meets opportunity — <br /> and every partnership
                creates impact.
              </p>
            </div>
            <div className='items-center justify-center gap-20 hidden md:flex'>
              <p className='text-light text-lg font-neue-roman uppercase'>
                scroll down
              </p>
              <ArrowDown className='size-5 text-light animate-bounce' />
            </div>
          </div>
        </div>
      </div>
      <AboutUs />
      <HomeAbout />
      <InstagramSection />
      <Founder />

      <div className='bg-lightBlue px-15 py-20'>
        <h2 className='text-black text-2xl font-neue-roman uppercase mb-14'>
          Press
        </h2>
        <div className='w-full h-full flex items-center justify-center'>
          <CarouselElement />
        </div>
      </div>
    </>
  );
}
