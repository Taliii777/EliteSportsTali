import { ArrowDown, CopyrightIcon } from 'lucide-react';

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
          src='hero.jpg'
          alt='hero image'
          className='w-full h-full object-cover object-top max-h-screen'
        />
      </div>
    </>
  );
}
