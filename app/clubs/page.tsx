import { ArrowDown, CopyrightIcon } from 'lucide-react';
import Image from 'next/image';
import FromOurClients from '../components/FromOurClients';

export default function Athletes() {
  return (
    <>
      <div className='flex max-h-screen items-center justify-center font-sans relative h-screen w-full overflow-hidden'>
        <img
          src='/padel.webp'
          alt='hero image'
          className='absolute top-0 left-0 w-full h-full object-cover object-bottom-right z-0 scale-150'
          fetchPriority='high'
          loading='eager'
        />
        <div className='absolute top-0 left-0 right-0 bottom-0 z-10 bg-black/30'>
          <div className='flex flex-col items-center justify-center h-full w-full px-4 max-w-full overflow-hidden'>
            <h1 className='text-light text-8xl font-extrabold uppercase max-w-full wrap-break-word text-center'>
              clubs
              <br />
              organizations
            </h1>
            <ArrowDown className='size-5 text-light animate-bounce md:hidden mt-10' />
          </div>
          <div className='flex items-center justify-between absolute bottom-10 left-0 right-0 px-10'>
            <div className='flex items-center justify-center gap-20'>
              <CopyrightIcon className='size-4 text-light' />
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
      <div className='px-5 md:px-15 py-20'>
        <div className='flex justify-center items-center max-w-6xl mx-auto '>
          <div className='relative w-full h-full justify-center items-center flex flex-col'>
            <h3 className='text-darkBlue text-xl font-mono font-bold uppercase absolute bottom-10 text-center bg-light px-10 py-2 rounded-sm'>
              6 love sports
            </h3>
            <Image
              src='/about-2.webp'
              alt='athletes'
              className='w-full h-full object-cover object-center aspect-video'
              width={1920}
              height={1080}
            />
          </div>
        </div>
      </div>
      <FromOurClients />
      <div className='grid grid-cols-3'>
        <div className='col-span-1'>
          <Image
            src='/padel1.webp'
            alt='athletes'
            className='w-full h-full object-cover object-center filter grayscale-100'
            width={1920}
            height={1080}
          />
        </div>
        <div className='col-span-1 relative'>
          <div className='absolute inset-0 z-20 flex items-center justify-center'>
            <Image
              src='/eliteLogo.svg'
              alt='athletes'
              className='w-3/4 h-3/4 object-contain'
              width={1920}
              height={1080}
            />
          </div>
          <Image
            src='/vector.webp'
            alt='athletes'
            className='w-full h-full object-cover object-center'
            width={1920}
            height={1080}
          />
        </div>
        <div className='col-span-1'>
          <Image
            src='/padel2.webp'
            alt='athletes'
            className='w-full h-full object-cover object-center filter grayscale-100'
            width={1920}
            height={1080}
          />
        </div>
      </div>
    </>
  );
}
