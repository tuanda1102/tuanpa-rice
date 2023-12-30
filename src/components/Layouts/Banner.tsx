import { Card, CardBody, Image, Tab, Tabs } from '@nextui-org/react';
import APP_IMAGES from '@/assets/images';

function Banner() {
  return (
    <div className='w-banner fixed top-0 right-0 bottom-0 z-40 h-screen transition-transform -translate-x-full sm:translate-x-0 py-3'>
      <Card className='h-full'>
        <CardBody>
          <Tabs
            className='flex justify-center'
            aria-label='Tabs banner'
            radius='full'
          >
            <Tab key='qrCode' title='QR Code'>
              <Image src={APP_IMAGES.qrCodeBanking} />
            </Tab>
            <Tab key='menu' title='Menu'>
              <Image src={APP_IMAGES.qrCodeBanking} />
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}

export default Banner;
