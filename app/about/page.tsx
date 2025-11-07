'use client';

import { ArrowDown, CopyrightIcon } from 'lucide-react';
import AboutUs from '../components/AboutUs';
import { useState } from 'react';

import { CarouselElement } from '../components/Carousel';
import Partners from '../components/Partners';
import Image from 'next/image';

export default function Home() {
  const [isAthletesOpen, setIsAthletesOpen] = useState(false);
  const [isOrganizationsOpen, setIsOrganizationsOpen] = useState(false);
  const [isClubsOpen, setIsClubsOpen] = useState(false);

  const handleAthletesToggle = () => {
    setIsAthletesOpen(!isAthletesOpen);
    setIsOrganizationsOpen(false);
    setIsClubsOpen(false);
  };

  const handleOrganizationsToggle = () => {
    setIsOrganizationsOpen(!isOrganizationsOpen);
    setIsAthletesOpen(false);
    setIsClubsOpen(false);
  };

  const handleClubsToggle = () => {
    setIsClubsOpen(!isClubsOpen);
    setIsAthletesOpen(false);
    setIsOrganizationsOpen(false);
  };

  return (
    <>
      <div className='flex max-h-screen items-center justify-center font-sans relative h-screen w-full overflow-hidden'>
        <img
          src='/3.webp'
          alt='hero image'
          className='absolute top-0 left-0 w-full h-full object-cover object-top z-0'
          style={{
            objectFit: 'cover',
            objectPosition: 'top',
          }}
          fetchPriority='high'
          loading='eager'
        />
        <div className='absolute top-0 left-0 right-0 bottom-0 z-10'>
          <div className='flex flex-col items-center justify-center h-full w-full px-4 max-w-full overflow-hidden'>
            <h1 className='text-light font-inter text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase max-w-full wrap-break-word text-left leading-none'>
              WE Are
            </h1>
            <Image
              src='/eliteLogo.svg'
              className='object-contain object-center max-w-2xl mx-auto w-full'
              alt='logo'
              width={1970}
              height={1080}
            />
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
      <AboutUs />
      <div className='bg-lightBlue px-10 py-20'>
        <h2 className='text-black text-2xl font-roboto-mono font-normal uppercase mb-20'>
          Services
        </h2>
        <div className='flex flex-col items-center justify-center gap-10 w-full max-w-8xl mx-auto'>
          <div
            className='flex flex-col items-center justify-center gap-5 w-full relative cursor-pointer overflow-hidden group'
            onClick={handleAthletesToggle}
          >
            {/* Contenedor principal con altura fija */}
            <div
              className={`relative w-full z-20 transition-all duration-500 ${
                isAthletesOpen ? 'h-auto min-h-[520px] py-8' : 'h-[520px]'
              } md:h-[520px]`}
            >
              {/* Contenido inicial que se mueve hacia arriba */}
              <div
                className={`${
                  isAthletesOpen ? 'hidden md:flex' : 'flex'
                } absolute inset-0 flex-col items-center justify-center transition-all duration-500 px-8 md:group-hover:-translate-y-full`}
              >
                <h1 className='text-light text-3xl md:text-5xl lg:text-8xl font-judson uppercase text-center max-w-full wrap-break-word'>
                  Athletes
                </h1>
                <p className='text-light lg:text-2xl font-condensed font-normal uppercase text-center max-w-full wrap-break-word'>
                  Elevate Your Career Beyond the Court.
                </p>
              </div>
              {/* Información adicional que aparece desde abajo - Layout de dos columnas */}
              <div
                className={`${
                  isAthletesOpen ? 'relative' : 'absolute'
                } inset-0 flex flex-col md:flex-row items-center justify-between transition-all duration-500 px-8 md:px-12 lg:px-16 gap-10 ${
                  isAthletesOpen ? '' : 'translate-y-full'
                } md:absolute md:translate-y-full md:group-hover:translate-y-0`}
              >
                {/* Lado Izquierdo */}
                <div className='flex flex-col items-start justify-center min-h-full md:h-full w-full md:w-1/2'>
                  <h1 className='text-light text-3xl md:text-5xl lg:text-6xl font-judson uppercase text-left mb-10'>
                    FOR ATHLETES
                  </h1>
                  <p className='text-light text-lg md:text-xl lg:text-3xl font-condensed font-medium uppercase text-left'>
                    ELEVATE YOUR CAREER BEYOND THE COURT.
                  </p>
                  <p className='text-light text-sm md:text-lg font-condensed font-normal text-left max-w-lg leading-relaxed'>
                    FROM JUNIORS TO PROFESSIONALS, WE HELP ATHLETES UNLOCK
                    OPPORTUNITIES THAT REFLECT THEIR TALENT, STORY, AND GOALS.
                  </p>
                  <div className='flex flex-col items-center justify-center w-full mt-10'>
                    <p className='text-light text-lg lg:text-3xl font-condensed font-normal uppercase text-center'>
                      READY TO TAKE THE NEXT STEP?
                    </p>
                    <button className='bg-darkBlue text-light py-3 md:py-4 text-lg lg:text-4xl font-judson font-medium uppercase w-full rounded-md'>
                      APPLY FOR REPRESENTATION
                    </button>
                  </div>
                </div>
                {/* Lado Derecho - Servicios */}
                <div className='flex flex-col items-start md:items-end justify-center min-h-full md:h-full w-full md:max-w-lg gap-10 mt-8 md:mt-0'>
                  <div className='text-left'>
                    <h3 className='text-light text-base md:text-lg lg:text-2xl font-condensed font-normal uppercase mb-2'>
                      REPRESENTATION & SPONSORSHIPS
                    </h3>
                    <p className='text-light text-xs md:text-md lg:text-base font-condensed font-light'>
                      SECURE PARTNERSHIPS THAT ALIGN WITH YOUR VALUES AND CAREER
                      ASPIRATIONS.
                    </p>
                  </div>
                  <div className='text-left'>
                    <h3 className='text-light text-base md:text-lg lg:text-2xl font-condensed font-normal uppercase mb-2'>
                      BRAND DEVELOPMENT
                    </h3>
                    <p className='text-light text-xs md:text-md lg:text-base font-condensed font-light'>
                      BUILD YOUR PERSONAL IDENTITY THROUGH MEDIA KITS,
                      STORYTELLING, AND IMAGE CONSULTING.
                    </p>
                  </div>
                  <div className='text-left'>
                    <h3 className='text-light text-base md:text-lg lg:text-2xl font-condensed font-normal uppercase mb-2'>
                      MEDIA & SOCIAL GUIDANCE
                    </h3>
                    <p className='text-light text-xs md:text-md lg:text-base font-condensed font-light'>
                      GROW YOUR VISIBILITY, ENGAGE YOUR AUDIENCE, AND ATTRACT
                      THE RIGHT BRANDS.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className='bg-gray-700/50 bg w-full h-full absolute top-0 left-0 right-0 bottom-0 z-10'></div>
            <Image
              src='/hero.webp'
              alt='frase'
              className='w-full h-full object-cover object-[50%_20%] absolute top-0 left-0 right-0 bottom-0'
              width={1920}
              height={1080}
            />
          </div>
          <div
            className='flex flex-col items-center justify-center gap-5 w-full relative cursor-pointer overflow-hidden group'
            onClick={handleOrganizationsToggle}
          >
            {/* Contenedor principal con altura fija */}
            <div
              className={`relative w-full z-20 transition-all duration-500 ${
                isOrganizationsOpen ? 'h-auto min-h-[520px] py-8' : 'h-[520px]'
              } md:h-[520px]`}
            >
              {/* Contenido inicial que se mueve hacia arriba */}
              <div
                className={`${
                  isOrganizationsOpen ? 'hidden md:flex' : 'flex'
                } absolute inset-0 flex-col items-center justify-center transition-all duration-500 px-8 md:group-hover:-translate-y-full`}
              >
                <h1 className='text-light text-3xl md:text-5xl lg:text-8xl font-judson uppercase text-center max-w-full wrap-break-word'>
                  Organizations
                </h1>
                <p className='text-light lg:text-2xl font-condensed font-normal uppercase text-center max-w-full wrap-break-word'>
                  Authentic Partnerships That Deliver Impact.
                </p>
              </div>
              {/* Información adicional que aparece desde abajo - Layout de dos columnas */}
              <div
                className={`${
                  isOrganizationsOpen ? 'relative' : 'absolute'
                } inset-0 flex flex-col md:flex-row items-center justify-between transition-all duration-500 px-8 md:px-12 lg:px-16 gap-10 ${
                  isOrganizationsOpen ? '' : 'translate-y-full'
                } md:absolute md:translate-y-full md:group-hover:translate-y-0`}
              >
                {/* Lado Izquierdo */}
                <div className='flex flex-col items-start justify-center min-h-full md:h-full w-full md:w-1/2'>
                  <h1 className='text-light text-3xl md:text-5xl lg:text-6xl font-judson uppercase text-left mb-10'>
                    FOR ORGANIZATIONS
                  </h1>
                  <p className='text-light text-lg md:text-xl lg:text-2xl font-condensed font-normal uppercase text-left'>
                    AUTHENTIC PARTNERSHIPS THAT DELIVER IMPACT.
                  </p>
                  <p className='text-light text-sm md:text-base font-condensed font-normal text-left max-w-lg leading-relaxed'>
                    WE HELP BRANDS NAVIGATE THE WORLD OF PADEL. FROM STRATEGY TO
                    EXECUTION - CONNECTING THEM WITH ATHLETES, CLUBS, AND
                    AUDIENCES THAT ALIGN WITH THEIR PURPOSE.
                  </p>
                  <div className='flex flex-col items-center justify-center w-full mt-10'>
                    <p className='text-light text-lg lg:text-3xl font-condensed font-normal uppercase text-center'>
                      LET&apos;S BUILD A PARTNERSHIP THAT WINS
                    </p>
                    <button className='bg-darkBlue text-light py-3 md:py-4 text-lg lg:text-4xl font-judson font-medium uppercase w-full rounded-md'>
                      PARTNER WITH US
                    </button>
                  </div>
                </div>
                {/* Lado Derecho - Servicios */}
                <div className='flex flex-col items-start md:items-end justify-center min-h-full md:h-full w-full md:max-w-lg gap-10 mt-8 md:mt-0'>
                  <div className='text-left'>
                    <h3 className='text-light text-base md:text-lg lg:text-2xl font-condensed font-normal uppercase mb-2'>
                      ATHLETE COLLABORATIONS
                    </h3>
                    <p className='text-light text-xs md:text-md lg:text-base font-condensed font-light'>
                      PARTNER WITH ATHLETES WHO EMBODY YOUR BRAND&apos;S MISSION
                      AND VALUES.
                    </p>
                  </div>
                  <div className='text-left'>
                    <h3 className='text-light text-base md:text-lg lg:text-2xl font-condensed font-normal uppercase mb-2'>
                      Event & amp; Activation Planning
                    </h3>
                    <p className='text-light text-xs md:text-md lg:text-base font-condensed font-light uppercase'>
                      Bring your brand to life through tournaments, community
                      events, or experiential campaigns.
                    </p>
                  </div>
                  <div className='text-left'>
                    <h3 className='text-light text-base md:text-lg lg:text-2xl font-condensed font-normal uppercase mb-2'>
                      Content & amp; Storytelling
                    </h3>
                    <p className='text-light text-xs md:text-md lg:text-base font-condensed font-light uppercase'>
                      Leverage authentic athlete voices to drive brand awareness
                      and engagement.
                    </p>
                  </div>
                  <div className='text-left'>
                    <h3 className='text-light text-base md:text-lg lg:text-2xl font-condensed font-normal uppercase mb-2'>
                      Consulting & AMP; Market Entry
                    </h3>
                    <p className='text-light text-xs md:text-md lg:text-base font-condensed font-light uppercase'>
                      Enter the U.S. padel scene with confidence through
                      insights, partnerships, and local expertise.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className='bg-gray-700/50 bg w-full h-full absolute top-0 left-0 right-0 bottom-0 z-10'></div>
            <Image
              src='/about-2.webp'
              alt='frase'
              className='w-full h-full object-cover object-[50%_80%] absolute top-0 left-0 right-0 bottom-0'
              width={1920}
              height={1080}
            />
          </div>
          <div
            className='flex flex-col items-center justify-center gap-5 w-full relative cursor-pointer overflow-hidden group'
            onClick={handleClubsToggle}
          >
            {/* Contenedor principal con altura fija */}
            <div
              className={`relative w-full z-20 transition-all duration-500 ${
                isClubsOpen ? 'h-auto min-h-[520px] py-8' : 'h-[520px]'
              } md:h-[520px]`}
            >
              {/* Contenido inicial que se mueve hacia arriba */}
              <div
                className={`${
                  isClubsOpen ? 'hidden md:flex' : 'flex'
                } absolute inset-0 flex-col items-center justify-center transition-all duration-500 px-8 md:group-hover:-translate-y-full`}
              >
                <h1 className='text-light text-3xl md:text-5xl lg:text-8xl font-judson uppercase text-center max-w-full wrap-break-word'>
                  Clubs
                </h1>
                <p className='text-light lg:text-2xl font-condensed font-normal uppercase text-center max-w-full wrap-break-word'>
                  Expand Your Reach. Strengthen Your Community.
                </p>
              </div>
              {/* Información adicional que aparece desde abajo - Layout de dos columnas */}
              <div
                className={`${
                  isClubsOpen ? 'relative' : 'absolute'
                } inset-0 flex flex-col md:flex-row items-center justify-between transition-all duration-500 px-8 md:px-12 lg:px-16 gap-10 ${
                  isClubsOpen ? '' : 'translate-y-full'
                } md:absolute md:translate-y-full md:group-hover:translate-y-0`}
              >
                {/* Lado Izquierdo */}
                <div className='flex flex-col items-start justify-center min-h-full md:h-full w-full md:w-1/2'>
                  <h1 className='text-light text-3xl md:text-5xl lg:text-6xl font-judson uppercase text-left mb-10'>
                    FOR CLUBS
                  </h1>
                  <p className='text-light text-lg md:text-xl lg:text-2xl font-condensed font-normal uppercase text-left'>
                    EXPAND YOUR REACH. STRENGTHEN YOUR COMMUNITY.
                  </p>
                  <p className='text-light text-sm md:text-base font-condensed font-normal text-left max-w-lg leading-relaxed'>
                    WE PARTNER WITH CLUBS TO ELEVATE THEIR VISIBILITY, ATTRACT
                    SPONSORS, AND ENGAGE MEMBERS THROUGH CURATED EVENTS AND
                    MARKETING SUPPORT.
                  </p>
                  <div className='flex flex-col items-center justify-center w-full mt-10'>
                    <p className='text-light text-lg lg:text-3xl font-condensed font-normal uppercase text-center'>
                      LET&apos;S ELEVATE YOUR CLUB
                    </p>
                    <button className='bg-darkBlue text-light py-3 md:py-4 text-lg lg:text-4xl font-judson font-medium uppercase w-full rounded-md'>
                      CONTACT US
                    </button>
                  </div>
                </div>
                {/* Lado Derecho - Servicios */}
                <div className='flex flex-col items-start md:items-end justify-center min-h-full md:h-full w-full md:max-w-lg gap-10 mt-8 md:mt-0'>
                  <div className='text-left'>
                    <h3 className='text-light text-base md:text-lg lg:text-2xl font-condensed font-normal uppercase mb-2'>
                      SPONSORSHIP STRATEGY & AMP; SUPPORT
                    </h3>
                    <p className='text-light text-xs md:text-md lg:text-base font-condensed font-light uppercase'>
                      IDENTIFY, NEGOTIATE, AND SECURE BRAND PARTNERS FOR YOUR
                      TOURNAMENTS OR CLUB EVENTS.
                    </p>
                  </div>
                  <div className='text-left'>
                    <h3 className='text-light text-base md:text-lg lg:text-2xl font-condensed font-normal uppercase mb-2'>
                      ATHLETE ENGAGEMENT PROGRAMS
                    </h3>
                    <p className='text-light text-xs md:text-md lg:text-base font-condensed font-light uppercase'>
                      CONNECT WITH PROS FOR CLINICS, EXHIBITIONS, OR AMBASSADOR
                      ROLES THAT INSPIRE YOUR COMMUNITY.
                    </p>
                  </div>
                  <div className='text-left'>
                    <h3 className='text-light text-base md:text-lg lg:text-2xl font-condensed font-normal uppercase mb-2'>
                      EVENT MANAGEMENT & AMP; ACTIVATION
                    </h3>
                    <p className='text-light text-xs md:text-md lg:text-base font-condensed font-light uppercase'>
                      FROM BRANDED TOURNAMENTS TO SEASONAL CAMPAIGNS, WE HELP
                      DESIGN EXPERIENCES THAT STAND OUT.
                    </p>
                  </div>
                  <div className='text-left'>
                    <h3 className='text-light text-base md:text-lg lg:text-2xl font-condensed font-normal uppercase mb-2'>
                      MARKETING & AMP; COMMUNICATION CONSULTING
                    </h3>
                    <p className='text-light text-xs md:text-md lg:text-base font-condensed font-light uppercase'>
                      POSITION YOUR CLUB AS A LEADER IN THE SPORT WITH STRONG
                      STORYTELLING AND DIGITAL PRESENCE.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className='bg-gray-700/50 bg w-full h-full absolute top-0 left-0 right-0 bottom-0 z-10'></div>
            <Image
              src='/about-3.webp'
              alt='frase'
              className='w-full h-full object-cover object-[50%_70%] absolute top-0 left-0 right-0 bottom-0'
              width={1920}
              height={1080}
            />
          </div>
        </div>
      </div>
    </>
  );
}
