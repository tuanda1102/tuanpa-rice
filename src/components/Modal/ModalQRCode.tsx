import {
  Card,
  CardBody,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Image,
  Avatar,
} from '@nextui-org/react';

import APP_IMAGES from '@/assets/images';

function ModalQRCode() {
  return (
    <Card>
      <CardBody className='flex items-center'>
        <Popover backdrop='blur' placement='bottom-end'>
          <PopoverTrigger>
            <Button isIconOnly>
              <Image width={40} height={40} src={APP_IMAGES.qrCodeBanking} />
            </Button>
          </PopoverTrigger>

          <PopoverContent>
            <div className='flex gap-5 py-3'>
              <Avatar
                isBordered
                radius='full'
                size='md'
                src='https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.6435-9/168492177_2916659258555782_6506945232722997191_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=7f8c78&_nc_ohc=s7cNgBEH0FoAX-vJbMB&_nc_ht=scontent.fsgn2-4.fna&oh=00_AfDAOgmC6jDoNVbsbW0oaHCEEjUj6O3E879HCOJD4Pz7_A&oe=65B7BDC1'
              />
              <div className='flex flex-col gap-1 items-start justify-center'>
                <h4 className='text-small font-semibold leading-none text-default-600'>
                  03496917969
                </h4>
                <h5 className='text-small tracking-tight text-default-400'>
                  PHAM ANH TUAN
                </h5>
              </div>
            </div>
            <Image
              width={300}
              className='rounded-3xl'
              src={APP_IMAGES.qrCodeBanking}
            />
          </PopoverContent>
        </Popover>
        <span>QR Code</span>
      </CardBody>
    </Card>
  );
}

export default ModalQRCode;
