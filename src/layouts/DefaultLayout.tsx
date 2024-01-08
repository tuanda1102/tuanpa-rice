import { type HTMLAttributes } from 'react';
import { Card, CardBody } from '@nextui-org/react';

// import Banner from '@/components/Layouts/Banner';
import Sidebar from '@/components/Layouts/Sidebar';
import Header from '@/components/Layouts/Header';

interface IDefaultLayoutProps extends HTMLAttributes<HTMLDivElement> {}

function DefaultLayout({ children }: IDefaultLayoutProps) {
  return (
    <div className='fixed inset-0 rounded-none border-0 outline-0'>
      <div>
        <Sidebar />
        <div className='sm:ml-sidebar px-6'>
          <Header />
          <Card className='mb-10 h-[calc(100vh_-_1.5rem_-_theme(spacing.header))] rounded-[36px] p-4'>
            {/* <CardHeader className='italic text-primary font-semibold'>
              Thà rằng ăn bát cơm rau, còn hơn thịt cá nói nhau nặng lời !
            </CardHeader> */}
            <CardBody className='overflow-clip'>{children}</CardBody>
          </Card>
        </div>
        {/* <Banner /> */}
      </div>
    </div>
  );
}

export default DefaultLayout;
