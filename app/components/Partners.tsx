import Image from 'next/image';
import { InfiniteMovingCards } from './ui/infinite-moving-cards';

const items = [
  {
    name: 'Pro pade',
    image: '/propadellogo.webp',
  },
  {
    name: 'Wilson',
    image: '/wilsonlogo.webp',
  },
  {
    name: 'BGO',
    image: '/bgocorporate.webp',
  },
  {
    name: 'Corkpade',
    image: '/corkpadellogo.webp',
  },
  {
    name: 'Red & Blue',
    image: '/red&blue.webp',
  },
  {
    name: 'Elite',
    image: '/eliteCorpLogo.webp',
  },
  {
    name: 'Tower',
    image: '/towerlogo.webp',
  },
  {
    name: '6LS',
    image: '/6lslogo.webp',
  },
];
function Partners() {
  return (
    <div className='flex flex-col items-center justify-center  p-20'>
      <h1 className='text-darkBlue lg:text-6xl sm:text-5xl text-3xl font-roboto-mono font-medium uppercase text-center mb-20'>
        partners
      </h1>
      <InfiniteMovingCards items={items} speed='normal'/>
    </div>
  );
}

export default Partners;
