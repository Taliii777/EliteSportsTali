import Image from 'next/image';
function Founder() {
  return (
    <div className='bg-redd px-15 py-20 grid lg:grid-cols-5 justify-center items-center gap-5'>
      <div className='lg:col-span-3 max-w-5xl mx-auto'>
        <div className='flex flex-col items-center justify-center gap-5 mb-10'>
          <h1 className='text-light text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-denton uppercase'>
            Our founder
          </h1>
          <p className='text-light md:text-2xl font-neue-bold uppercase text-center'>
            An Athlete&apos;s Drive. A Leader&apos;s Vision.
          </p>
        </div>
        <div className='flex flex-col items-center justify-center gap-5'>
          <p className='text-light text-lg font-neue-roman text-center max-w-6xl'>
            I&apos;m Dhanielly Quevedo — a top-ranked U.S. padel athlete and
            former Division I tennis player. Competing at an elite level has
            taught me discipline, resilience, and purpose. Off the court,
            I&apos;ve spent nearly a decade leading corporate communications for
            global brands — from Fortune 100 companies to fast-growing startups.
            <br />
            <br />
            That unique blend of experience — athlete + brand strategist —
            inspired me to build a platform where representation goes beyond
            contracts and becomes collaboration. Elite Sports Management was
            created to help athletes, clubs, and organizations thrive together —
            through integrity, creativity, and a shared passion for the game.
          </p>
        </div>
      </div>
      <div className='lg:col-span-2'>
        <Image
          src='/founder.webp'
          alt='about 1'
          className='w-full h-full object-cover object-[50%_0%] rounded-xl max-h-[700px]'
          width={1920}
          height={1080}
        />
      </div>
    </div>
  );
}

export default Founder;
