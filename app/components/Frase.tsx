import Image from 'next/image';

function Frase() {
  return (
    <div className='flex items-center justify-center relative bg-black/50 py-30 px-4 overflow-hidden'>
      <h1 className='text-light font-denton md:text-6xl text-4xl uppercase text-center max-w-7xl wrap-break-word'>
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
  );
}

export default Frase;
