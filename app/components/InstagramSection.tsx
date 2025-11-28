'use client';

import InstagramCarousel from './InstagramCarousel';

function InstagramSection() {
  return (
    <div className='px-15 py-20'>
      <h2 className='text-black text-2xl font-neue-roman font-normal uppercase mb-14'>
        FOLLOW US ON INSTAGRAM
      </h2>
      <InstagramCarousel />
    </div>
  );
}

export default InstagramSection;
