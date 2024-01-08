import { type IRoute } from '@/types/routes';
import newFeedsRoutes from '@/features/NewFeeds/routes/newFeeds.routes';

const privateRoutes: IRoute[] = [...newFeedsRoutes];

export default privateRoutes;
