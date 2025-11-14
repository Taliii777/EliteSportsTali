'use client';

import { ArrowDown, CopyrightIcon } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import FromOurClients from '../components/FromOurClients';
import Desing from '../components/Desing';

interface ClubInfo {
  name: string;
  image: string;
  since: string;
  founder: string;
  description: React.ReactElement;
}

const clubs: {
  sixLoveSports: ClubInfo;
} = {
  sixLoveSports: {
    name: '6 LOVE SPORTS',
    image: '/clubs-and-org.webp',
    since: '2024',
    founder: 'ANDREA NEUGARTEN',
    description: (
      <>
        6 LOVE SPORTS (6LS) IS THE LARGEST AND FASTEST-GROWING WOMEN&apos;S
        PADEL COMMUNITY IN THE UNITED STATES.
        <br />
        <br />
        A MOVEMENT BUILT ON EMPOWERMENT, COMMUNITY, AND OPPORTUNITY. WE BRING
        TOGETHER ACTIVE, HEALTH-CONSCIOUS, AND SOCIALLY CONNECTED WOMEN WHO
        LOVE THE SPORT OF PADEL AND THE CULTURE AROUND IT. RECOGNIZED BY THE
        U.S. PADEL ASSOCIATION (USPA) AS A CERTIFIED PREMIER COMMUNITY, 6LS
        REPRESENTS EXCELLENCE, CREDIBILITY, AND LEADERSHIP IN GROWING
        WOMEN&apos;S PADEL NATIONWIDE.
      </>
    ),
  },
};

export default function Clubs() {
  const [selectedClub, setSelectedClub] = useState<ClubInfo | null>(null);

  const handleClubClick = (club: ClubInfo) => {
    setSelectedClub(club);
  };

  const handleCloseClub = () => {
    setSelectedClub(null);
  };

  return (
    <>
      <div className='flex max-h-screen items-center justify-center font-sans relative h-screen w-full overflow-hidden'>
        <img
          src='/about-2.webp'
          alt='hero image'
          className='absolute top-0 left-0 w-full h-full object-cover object-bottom z-0'
          fetchPriority='high'
          loading='eager'
        />
        <div className='absolute top-0 left-0 right-0 bottom-0 z-10 bg-black/30'>
          <div className='flex flex-col items-center justify-center h-full w-full px-4 max-w-full overflow-hidden'>
            <h1 className='text-light font-inter text-4xl md:text-5xl lg:text-8xl font-extrabold uppercase max-w-full wrap-break-word text-center'>
              clubs &
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
        {/* Layout dinámico según el club seleccionado */}
        {selectedClub && (
          <div
            className='flex flex-col md:flex-row h-full max-w-6xl mx-auto cursor-pointer'
            onClick={handleCloseClub}
          >
            {/* Imagen - izquierda */}
            <div className='w-full relative'>
              <Image
                src={selectedClub.image}
                alt={selectedClub.name}
                className='w-full h-full object-cover object-center aspect-9/12 transition-transform'
                width={1920}
                height={1080}
                priority
              />
            </div>
            {/* Panel de información - derecha */}
            <div className='w-full bg-lightBlue p-8 md:p-12 flex flex-col justify-start'>
              <h2 className='text-darkBlue text-3xl font-condensed font-semibold uppercase mb-6'>
                {selectedClub.name}
              </h2>
              <div className='space-y-2 mb-6 font-condensed'>
                <p className='text-darkBlue text-base md:text-2xl font-semibold'>
                  SINCE:{' '}
                  <span className='font-normal text-xl'>
                    {selectedClub.since}
                  </span>
                </p>
                <p className='text-darkBlue text-base md:text-2xl font-semibold'>
                  FOUNDER:{' '}
                  <span className='font-normal text-xl'>
                    {selectedClub.founder}
                  </span>
                </p>
              </div>
              <p className='text-darkBlue text-sm md:text-base font-condensed uppercase leading-relaxed'>
                {selectedClub.description}
              </p>
            </div>
          </div>
        )}
        {/* Vista inicial: mostrar imagen como clickeable */}
        {!selectedClub && (
          <div className='flex justify-center items-center max-w-6xl mx-auto'>
            <div
              className='relative w-full h-full justify-center items-center flex flex-col cursor-pointer group'
              onClick={() => handleClubClick(clubs.sixLoveSports)}
            >
              <h3 className='text-darkBlue text-sm md:text-xl font-mono font-bold uppercase absolute bottom-10 text-center bg-light px-4 md:px-8 py-2 rounded-sm z-20'>
                6 love sports
              </h3>
              <Image
                src={clubs.sixLoveSports.image}
                alt='6 Love Sports'
                className='w-full h-full object-cover object-center aspect-video transition-transform'
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
