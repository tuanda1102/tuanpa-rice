import { useParams } from 'react-router-dom';
import { Card, CardBody, Tab, Tabs } from '@nextui-org/react';

import ModalQRCode from '@/components/Modal/ModalQRCode';
import { useGetMenuById } from '@/apis/order.api';

function Banner() {
  const { id } = useParams<{ id: string }>();
  const { data: menuData } = useGetMenuById(id as string);

  return (
    <div className='w-banner fixed top-[1.5rem] right-0 bottom-[1.5rem] z-40 h-screen transition-transform -translate-x-full sm:translate-x-0'>
      <ModalQRCode />

      <Card className='mt-4'>
        <CardBody className='p-4 h-full'>
          <Tabs
            className='flex justify-center'
            aria-label='Tabs banner'
            radius='full'
          >
            <Tab key='menu' title='Menu'>
              <img
                className='rounded-xl w-full object-contain'
                src={
                  (menuData?.image as string) ||
                  'https://i.cbc.ca/1.6269528.1638397868!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_940/1438615901.jpg'
                }
                alt='menu'
              />
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}

export default Banner;
