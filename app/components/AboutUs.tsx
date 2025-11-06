import Image from 'next/image';

function AboutUs() {
  return (
    <div className='px-5 md:px-15 py-20'>
      <div className='flex justify-start gap-5 mb-20'>
        <h1 className='text-darkBlue text-7xl font-extrabold font-inter uppercase'>
          WHO WE ARE
        </h1>
      </div>
      <div className='flex justify-end gap-5 mb-20'>
        {/* <p className='text-darkBlue text-sm font-roboto font-light text-left uppercase'>
          We are a sports representation and consulting agency dedicated to the
          growth of padel
          <br />
          in the United States. Padel is the fastest-growing racquet sport in
          the world — yet in the U.S., athletes, clubs, and organizations often
          lack the
          <br />
          structure to truly thrive.
          <br />
          At Elite Sports Management, we bridge that gap.
          <br />
          Our mission is to create partnerships that inspire progress and growth
          — creating visibility, credibility, and long-
          <br />
          term value for everyone involved.
          <br />
          We believe in innovation, authenticity, and collaboration — because
          when our ecosystem grows together, everyone
          <br />
          wins.
        </p> */}
        <p className='text-darkBlue text-sm font-roboto font-light text-left uppercase max-w-5xl'>
          We are a sports representation and consulting agency dedicated to the
          growth of padel in the United States. Padel is the fastest-growing
          racquet sport in the world — yet in the U.S., athletes, clubs, and
          organizations often lack the structure to truly thrive. At Elite
          Sports Management, we bridge that gap. Our mission is to create
          partnerships that inspire progress and growth — creating visibility,
          credibility, and long- term value for everyone involved. We believe in
          innovation, authenticity, and collaboration — because when our
          ecosystem grows together, everyone wins.
        </p>
      </div>
      <div className='flex justify-start gap-5 mb-20'>
        <h1 className='text-darkBlue text-7xl font-extrabold font-inter uppercase'>
          we work with
        </h1>
      </div>
      <div className='flex justify-end gap-5 mb-20'>
        {/* <p className='text-darkBlue text-sm font-roboto font-light text-left uppercase'>
          Athletes. Clubs. Organizations
          <br />
          We represent and guide players through every stage of their journey —
          securing sponsorships, refining personal
          <br />
          brands, and opening doors to new professional and lifestyle
          opportunities.
          <br />
          We help clubs attract sponsors, engage members, and host elevated
          events that grow visibility and participation in
          <br />
          padel.
          <br />
          We connect brands with the padel ecosystem through authentic
          partnerships, athlete collaborations, and
          <br />
          experiential activations that drive measurable results.
        </p> */}
        <p className='text-darkBlue text-sm font-roboto font-light text-left uppercase max-w-5xl'>
          Athletes. Clubs. Organizations We represent and guide players through
          every stage of their journey — securing sponsorships, refining
          personal brands, and opening doors to new professional and lifestyle
          opportunities. We help clubs attract sponsors, engage members, and
          host elevated events that grow visibility and participation in padel.
          We connect brands with the padel ecosystem through authentic
          partnerships, athlete collaborations, and experiential activations
          that drive measurable results.
        </p>
      </div>
      <div className='flex justify-center gap-5 mb-20'>
        <h1 className='text-darkBlue text-7xl font-extrabold font-inter uppercase'>
          Our founder
        </h1>
      </div>
      <div className='flex flex-col items-center justify-center gap-5 mb-20'>
        <h2 className='text-darkBlue text-xl font-semibold font-mono uppercase mb-5'>
          An Athlete's Drive. A Leader's Vision.
        </h2>
        <p className='text-darkBlue text-sm font-roboto font-light text-center uppercase max-w-6xl'>
          I'm Dhanielly Quevedo — a top-ranked U.S. padel athlete and
          former Division I tennis player. Competing at an elite level has
          taught me discipline, resilience, and purpose. Off the court,
          I've spent nearly a decade leading corporate communications for
          global brands — from Fortune 100 companies to fast-growing startups.
          <br />
          <br />
          That unique blend of experience — athlete + brand strategist —
          inspired me to build a platform where representation goes beyond
          contracts and becomes collaboration. Elite Sports Management was
          created to help athletes, clubs, and organizations thrive together —
          through integrity, creativity, and a shared passion for the game.
        </p>
      </div>
    </div>
  );
}

export default AboutUs;
