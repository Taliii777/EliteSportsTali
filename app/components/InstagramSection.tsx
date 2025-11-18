'use client';

import { InfiniteMovingCards } from './ui/infinite-moving-cards';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface InstagramItem {
  name: string;
  image: string;
  link?: string;
}

function InstagramSection() {
  const [items, setItems] = useState<InstagramItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstagramFeed = async () => {
      try {
        const response = await fetch('/api/instagram');
        const data = await response.json();

        if (data.items && data.items.length > 0) {
          setItems(data.items);
        }
      } catch (error) {
        console.error('Error al cargar el feed de Instagram:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInstagramFeed();
  }, []);

  // Si está cargando o no hay items, mostrar un mensaje o placeholder
  if (loading) {
    return (
      <div className='px-15 py-20'>
        <h2 className='text-black text-2xl font-neue-roman font-normal uppercase mb-14'>
          FOLLOW US ON INSTAGRAM
        </h2>
        <div className='flex items-center justify-center py-20'>
          <p className='text-blue-dark'>Cargando...</p>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className='px-15 py-20'>
        <h2 className='text-black text-2xl font-neue-roman font-normal uppercase mb-14'>
          FOLLOW US ON INSTAGRAM
        </h2>
        <div className='flex items-center justify-center py-20'>
          <p className='text-blue-dark'>No hay publicaciones disponibles</p>
        </div>
      </div>
    );
  }

  return (
    <div className='px-15 py-20'>
      <h2 className='text-black text-2xl font-neue-roman font-normal uppercase mb-14'>
        FOLLOW US ON INSTAGRAM
      </h2>
      {/* <InfiniteMovingCards items={items} speed='normal' /> */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center justify-center gap-10'>
        {items.map((item) => (
          <a
            className='relative max-w-full w-full h-[500px] overflow-hidden rounded-2xl cursor-pointer transition-opacity hover:opacity-80'
            href={item.link || '#'}
            target='_blank'
            rel='noopener noreferrer'
            key={item.link}
            onClick={(e) => {
              if (!item.link) {
                e.preventDefault();
              }
            }}
          >
            <Image
              src={item.image}
              alt={item.name}
              width={1920}
              height={1080}
              className='w-full h-full object-cover object-center'
            />
          </a>
        ))}
      </div>
    </div>
  );
}

export default InstagramSection;
