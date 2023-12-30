import {
  Card,
  CardBody,
  CardHeader,
  type CardProps,
  Image,
} from '@nextui-org/react';
import { Link, type To } from 'react-router-dom';

interface IMenuCardProps extends CardProps {
  title: string;
  timestamp: string;
  imageUrl: string;
  to: To;
}

function MenuCard({ title, timestamp, imageUrl, to }: IMenuCardProps) {
  return (
    <Link className='flex' to={to}>
      <Card className='py-4'>
        <CardHeader className='pb-0 pt-2 px-4 flex-col items-start'>
          {/* <p className='text-tiny uppercase font-bold'>Daily Mix</p> */}
          <small className='text-default-500'>{timestamp}</small>
          <h4 className='font-bold text-large'>{title}</h4>
        </CardHeader>
        <CardBody className='overflow-visible py-2'>
          <Image
            alt='Card background'
            className='object-cover rounded-xl w-full'
            classNames={{
              wrapper: 'h-full w-full',
              img: 'h-full w-full',
            }}
            src={
              imageUrl ||
              'https://afamilycdn.com/150157425591193600/2022/7/23/e382b9e382afe383aae383bce383b3e382b7e383a7e38383e38388-2017-07-18-184235-15322694858341613911236-1658594568792520902193.png'
            }
          />
        </CardBody>
      </Card>
    </Link>
  );
}

export default MenuCard;
