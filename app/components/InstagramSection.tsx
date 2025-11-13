'use client';

import { InfiniteMovingCards } from './ui/infinite-moving-cards';
import { useEffect, useState } from 'react';

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
        <h2 className='text-black text-2xl font-roboto-mono font-normal uppercase mb-14'>
          FOLLOW THE JOURNEY
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
        <h2 className='text-black text-2xl font-roboto-mono font-normal uppercase mb-14'>
          FOLLOW THE JOURNEY
        </h2>
        <div className='flex items-center justify-center py-20'>
          <p className='text-blue-dark'>No hay publicaciones disponibles</p>
        </div>
      </div>
    );
  }

  return (
    <div className='px-15 py-20'>
      <h2 className='text-black text-2xl font-roboto-mono font-normal uppercase mb-14'>
        FOLLOW THE JOURNEY
      </h2>
      <InfiniteMovingCards items={items} speed='normal' />
    </div>
  );
}

export default InstagramSection;
