'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import Image from 'next/image';
import { Instagram } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface InstagramPost {
  id: string;
  caption?: string;
  media_url: string;
  permalink: string;
  media_type: string;
  timestamp: string;
}

interface InstagramFeedResponse {
  data?: InstagramPost[];
  error?: string;
  message?: string;
}

export default function InstagramCarousel() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const fetchInstagramFeed = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/instagram-feed');
        const data: InstagramFeedResponse = await response.json();

        if (data.error) {
          setError(data.message || data.error);
          setPosts([]);
        } else if (data.data && data.data.length > 0) {
          // Filtrar solo imágenes (IMAGE) y videos (VIDEO)
          const mediaPosts = data.data.filter(
            (post) => post.media_type === 'IMAGE' || post.media_type === 'VIDEO'
          );
          setPosts(mediaPosts);
        } else {
          setPosts([]);
        }
      } catch (err) {
        console.error('Error al cargar el feed de Instagram:', err);
        setError('Error al cargar las publicaciones');
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInstagramFeed();
  }, []);

  // Loading state - mantener altura mínima para evitar layout shift
  if (loading) {
    return (
      <div className='w-full py-8 min-h-[400px] flex items-center justify-center'>
        <div className='flex flex-col items-center gap-4'>
          <div className='relative w-16 h-16'>
            <div className='absolute inset-0 border-4 border-lightBlue border-t-mediumBlue rounded-full animate-spin'></div>
          </div>
          <p className='text-mediumBlue font-neue-roman text-sm uppercase tracking-wide'>
            Cargando publicaciones...
          </p>
        </div>
      </div>
    );
  }

  // Error or no posts state - mantener altura mínima para evitar layout shift
  if (error || posts.length === 0) {
    return (
      <div className='w-full py-8 min-h-[400px] flex items-center justify-center'>
        <div className='text-center px-4'>
          <Instagram className='w-12 h-12 text-lightBlue mx-auto mb-4 opacity-50' />
          <p className='text-mediumBlue font-neue-roman text-sm uppercase tracking-wide'>
            {error || 'Publications will appear here soon...'}
          </p>
        </div>
      </div>
    );
  }

  // Determinar qué módulos usar según el tamaño de pantalla
  const swiperModules = isMobile 
    ? [Autoplay, EffectFade, Pagination]
    : [Autoplay, Navigation, Pagination];

  return (
    <div className='w-full py-8'>
      <Swiper
        modules={swiperModules}
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 24,
          },
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={posts.length > (isMobile ? 1 : 4)}
        effect={isMobile ? 'fade' : undefined}
        fadeEffect={isMobile ? {
          crossFade: true,
        } : undefined}
        speed={800}
        grabCursor={true}
        navigation={!isMobile ? {
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        } : undefined}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        className='instagram-swiper'
      >
        {posts.map((post) => (
          <SwiperSlide key={post.id}>
            <a
              href={post.permalink}
              target='_blank'
              rel='noopener noreferrer'
              className='group relative block w-full aspect-square overflow-hidden rounded-xl shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.02]'
            >
              {/* Image */}
              <div className='relative w-full h-full'>
                <Image
                  src={post.media_url}
                  alt={post.caption || 'Instagram post'}
                  fill
                  className='object-cover transition-transform duration-500 group-hover:scale-110'
                  sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw'
                  loading='lazy'
                  placeholder='blur'
                  blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='
                />
                
                {/* Overlay on hover */}
                <div className='absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center'>
                  <Instagram className='w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                </div>
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <div className='hidden md:flex items-center justify-center gap-4 mt-6'>
        <button className='swiper-button-prev-custom w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-mediumBlue hover:bg-lightBlue transition-all duration-300 hover:scale-110'>
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M15 19l-7-7 7-7'
            />
          </svg>
        </button>
        <button className='swiper-button-next-custom w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-mediumBlue hover:bg-lightBlue transition-all duration-300 hover:scale-110'>
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M9 5l7 7-7 7'
            />
          </svg>
        </button>
      </div>

      <style jsx global>{`
        .instagram-swiper {
          padding-bottom: 2rem;
        }
        
        .instagram-swiper .swiper-slide {
          height: auto;
        }
        
        .instagram-swiper .swiper-pagination {
          bottom: 0 !important;
        }
        
        .instagram-swiper .swiper-pagination-bullet {
          background: var(--mediumBlue);
          opacity: 0.3;
          width: 8px;
          height: 8px;
          transition: all 0.3s ease;
        }
        
        .instagram-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          width: 24px;
          border-radius: 4px;
        }
        
        .swiper-button-next-custom.swiper-button-disabled,
        .swiper-button-prev-custom.swiper-button-disabled {
          opacity: 0.35;
          cursor: auto;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}

