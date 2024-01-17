import { type IRoute } from '@/types/routes';
import newFeedsRoutes from '@/features/NewFeeds/routes/newFeeds.routes';
import rankDonateRoutes from '@/features/RankDonates/routes/rankDonate.routes';
import dashBoardRoutes from '@/features/DashBoard/routes/dassBoard.routes';

const privateRoutes: IRoute[] = [
  ...newFeedsRoutes,
  ...rankDonateRoutes,
  ...dashBoardRoutes,
];

export default privateRoutes;
