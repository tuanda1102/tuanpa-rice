import { Card, Skeleton } from '@nextui-org/react';

function SkeletonMenuCard() {
  return (
    <>
      {Array(12)
        .fill(0)
        .map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Card key={index} className='h-[380px] py-7 px-3'>
            <Skeleton className='rounded-lg w-[180px]'>
              <div className='h-[12px] rounded-lg bg-secondary' />
            </Skeleton>
            <Skeleton className='rounded-lg mt-3 w-[240px]'>
              <div className='h-[18px] rounded-lg bg-secondary' />
            </Skeleton>

            <Skeleton className='rounded-lg mt-3'>
              <div className='h-[280px] ounded-lg bg-secondary' />
            </Skeleton>
          </Card>
        ))}
    </>
  );
}

export default SkeletonMenuCard;
