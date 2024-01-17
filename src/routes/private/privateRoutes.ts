import { type IRoute } from '@/types/routes';
import newFeedsRoutes from '@/features/NewFeeds/routes/newFeeds.routes';
import rankDonateRoutes from '@/features/RankDonates/routes/RankDonate.routes';

const privateRoutes: IRoute[] = [...newFeedsRoutes, ...rankDonateRoutes];

export default privateRoutes;
