import NewFeedsMenuHeader from '@/features/NewFeeds/components/NewFeedsMenu/NewFeedsMenuHeader';
import NewFeedsMenuContent from '@/features/NewFeeds/components/NewFeedsMenu/NewFeedsMenuContent';
import FormDatePiker from '@/features/NewFeeds/components/Form/FormDatePicker';

function NewFeedsMenu() {
  return (
    <>
      <div className='min-w-[480px] pt-4 flex flex-col'>
        <div className='flex flex-row justify-between'>
          <FormDatePiker />
          <NewFeedsMenuHeader />
        </div>
        <NewFeedsMenuContent />
      </div>
    </>
  );
}

export default NewFeedsMenu;
