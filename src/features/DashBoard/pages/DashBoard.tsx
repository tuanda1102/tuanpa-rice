import PriceMissingChart from '@/features/DashBoard/components/Chart/MoneyMissChart';
import MoneyMissingTable from '../components/Table/MoneyMissingTable';

export default function DashBoard() {
  return (
    <div>
      <div className='grid grid-cols-2 gap-x-5'>
        <PriceMissingChart />
        <MoneyMissingTable />
      </div>
    </div>
  );
}
