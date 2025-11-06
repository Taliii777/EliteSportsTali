import { ArrowDown, CopyrightIcon } from 'lucide-react';
import HomeAbout from './components/HomeAbout';

import { CarouselElement } from './components/Carousel';
import Partners from './components/Partners';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <div className='flex max-h-screen items-center justify-center font-sans relative h-screen w-full overflow-hidden'>
        <img
          src='/hero.webp'
          alt='hero image'
          className='absolute top-0 left-0 w-full h-full object-cover object-top z-0'
          style={{
            objectFit: 'cover',
            objectPosition: 'top',
          }}
          fetchPriority='high'
          loading='eager'
        />
        <div className='absolute top-0 left-0 right-0 bottom-0 bg-black/50 z-10'>
          <div className='flex flex-col md:flex-row items-center justify-center h-full w-full px-4 max-w-full overflow-hidden'>
            <img
              src='/isotipo.svg'
              alt='elite logo'
              className='lg:size-72 md:size-48 md:-mr-13 -mr-8 lg:-mt-40 md:-mt-14 hidden md:block'
            />
            <h1 className='text-light lg:text-8xl/20 md:text-5xl/10 text-4xl/10 font-extrabold uppercase max-w-full wrap-break-word text-left'>
              Empowering <br /> Athletes. <br /> Inspiring <br /> Partnerships.
            </h1>
            <ArrowDown className='size-5 text-light animate-bounce md:hidden mt-10' />
          </div>
          <div className='flex items-center justify-between absolute bottom-10 left-0 right-0 px-10'>
            <div className='flex items-center justify-center gap-20'>
              <CopyrightIcon className='size-4 text-light' />
              <p className='text-light md:text-lg/5 text-sm/5 font-roboto font-light'>
                Where ambition meets opportunity — <br /> and every partnership
                creates impact.
              </p>
            </div>
            <div className='items-center justify-center gap-20 hidden md:flex'>
              <p className='text-light text-lg font-roboto font-light uppercase'>
                scroll down
              </p>
              <ArrowDown className='size-5 text-light animate-bounce' />
            </div>
          </div>
        </div>
      </div>
      <HomeAbout />
      <div className='flex items-center justify-center relative bg-black/50 py-30 px-4 overflow-hidden'>
        <h1 className='text-light lg:text-8xl/20 md:text-5xl/10 text-4xl/10 font-extrabold uppercase text-center max-w-full wrap-break-word'>
          &ldquo; Built for athletes chasing their dreams and brands ready to
          champion them.&rdquo;
        </h1>
        <Image
          src='/frase.webp'
          alt='frase'
          className='w-full h-full object-cover object-center max-h-screen absolute top-0 left-0 right-0 bottom-0 -z-10'
          width={1920}
          height={1080}
        />
      </div>
      <div className='bg-lightBlue px-15 py-20'>
        <h2 className='text-black text-2xl font-roboto font-medium uppercase mb-14'>
          Press
        </h2>
        <div className='w-full h-full flex items-center justify-center'>
          <CarouselElement />
        </div>
      </div>
      <Partners />
    </>
  );
}
