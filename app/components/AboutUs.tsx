import Image from 'next/image';

function AboutUs() {
  return (
    <div className='px-5 md:px-15 py-20'>
      <div className='flex justify-start gap-5 mb-20'>
        <h1 className='text-darkBlue text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-denton uppercase'>
          WHO WE ARE
        </h1>
      </div>
      <div className='flex justify-end gap-5 mb-20'>
        <p className='text-darkBlue text-lg font-neue-roman text-left max-w-5xl'>
          We are a sports representation and consulting agency dedicated
          primarily to the growth of padel and other sports in the United States
          and beyond. Padel is the fastest-growing racquet sport in the world —
          yet in the U.S., athletes, clubs, and organizations lack the structure
          to truly thrive. At Elite Sports Management, we bridge that gap. Our
          mission is to create partnerships that inspire progress and growth —
          creating visibility, credibility, and long- term value for everyone
          involved. We believe in innovation, authenticity, and collaboration —
          because when our ecosystem grows together, everyone wins.
        </p>
      </div>
      <div className='flex justify-start gap-5 mb-20'>
        <h1 className='text-darkBlue text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-denton uppercase'>
          What We Do
        </h1>
      </div>
      <div className='flex justify-end gap-5 mb-20'>
        <p className='text-darkBlue text-lg font-neue-roman text-left max-w-5xl'>
          We represent and guide players through every stage of their journey —
          securing sponsorships, refining personal brands, and opening doors to
          new professional and lifestyle opportunities. We help clubs attract
          sponsors, engage members, and host elevated events that grow
          visibility and participation. We connect brands with our ecosystem
          through authentic partnerships, athlete collaborations, and
          experiential activations that drive measurable results.
        </p>
      </div>
    </div>
  );
}

export default AboutUs;
