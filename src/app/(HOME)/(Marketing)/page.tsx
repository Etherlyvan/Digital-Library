import { Suspense } from 'react';

import BrandLogo from '@/components/BrandLogo';
import Heading from '@/components/Heading';
import { GridContainer } from '@/components/ReusableCard';
import BookCardSkeleton from '@/components/loadings/BookCardSkeleton';
import BookCardShowcase from '@/components/marketing/BookCardShowcase';
import Container from '@/components/ui/Container';
import Link from '@/components/ui/Link';
import { Button } from '@nextui-org/button';
import { Search } from 'lucide-react';

export const revalidate = false;
export const runtime = 'edge';
export const preferredRegion = ['sin1', 'cle1', 'fra1'];

const Home = () => {
  return (
    <Container className='px-0'>
      <div className='text-center tracking-tight'>
        <h1 className='mt-24 text-4xl font-extrabold leading-tight sm:mt-28 sm:text-5xl lg:text-6xl'>
          Welcome to{' '}
          <BrandLogo
            classNames={{
              main: 'cursor-default',
              logo1: 'lg:text-6xl sm:text-5xl text-3xl font-bold',
              logo2: 'lg:text-6xl sm:text-5xl text-3xl font-bold',
            }}
          />
          , Discover a World of Stories
        </h1>

        <p className='prose prose-base mx-auto mt-6 w-full font-medium sm:prose-xl dark:text-foreground-700 xs:mt-8'>
          Immerse yourself in a diverse collection of captivating books that cater to every taste.
          From thrilling adventures to heartwarming tales, our library has something for everyone.
          Explore the boundless realms of imagination crafted by talented authors.
        </p>
      </div>

      <div className='mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row'>
        <Button
          as={Link}
          href='/books'
          color='secondary'
          radius='md'
          variant='shadow'
          size='lg'
          className='gap-2 font-semibold'
        >
          Start Reading <span>&rarr;</span>
        </Button>
        <Button
          as={Link}
          href='/discover'
          size='lg'
          radius='md'
          variant='shadow'
          className='hidden text-medium sm:flex'
        >
          <Search className='h-6 w-6' />
          Search your favourite book...
        </Button>
      </div>

      <div className='mt-24 w-full md:mt-32'>
        <Heading
          classNames={{
            heading: 'text-center relative left-1/2 -translate-x-1/2',
            divider: 'absolute w-[calc(100%+2rem)] -translate-x-1/2 left-1/2',
          }}
        >
          Books To Explore
        </Heading>

        <Suspense
          fallback={
            <GridContainer position='center'>
              <BookCardSkeleton cards={6} />
            </GridContainer>
          }
        >
          <BookCardShowcase />
        </Suspense>
      </div>
    </Container>
  );
};

export default Home;
