'use client';

import { ArrowDown, CopyrightIcon } from 'lucide-react';
// import AboutUs from '../components/AboutUs';
import { useState } from 'react';

// import { CarouselElement } from '../components/Carousel';
import Frase from '../components/Frase';
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
          src='/services.webp'
          alt='hero image'
          className='absolute top-0 left-0 w-full h-full object-cover object-[50%_45%] z-0'
          fetchPriority='high'
          loading='eager'
        />
        <div className='absolute top-0 left-0 right-0 bottom-0 z-10 bg-black/30'>
          <div className='flex flex-col items-center justify-center h-full w-full px-4 max-w-full overflow-hidden'>
            <h1 className='text-light text-2xl sm:text-3xl md:text-6xl lg:text-8xl font-denton uppercase max-w-full wrap-break-word text-left leading-none'>
              OUR SERVICES
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
        <div className='flex justify-center gap-5 mb-20 max-w-5xl mx-auto'>
          <h1 className='text-darkBlue text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-denton uppercase text-center'>
            ELEVATE YOUR CAREER BEYOND THE COURT.
          </h1>
        </div>
        <div className='flex justify-end gap-5'>
          <p className='text-darkBlue text-lg font-neue-roman text-center uppercase max-w-3xl mx-auto tracking-widest'>
            FROM JUNIORS TO PROFESSIONALS, WE HELP ATHLETES UNLOCK OPPORTUNITIES
            THAT REFLECT THEIR TALENT, STORY, AND GOALS.
          </p>
        </div>
      </div>
      <div className='bg-lightBlue px-10 py-20'>
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
                <h1 className='text-light text-3xl md:text-5xl lg:text-8xl font-denton uppercase text-center max-w-full wrap-break-word'>
                  Athletes
                </h1>
                <p className='text-light lg:text-2xl font-neue-roman uppercase text-center max-w-full wrap-break-word'>
                  Elevate Your Career Beyond the Court.
                </p>
              </div>
              {/* Información adicional que aparece desde abajo - Layout de dos columnas */}
              <div
                className={`${
                  isAthletesOpen ? 'relative' : 'absolute'
                } inset-0 flex flex-col items-center transition-all duration-500 py-24 ${
                  isAthletesOpen ? '' : 'translate-y-full'
                } md:absolute md:translate-y-full md:group-hover:translate-y-0`}
              >
                {/* Lado Izquierdo */}
                <div className='flex flex-col items-center justify-between h-full w-full mx-auto'>
                  <div className='flex flex-col items-center justify-center w-full mb-10 md:mb-0'>
                    <h1 className='text-light text-3xl md:text-5xl font-denton uppercase text-center'>
                      ELEVATE YOUR CAREER BEYOND THE COURT.
                    </h1>
                    <p className='text-light text-sm md:text-lg font-neue-roman text-center leading-relaxed'>
                      FROM JUNIORS TO PROFESSIONALS, WE HELP ATHLETES UNLOCK
                      OPPORTUNITIES THAT REFLECT THEIR TALENT, STORY, AND GOALS.
                    </p>
                  </div>
                  <div className='flex flex-col md:flex-row items-center justify-around w-full gap-5 md:gap-0'>
                    <div className='text-left max-w-xs'>
                      <h3 className='text-light text-base md:text-lg lg:text-2xl font-neue-roman uppercase mb-2'>
                        REPRESENTATION & SPONSORSHIPS
                      </h3>
                      <p className='text-light text-xs md:text-md lg:text-lg font-neue-roman font-light'>
                        Secure partnerships that align with your values and career aspirations.
                      </p>
                    </div>
                    <div className='text-left max-w-xs'>
                      <h3 className='text-light text-base md:text-lg lg:text-2xl font-neue-roman font-normal uppercase mb-2'>
                        BRAND DEVELOPMENT
                      </h3>
                      <p className='text-light text-xs md:text-md lg:text-lg font-neue-roman font-light'>
                        Build your personal identity through media kits, storytelling, and image consulting.
                      </p>
                    </div>
                    <div className='text-left max-w-xs'>
                      <h3 className='text-light text-base md:text-lg lg:text-2xl font-neue-roman font-normal uppercase mb-2'>
                        MEDIA & SOCIAL GUIDANCE
                      </h3>
                      <p className='text-light text-xs md:text-md lg:text-lg font-neue-roman font-light'>
                        Grow your visibility, engage your audience, and attract the right brands.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='bg-gray-700/50 bg w-full h-full absolute top-0 left-0 right-0 bottom-0 z-10'></div>
            <Image
              src='/servathletes.webp'
              alt='frase'
              className='w-full h-full object-cover object-[50%_40%] absolute top-0 left-0 right-0 bottom-0'
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
                <h1 className='text-light text-3xl md:text-5xl lg:text-8xl font-denton uppercase text-center max-w-full wrap-break-word'>
                  Clubs
                </h1>
                <p className='text-light lg:text-2xl font-neue-roman font-normal uppercase text-center max-w-full wrap-break-word'>
                  Expand Your Reach. Strengthen Your Community.
                </p>
              </div>
              {/* Información adicional que aparece desde abajo - Layout de dos columnas */}
              <div
                className={`${
                  isClubsOpen ? 'relative' : 'absolute'
                } inset-0 flex flex-col items-center transition-all duration-500 py-24 ${
                  isClubsOpen ? '' : 'translate-y-full'
                } md:absolute md:translate-y-full md:group-hover:translate-y-0`}
              >
                {/* Lado Izquierdo */}
                <div className='flex flex-col items-center justify-between h-full w-full mx-auto gap-10'>
                  <div className='flex flex-col items-center justify-center w-full'>
                    <h1 className='text-light text-3xl md:text-5xl font-denton uppercase text-center'>
                      Expand Your Reach. Strengthen Your Community.
                    </h1>
                    <p className='text-light text-sm md:text-lg font-neue-roman font-normal text-center leading-relaxed uppercase'>
                      We partner with clubs to elevate their visibility, attract
                      sponsors, and engage members through curated events and
                      marketing support.
                    </p>
                  </div>
                  <div className='flex flex-col md:flex-row items-center justify-around w-full md:gap-0'>
                    <div className='flex flex-col items-left justify-center gap-5 md:gap-10 max-w-lg'>
                      <div className='text-left'>
                        <h3 className='text-light text-base md:text-lg lg:text-2xl font-neue-roman font-normal uppercase mb-2'>
                          Sponsorship Strategy & Support
                        </h3>
                        <p className='text-light text-xs md:text-md lg:text-lg font-neue-roman font-light'>
                          Identify, negotiate, and secure brand partners for
                          <br />
                          your tournaments or club events.
                        </p>
                      </div>
                      <div className='text-left'>
                        <h3 className='text-light text-base md:text-lg lg:text-2xl font-neue-roman font-normal uppercase mb-2'>
                          Athlete Engagement Programs
                        </h3>
                        <p className='text-light text-xs md:text-md lg:text-lg font-neue-roman font-light'>
                          Connect with pros for clinics, exhibitions, or
                          <br />
                          ambassador roles that inspire your community.
                        </p>
                      </div>
                    </div>
                    <div className='flex flex-col items-left justify-center gap-5 md:gap-10 max-w-lg'>
                      <div className='text-left'>
                        <h3 className='text-light text-base md:text-lg lg:text-2xl font-neue-roman font-normal uppercase mb-2'>
                          Event Management & Activation
                        </h3>
                        <p className='text-light text-xs md:text-md lg:text-lg font-neue-roman font-light'>
                          From branded tournaments to seasonal campaigns,
                          <br /> we help design experiences that stand out.
                        </p>
                      </div>
                      <div className='text-left'>
                        <h3 className='text-light text-base md:text-lg lg:text-2xl font-neue-roman font-normal uppercase mb-2'>
                          Marketing & Communication Consulting
                        </h3>
                        <p className='text-light text-xs md:text-md lg:text-lg font-neue-roman font-light'>
                          Position your club as a leader in the sport with
                          strong <br />
                          storytelling and digital presence.
                        </p>
                      </div>
                    </div>
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
                <h1 className='text-light text-3xl md:text-5xl lg:text-8xl font-denton uppercase text-center max-w-full wrap-break-word'>
                  Organizations
                </h1>
                <p className='text-light lg:text-2xl font-neue-roman font-normal uppercase text-center max-w-full wrap-break-word'>
                  Authentic Partnerships That Deliver Impact.
                </p>
              </div>
              {/* Información adicional que aparece desde abajo - Layout de dos columnas */}
              <div
                className={`${
                  isOrganizationsOpen ? 'relative' : 'absolute'
                } inset-0 flex flex-col items-center transition-all duration-500 py-24 ${
                  isOrganizationsOpen ? '' : 'translate-y-full'
                } md:absolute md:translate-y-full md:group-hover:translate-y-0`}
              >
                {/* Lado Izquierdo */}
                <div className='flex flex-col items-center justify-between h-full w-full mx-auto gap-10'>
                  <div className='flex flex-col items-center justify-center w-full'>
                    <h1 className='text-light text-3xl md:text-5xl font-denton uppercase text-center'>
                      Authentic Partnerships That Deliver Impact.
                    </h1>
                    <p className='text-light text-sm md:text-lg font-neue-roman font-normal text-center leading-relaxed uppercase'>
                      We help brands navigate the world of padel. from strategy
                      to execution , connecting them with athletes, clubs, and
                      audiences that align with their purpose.
                    </p>
                  </div>
                  <div className='flex flex-col md:flex-row items-center justify-around w-full md:gap-0'>
                    <div className='flex flex-col items-left justify-center gap-5 md:gap-10 max-w-lg'>
                      <div className='text-left'>
                        <h3 className='text-light text-base md:text-lg lg:text-2xl font-neue-roman font-normal uppercase mb-2'>
                          Athlete Collaborations
                        </h3>
                        <p className='text-light text-xs md:text-md lg:text-lg font-neue-roman font-light'>
                          Partner with athletes who embody your
                          <br /> brand’s mission and values.
                        </p>
                      </div>
                      <div className='text-left'>
                        <h3 className='text-light text-base md:text-lg lg:text-2xl font-neue-roman font-normal uppercase mb-2'>
                          Event & Activation Planning
                        </h3>
                        <p className='text-light text-xs md:text-md lg:text-lg font-neue-roman font-light'>
                          Bring your brand to life through tournaments,
                          <br /> community events, or experiential campaigns.
                        </p>
                      </div>
                    </div>
                    <div className='flex flex-col items-left justify-center gap-5 md:gap-10 max-w-lg'>
                      <div className='text-left'>
                        <h3 className='text-light text-base md:text-lg lg:text-2xl font-neue-roman font-normal uppercase mb-2'>
                          Content & Storytelling
                        </h3>
                        <p className='text-light text-xs md:text-md lg:text-lg font-neue-roman font-light'>
                          Leverage authentic athlete voices to
                          <br /> drive brand awareness and engagement.
                        </p>
                      </div>
                      <div className='text-left'>
                        <h3 className='text-light text-base md:text-lg lg:text-2xl font-neue-roman font-normal uppercase mb-2'>
                          Consulting & Market Entry
                        </h3>
                        <p className='text-light text-xs md:text-md lg:text-lg font-neue-roman font-light'>
                          Enter the U.S. padel scene with confidence <br />{' '}
                          through insights, partnerships, and
                          <br /> local expertise.
                        </p>
                      </div>
                    </div>
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
        </div>
      </div>
      <div className='px-10 py-20 flex flex-col items-center justify-center gap-10'>
        <p className='text-darkBlue text-lg font-neue-roman font-medium text-center uppercase tracking-widest'>
          Are you ready to take the next step with ESM? We can’t wait to hear
          from you!
        </p>
        <a
          href='mailto:dhany@elitesportsmgt.com'
          className='text-light text-lg font-neue-roman font-medium text-center uppercase tracking-widest bg-redd px-10 py-5 rounded-lg'
        >
          Contact Us!
        </a>
      </div>
      <Frase />
    </>
  );
}
