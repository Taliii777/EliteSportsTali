import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';

const clients = [
  {
    title: '6 LOVE SPORTS',
    subtitle: "WOMEN'S PADEL COMMUNITY",
    description: (
      <>
        &ldquo;Partnering with ESM represents a powerful alignment in purpose
        and vision. Together, we{"'"}re creating meaningful opportunities for
        women in padel and helping drive the growth of the sport in an
        authentic, lasting way.
        <br />
        <br />
        What makes ESM stand out is their professionalism, creativity, and deep
        understanding of both the business and human side of sport. Their
        commitment to empowering female athletes and elevating the game with
        purpose and impact is exactly what the industry needs. This partnership
        goes beyond collaboration — it{"'"}s about building a movement that
        inspires and uplifts the next generation of women in sport.&rdquo;
        <br />
        <br />- Andi
      </>
    ),
  },
  {
    title: 'GUILLERMO GAGIGAS',
    subtitle: 'PADEL PLAYER',
    description: (
      <>
        &ldquo;Joining the ESM team goes beyond having representation —
        it&apos;s about sharing a vision for how padel can grow in the U.S.
        <br />
        <br />
        Their approach is professional, athlete-focused, and built on purpose.
        professional, athlete-focused, and built on purpose. As both a player
        and someone helping develop the sport from the ground up, I appreciate
        how ESM creates real opportunities for athletes to evolve and make an
        impact beyond the court.&rdquo;
        <br />
        <br />- Guillermo Gagigas
      </>
    ),
  },
  {
    title: 'CLEMENTINA RIOBUENO',
    subtitle: 'PADEL PLAYER',
    description: (
      <>
        &ldquo;Being part of ESM represents an opportunity to be part of
        something bigger than the sport. Their commitment to empowering
        athletes—especially women in padel—is inspiring and necessary for the
        growth of the game. As a player, I value how ESM understands our journey
        both on and off the court, and works to create meaningful opportunities
        that elevate us and the sport as a whole.&rdquo;
        <br />
        <br />- Clementina Riobueno
      </>
    ),
  },
];

function FromOurClients() {
  return (
    <div className='bg-lightBlue px-15 py-20'>
      <h2 className='text-black text-2xl font-roboto font-medium uppercase mb-20'>
        from our clients
      </h2>
      <Carousel className='w-full max-w-[80%] mx-auto py-40'>
        <CarouselContent>
          {clients.map((client, index) => (
            <CarouselItem key={index}>
              <div className='p-1 flex items-center justify-between gap-20 w-full'>
                <div className='flex flex-col items-start justify-center gap-5'>
                  <h3 className='text-darkBlue text-7xl font-extrabold font-inter uppercase'>
                    {client.title}
                  </h3>
                  <p className='text-darkBlue text-xl font-mono font-bold uppercase'>
                    {client.subtitle}
                  </p>
                </div>
                <div className='flex flex-col items-start justify-center max-w-2xl'>
                  <div className='text-black text-sm font-roboto font-light uppercase'>
                    {client.description}
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default FromOurClients;
