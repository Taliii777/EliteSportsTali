'use client';

import { ArrowDown, CopyrightIcon } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import FromOurClients from '../components/FromOurClients';
import Desing from '../components/Desing';

interface ClubInfo {
  name: string;
  since: string;
  founder: string;
  image: string;
  description: React.ReactElement;
}

const clubs: {
  sixLoveSports: ClubInfo;
} = {
  sixLoveSports: {
    name: '6 LOVE SPORTS',
    since: '2024',
    founder: 'ANDREA NEUGARTEN',
    image: '/clubs-and-org.webp',
    description: (
      <>
        6 love sports (6LS) is the largest and fastest-growing women&apos;s
        padel community in the United States.
        <br />
        <br />a movement built on empowerment, community, and opportunity. we
        bring together active, health-conscious, and socially connected women
        who love the sport of padel and the culture around it. recognized by the
        U.S. Padel Association (USPA) as a certified premier community, 6LS
        represents excellence, credibility, and leadership in growing
        women&apos;s padel nationwide.
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
            <h1 className='text-light text-4xl md:text-5xl lg:text-8xl font-denton uppercase max-w-full wrap-break-word text-center'>
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
              <p className='text-light text-lg font-neue-roman uppercase'>
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
            className='flex flex-col md:flex-row max-w-6xl mx-auto cursor-pointer'
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
            <div className='w-full bg-lightBlue flex flex-col justify-start'>
              <div className='p-8 md:p-12'>
                <h2 className='text-darkBlue text-3xl font-denton font-semibold uppercase mb-6'>
                  {selectedClub.name}
                </h2>
                <div className='space-y-2 mb-6 font-neue-roman'>
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
                <p className='text-darkBlue text-sm md:text-lg font-neue-roman leading-relaxed'>
                  {selectedClub.description}
                </p>
              </div>
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
              <h3 className='text-darkBlue text-sm md:text-xl font-denton uppercase absolute bottom-10 text-center bg-light px-4 md:px-8 py-2 rounded-sm z-20'>
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
