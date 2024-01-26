import Auth from '@/components/navbar/Auth';
import Header from '@/components/navbar/Header';
import Profile from '@/components/navbar/Profile';
import Search from '@/components/search/Search';
import Container from '@/components/ui/Container';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header>
        <div className='flex w-full items-center gap-3 sm:justify-end'>
          <Search />
          <Profile />
        </div>
        <Auth
          width='full'
          color='warning'
          variants={{ signup: 'flat', login: 'light' }}
          classNames={{
            main: 'flex w-min gap-2 items-center md:hidden',
            button: 'xs:text-lg xs:h-10 xs:w-24',
          }}
        />
        <Auth
          width='default'
          classNames={{
            main: 'hidden md:flex gap-1',
          }}
        />
      </Header>

      <Container className='mt-3'>{children}</Container>
    </>
  );
}
