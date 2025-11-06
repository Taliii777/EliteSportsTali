import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../components/ui/carousel';
import Image from 'next/image';

const images = ['/about-2.webp', '/2.webp', '/3.webp'];

export function CarouselElement() {
  return (
    <Carousel className='w-full max-w-7xl'>
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className='p-1'>
              <Image
                src={image}
                alt={`Image ${index + 1}`}
                width={1920}
                height={1080}
                className='w-full lg:h-[600px] md:h-[400px] h-[200px] object-cover object-bottom rounded-lg'
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
