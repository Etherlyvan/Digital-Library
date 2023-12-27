import DashNavbar from '@/components/dashboard/DashNavbar';
import Profile from '@/components/navbar/Profile';
import Container from '@/components/ui/Container';

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <>
      <DashNavbar>
        <Profile />
      </DashNavbar>

      <Container className='mt-3'>{children}</Container>
    </>
  );
};

export default DashboardLayout;
