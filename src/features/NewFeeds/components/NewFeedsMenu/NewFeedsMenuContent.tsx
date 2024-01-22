import { ScrollShadow } from '@nextui-org/react';
import { CgCoffee } from 'react-icons/cg';

import MenuItem from '@/features/NewFeeds/components/MenuItem/MenuItem';
import { type IMenu } from '@/types/menu';

interface INewFeedsMenuContent {
  menuList?: IMenu[];
  isSuccess: boolean;
}

function NewFeedsMenuContent({ menuList, isSuccess }: INewFeedsMenuContent) {
  return (
    <>
      <ScrollShadow className='w-full flex-grow p-2'>
        {menuList && menuList?.length
          ? menuList.map((menu) => <MenuItem key={menu.id} menu={menu} />)
          : ''}

        {isSuccess && !menuList?.length ? (
          <div className='flex flex-col items-center gap2 text-foreground-400'>
            <CgCoffee size={48} />
            <h5>Không có menu để hiển thị</h5>
          </div>
        ) : (
          ''
        )}
      </ScrollShadow>
    </>
  );
}

export default NewFeedsMenuContent;
