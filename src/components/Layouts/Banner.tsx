import { Card, CardBody, Tab, Tabs } from '@nextui-org/react';
import APP_IMAGES from '@/assets/images';
import ModalQRCode from '@/components/Modal/ModalQRCode';

function Banner() {
  return (
    <div className='w-banner fixed top-[1.5rem] right-0 bottom-[1.5rem] z-40 h-screen transition-transform -translate-x-full sm:translate-x-0'>
      <ModalQRCode />

      <Card>
        <CardBody className='p-4 h-full'>
          <Tabs
            className='flex justify-center'
            aria-label='Tabs banner'
            radius='full'
          >
            <Tab key='menu' title='Menu'>
              <img
                className='rounded-xl w-full object-contain'
                src={APP_IMAGES.qrCodeBanking}
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
