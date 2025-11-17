'use client';

import { ArrowDown, CopyrightIcon } from 'lucide-react';
import Image from 'next/image';

import { useState } from 'react';
import FromOurClients from '../components/FromOurClients';
import Desing from '../components/Desing';
interface AthleteInfo {
  name: string;
  image: string;
  dob: string;
  birthplace: string;
  height: string;
  uspaRanking: string;
  biography: React.ReactElement;
}

const athletes: {
  clementina: AthleteInfo;
  guillermo: AthleteInfo;
} = {
  clementina: {
    name: 'CLEMENTINA RIOBUENO',
    image: '/clementina.webp',
    dob: '9/28/1994',
    birthplace: 'BARQUISIMETO, VENEZUELA',
    height: "5'8",
    uspaRanking: '12',
    biography: (
      <>
        Originally from Barquisimeto, Venezuela, Clementina Riobueno is a
        standout athlete whose journey reflects discipline, passion, and
        excellence. A former Division I tennis player for the University of
        Miami, she joined the Hurricanes in 2013 as a full-time student-athlete
        and earned her bachelor&apos;s degree in Marketing and Psychology in
        2016.
        <br />
        <br />
        Today, Clementina is recognized as one of the top female padel players
        in the United States and a member of the U.S. National Padel Team.
        Beyond her accomplishments on the court, she continues to make her mark
        in the industry through her work at a leading global sports
        agency—bridging her experience as an elite athlete with her expertise in
        marketing and athlete representation.
      </>
    ),
  },

  guillermo: {
    name: 'GUILLERMO JIMENEZ CAGIGAS',
    image: '/athleteshero.webp',
    dob: '05/03/2000',
    birthplace: 'MADRID, SPAIN',
    height: "5'11",
    uspaRanking: '14',
    biography: (
      <>
        Originally from Madrid, Spain, Guillermo Jimenez Cagigas is one of the
        top padel players competing in the USPA circuit. After an accomplished
        collegiate tennis career at Longwood University—where he earned both his
        bachelor&apos;s and master&apos;s degrees—Guillermo transitioned to
        padel, quickly establishing himself as a standout talent known for his
        precision, composure, and strategic play.
        <br />
        <br />
        Now based in Miami, he serves as the Director of Platinum Padel Club,
        leading player development and competitive programming while continuing
        to compete at an elite level. Both on and off the court, Guillermo is
        dedicated to advancing the growth of padel in the United States through
        mentorship, performance, and his commitment to building the sport&apos;s
        future.
      </>
    ),
  },
};

export default function Athletes() {
  const [selectedAthlete, setSelectedAthlete] = useState<AthleteInfo | null>(
    null,
  );

  const handleAthleteClick = (athlete: AthleteInfo) => {
    setSelectedAthlete(athlete);
  };

  const handleCloseAthlete = () => {
    setSelectedAthlete(null);
  };

  return (
    <>
      <div className='flex max-h-screen items-center justify-center font-sans relative h-screen w-full overflow-hidden'>
        <img
          src='/athletes.webp'
          alt='hero image'
          className='absolute top-0 left-0 w-full h-full object-cover object-[50%_50%] z-0'
          fetchPriority='high'
          loading='eager'
        />
        <div className='absolute top-0 left-0 right-0 bottom-0 z-10 bg-black/30'>
          <div className='flex flex-col items-center justify-center h-full w-full px-4 max-w-full overflow-hidden'>
            <h1 className='text-light text-4xl md:text-5xl lg:text-8xl font-extrabold uppercase max-w-full wrap-break-word text-center'>
              Athletes
            </h1>
            <ArrowDown className='size-5 text-light animate-bounce md:hidden mt-5' />
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
        {/* Layout dinámico según el atleta seleccionado */}
        {selectedAthlete && (
          <div
            className='flex flex-col md:flex-row h-full max-w-6xl mx-auto cursor-pointer'
            onClick={handleCloseAthlete}
          >
            {/* Si es Clementina: imagen izquierda, info derecha */}
            {/* Si es Guillermo: info izquierda, imagen derecha */}
            {selectedAthlete.name === 'CLEMENTINA RIOBUENO' ? (
              <>
                {/* Imagen - izquierda (posición original de Clementina) */}
                <div className='w-full relative'>
                  <Image
                    src={selectedAthlete.image}
                    alt={selectedAthlete.name}
                    className='w-full h-full object-cover object-center aspect-9/12 transition-transform'
                    width={1920}
                    height={1080}
                    priority
                  />
                </div>
                {/* Panel de información - derecha */}
                <div className='w-full bg-lightBlue flex flex-col justify-start'>
                  <div className='p-8 md:p-12'>
                    <h2 className='text-darkBlue text-3xl font-condensed font-semibold uppercase mb-6'>
                      {selectedAthlete.name}
                    </h2>
                    <div className='space-y-2 mb-6 font-condensed'>
                      <p className='text-darkBlue text-base md:text-2xl font-semibold'>
                        DOB:{' '}
                        <span className='font-normal text-xl'>
                          {selectedAthlete.dob}
                        </span>
                      </p>
                      <p className='text-darkBlue text-base md:text-2xl font-semibold'>
                        BIRTHPLACE:{' '}
                        <span className='font-normal text-xl'>
                          {selectedAthlete.birthplace}
                        </span>
                      </p>
                      <p className='text-darkBlue text-base md:text-2xl font-semibold'>
                        HEIGHT:{' '}
                        <span className='font-normal text-xl'>
                          {selectedAthlete.height}
                        </span>
                      </p>
                      <p className='text-darkBlue text-base md:text-2xl font-semibold'>
                        USPA RANKING:{' '}
                        <span className='font-normal text-xl'>
                          {selectedAthlete.uspaRanking}
                        </span>
                      </p>
                    </div>
                    <p className='text-darkBlue text-sm md:text-lg font-condensed leading-relaxed'>
                      {selectedAthlete.biography}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Panel de información - izquierda (posición original de Clementina) */}
                <div className='w-full bg-lightBlue flex flex-col justify-start'>
                  <div className='p-8 md:p-12'>
                    <h2 className='text-darkBlue text-3xl font-condensed font-semibold uppercase mb-6'>
                      {selectedAthlete.name}
                    </h2>
                    <div className='space-y-2 mb-6 font-condensed'>
                      <p className='text-darkBlue text-base md:text-2xl font-semibold'>
                        DOB:{' '}
                        <span className='font-normal text-xl'>
                          {selectedAthlete.dob}
                        </span>
                      </p>
                      <p className='text-darkBlue text-base md:text-2xl font-semibold'>
                        BIRTHPLACE:{' '}
                        <span className='font-normal text-xl'>
                          {selectedAthlete.birthplace}
                        </span>
                      </p>
                      <p className='text-darkBlue text-base md:text-2xl font-semibold'>
                        HEIGHT:{' '}
                        <span className='font-normal text-xl'>
                          {selectedAthlete.height}
                        </span>
                      </p>
                      <p className='text-darkBlue text-base md:text-2xl font-semibold'>
                        USPA RANKING:{' '}
                        <span className='font-normal text-xl'>
                          {selectedAthlete.uspaRanking}
                        </span>
                      </p>
                    </div>
                    <p className='text-darkBlue text-sm md:text-lg font-condensed leading-relaxed'>
                      {selectedAthlete.biography}
                    </p>
                  </div>
                </div>
                {/* Imagen - derecha (posición original de Guillermo) */}
                <div className='w-full relative'>
                  <Image
                    src={selectedAthlete.image}
                    alt={selectedAthlete.name}
                    className='w-full h-full object-cover object-[50%_100%] aspect-9/12 transition-transform'
                    width={1920}
                    height={1080}
                    priority
                  />
                </div>
              </>
            )}
          </div>
        )}
        {/* Vista inicial: mostrar ambas imágenes como clickeables */}
        {!selectedAthlete && (
          <div className='flex flex-col md:flex-row justify-center items-center max-w-6xl mx-auto'>
            <div
              className='relative w-full cursor-pointer group'
              onClick={() => handleAthleteClick(athletes.clementina)}
            >
              <h3 className='text-darkBlue text-sm md:text-lg font-mono font-bold uppercase absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center bg-light w-full max-w-xs py-2 rounded-sm z-20'>
                CLEMENTINA RIOBUENO
              </h3>
              <Image
                src={athletes.clementina.image}
                alt='Clementina Riobueno'
                className='w-full h-full object-cover object-center aspect-9/12 transition-transform'
                width={1920}
                height={1080}
              />
            </div>
            <div
              className='relative w-full cursor-pointer group'
              onClick={() => handleAthleteClick(athletes.guillermo)}
            >
              <h3 className='text-darkBlue text-sm md:text-lg font-mono font-bold uppercase absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center bg-light w-full max-w-xs py-2 rounded-sm z-20 '>
                GUILLERMO JIMENEZ CAGIGAS
              </h3>
              <Image
                src={athletes.guillermo.image}
                alt='Guillermo Cagigas'
                className='w-full h-full object-cover object-[50%_100%] aspect-9/12 transition-transform'
                width={1920}
                height={1080}
              />
            </div>
          </div>
        )}
      </div>
      <FromOurClients />
      <Desing />
    </>
  );
}
