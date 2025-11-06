import { ArrowDown, CopyrightIcon, ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <div className='flex max-h-screen items-center justify-center font-sans '>
        <div className='absolute top-0 left-0 right-0 bottom-0 bg-black/50'>
          <div className='flex items-center justify-center h-full w-full'>
            <img
              src='/isotipo.svg'
              alt='elite logo'
              className='size-72 -mr-13 -mt-40'
            />
            <h1 className='text-light text-8xl/20 font-extrabold max-w-[700px] uppercase '>
              Empowering Athletes. Inspiring Partnerships.
            </h1>
          </div>
          <div className='flex items-center justify-between absolute bottom-10 left-0 right-0 px-10'>
            <div className='flex items-center justify-center gap-20'>
              <CopyrightIcon className='size-4 text-light' />
              <p className='text-light text-lg/5 font-roboto font-light'>
                Where ambition meets opportunity —
                <br />
                and every partnership creates impact.
              </p>
            </div>
            <div className='flex items-center justify-center gap-20'>
              <p className='text-light text-lg font-roboto font-light uppercase'>
                scroll down
              </p>
              <ArrowDown className='size-5 text-light animate-bounce' />
            </div>
          </div>
        </div>
        <img
          src='hero.webp'
          alt='hero image'
          className='w-full h-full object-cover object-top max-h-screen'
        />
      </div>
      <section id='about' className='px-15 py-20'>
        <h2 className='text-black text-2xl font-roboto font-medium uppercase mb-14'>
          About
        </h2>
        <div className='flex items-end justify-center gap-5 mb-20'>
          <h1 className='text-darkBlue text-7xl/15 font-bold font-inter uppercase'>
            EXCELLENCE IN
            <br />
            EVERY MOVE
          </h1>
          <p className='text-darkBlue text-lg/5 font-roboto font-light '>
            Why Partner with Elite Sports
            <br />
            Management?
          </p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-10 max-w-7xl mx-auto'>
          <div className='flex flex-col'>
            <div className='col-span-1 w-auto h-[445px] overflow-hidden rounded-sm mb-5'>
              <Image
                src='/hero.webp'
                alt='about 1'
                className='w-full h-full object-cover object-center'
                width={500}
                height={500}
              />
            </div>
            <h3 className='text-darkBlue text-2xl font-mono font-bold uppercase'>
              Athletes
            </h3>
            <p className='text-darkBlue text-lg font-mono font-medium uppercase'>
              unlock your potential
            </p>
          </div>
          <div className='flex flex-col'>
            <div className='col-span-1 w-auto h-[445px] overflow-hidden rounded-sm mb-5'>
              <Image
                src='/about-2.webp'
                alt='about 1'
                className='w-full h-full object-cover object-center'
                width={500}
                height={500}
              />
            </div>
            <h3 className='text-darkBlue text-2xl font-mono font-bold uppercase'>
              Organizations
            </h3>
            <p className='text-darkBlue text-lg font-mono font-medium uppercase'>
              Create Meaningful Impact
            </p>
          </div>
          <div className='flex flex-col'>
            <div className='col-span-1 w-auto h-[445px] overflow-hidden rounded-sm mb-5'>
              <Image
                src='/about-3.webp'
                alt='about 1'
                className='w-full h-full object-cover object-center'
                width={500}
                height={500}
              />
            </div>
            <h3 className='text-darkBlue text-2xl font-mono font-bold uppercase'>
              clubs
            </h3>
            <p className='text-darkBlue text-lg font-mono font-medium uppercase'>
              Grow Your Community
            </p>
          </div>
        </div>
        <div className='flex items-center gap-10 mt-10'>
          <ArrowLeft className='size-8 text-redd cursor-pointer' />
          <ArrowRight className='size-8 text-redd cursor-pointer' />
        </div>
      </section>
      <div className='flex items-center justify-center relative bg-black/50 py-30'>
        <h1 className='text-light text-8xl/20 font-extrabold uppercase text-center'>
          “Built for athletes chasing their dreams and brands ready to champion
          them.”
        </h1>
        <img
          src='frase.webp'
          alt='frase'
          className='w-full h-full object-cover object-center max-h-screen absolute top-0 left-0 right-0 bottom-0 -z-10'
        />
      </div>
    </>
  );
}
